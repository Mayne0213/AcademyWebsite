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
    return null;
  }
};

export async function POST(request: NextRequest) {
  try {
    
    // 사용자 인증 확인
    const user = await getUserFromToken(request);
    
    if (!user) {
      return NextResponse.json(
        { success: false, message: '로그인이 필요합니다.' },
        { status: 401 }
      );
    }

    // 학생만 예약 가능
    if (user.role !== 'STUDENT' || !user.student) {
      return NextResponse.json(
        { success: false, message: '학생만 상담 예약이 가능합니다.' },
        { status: 403 }
      );
    }

    // 요청 데이터 파싱
    const body = await request.json();
    const { adminId, date, timeSlotId, scheduleId, consultationContent } = body;

    // 필수 필드 검증
    if (!adminId || !date || !timeSlotId || !scheduleId || !consultationContent) {
      return NextResponse.json(
        { success: false, message: '모든 필수 필드를 입력해주세요.' },
        { status: 400 }
      );
    }

    // Admin 정보 조회
    const admin = await prisma.admin.findUnique({
      where: { memberId: adminId }
    });

    if (!admin) {
      return NextResponse.json(
        { success: false, message: '선생님을 찾을 수 없습니다.' },
        { status: 404 }
      );
    }

    // 스케줄 조회 및 예약 가능 여부 확인
    
    const schedule = await prisma.counselingSchedule.findFirst({
      where: {
        scheduleId,
        isAvailable: true
      }
    });

    if (!schedule) {
      return NextResponse.json(
        { success: false, message: '선택한 스케줄을 찾을 수 없거나 이미 예약되었습니다.' },
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
        { success: false, message: '이미 예약된 시간입니다.' },
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

    return NextResponse.json(reservationWithTimeSlot);

  } catch (error) {
    return NextResponse.json(
      { success: false, message: '상담 예약 생성에 실패했습니다.' },
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
        { success: false, message: '로그인이 필요합니다.' },
        { status: 401 }
      );
    }

    // 학생만 예약 목록 조회 가능
    if (user.role !== 'STUDENT' || !user.student) {
      return NextResponse.json(
        { success: false, message: '학생만 예약 목록을 조회할 수 있습니다.' },
        { status: 403 }
      );
    }

    // 현재 날짜/시간 이후의 상담 예약 목록만 조회 (로컬 시간 기준)
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0'); // 0부터 시작하므로 +1
    const day = String(now.getDate()).padStart(2, '0');
    const currentDate = `${year}-${month}-${day}`; // YYYY-MM-DD 형식
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();
    const currentTimeInMinutes = currentHour * 60 + currentMinute;

    // 사용자의 모든 예약을 가져온 후 클라이언트에서 시간 필터링
    const allReservations = await prisma.counselingReservation.findMany({
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

    // timeSlot 정보를 포함하고 현재 시간 이후의 예약만 필터링
    const reservationsWithTimeSlot = allReservations.map(reservation => ({
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

    // 오늘 날짜의 예약 중에서 현재 시간 이후의 예약만 필터링
    const validReservations = reservationsWithTimeSlot.filter(reservation => {
      try {
        // 예약 날짜도 로컬 시간 기준으로 변환
        const scheduleDate = new Date(reservation.schedule.date);
        const resYear = scheduleDate.getFullYear();
        const resMonth = String(scheduleDate.getMonth() + 1).padStart(2, '0'); // 0부터 시작하므로 +1
        const resDay = String(scheduleDate.getDate()).padStart(2, '0');
        const reservationDate = `${resYear}-${resMonth}-${resDay}`;

        // 오늘보다 미래 날짜는 모두 포함
        if (reservationDate > currentDate) {
          return true;
        }

        // 오늘 날짜인 경우 시간 비교
        if (reservationDate === currentDate) {
          const timeSlot = reservation.schedule.timeSlot;
          if (!timeSlot || !timeSlot.startTime) {
            return true; // timeSlot 정보가 없으면 일단 포함
          }
          const [startHour, startMinute] = timeSlot.startTime.split(':').map(Number);
          const reservationTimeInMinutes = startHour * 60 + startMinute;

          // 현재 시간 이후의 예약만 포함
          return reservationTimeInMinutes > currentTimeInMinutes;
        }

        return false;
      } catch (error) {
        console.error('날짜 필터링 오류:', error, reservation);
        return true; // 오류 발생 시 일단 포함
      }
    });

    return NextResponse.json(validReservations);

  } catch (error) {
    console.error('[API ERROR] 상담 예약 목록 조회 실패:', error);
    return NextResponse.json(
      { success: false, message: '상담 예약 목록을 불러오는데 실패했습니다.' },
      { status: 500 }
    );
  }
}
