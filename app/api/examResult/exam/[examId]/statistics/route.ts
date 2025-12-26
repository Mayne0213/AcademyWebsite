import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma/client";

export async function GET(
  request: NextRequest,
  { params }: { params: { examId: string } }
) {
  try {
    const examId = parseInt(params.examId);
    const { searchParams } = new URL(request.url);
    const academyId = searchParams.get('academyId');
    const activeStatus = searchParams.get('activeStatus') || 'active'; // 기본값: active (재원생)

    if (isNaN(examId)) {
      return NextResponse.json(
        { success: false, message: "유효하지 않은 시험 ID입니다." },
        { status: 400 }
      );
    }

    // 시험 정보 조회
    const exam = await prisma.exam.findUnique({
      where: { examId },
      select: {
        examId: true,
        examName: true,
        totalQuestions: true,
        questionTypes: true,
        questionScores: true,
      },
    });

    if (!exam) {
      return NextResponse.json(
        { success: false, message: "시험을 찾을 수 없습니다." },
        { status: 404 }
      );
    }

    // 해당 시험의 결과 조회 (학원 필터링 적용, 활성 상태 필터링)
    const whereClause: any = {
      examId,
      student: {
        ...(activeStatus === 'active' && { isActive: true }),
        ...(activeStatus === 'inactive' && { isActive: false }),
        // activeStatus === 'all'이면 isActive 조건 없음
        ...(academyId && {
          academyId: parseInt(academyId)
        })
      }
    };

    const examResults = await prisma.examResult.findMany({
      where: whereClause,
      include: {
        questionResults: true,
        student: {
          select: {
            studentName: true,
            academyId: true,
          },
        },
      },
    });

    if (examResults.length === 0) {
      // 응시자가 없는 경우 기본 통계 반환
      const defaultStatistics = {
        examId: exam.examId,
        examName: exam.examName,
        totalQuestions: exam.totalQuestions,
        totalParticipants: 0,
        averageScore: 0,
        averageGrade: 0,
        highestScore: 0,
        lowestScore: 0,
        questionStatistics: [],
        overallCorrectRate: 0,
        overallIncorrectRate: 0,
        gradeDistribution: [
          { grade: 1, count: 0, percentage: 0 },
          { grade: 2, count: 0, percentage: 0 },
          { grade: 3, count: 0, percentage: 0 },
          { grade: 4, count: 0, percentage: 0 },
          { grade: 5, count: 0, percentage: 0 },
          { grade: 6, count: 0, percentage: 0 },
          { grade: 7, count: 0, percentage: 0 },
          { grade: 8, count: 0, percentage: 0 },
          { grade: 9, count: 0, percentage: 0 }
        ],
      };

      return NextResponse.json({ success: true, data: defaultStatistics });
    }

    // 전체 통계 계산
    const totalParticipants = examResults.length;
    const totalScore = examResults.reduce((sum, result) => sum + result.totalScore, 0);
    const averageScore = totalScore / totalParticipants;
    const scores = examResults.map(result => result.totalScore);
    const highestScore = Math.max(...scores);
    const lowestScore = Math.min(...scores);

    // 문제별 통계 계산
    const questionStats = new Map<number, {
      totalAttempts: number;
      correctAnswers: number;
      incorrectAnswers: number;
      totalScore: number;
      choiceStats: Map<string, { count: number; isCorrect: boolean }>;
    }>();

    // 문제별 통계 초기화
    for (let i = 1; i <= exam.totalQuestions; i++) {
      questionStats.set(i, {
        totalAttempts: 0,
        correctAnswers: 0,
        incorrectAnswers: 0,
        totalScore: 0,
        choiceStats: new Map(),
      });
    }

    // 각 결과에서 문제별 통계 집계
    examResults.forEach(result => {
      result.questionResults.forEach(questionResult => {
        const questionNumber = questionResult.questionNumber;
        const stats = questionStats.get(questionNumber);
        
        if (stats) {
          stats.totalAttempts++;
          if (questionResult.isCorrect) {
            stats.correctAnswers++;
          } else {
            stats.incorrectAnswers++;
          }
          stats.totalScore += questionResult.score;
          
          // 선지별 통계 집계 (selectedChoice가 없는 경우 기본값 사용)
          const choice = questionResult.selectedChoice || 'N/A';
          const choiceStat = stats.choiceStats.get(choice) || { count: 0, isCorrect: false };
          choiceStat.count++;
          choiceStat.isCorrect = questionResult.isCorrect;
          stats.choiceStats.set(choice, choiceStat);
        }
      });
    });

    // 문제별 통계 배열 생성
    const questionStatistics = Array.from(questionStats.entries()).map(([questionNumber, stats]) => {
      const questionType = exam.questionTypes as any;
      const questionTypeStr = questionType?.[questionNumber - 1] || "객관식";
      
      // 실제 배점 가져오기
      const questionScores = exam.questionScores as number[];
      const actualScore = questionScores?.[questionNumber] || 0;
      
      // 선지별 통계 생성
      const choiceStatistics = Array.from(stats.choiceStats.entries()).map(([choice, choiceStat]) => ({
        choice,
        selectedCount: choiceStat.count,
        selectionRate: stats.totalAttempts > 0 ? choiceStat.count / stats.totalAttempts : 0,
        isCorrect: choiceStat.isCorrect,
      }));
      
      return {
        questionNumber,
        totalAttempts: stats.totalAttempts,
        correctAnswers: stats.correctAnswers,
        incorrectAnswers: stats.incorrectAnswers,
        correctRate: stats.totalAttempts > 0 ? stats.correctAnswers / stats.totalAttempts : 0,
        incorrectRate: stats.totalAttempts > 0 ? stats.incorrectAnswers / stats.totalAttempts : 0,
        averageScore: stats.totalAttempts > 0 ? stats.totalScore / stats.totalAttempts : 0,
        actualScore: actualScore, // 실제 배점 추가
        questionType: questionTypeStr,
        choiceStatistics,
      };
    });

    // 전체 정답률/오답률 계산
    const totalQuestionsAnswered = questionStatistics.reduce((sum, q) => sum + q.totalAttempts, 0);
    const totalCorrectAnswers = questionStatistics.reduce((sum, q) => sum + q.correctAnswers, 0);
    const totalIncorrectAnswers = questionStatistics.reduce((sum, q) => sum + q.incorrectAnswers, 0);

    const overallCorrectRate = totalQuestionsAnswered > 0 ? totalCorrectAnswers / totalQuestionsAnswered : 0;
    const overallIncorrectRate = totalQuestionsAnswered > 0 ? totalIncorrectAnswers / totalQuestionsAnswered : 0;

    // 평균 등급 계산 (실제 데이터베이스의 등급 사용)
    const grades = examResults.map(result => result.grade);
    const averageGrade = grades.length > 0 ? 
      Math.round(grades.reduce((sum, grade) => sum + grade, 0) / grades.length * 10) / 10 : 0;

    // 등급별 학생 분포 계산 (9등급까지)
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
      grade,
      count,
      percentage: totalParticipants > 0 ? Math.round((count / totalParticipants) * 1000) / 10 : 0
    }));

    const statistics = {
      examId: exam.examId,
      examName: exam.examName,
      totalQuestions: exam.totalQuestions,
      totalParticipants,
      averageScore: Math.round(averageScore * 10) / 10, // 소수점 첫째자리까지
      averageGrade,
      highestScore,
      lowestScore,
      questionStatistics,
      overallCorrectRate: Math.round(overallCorrectRate * 1000) / 1000, // 소수점 셋째자리까지
      overallIncorrectRate: Math.round(overallIncorrectRate * 1000) / 1000,
      gradeDistribution: gradeDistributionArray,
    };

    return NextResponse.json({ success: true, data: statistics });
    // return NextResponse.json(statistics);

  } catch (error) {
    return NextResponse.json(
      { success: false, message: "시험 통계 조회에 실패했습니다." },
      { status: 500 }
    );
  }
}
