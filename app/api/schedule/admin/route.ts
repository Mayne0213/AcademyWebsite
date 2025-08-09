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
        admin: true,
      },
    });

    return user;
  } catch (error) {
    console.error('Token verification failed:', error);
    return null;
  }
};

// 관리자의 상담 스케줄 목록 조회
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

    // 관리자만 접근 가능
    if (user.role !== 'ADMIN' || !user.admin) {
      return NextResponse.json(
        { error: '관리자만 접근할 수 있습니다.' },
        { status: 403 }
      );
    }

    const { searchParams } = new URL(request.url);
    const date = searchParams.get('date');
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');
    const year = searchParams.get('year');
    const month = searchParams.get('month');

    // 월별 조회를 위한 날짜 범위 계산
    let dateFilter = {};
    if (year && month) {
      const startOfMonth = new Date(parseInt(year), parseInt(month) - 1, 1);
      const endOfMonth = new Date(parseInt(year), parseInt(month), 0, 23, 59, 59, 999);
      dateFilter = {
        date: {
          gte: startOfMonth,
          lte: endOfMonth
        }
      };
    } else if (date) {
      dateFilter = { date: new Date(date) };
    } else if (startDate && endDate) {
      dateFilter = {
        date: {
          gte: new Date(startDate),
          lte: new Date(endDate)
        }
      };
    }

    // 관리자의 상담 스케줄 목록 조회
    const schedules = await prisma.counselingSchedule.findMany({
      where: {
        adminId: user.admin.memberId,
        ...dateFilter
      },
      include: {
        reservations: {
          include: {
            student: {
              select: {
                studentName: true,
                studentPhone: true,
                studentHighschool: true,
                studentBirthYear: true,
                studentMemo: true,
              }
            }
          }
        }
      },
      orderBy: [
        { date: 'asc' },
        { timeSlotId: 'asc' }
      ]
    });

    // timeSlot 정보를 포함해서 반환
    const schedulesWithTimeSlot = schedules.map(schedule => {
      const timeSlotInfo = TIME_SLOTS.find(slot => slot.timeSlotId === schedule.timeSlotId);
      return {
        ...schedule,
        reservations: schedule.reservations || null,
        timeSlot: timeSlotInfo || {
          timeSlotId: schedule.timeSlotId,
          startTime: "00:00",
          endTime: "00:30",
          displayName: `${schedule.timeSlotId}번 시간대`
        }
      };
    });

    return NextResponse.json(schedulesWithTimeSlot);

  } catch (error) {
    console.error('상담 스케줄 목록 조회 실패:', error);
    return NextResponse.json(
      { error: '상담 스케줄 목록을 불러오는데 실패했습니다.' },
      { status: 500 }
    );
  }
}

// 상담 스케줄 추가
export async function POST(request: NextRequest) {
  try {
    // 사용자 인증 확인
    const user = await getUserFromToken(request);
    if (!user) {
      return NextResponse.json(
        { error: '로그인이 필요합니다.' },
        { status: 401 }
      );
    }

    // 관리자만 접근 가능
    if (user.role !== 'ADMIN' || !user.admin) {
      return NextResponse.json(
        { error: '관리자만 접근할 수 있습니다.' },
        { status: 403 }
      );
    }

    const body = await request.json();
    const { date, timeSlotId } = body;

    if (!date || !timeSlotId) {
      return NextResponse.json(
        { error: '날짜와 시간대가 필요합니다.' },
        { status: 400 }
      );
    }

    // 이미 존재하는 스케줄인지 확인
    const existingSchedule = await prisma.counselingSchedule.findFirst({
      where: {
        adminId: user.admin.memberId,
        date: new Date(date),
        timeSlotId
      }
    });

    if (existingSchedule) {
      return NextResponse.json(
        { error: '이미 등록된 스케줄입니다.' },
        { status: 409 }
      );
    }

    // 스케줄 추가
    const schedule = await prisma.counselingSchedule.create({
      data: {
        adminId: user.admin.memberId,
        date: new Date(date),
        timeSlotId,
        isAvailable: true
      }
    });

    // config에서 timeSlot 정보 가져오기
    const timeSlotInfo = TIME_SLOTS.find(slot => slot.timeSlotId === schedule.timeSlotId);
    
    // timeSlot 정보를 포함해서 반환
    const scheduleWithTimeSlot = {
      ...schedule,
      timeSlot: timeSlotInfo || {
        timeSlotId: schedule.timeSlotId,
        startTime: "00:00",
        endTime: "00:30",
        displayName: `${schedule.timeSlotId}번 시간대`
      }
    };

    return NextResponse.json(scheduleWithTimeSlot, { status: 201 });

  } catch (error) {
    console.error('상담 스케줄 추가 실패:', error);
    return NextResponse.json(
      { error: '상담 스케줄 추가에 실패했습니다.' },
      { status: 500 }
    );
  }
}

// 상담 스케줄 삭제
export async function DELETE(request: NextRequest) {
  try {
    // 사용자 인증 확인
    const user = await getUserFromToken(request);
    if (!user) {
      return NextResponse.json(
        { error: '로그인이 필요합니다.' },
        { status: 401 }
      );
    }

    // 관리자만 접근 가능
    if (user.role !== 'ADMIN' || !user.admin) {
      return NextResponse.json(
        { error: '관리자만 접근할 수 있습니다.' },
        { status: 403 }
      );
    }

    const { searchParams } = new URL(request.url);
    const scheduleId = searchParams.get('scheduleId');

    if (!scheduleId) {
      return NextResponse.json(
        { error: '스케줄 ID가 필요합니다.' },
        { status: 400 }
      );
    }

    // 스케줄이 해당 관리자의 것인지 확인
    const schedule = await prisma.counselingSchedule.findFirst({
      where: {
        scheduleId: parseInt(scheduleId),
        adminId: user.admin.memberId
      },
      include: {
        reservations: true
      }
    });

    if (!schedule) {
      return NextResponse.json(
        { error: '해당 스케줄을 찾을 수 없습니다.' },
        { status: 404 }
      );
    }

    // 예약이 있는 경우 삭제 불가 (reservations는 단일 객체)
    if (schedule.reservations) {
      return NextResponse.json(
        { error: '예약이 있는 스케줄은 삭제할 수 없습니다.' },
        { status: 400 }
      );
    }

    // 스케줄 삭제
    await prisma.counselingSchedule.delete({
      where: { scheduleId: parseInt(scheduleId) }
    });

    return NextResponse.json({ message: '스케줄이 삭제되었습니다.' });

  } catch (error) {
    console.error('상담 스케줄 삭제 실패:', error);
    return NextResponse.json(
      { error: '상담 스케줄 삭제에 실패했습니다.' },
      { status: 500 }
    );
  }
}
