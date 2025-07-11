import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { commentContent, commentMemberId, qnaId } = body;

    // 유효성 검사
    if (!commentContent || !commentMemberId || isNaN(qnaId)) {
      return NextResponse.json({ error: "입력 값 누락ddd" }, { status: 400 });
    }

    // 댓글 생성
    const newComment = await prisma.qnABoardComment.create({
      data: {
        commentContent,
        commentUserId: commentMemberId,
        qnaId: qnaId,
      },
    });

    return NextResponse.json(newComment, { status: 201 });
  } catch (error) {
    console.error("[API ERROR] QnA 댓글 생성 실패:", error);
    return NextResponse.json(
      {
        error: "QnA 댓글 생성 실패",
        message: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    );
  }
}
