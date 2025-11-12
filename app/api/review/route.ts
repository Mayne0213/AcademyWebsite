import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma/client";

// [POST] 리뷰 생성
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { reviewerName, reviewTitle, reviewContent } = body;

    // 필수 필드 검증
    if (!reviewerName || !reviewTitle || !reviewContent) {
      return NextResponse.json(
        { success: false, message: "리뷰 작성자, 제목, 내용은 필수입니다." },
        { status: 400 }
      );
    }

    // 리뷰어 이름 길이 제한
    if (reviewerName.length > 100) {
      return NextResponse.json(
        { success: false, message: "리뷰 작성자 이름이 너무 깁니다." },
        { status: 400 }
      );
    }

    // 리뷰 제목 길이 제한
    if (reviewTitle.length > 100) {
      return NextResponse.json(
        { success: false, message: "리뷰 제목이 너무 깁니다." },
        { status: 400 }
      );
    }

    // 리뷰 내용 길이 제한
    if (reviewContent.length > 1000) {
      return NextResponse.json(
        { success: false, message: "리뷰 내용이 너무 깁니다." },
        { status: 400 }
      );
    }

    // 리뷰 생성
    const newReview = await prisma.review.create({
      data: {
        reviewerName,
        reviewTitle,
        reviewContent,
      },
    });

    return NextResponse.json(
      { success: true, data: newReview },
      { status: 201 }
    );
  } catch (error) {
    console.error("[API ERROR] 리뷰 생성 실패:", error);

    return NextResponse.json(
      { success: false, message: "리뷰 생성에 실패했습니다." },
      { status: 500 }
    );
  }
}

// [GET] 모든 리뷰 조회 (관리자용 - 추후 필요시 사용)
export async function GET(req: NextRequest) {
  try {
    // URL에서 pagination 파라미터 추출
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get('page') || '1');
    const pageSize = parseInt(searchParams.get('pageSize') || '10');
    const skip = (page - 1) * pageSize;

    // 전체 개수 조회
    const totalCount = await prisma.review.count();

    // pagination된 리뷰 조회
    const reviews = await prisma.review.findMany({
      skip,
      take: pageSize,
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(
      {
        success: true,
        data: {
          reviews,
          totalCount,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("[API ERROR] 리뷰 조회 실패:", error);

    return NextResponse.json(
      { success: false, message: "리뷰 조회에 실패했습니다." },
      { status: 500 }
    );
  }
}
