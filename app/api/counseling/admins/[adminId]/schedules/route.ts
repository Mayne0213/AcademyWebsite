import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/prisma/client';
import { TIME_SLOTS } from '@/src/shared/config';

export async function GET(
  request: NextRequest,
  { params }: { params: { adminId: string } }
) {
  try {
    const adminId = parseInt(params.adminId);
    const { searchParams } = new URL(request.url);
    const endDateParam = searchParams.get('date');

    if (!adminId) {
      return NextResponse.json(
        { error: '유효하지 않은 Admin ID입니다.' },
        { status: 400 }
      );
    }

    // Admin 정보와 스케줄 조회
    const admin = await prisma.admin.findUnique({
      where: { memberId: adminId },
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

    if (!admin) {
      return NextResponse.json(
        { error: 'Admin을 찾을 수 없습니다.' },
        { status: 404 }
      );
    }

    // timeSlot 정보를 포함해서 반환
    const adminWithTimeSlots = {
      ...admin,
      counselingSchedules: admin.counselingSchedules.map(schedule => {
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
    };

    console.log('API Response - Admin:', admin.memberId, 'Schedules count:', admin.counselingSchedules.length);
    return NextResponse.json(adminWithTimeSlots);
  } catch (error) {
    console.error('Failed to fetch admin schedules:', error);
    return NextResponse.json(
      { error: '스케줄을 불러오는데 실패했습니다.' },
      { status: 500 }
    );
  }
} 