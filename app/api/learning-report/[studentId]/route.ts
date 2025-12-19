import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/prisma/client';

export async function GET(
  request: NextRequest,
  { params }: { params: { studentId: string } }
) {
  try {
    const studentId = parseInt(params.studentId);
    
    if (isNaN(studentId)) {
      return NextResponse.json({
        success: false,
        message: '유효하지 않은 학생 ID입니다.'
      }, { status: 400 });
    }

    // 학생 정보 조회
    const student = await prisma.user.findUnique({
      where: { memberId: studentId },
      include: {
        student: {
          include: {
            academy: true
          }
        }
      }
    });

    if (!student || !student.student) {
      return NextResponse.json({
        success: false,
        message: '학생을 찾을 수 없습니다.'
      }, { status: 404 });
    }

    // 학생의 시험 결과 조회
    const examResults = await prisma.examResult.findMany({
      where: { studentId },
      include: {
        exam: {
          select: {
            examId: true,
            examName: true,
            totalQuestions: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    // 시험 이력 데이터 구성
    const examHistory = examResults.map(result => ({
      examId: result.exam.examId,
      examName: result.exam.examName,
      examDate: result.createdAt, // examDate 대신 createdAt 사용
      totalScore: result.totalScore,
      grade: result.grade,
      examResultId: result.examResultId
    }));

    // 통계 계산
    const totalExams = examResults.length;
    const averageScore = totalExams > 0 
      ? examResults.reduce((sum, result) => sum + result.totalScore, 0) / totalExams 
      : 0;
    const averageGrade = totalExams > 0 
      ? examResults.reduce((sum, result) => sum + result.grade, 0) / totalExams 
      : 0;
    const highestScore = totalExams > 0 
      ? Math.max(...examResults.map(result => result.totalScore))
      : 0;
    const lowestScore = totalExams > 0 
      ? Math.min(...examResults.map(result => result.totalScore))
      : 0;

    // 향상도 계산 (최근 2개 시험 비교)
    let improvementTrend: 'improving' | 'declining' | 'stable' = 'stable';
    if (examResults.length >= 2) {
      const recentScores = examResults.slice(0, 2).map(result => result.totalScore);
      if (recentScores[0] > recentScores[1]) {
        improvementTrend = 'improving';
      } else if (recentScores[0] < recentScores[1]) {
        improvementTrend = 'declining';
      }
    }

    // 학생 정보 구성
    const studentData = {
      memberId: student.memberId,
      studentName: student.student.studentName,
      studentPhone: student.student.studentPhone,
      studentHighschool: student.student.studentHighschool,
      studentBirthYear: student.student.studentBirthYear,
      studentMemo: student.student.studentMemo,
      academy: student.student.academy
    };

    const learningReport = {
      student: studentData,
      examHistory,
      totalExams,
      averageScore,
      averageGrade,
      highestScore,
      lowestScore,
      improvementTrend,
      lastExamDate: examResults.length > 0 ? examResults[0].createdAt : undefined,
      firstExamDate: examResults.length > 0 ? examResults[examResults.length - 1].createdAt : undefined
    };

    return NextResponse.json({
      success: true,
      data: learningReport
    });

  } catch (error) {
    console.error('학습 리포트 조회 오류:', error);
    return NextResponse.json({
      success: false,
      message: '학습 리포트를 불러오는 중 오류가 발생했습니다.'
    }, { status: 500 });
  }
}
