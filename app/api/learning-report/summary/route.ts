import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');
    const minGrade = searchParams.get('minGrade');
    const maxGrade = searchParams.get('maxGrade');
    const minScore = searchParams.get('minScore');
    const maxScore = searchParams.get('maxScore');

    // 필터 조건 구성
    const whereClause: any = {};
    
    if (startDate && endDate) {
      whereClause.createdAt = {
        gte: new Date(startDate),
        lte: new Date(endDate)
      };
    }

    if (minGrade || maxGrade) {
      whereClause.grade = {};
      if (minGrade) whereClause.grade.gte = parseInt(minGrade);
      if (maxGrade) whereClause.grade.lte = parseInt(maxGrade);
    }

    if (minScore || maxScore) {
      whereClause.totalScore = {};
      if (minScore) whereClause.totalScore.gte = parseInt(minScore);
      if (maxScore) whereClause.totalScore.lte = parseInt(maxScore);
    }

    // 전체 학생 수 조회
    const totalStudents = await prisma.student.count();

    // 전체 시험 결과 조회
    const examResults = await prisma.examResult.findMany({
      where: whereClause,
      include: {
        exam: {
          select: {
            examId: true,
            examName: true,
            totalQuestions: true
          }
        },
        student: {
          select: {
            memberId: true,
            studentName: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    // 통계 계산
    const totalExams = examResults.length;
    const averageScore = totalExams > 0 
      ? examResults.reduce((sum, result) => sum + result.totalScore, 0) / totalExams 
      : 0;
    const averageGrade = totalExams > 0 
      ? examResults.reduce((sum, result) => sum + result.grade, 0) / totalExams 
      : 0;

    // 학생별 평균 점수 계산
    const studentScores = new Map<number, { totalScore: number; count: number; name: string }>();
    
    examResults.forEach(result => {
      const studentId = result.student.memberId;
      const existing = studentScores.get(studentId);
      
      if (existing) {
        existing.totalScore += result.totalScore;
        existing.count += 1;
      } else {
        studentScores.set(studentId, {
          totalScore: result.totalScore,
          count: 1,
          name: result.student.studentName
        });
      }
    });

    // 상위 성과자 정렬
    const topPerformers = Array.from(studentScores.entries())
      .map(([studentId, data]) => ({
        studentId,
        studentName: data.name,
        averageScore: data.totalScore / data.count,
        totalExams: data.count
      }))
      .sort((a, b) => b.averageScore - a.averageScore)
      .slice(0, 10);

    // 최근 시험 정보
    const recentExams = examResults
      .reduce((acc, result) => {
        const existing = acc.find(exam => exam.examId === result.exam.examId);
        if (existing) {
          existing.totalParticipants += 1;
          existing.totalScore += result.totalScore;
        } else {
          acc.push({
            examId: result.exam.examId,
            examName: result.exam.examName,
            examDate: result.createdAt,
            totalParticipants: 1,
            totalScore: result.totalScore
          });
        }
        return acc;
      }, [] as Array<{
        examId: number;
        examName: string;
        examDate: Date;
        totalParticipants: number;
        totalScore: number;
      }>)
      .map(exam => ({
        ...exam,
        averageScore: exam.totalScore / exam.totalParticipants
      }))
      .sort((a, b) => b.examDate.getTime() - a.examDate.getTime())
      .slice(0, 5);

    const summary = {
      totalStudents,
      totalExams,
      averageScore,
      averageGrade,
      topPerformers,
      recentExams
    };

    return NextResponse.json({
      success: true,
      data: summary
    });

  } catch (error) {
    console.error('학습 리포트 요약 조회 오류:', error);
    return NextResponse.json({
      success: false,
      message: '학습 리포트 요약을 불러오는 중 오류가 발생했습니다.'
    }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
