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

// 관리자의 상담 예약 목록 조회
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

    // 관리자만 접근 가능
    if (user.role !== 'ADMIN' || !user.admin) {
      return NextResponse.json(
        { success: false, message: '관리자만 접근할 수 있습니다.' },
        { status: 403 }
      );
    }

    // 관리자의 상담 예약 목록 조회
    const reservations = await prisma.counselingReservation.findMany({
      where: {
        adminId: user.admin.memberId
      },
      include: {
        student: {
          select: {
            studentName: true,
            studentPhone: true,
            studentHighschool: true,
          }
        },
        schedule: true
      },
      orderBy: [
        { schedule: { date: 'asc' } },
        { schedule: { timeSlotId: 'asc' } }
      ]
    });

    // timeSlot 정보를 config에서 가져와서 추가
    const reservationsWithTimeSlot = reservations.map(reservation => {
      const timeSlotInfo = TIME_SLOTS.find(slot => slot.timeSlotId === reservation.schedule.timeSlotId);
      return {
        ...reservation,
        schedule: {
          ...reservation.schedule,
          timeSlot: timeSlotInfo || {
            timeSlotId: reservation.schedule.timeSlotId,
            startTime: "00:00",
            endTime: "00:30",
            displayName: `${reservation.schedule.timeSlotId}번 시간대`
          }
        }
      };
    });

    return NextResponse.json(reservationsWithTimeSlot);

  } catch (error) {
    console.error('상담 예약 목록 조회 실패:', error);
    return NextResponse.json(
      { success: false, message: '상담 예약 목록을 불러오는데 실패했습니다.' },
      { status: 500 }
    );
  }
}
