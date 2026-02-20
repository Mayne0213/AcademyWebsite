import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma/client";

const ANALYSIS_API_URL = process.env.ANALYSIS_API_URL || "https://analysis-svc.kro.kr";

// GET: 저장된 개인별 피드백 조회
export async function GET(
  req: NextRequest,
  { params }: { params: { examResultId: string } }
) {
  try {
    const examResultId = parseInt(params.examResultId);
    if (isNaN(examResultId)) {
      return NextResponse.json(
        { success: false, message: "유효하지 않은 시험 결과 ID입니다." },
        { status: 400 }
      );
    }

    const feedback = await prisma.studentAIFeedback.findUnique({
      where: { examResultId },
    });

    if (!feedback) {
      return NextResponse.json(
        { success: true, data: null },
        { status: 200 }
      );
    }

    return NextResponse.json({ success: true, data: feedback });
  } catch (error) {
    console.error("[AI Analysis] 피드백 조회 실패:", error);
    return NextResponse.json(
      { success: false, message: "서버 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}

// POST: Claude로 개인별 피드백 생성 (upsert)
export async function POST(
  req: NextRequest,
  { params }: { params: { examResultId: string } }
) {
  try {
    const examResultId = parseInt(params.examResultId);
    if (isNaN(examResultId)) {
      return NextResponse.json(
        { success: false, message: "유효하지 않은 시험 결과 ID입니다." },
        { status: 400 }
      );
    }

    // 시험 결과 + 문제별 결과 + 시험 정보 조회
    const examResult = await prisma.examResult.findUnique({
      where: { examResultId },
      include: {
        questionResults: true,
        exam: {
          select: {
            examId: true,
            examName: true,
            correctAnswers: true,
            questionTypes: true,
            questionScores: true,
          },
        },
        student: {
          select: { studentName: true },
        },
      },
    });

    if (!examResult) {
      return NextResponse.json(
        { success: false, message: "존재하지 않는 시험 결과입니다." },
        { status: 404 }
      );
    }

    // 전체 시험 통계 조회 (평균, 문항별 정답률)
    const allResults = await prisma.examResult.findMany({
      where: { examId: examResult.examId },
      include: { questionResults: true },
    });

    const scores = allResults.map((r) => r.totalScore);
    const averageScore = scores.reduce((a, b) => a + b, 0) / scores.length;

    // 문항별 전체 정답률 계산
    const questionCorrectRateMap = new Map<number, { correct: number; total: number }>();
    allResults.forEach((r) => {
      r.questionResults.forEach((qr) => {
        const existing = questionCorrectRateMap.get(qr.questionNumber) || { correct: 0, total: 0 };
        existing.total += 1;
        if (qr.isCorrect) existing.correct += 1;
        questionCorrectRateMap.set(qr.questionNumber, existing);
      });
    });

    const correctAnswers =
      typeof examResult.exam.correctAnswers === "string"
        ? JSON.parse(examResult.exam.correctAnswers)
        : examResult.exam.correctAnswers || {};

    const questionTypes =
      typeof examResult.exam.questionTypes === "string"
        ? JSON.parse(examResult.exam.questionTypes)
        : examResult.exam.questionTypes || {};

    // 오답 문항 분류
    const incorrectQuestions = examResult.questionResults
      .filter((qr) => !qr.isCorrect)
      .map((qr) => {
        const stats = questionCorrectRateMap.get(qr.questionNumber);
        const correctRate = stats && stats.total > 0 ? (stats.correct / stats.total) * 100 : 0;
        return {
          questionNumber: qr.questionNumber,
          questionType: questionTypes[qr.questionNumber.toString()] || questionTypes[qr.questionNumber] || "기타",
          selectedChoice: qr.selectedChoice || "무효",
          correctAnswer: correctAnswers[qr.questionNumber.toString()] || correctAnswers[qr.questionNumber] || "N/A",
          questionCorrectRate: correctRate,
        };
      })
      .sort((a, b) => a.questionNumber - b.questionNumber);

    // 유형별 성취도
    const typeAchMap = new Map<string, { correct: number; total: number }>();
    examResult.questionResults.forEach((qr) => {
      const qtype = questionTypes[qr.questionNumber.toString()] || questionTypes[qr.questionNumber] || "기타";
      const existing = typeAchMap.get(qtype) || { correct: 0, total: 0 };
      existing.total += 1;
      if (qr.isCorrect) existing.correct += 1;
      typeAchMap.set(qtype, existing);
    });

    const questionTypeAchievement = Array.from(typeAchMap.entries()).map(
      ([type, stats]) => ({
        type,
        correctCount: stats.correct,
        totalCount: stats.total,
        correctRate: stats.total > 0 ? (stats.correct / stats.total) * 100 : 0,
      })
    );

    // analysis-svc 호출
    const apiResponse = await fetch(
      `${ANALYSIS_API_URL}/api/analysis/student-feedback`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          examName: examResult.exam.examName,
          studentName: examResult.student?.studentName || "학생",
          totalScore: examResult.totalScore,
          grade: examResult.grade,
          averageScore,
          incorrectQuestions,
          questionTypeAchievement,
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
    const feedback = await prisma.studentAIFeedback.upsert({
      where: { examResultId },
      update: {
        content,
        isEdited: false,
        generatedAt: new Date(),
        editedAt: null,
      },
      create: {
        examResultId,
        content,
      },
    });

    return NextResponse.json({ success: true, data: feedback });
  } catch (error) {
    console.error("[AI Analysis] 피드백 생성 실패:", error);
    return NextResponse.json(
      { success: false, message: "서버 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}

// PUT: 피드백 수동 편집 저장
export async function PUT(
  req: NextRequest,
  { params }: { params: { examResultId: string } }
) {
  try {
    const examResultId = parseInt(params.examResultId);
    if (isNaN(examResultId)) {
      return NextResponse.json(
        { success: false, message: "유효하지 않은 시험 결과 ID입니다." },
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

    const feedback = await prisma.studentAIFeedback.update({
      where: { examResultId },
      data: {
        content,
        isEdited: true,
        editedAt: new Date(),
      },
    });

    return NextResponse.json({ success: true, data: feedback });
  } catch (error) {
    console.error("[AI Analysis] 피드백 수정 실패:", error);
    return NextResponse.json(
      { success: false, message: "서버 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
