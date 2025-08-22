import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(
  request: NextRequest,
  { params }: { params: { examResultId: string } }
) {
  try {
    const examResultId = parseInt(params.examResultId);
    
    if (isNaN(examResultId)) {
      return NextResponse.json({
        success: false,
        message: '유효하지 않은 시험 결과 ID입니다.'
      }, { status: 400 });
    }

    // 문제별 결과 조회
    const questionResults = await prisma.examQuestionResult.findMany({
      where: { examResultId },
      orderBy: { questionNumber: 'asc' }
    });

    return NextResponse.json({
      success: true,
      data: questionResults
    });

  } catch (error) {
    console.error('문제별 결과 조회 오류:', error);
    return NextResponse.json({
      success: false,
      message: '문제별 결과를 불러오는 중 오류가 발생했습니다.'
    }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
