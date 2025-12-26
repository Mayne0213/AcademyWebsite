import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma/client";

// GET - 특정 교재 조회
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const textbookId = parseInt(params.id, 10);

    if (isNaN(textbookId)) {
      return NextResponse.json(
        { success: false, message: "유효하지 않은 교재 ID입니다." },
        { status: 400 },
      );
    }

    const textbook = await prisma.textbook.findUnique({
      where: { textbookId },
    });

    if (!textbook) {
      return NextResponse.json(
        { success: false, message: "교재를 찾을 수 없습니다." },
        { status: 404 },
      );
    }

    return NextResponse.json({
      success: true,
      data: textbook
    }, { status: 200 });
  } catch (error) {
    console.error("[API ERROR] 교재 조회 실패:", error);
    return NextResponse.json(
      { success: false, message: "교재 조회에 실패했습니다." },
      { status: 500 },
    );
  }
}

// PUT - 교재 업데이트
export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const textbookId = parseInt(params.id, 10);

    if (isNaN(textbookId)) {
      return NextResponse.json(
        { success: false, message: "유효하지 않은 교재 ID입니다." },
        { status: 400 },
      );
    }

    const body = await req.json();
    const { textbookName, isImportant, category } = body;

    // 업데이트할 데이터 준비
    const updateData: any = {};
    if (textbookName !== undefined) updateData.textbookName = textbookName;
    if (isImportant !== undefined) updateData.isImportant = isImportant;
    if (category !== undefined) updateData.category = category;

    const updatedTextbook = await prisma.textbook.update({
      where: { textbookId },
      data: updateData,
    });

    return NextResponse.json({
      success: true,
      data: updatedTextbook
    }, { status: 200 });
  } catch (error) {
    console.error("[API ERROR] 교재 업데이트 실패:", error);
    return NextResponse.json(
      { success: false, message: "교재 업데이트에 실패했습니다." },
      { status: 500 },
    );
  }
}

// DELETE - 특정 교재 삭제
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const textbookId = parseInt(params.id, 10);

    if (isNaN(textbookId)) {
      return NextResponse.json(
        { success: false, message: "유효하지 않은 교재 ID입니다." },
        { status: 400 },
      );
    }

    await prisma.textbook.delete({
      where: { textbookId },
    });

    return NextResponse.json(
      { success: true, message: "교재가 성공적으로 삭제되었습니다." },
      { status: 200 }
    );
  } catch (error) {
    console.error("[API ERROR] 교재 삭제 실패:", error);
    return NextResponse.json(
      { success: false, message: "교재 삭제에 실패했습니다." },
      { status: 500 },
    );
  }
}
