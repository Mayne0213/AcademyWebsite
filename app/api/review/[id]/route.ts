import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma/client";

// [DELETE] 리뷰 삭제
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const reviewId = parseInt(params.id);

    if (isNaN(reviewId)) {
      return NextResponse.json(
        { success: false, message: "유효하지 않은 리뷰 ID입니다." },
        { status: 400 }
      );
    }

    // 리뷰 존재 여부 확인
    const existingReview = await prisma.review.findUnique({
      where: { id: reviewId },
    });

    if (!existingReview) {
      return NextResponse.json(
        { success: false, message: "리뷰를 찾을 수 없습니다." },
        { status: 404 }
      );
    }

    // 리뷰 삭제
    await prisma.review.delete({
      where: { id: reviewId },
    });

    return NextResponse.json(
      { success: true, message: "리뷰가 삭제되었습니다." },
      { status: 200 }
    );
  } catch (error) {
    console.error("[API ERROR] 리뷰 삭제 실패:", error);

    return NextResponse.json(
      { success: false, message: "리뷰 삭제에 실패했습니다." },
      { status: 500 }
    );
  }
}
