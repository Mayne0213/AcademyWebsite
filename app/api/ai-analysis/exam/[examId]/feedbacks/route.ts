import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma/client";

// GET: 시험의 모든 학생 피드백 목록 조회
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

    // examId에 해당하는 모든 examResult의 피드백 조회
    const feedbacks = await prisma.studentAIFeedback.findMany({
      where: {
        examResult: {
          examId,
        },
      },
      include: {
        examResult: {
          select: {
            examResultId: true,
            studentId: true,
            totalScore: true,
            grade: true,
            student: {
              select: {
                studentName: true,
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    // 전체 examResult 조회 (학생 목록 + 생성 현황 표시용)
    const allExamResults = await prisma.examResult.findMany({
      where: { examId },
      select: {
        examResultId: true,
        studentId: true,
        totalScore: true,
        grade: true,
        student: {
          select: {
            studentName: true,
          },
        },
      },
      orderBy: { totalScore: "desc" },
    });

    return NextResponse.json({
      success: true,
      data: {
        feedbacks,
        allExamResults,
        totalExamResults: allExamResults.length,
        generatedCount: feedbacks.length,
      },
    });
  } catch (error) {
    console.error("[AI Analysis] 피드백 목록 조회 실패:", error);
    return NextResponse.json(
      { success: false, message: "서버 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
