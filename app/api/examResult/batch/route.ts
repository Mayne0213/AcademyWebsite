import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/prisma/client';

export async function POST(request: NextRequest) {
  const startTime = Date.now();
  
  try {
    const body = await request.json();
    const { examId, studentId, omrResults } = body;

    if (!examId || !studentId || !omrResults || !Array.isArray(omrResults)) {
      return NextResponse.json(
        { success: false, message: '필수 데이터가 누락되었습니다' },
        { status: 400 }
      );
    }

    console.log(`배치 저장 시작: 시험 ID ${examId}, 학생 ID ${studentId}, ${omrResults.length}개 결과`);

    // 트랜잭션으로 모든 데이터를 한 번에 처리
    const result = await prisma.$transaction(async (tx) => {
      const savedResults = [];

      for (const omrResult of omrResults) {
        const { totalScore, grade, results: questionResults } = omrResult;

        // 1. ExamResult 생성
        const examResult = await tx.examResult.create({
          data: {
            examId: parseInt(examId),
            studentId: parseInt(studentId),
            totalScore,
            grade,
          },
        });

        // 2. 문제별 결과를 한 번에 생성
        const questionResultData = questionResults.map((q: any) => ({
          examResultId: examResult.examResultId,
          questionNumber: q.questionNumber,
          selectedChoice: q.studentAnswer,
          isCorrect: q.studentAnswer === q.correctAnswer,
          score: q.score,
        }));

        await tx.examQuestionResult.createMany({
          data: questionResultData,
        });

        savedResults.push({
          examResultId: examResult.examResultId,
          totalScore,
          grade,
          questionCount: questionResults.length,
        });
      }

      return savedResults;
    });

    const processingTime = Date.now() - startTime;
    console.log(`배치 저장 완료: ${result.length}개 결과, 처리 시간: ${processingTime}ms`);

    return NextResponse.json({
      success: true,
      data: {
        savedCount: result.length,
        results: result,
        processingTime: `${processingTime}ms`,
      },
    });

  } catch (error) {
    const processingTime = Date.now() - startTime;
    console.error(`배치 OMR 결과 저장 오류 (${processingTime}ms):`, error);
    
    // 더 구체적인 에러 메시지 제공
    let errorMessage = 'OMR 결과 저장 중 오류가 발생했습니다';
    
    if (error instanceof Error) {
      if (error.message.includes('Unique constraint')) {
        errorMessage = '중복된 시험 결과가 있습니다';
      } else if (error.message.includes('Foreign key constraint')) {
        errorMessage = '존재하지 않는 시험이나 학생입니다';
      } else if (error.message.includes('Database connection')) {
        errorMessage = '데이터베이스 연결 오류가 발생했습니다';
      }
    }
    
    return NextResponse.json(
      { 
        success: false, 
        message: errorMessage,
        processingTime: `${processingTime}ms`,
      },
      { status: 500 }
    );
  }
}
