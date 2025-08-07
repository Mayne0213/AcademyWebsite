import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/prisma/client';
import jwt from 'jsonwebtoken';
import { TIME_SLOTS } from '@/src/shared/config';

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret_key";

// 토큰에서 사용자 정보 추출 함수
const getUserFromToken = async (req: NextRequest) => {
  try {
    const cookieHeader = req.headers.get("cookie");
    
    if (!cookieHeader) {
      return null;
    }

    // 쿠키 문자열에서 token 이름의 값 추출
    const cookies = Object.fromEntries(
      cookieHeader.split("; ").map((cookie) => {
        const [name, ...rest] = cookie.split("=");
        return [name, rest.join("=")];
      })
    );

    const token = cookies["token"];

    if (!token) {
      return null;
    }

    // 토큰 검증
    const payload = jwt.verify(token, JWT_SECRET) as any;
    
    // 사용자 정보 조회
    const user = await prisma.user.findUnique({
      where: { memberId: payload.memberId },
      include: {
        student: true,
        admin: true,
      },
    });

    return user;
  } catch (error) {
    console.error('Token verification failed:', error);
    return null;
  }
};

export async function POST(request: NextRequest) {
  try {
    console.log('=== POST /api/counseling/reservations ===');
    
    // 사용자 인증 확인
    const user = await getUserFromToken(request);
    console.log('User from token:', user);
    
    if (!user) {
      console.log('No user found - returning 401');
      return NextResponse.json(
        { error: '로그인이 필요합니다.' },
        { status: 401 }
      );
    }

    // 학생만 예약 가능
    if (user.role !== 'STUDENT' || !user.student) {
      return NextResponse.json(
        { error: '학생만 상담 예약이 가능합니다.' },
        { status: 403 }
      );
    }

    // 요청 데이터 파싱
    const body = await request.json();
    console.log('=== RESERVATION REQUEST ===');
    console.log('Received request body:', body);
    const { adminId, date, timeSlotId, scheduleId, consultationContent } = body;

    // 필수 필드 검증
    if (!adminId || !date || !timeSlotId || !scheduleId || !consultationContent) {
      console.log('Missing required fields:', { adminId, date, timeSlotId, scheduleId, consultationContent });
      return NextResponse.json(
        { error: '모든 필수 필드를 입력해주세요.' },
        { status: 400 }
      );
    }

    // Admin 정보 조회
    const admin = await prisma.admin.findUnique({
      where: { memberId: adminId }
    });

    if (!admin) {
      return NextResponse.json(
        { error: '상담사를 찾을 수 없습니다.' },
        { status: 404 }
      );
    }

    // 스케줄 조회 및 예약 가능 여부 확인
    console.log('Looking for schedule with:', { scheduleId });
    
    const schedule = await prisma.counselingSchedule.findFirst({
      where: {
        scheduleId,
        isAvailable: true
      }
    });

    console.log('Found schedule:', schedule);

    if (!schedule) {
      return NextResponse.json(
        { error: '선택한 스케줄을 찾을 수 없거나 이미 예약되었습니다.' },
        { status: 400 }
      );
    }

    // 중복 예약 확인
    const existingReservation = await prisma.counselingReservation.findFirst({
      where: {
        studentId: user.student.memberId,
        scheduleId: schedule.scheduleId
      }
    });

    if (existingReservation) {
      return NextResponse.json(
        { error: '이미 예약된 시간입니다.' },
        { status: 400 }
      );
    }

    // 예약 생성
    const reservation = await prisma.counselingReservation.create({
      data: {
        studentId: user.student.memberId,
        adminId,
        scheduleId: schedule.scheduleId,
        consultationContent
      },
      include: {
        student: {
          select: {
            studentName: true,
            studentPhone: true
          }
        },
        admin: {
          select: {
            adminName: true,
            adminPosition: true
          }
        },
        schedule: true
      }
    });

    // timeSlot 정보를 포함해서 반환
    const reservationWithTimeSlot = {
      ...reservation,
      schedule: {
        ...reservation.schedule,
        timeSlot: TIME_SLOTS.find(slot => slot.timeSlotId === reservation.schedule.timeSlotId) || {
          timeSlotId: reservation.schedule.timeSlotId,
          startTime: "00:00",
          endTime: "00:30",
          displayName: `${reservation.schedule.timeSlotId}번 시간대`
        }
      }
    };

    // 스케줄을 예약 불가능으로 변경
    await prisma.counselingSchedule.update({
      where: { scheduleId: schedule.scheduleId },
      data: { isAvailable: false }
    });

    console.log('상담 예약 생성 성공:', reservationWithTimeSlot);
    return NextResponse.json(reservationWithTimeSlot);

  } catch (error) {
    console.error('상담 예약 생성 실패:', error);
    return NextResponse.json(
      { error: '상담 예약 생성에 실패했습니다.' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    // 사용자 인증 확인
    const user = await getUserFromToken(request);
    if (!user) {
      return NextResponse.json(
        { error: '로그인이 필요합니다.' },
        { status: 401 }
      );
    }

    // 학생만 예약 목록 조회 가능
    if (user.role !== 'STUDENT' || !user.student) {
      return NextResponse.json(
        { error: '학생만 예약 목록을 조회할 수 있습니다.' },
        { status: 403 }
      );
    }

    // 사용자의 상담 예약 목록 조회
    const reservations = await prisma.counselingReservation.findMany({
      where: {
        studentId: user.student.memberId
      },
      include: {
        student: {
          select: {
            studentName: true,
            studentPhone: true
          }
        },
        admin: {
          select: {
            adminName: true,
            adminPosition: true
          }
        },
        schedule: true
      },
      orderBy: [
        { schedule: { date: 'asc' } },
        { schedule: { timeSlotId: 'asc' } }
      ]
    });

    // timeSlot 정보를 포함해서 반환
    const reservationsWithTimeSlot = reservations.map(reservation => ({
      ...reservation,
      schedule: {
        ...reservation.schedule,
        timeSlot: TIME_SLOTS.find(slot => slot.timeSlotId === reservation.schedule.timeSlotId) || {
          timeSlotId: reservation.schedule.timeSlotId,
          startTime: "00:00",
          endTime: "00:30",
          displayName: `${reservation.schedule.timeSlotId}번 시간대`
        }
      }
    }));

    return NextResponse.json(reservationsWithTimeSlot);

  } catch (error) {
    console.error('상담 예약 목록 조회 실패:', error);
    return NextResponse.json(
      { error: '상담 예약 목록을 불러오는데 실패했습니다.' },
      { status: 500 }
    );
  }
} 