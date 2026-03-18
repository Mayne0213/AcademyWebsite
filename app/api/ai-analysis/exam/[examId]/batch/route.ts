import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma/client";

const ANALYSIS_API_URL = process.env.ANALYSIS_API_URL || "https://lumie-edu.com";

// POST: 시험의 모든 학생 피드백 일괄 생성 (SSE 스트리밍)
export async function POST(
  req: NextRequest,
  { params }: { params: { examId: string } }
) {
  const examId = parseInt(params.examId);
  if (isNaN(examId)) {
    return NextResponse.json(
      { success: false, message: "유효하지 않은 시험 ID입니다." },
      { status: 400 }
    );
  }

  const body = await req.json().catch(() => ({}));
  const overwrite = body.overwrite === true;

  // 시험 정보 조회
  const exam = await prisma.exam.findUnique({
    where: { examId },
    select: {
      examId: true,
      examName: true,
      correctAnswers: true,
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

  // 모든 시험 결과 조회
  const allResults = await prisma.examResult.findMany({
    where: { examId },
    include: {
      questionResults: true,
      student: { select: { studentName: true } },
      aiFeedback: { select: { id: true } },
    },
  });

  if (allResults.length === 0) {
    return NextResponse.json(
      { success: false, message: "응시 결과가 없습니다." },
      { status: 400 }
    );
  }

  // 전체 통계 1회 계산
  const scores = allResults.map((r) => r.totalScore);
  const averageScore = scores.reduce((a, b) => a + b, 0) / scores.length;

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
    typeof exam.correctAnswers === "string"
      ? JSON.parse(exam.correctAnswers)
      : exam.correctAnswers || {};

  const questionTypes =
    typeof exam.questionTypes === "string"
      ? JSON.parse(exam.questionTypes)
      : exam.questionTypes || {};

  // 대상 필터링
  const targets = overwrite
    ? allResults
    : allResults.filter((r) => !r.aiFeedback);
  const skipped = allResults.length - targets.length;

  // SSE 스트리밍
  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    async start(controller) {
      const send = (event: string, data: unknown) => {
        controller.enqueue(encoder.encode(`event: ${event}\ndata: ${JSON.stringify(data)}\n\n`));
      };

      // 초기 정보 전송
      send("init", {
        total: allResults.length,
        targets: targets.map((r) => ({
          examResultId: r.examResultId,
          studentName: r.student?.studentName || "학생",
        })),
        skipped,
      });

      let generated = 0;
      const errors: Array<{ examResultId: number; studentName: string; error: string }> = [];

      for (const result of targets) {
        const studentName = result.student?.studentName || "학생";

        send("progress", {
          examResultId: result.examResultId,
          studentName,
          status: "generating",
        });

        try {
          // 오답 문항
          const incorrectQuestions = result.questionResults
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
          result.questionResults.forEach((qr) => {
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
                examName: exam.examName,
                studentName,
                totalScore: result.totalScore,
                grade: result.grade,
                averageScore,
                incorrectQuestions,
                questionTypeAchievement,
              }),
            }
          );

          if (!apiResponse.ok) {
            throw new Error(`analysis-svc responded with ${apiResponse.status}`);
          }

          const { content } = await apiResponse.json();

          await prisma.studentAIFeedback.upsert({
            where: { examResultId: result.examResultId },
            update: {
              content,
              isEdited: false,
              generatedAt: new Date(),
              editedAt: null,
            },
            create: {
              examResultId: result.examResultId,
              content,
            },
          });

          generated += 1;

          send("progress", {
            examResultId: result.examResultId,
            studentName,
            status: "done",
          });
        } catch (err: unknown) {
          const errorMessage = err instanceof Error ? err.message : "알 수 없는 오류";
          errors.push({
            examResultId: result.examResultId,
            studentName,
            error: errorMessage,
          });

          send("progress", {
            examResultId: result.examResultId,
            studentName,
            status: "error",
            error: errorMessage,
          });
        }
      }

      send("done", {
        total: allResults.length,
        generated,
        skipped,
        errors,
      });

      controller.close();
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
}
