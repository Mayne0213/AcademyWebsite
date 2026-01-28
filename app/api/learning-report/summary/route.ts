import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/prisma/client';
import { ExamCategory } from '@prisma/client';

// Route 캐싱 비활성화 (동적 데이터)
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');
    const minGrade = searchParams.get('minGrade');
    const maxGrade = searchParams.get('maxGrade');
    const minScore = searchParams.get('minScore');
    const maxScore = searchParams.get('maxScore');
    const category = searchParams.get('category') as ExamCategory | null; // 시험 카테고리 필터

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

    // 카테고리 필터 조건 (exam relation에 적용)
    if (category) {
      whereClause.exam = {
        examCategory: category
      };
    }

    // 전체 학생 수 조회 (활성/비활성 모두 포함, 클라이언트에서 필터링)
    const totalStudents = await prisma.student.count();

    // 전체 시험 수 조회 (카테고리 필터 적용)
    const examWhereClause = category ? { examCategory: category } : {};
    const totalExams = await prisma.exam.count({ where: examWhereClause });

    // 전체 학생 목록 조회 (등록년도 및 활성화 상태 포함)
    const allStudentsList = await prisma.student.findMany({
      select: {
        memberId: true,
        studentName: true,
        isActive: true,
      }
    });

    // 전체 시험 결과 조회 (카테고리 필터 적용)
    const examResults = await prisma.examResult.findMany({
      where: whereClause,
      include: {
        exam: {
          select: {
            examId: true,
            examName: true,
            examCategory: true,
            totalQuestions: true,
            passScore: true
          }
        },
        student: {
          select: {
            memberId: true,
            studentName: true,
            isActive: true,
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    // 클라이언트 필터링을 위한 시험 결과 데이터
    const examResultsForFilter = examResults.map(result => ({
      examResultId: result.examResultId,
      studentId: result.student.memberId,
      studentIsActive: result.student.isActive,
      examId: result.exam.examId,
      examName: result.exam.examName,
      examCategory: result.exam.examCategory,
      examDate: result.createdAt.toISOString(),
      totalScore: result.totalScore,
      grade: result.grade
    }));

    // 통계 계산
    const totalExamResults = examResults.length;
    const averageScore = totalExamResults > 0
      ? examResults.reduce((sum, result) => sum + result.totalScore, 0) / totalExamResults
      : 0;
    const averageGrade = totalExamResults > 0
      ? examResults.reduce((sum, result) => sum + result.grade, 0) / totalExamResults
      : 0;

    // 학생별 평균 점수 계산
    const studentScores = new Map<number, { totalScore: number; totalGrade: number; count: number; name: string }>();

    examResults.forEach(result => {
      const studentId = result.student.memberId;
      const existing = studentScores.get(studentId);

      if (existing) {
        existing.totalScore += result.totalScore;
        existing.totalGrade += result.grade;
        existing.count += 1;
      } else {
        studentScores.set(studentId, {
          totalScore: result.totalScore,
          totalGrade: result.grade,
          count: 1,
          name: result.student.studentName,
        });
      }
    });

    // 상위 성과자 정렬
    const topPerformers = Array.from(studentScores.entries())
      .map(([studentId, data]) => ({
        studentId,
        studentName: data.name,
        averageScore: data.totalScore / data.count,
        averageGrade: data.totalGrade / data.count,
        totalExams: data.count,
      }))
      .sort((a, b) => b.averageScore - a.averageScore)
      .slice(0, 20);

    // 최근 시험 정보
    const recentExams = examResults
      .reduce((acc, result) => {
        const existing = acc.find(exam => exam.examId === result.exam.examId);
        if (existing) {
          existing.totalParticipants += 1;
          existing.totalScore += result.totalScore;
          existing.totalGrade += result.grade;
        } else {
          acc.push({
            examId: result.exam.examId,
            examName: result.exam.examName,
            examDate: result.createdAt,
            totalParticipants: 1,
            totalScore: result.totalScore,
            totalGrade: result.grade
          });
        }
        return acc;
      }, [] as Array<{
        examId: number;
        examName: string;
        examDate: Date;
        totalParticipants: number;
        totalScore: number;
        totalGrade: number;
      }>)
      .map(exam => ({
        ...exam,
        averageScore: exam.totalScore / exam.totalParticipants,
        averageGrade: exam.totalGrade / exam.totalParticipants
      }))
      .sort((a, b) => b.examDate.getTime() - a.examDate.getTime())
      .slice(0, 5);

    // 등급별 분포 계산 (막대그래프용 - 9등급까지 세분화)
    const gradeDistribution = new Map<number, number>();
    for (let i = 1; i <= 9; i++) {
      gradeDistribution.set(i, 0);
    }

    examResults.forEach(result => {
      const grade = result.grade;
      if (grade >= 1 && grade <= 9) {
        gradeDistribution.set(grade, (gradeDistribution.get(grade) || 0) + 1);
      }
    });

    const gradeDistributionArray = Array.from(gradeDistribution.entries()).map(([grade, count]) => ({
      grade: `${grade}등급`,
      count,
      percentage: totalExamResults > 0 ? Math.round((count / totalExamResults) * 1000) / 10 : 0
    }));

    // 파이차트용 등급별 분포 계산 (5~9등급은 '5등급 이하'로 묶음)
    const pieGradeDistribution = new Map<number, number>();
    for (let i = 1; i <= 4; i++) {
      pieGradeDistribution.set(i, 0);
    }
    pieGradeDistribution.set(5, 0); // 5등급 이하

    examResults.forEach(result => {
      const grade = result.grade;
      if (grade >= 1 && grade <= 4) {
        pieGradeDistribution.set(grade, (pieGradeDistribution.get(grade) || 0) + 1);
      } else if (grade >= 5 && grade <= 9) {
        // 5~9등급은 모두 5등급 이하로 묶음
        pieGradeDistribution.set(5, (pieGradeDistribution.get(5) || 0) + 1);
      }
    });

    const pieGradeDistributionArray = Array.from(pieGradeDistribution.entries()).map(([grade, count]) => ({
      grade: grade === 5 ? '5등급 이하' : `${grade}등급`,
      count,
      percentage: totalExamResults > 0 ? Math.round((count / totalExamResults) * 1000) / 10 : 0
    }));

    // P/NP 시험용 Pass/Fail 분포 계산
    let passCount = 0;
    let failCount = 0;
    const failedStudentsList: Array<{ studentId: number; studentName: string; score: number; passScore: number }> = [];

    examResults.forEach(result => {
      const passScore = result.exam.passScore;
      if (passScore !== null && passScore !== undefined) {
        if (result.totalScore >= passScore) {
          passCount++;
        } else {
          failCount++;
          failedStudentsList.push({
            studentId: result.student.memberId,
            studentName: result.student.studentName,
            score: result.totalScore,
            passScore: passScore
          });
        }
      }
    });

    const passFailDistribution = [
      { status: 'Pass', count: passCount, percentage: totalExamResults > 0 ? Math.round((passCount / totalExamResults) * 1000) / 10 : 0 },
      { status: 'Fail', count: failCount, percentage: totalExamResults > 0 ? Math.round((failCount / totalExamResults) * 1000) / 10 : 0 }
    ];

    // 학생별 연속 불합격 현황 계산
    const studentResultsMap = new Map<number, { name: string; results: { examName: string; passed: boolean; date: Date }[] }>();

    examResults.forEach(result => {
      const passScore = result.exam.passScore;
      if (passScore === null || passScore === undefined) return;

      const studentId = result.student.memberId;
      const passed = result.totalScore >= passScore;

      if (!studentResultsMap.has(studentId)) {
        studentResultsMap.set(studentId, {
          name: result.student.studentName,
          results: []
        });
      }

      studentResultsMap.get(studentId)!.results.push({
        examName: result.exam.examName,
        passed,
        date: result.createdAt
      });
    });

    // 연속 불합격 횟수 계산
    const consecutiveFailStudents: Array<{ studentId: number; studentName: string; consecutiveFails: number; lastExams: string[] }> = [];

    studentResultsMap.forEach((data, studentId) => {
      // 날짜순 정렬 (최신순)
      const sortedResults = data.results.sort((a, b) => b.date.getTime() - a.date.getTime());

      let consecutiveFails = 0;
      const failedExams: string[] = [];

      for (const result of sortedResults) {
        if (!result.passed) {
          consecutiveFails++;
          failedExams.push(result.examName);
        } else {
          break; // 합격하면 연속 불합격 끊김
        }
      }

      if (consecutiveFails >= 2) {
        consecutiveFailStudents.push({
          studentId,
          studentName: data.name,
          consecutiveFails,
          lastExams: failedExams.slice(0, 3) // 최근 3개만
        });
      }
    });

    // 연속 불합격 횟수로 정렬
    consecutiveFailStudents.sort((a, b) => b.consecutiveFails - a.consecutiveFails);

    // 최근 학생 등록 (최근 가입자 기준)
    const recentStudents = await prisma.student.findMany({
      where: {
        memberId: {
          gte: 1 // 최근 학생들을 찾기 위한 임시 조건
        }
      },
      select: {
        memberId: true,
        studentName: true,
        user: { select: { createdAt: true } }
      },
      orderBy: {
        user: {
          createdAt: 'desc'
        }
      },
      take: 5
    });

    // 최근 공지사항
    const recentAnnouncements = await prisma.announcement.findMany({
      orderBy: { createdAt: 'desc' },
      take: 5,
      select: {
        announcementId: true,
        announcementTitle: true,
        createdAt: true
      }
    });


    // 부진 학생 찾기 (평균 점수가 전체 평균의 70% 이하인 학생들)
    const strugglingStudents = topPerformers.filter(student =>
      student.averageScore < (averageScore * 0.7)
    ).slice(0, 5);

    // 관리 대상 학생 (하위 20명)
    const managedStudents = Array.from(studentScores.entries())
      .map(([studentId, data]) => ({
        studentId,
        studentName: data.name,
        averageScore: data.totalScore / data.count,
        averageGrade: data.totalGrade / data.count,
        totalExams: data.count,
      }))
      .sort((a, b) => a.averageScore - b.averageScore)
      .slice(0, 20);

    // 전체 학생 목록 (등록년도 포함)
    const allStudents = allStudentsList.map(student => ({
      studentId: student.memberId,
      studentName: student.studentName,
      isActive: student.isActive
    }));

    const summary = {
      totalStudents,
      totalExams,
      averageScore,
      averageGrade,
      topPerformers,
      recentExams,
      gradeDistribution: gradeDistributionArray,
      pieGradeDistribution: pieGradeDistributionArray,
      // 최근 활동
      recentActivity: {
        recentStudents: recentStudents.map(s => ({
          studentId: s.memberId,
          studentName: s.studentName,
          joinedAt: s.user.createdAt.toISOString() // 표시용 가입일
        })),
        recentAnnouncements: recentAnnouncements.map(a => ({
          announcementId: a.announcementId,
          title: a.announcementTitle,
          createdAt: a.createdAt
        }))
      },
      // 부진 학생
      strugglingStudents,
      // 관리 대상 학생
      managedStudents,
      // 전체 학생 목록
      allStudents,
      // 클라이언트 필터링용 시험 결과
      examResultsForFilter,
      // P/NP 시험용 Pass/Fail 분포
      passFailDistribution,
      failedStudents: failedStudentsList.slice(0, 20), // 상위 20명만
      consecutiveFailStudents: consecutiveFailStudents.slice(0, 10) // 상위 10명
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
  }
}
