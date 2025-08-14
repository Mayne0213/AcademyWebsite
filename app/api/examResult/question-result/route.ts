import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/prisma/client';
import { examQuestionResultCreateSchema } from '@/src/entities/examResult/model/validation';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // 요청 데이터 검증
    const validatedData = examQuestionResultCreateSchema.parse(body);
    
    // 문제별 결과 생성
    const questionResult = await prisma.examQuestionResult.create({
      data: validatedData,
    });

    return NextResponse.json({
      success: true,
      data: questionResult,
    });
  } catch (error) {
    console.error('Error creating question result:', error);
    return NextResponse.json(
      { success: false, message: '문제별 결과 생성 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}
