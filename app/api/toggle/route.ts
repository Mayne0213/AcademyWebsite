import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// GET: Toggle 설정 조회
export async function GET(req: NextRequest) {
  try {
    // id가 1인 Toggle 레코드 조회, 없으면 생성
    let toggle = await prisma.toggle.findUnique({
      where: { id: 1 },
    });

    if (!toggle) {
      toggle = await prisma.toggle.create({
        data: { id: 1, isReviewPopupOn: true },
      });
    }

    return NextResponse.json(
      { success: true, data: toggle },
      { status: 200 }
    );
  } catch (error) {
    console.error("Toggle 조회 실패:", error);
    return NextResponse.json(
      { success: false, message: "Toggle 설정을 불러오는데 실패했습니다." },
      { status: 500 }
    );
  }
}

// PUT: Toggle 설정 업데이트
export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const { isReviewPopupOn } = body;

    if (typeof isReviewPopupOn !== "boolean") {
      return NextResponse.json(
        { success: false, message: "isReviewPopupOn은 boolean 타입이어야 합니다." },
        { status: 400 }
      );
    }

    // id가 1인 Toggle 레코드 업데이트, 없으면 생성
    const toggle = await prisma.toggle.upsert({
      where: { id: 1 },
      update: { isReviewPopupOn },
      create: { id: 1, isReviewPopupOn },
    });

    return NextResponse.json(
      { success: true, data: toggle },
      { status: 200 }
    );
  } catch (error) {
    console.error("Toggle 업데이트 실패:", error);
    return NextResponse.json(
      { success: false, message: "Toggle 설정 업데이트에 실패했습니다." },
      { status: 500 }
    );
  }
}
