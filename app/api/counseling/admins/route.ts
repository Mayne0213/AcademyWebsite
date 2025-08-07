import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/prisma/client';
import { TIME_SLOTS } from '@/src/shared/config';

export async function GET(request: NextRequest) {
  try {
    // 상담 가능한 Admin 목록 조회
    const admins = await prisma.admin.findMany({
      select: {
        memberId: true,
        adminName: true,
        adminPosition: true,
        adminPhone: true,
        counselingSchedules: {
          where: {
            isAvailable: true,
            date: {
              gte: new Date() // 오늘 이후의 스케줄만
            }
          },
          orderBy: [
            { date: 'asc' },
            { timeSlotId: 'asc' }
          ]
        }
      }
    });

    // timeSlot 정보를 포함해서 반환
    const availableAdmins = admins.map(admin => ({
      memberId: admin.memberId,
      adminName: admin.adminName,
      adminPosition: admin.adminPosition,
      adminPhone: admin.adminPhone,
      schedules: admin.counselingSchedules.map(schedule => {
        const timeSlotInfo = TIME_SLOTS.find(slot => slot.timeSlotId === schedule.timeSlotId);
        return {
          ...schedule,
          timeSlot: timeSlotInfo || {
            timeSlotId: schedule.timeSlotId,
            startTime: "00:00",
            endTime: "00:30",
            displayName: `${schedule.timeSlotId}번 시간대`
          }
        };
      })
    }));

    return NextResponse.json(availableAdmins);
  } catch (error) {
    console.error('Failed to fetch admins:', error);
    return NextResponse.json(
      { error: '상담사 목록을 불러오는데 실패했습니다.' },
      { status: 500 }
    );
  }
} 