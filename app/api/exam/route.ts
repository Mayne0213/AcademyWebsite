import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma/client";
import { ExamCategory } from "@prisma/client";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1", 10);
    const pageSize = parseInt(searchParams.get("pageSize") || "6", 10);
    const category = searchParams.get("category") as ExamCategory | null;

    // 카테고리 필터 조건
    const whereClause = category ? { examCategory: category } : {};

    // 페이지네이션 적용
    const [exams, totalCount] = await prisma.$transaction([
      prisma.exam.findMany({
        where: whereClause,
        select: {
          examId: true,
          examName: true,
          examCategory: true,
          totalQuestions: true,
          createdAt: true,
          updatedAt: true,
        },
        orderBy: { createdAt: "desc" },
        skip: (page - 1) * pageSize,
        take: pageSize,
      }),
      prisma.exam.count({ where: whereClause }),
    ]);

    return NextResponse.json({
      success: true,
      data: {
        exams,
        totalCount
      }
    }, { status: 200 });
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
    const { examName, examCategory, totalQuestions, correctAnswers, questionScores, questionTypes } = body;

    // 시험 생성
    const newExam = await prisma.exam.create({
      data: {
        examName,
        examCategory: examCategory || "PASS_FAIL",
        totalQuestions,
        correctAnswers,
        questionScores,
        questionTypes,
        passScore: body.passScore, // P/NP 기준 점수 (Optional)
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
