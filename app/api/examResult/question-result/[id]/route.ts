import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/prisma/client';
import { examQuestionResultUpdateSchema } from '@/src/entities/examResult/model/validation';

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    
    if (isNaN(id)) {
      return NextResponse.json(
        { success: false, message: '유효하지 않은 문제 결과 ID입니다.' },
        { status: 400 }
      );
    }

    const body = await request.json();
    const validatedData = examQuestionResultUpdateSchema.parse(body);

    const questionResult = await prisma.examQuestionResult.update({
      where: { id },
      data: validatedData,
    });

    return NextResponse.json({
      success: true,
      data: questionResult,
    });
  } catch (error) {
    console.error('Error updating question result:', error);
    return NextResponse.json(
      { success: false, message: '문제별 결과 수정 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    
    if (isNaN(id)) {
      return NextResponse.json(
        { success: false, message: '유효하지 않은 문제 결과 ID입니다.' },
        { status: 400 }
      );
    }

    await prisma.examQuestionResult.delete({
      where: { id },
    });

    return NextResponse.json({
      success: true,
      message: '문제별 결과가 성공적으로 삭제되었습니다.',
    });
  } catch (error) {
    console.error('Error deleting question result:', error);
    return NextResponse.json(
      { success: false, message: '문제별 결과 삭제 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}
