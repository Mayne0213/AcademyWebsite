import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/prisma/client';
import { examResultQuerySchema } from '@/src/entities/examResult/model/validation';

export async function GET(
  request: NextRequest,
  { params }: { params: { studentId: string } }
) {
  try {
    const studentId = parseInt(params.studentId);
    
    if (isNaN(studentId)) {
      return NextResponse.json(
        { success: false, message: '유효하지 않은 학생 ID입니다.' },
        { status: 400 }
      );
    }

    const { searchParams } = new URL(request.url);
    const query = Object.fromEntries(searchParams.entries());
    
    // 쿼리 파라미터 검증
    const validatedQuery = examResultQuerySchema.parse({
      examId: query.examId ? parseInt(query.examId) : undefined,
      grade: query.grade ? parseInt(query.grade) : undefined,
      page: query.page ? parseInt(query.page) : undefined,
      limit: query.limit ? parseInt(query.limit) : undefined,
      sortBy: query.sortBy,
      sortOrder: query.sortOrder,
    });

    const { examId, grade, page = 1, limit = 10, sortBy = 'createdAt', sortOrder = 'desc' } = validatedQuery;
    
    // 필터링 조건 구성
    const where: any = { studentId };
    if (examId) where.examId = examId;
    if (grade) where.grade = grade;

    // 정렬 조건 구성
    const orderBy: any = {};
    orderBy[sortBy] = sortOrder;

    // 페이지네이션
    const skip = (page - 1) * limit;

    // 학생별 시험 결과 조회
    const [examResults, total] = await Promise.all([
      prisma.examResult.findMany({
        where,
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
        orderBy,
        skip,
        take: limit,
      }),
      prisma.examResult.count({ where }),
    ]);

    return NextResponse.json({
      success: true,
      data: examResults,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Error fetching student exam results:', error);
    return NextResponse.json(
      { success: false, message: '학생별 시험 결과 조회 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}
