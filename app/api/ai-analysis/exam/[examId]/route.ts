import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma/client";

const ANALYSIS_API_URL = process.env.ANALYSIS_API_URL || "https://analysis-svc.kro.kr";

// GET: 저장된 총평 조회
export async function GET(
  req: NextRequest,
  { params }: { params: { examId: string } }
) {
  try {
    const examId = parseInt(params.examId);
    if (isNaN(examId)) {
      return NextResponse.json(
        { success: false, message: "유효하지 않은 시험 ID입니다." },
        { status: 400 }
      );
    }

    const analysis = await prisma.examAIAnalysis.findUnique({
      where: { examId },
    });

    if (!analysis) {
      return NextResponse.json(
        { success: true, data: null },
        { status: 200 }
      );
    }

    return NextResponse.json({ success: true, data: analysis });
  } catch (error) {
    console.error("[AI Analysis] 총평 조회 실패:", error);
    return NextResponse.json(
      { success: false, message: "서버 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}

// POST: Claude로 총평 생성 (upsert)
export async function POST(
  req: NextRequest,
  { params }: { params: { examId: string } }
) {
  try {
    const examId = parseInt(params.examId);
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
        { success: false, message: "존재하지 않는 시험입니다." },
        { status: 404 }
      );
    }

    // 시험 통계 조회
    const examResults = await prisma.examResult.findMany({
      where: { examId },
      include: {
        questionResults: true,
      },
    });

    if (examResults.length === 0) {
      return NextResponse.json(
        { success: false, message: "응시 결과가 없습니다." },
        { status: 400 }
      );
    }

    // 통계 계산
    const scores = examResults.map((r) => r.totalScore);
    const averageScore = scores.reduce((a, b) => a + b, 0) / scores.length;
    const highestScore = Math.max(...scores);
    const lowestScore = Math.min(...scores);

    // 등급 분포
    const gradeCount = new Map<number, number>();
    examResults.forEach((r) => {
      gradeCount.set(r.grade, (gradeCount.get(r.grade) || 0) + 1);
    });
    const gradeDistribution = Array.from(gradeCount.entries()).map(
      ([grade, count]) => ({
        grade,
        count,
        percentage: (count / examResults.length) * 100,
      })
    );

    // 문항별 통계
    const questionTypes =
      typeof exam.questionTypes === "string"
        ? JSON.parse(exam.questionTypes)
        : exam.questionTypes || {};
    const questionScores =
      typeof exam.questionScores === "string"
        ? JSON.parse(exam.questionScores)
        : exam.questionScores || {};

    const questionStatsMap = new Map<
      number,
      { correct: number; total: number }
    >();
    examResults.forEach((r) => {
      r.questionResults.forEach((qr) => {
        const existing = questionStatsMap.get(qr.questionNumber) || {
          correct: 0,
          total: 0,
        };
        existing.total += 1;
        if (qr.isCorrect) existing.correct += 1;
        questionStatsMap.set(qr.questionNumber, existing);
      });
    });

    const questionStatistics = Array.from(questionStatsMap.entries()).map(
      ([qNum, stats]) => ({
        questionNumber: qNum,
        correctRate: stats.total > 0 ? stats.correct / stats.total : 0,
        incorrectRate:
          stats.total > 0 ? (stats.total - stats.correct) / stats.total : 0,
        questionType:
          questionTypes[qNum.toString()] || questionTypes[qNum] || null,
        actualScore:
          questionScores[qNum.toString()] || questionScores[qNum] || 2,
      })
    );

    // analysis-svc 호출
    const apiResponse = await fetch(
      `${ANALYSIS_API_URL}/api/analysis/exam-commentary`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          examName: exam.examName,
          totalParticipants: examResults.length,
          averageScore,
          highestScore,
          lowestScore,
          gradeDistribution,
          questionStatistics,
        }),
      }
    );

    if (!apiResponse.ok) {
      const errorText = await apiResponse.text();
      console.error("[AI Analysis] analysis-svc 오류:", errorText);
      return NextResponse.json(
        { success: false, message: "AI 분석 서비스 오류가 발생했습니다." },
        { status: 502 }
      );
    }

    const { content } = await apiResponse.json();

    // DB에 upsert
    const analysis = await prisma.examAIAnalysis.upsert({
      where: { examId },
      update: {
        content,
        isEdited: false,
        generatedAt: new Date(),
        editedAt: null,
      },
      create: {
        examId,
        content,
      },
    });

    return NextResponse.json({ success: true, data: analysis });
  } catch (error) {
    console.error("[AI Analysis] 총평 생성 실패:", error);
    return NextResponse.json(
      { success: false, message: "서버 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}

// PUT: 총평 수동 편집 저장
export async function PUT(
  req: NextRequest,
  { params }: { params: { examId: string } }
) {
  try {
    const examId = parseInt(params.examId);
    if (isNaN(examId)) {
      return NextResponse.json(
        { success: false, message: "유효하지 않은 시험 ID입니다." },
        { status: 400 }
      );
    }

    const body = await req.json();
    const { content } = body;

    if (!content || typeof content !== "string") {
      return NextResponse.json(
        { success: false, message: "내용이 필요합니다." },
        { status: 400 }
      );
    }

    const analysis = await prisma.examAIAnalysis.update({
      where: { examId },
      data: {
        content,
        isEdited: true,
        editedAt: new Date(),
      },
    });

    return NextResponse.json({ success: true, data: analysis });
  } catch (error) {
    console.error("[AI Analysis] 총평 수정 실패:", error);
    return NextResponse.json(
      { success: false, message: "서버 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
