import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/prisma/client';
import { examResultUpdateSchema } from '@/src/entities/examResult/model/validation';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const examResultId = parseInt(params.id);
    
    if (isNaN(examResultId)) {
      return NextResponse.json(
        { success: false, message: '유효하지 않은 시험 결과 ID입니다.' },
        { status: 400 }
      );
    }

    const examResult = await prisma.examResult.findUnique({
      where: { examResultId },
      include: {
        exam: {
          select: {
            examId: true,
            examName: true,
            totalQuestions: true,
          },
        },
        student: {
          select: {
            memberId: true,
            studentName: true,
            studentPhone: true,
          },
        },
        questionResults: true,
      },
    });

    if (!examResult) {
      return NextResponse.json(
        { success: false, message: '시험 결과를 찾을 수 없습니다.' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: examResult,
    });
  } catch (error) {
    console.error('Error fetching exam result:', error);
    return NextResponse.json(
      { success: false, message: '시험 결과 조회 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const examResultId = parseInt(params.id);
    
    if (isNaN(examResultId)) {
      return NextResponse.json(
        { success: false, message: '유효하지 않은 시험 결과 ID입니다.' },
        { status: 400 }
      );
    }

    const body = await request.json();
    const validatedData = examResultUpdateSchema.parse(body);

    const examResult = await prisma.examResult.update({
      where: { examResultId },
      data: validatedData,
      include: {
        exam: {
          select: {
            examId: true,
            examName: true,
            totalQuestions: true,
          },
        },
        student: {
          select: {
            memberId: true,
            studentName: true,
            studentPhone: true,
          },
        },
      },
    });

    return NextResponse.json({
      success: true,
      data: examResult,
    });
  } catch (error) {
    console.error('Error updating exam result:', error);
    return NextResponse.json(
      { success: false, message: '시험 결과 수정 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const examResultId = parseInt(params.id);
    
    if (isNaN(examResultId)) {
      return NextResponse.json(
        { success: false, message: '유효하지 않은 시험 결과 ID입니다.' },
        { status: 400 }
      );
    }

    // 시험 결과 삭제 (관련된 questionResults는 cascade로 자동 삭제됨)
    await prisma.examResult.delete({
      where: { examResultId },
    });

    return NextResponse.json({
      success: true,
      message: '시험 결과가 성공적으로 삭제되었습니다.',
    });
  } catch (error) {
    console.error('Error deleting exam result:', error);
    return NextResponse.json(
      { success: false, message: '시험 결과 삭제 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}
