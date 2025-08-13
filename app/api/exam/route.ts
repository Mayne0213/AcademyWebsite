import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma/client";

export async function GET(req: NextRequest) {
  try {
    // 시험 목록 조회 - 시험 이름만 반환 (지연 데이터 fetch)
    const exams = await prisma.exam.findMany({
      select: {
        examId: true,
        examName: true,
        totalQuestions: true,
        createdAt: true,
        updatedAt: true,
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ success: true, data: exams }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "시험 목록 조회에 실패했습니다." },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { examName, totalQuestions, correctAnswers, questionScores, questionTypes } = body;

    // 시험 생성
    const newExam = await prisma.exam.create({
      data: {
        examName,
        totalQuestions,
        correctAnswers,
        questionScores,
        questionTypes,
      },
    });

    return NextResponse.json(
      { success: true, data: newExam },
      { status: 201 }
    );
  } catch (error) {
    console.error("[API ERROR] 시험 생성 실패:", error);
    return NextResponse.json(
      { success: false, message: "서버 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
