import { NextResponse } from "next/server";
import { prisma } from "@/prisma/client";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const examId = parseInt(id);

    // 개별 시험 상세 정보 조회 (results 제외)
    const exam = await prisma.exam.findUnique({
      where: { examId: examId },
      select: {
        examId: true,
        examName: true,
        totalQuestions: true,
        correctAnswers: true,
        questionScores: true,
        questionTypes: true,
        createdAt: true,
        updatedAt: true,
      }
    });

    if (!exam) {
      return NextResponse.json(
        { success: false, message: "존재하지 않는 시험입니다." },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: exam }, { status: 200 });
  } catch (error) {
    console.error("[API ERROR] 시험 조회 실패:", error);
    return NextResponse.json(
      { success: false, message: "서버 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const examId = parseInt(id);
    const body = await req.json();

    const { examName, totalQuestions, correctAnswers, questionScores, questionTypes } = body;

    // 시험 정보 수정
    const updatedExam = await prisma.exam.update({
      where: { examId: examId },
      data: {
        examName,
        totalQuestions,
        correctAnswers,
        questionScores,
        questionTypes,
        updatedAt: new Date(),
      },
    });

    return NextResponse.json({ success: true, data: updatedExam }, { status: 200 });
  } catch (error) {
    console.error("[API ERROR] 시험 수정 실패:", error);
    return NextResponse.json(
      { success: false, message: "서버 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const examId = parseInt(id);

    // 시험 삭제 (관련된 ExamResult도 함께 삭제됨 - Cascade)
    await prisma.exam.delete({
      where: { examId: examId },
    });

    return NextResponse.json(
      { success: true, message: "시험이 성공적으로 삭제되었습니다." },
      { status: 200 }
    );
  } catch (error) {
    console.error("[API ERROR] 시험 삭제 실패:", error);
    return NextResponse.json(
      { success: false, message: "서버 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
