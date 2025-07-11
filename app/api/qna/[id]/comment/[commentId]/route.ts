import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
export async function PUT(
  req: Request,
  { params }: { params: { id: string; commentId: string } },
) {
  try {
    const id = Number(params.id);
    const body = await req.json();
    const { qnaTitle, qnaContent, qnaImageUrl } = body;

    const updated = await prisma.qnABoard.update({
      where: { qnaId: id },
      data: {
        qnaTitle,
        qnaContent,
        qnaImageUrl,
      },
    });

    return NextResponse.json(updated, { status: 200 });
  } catch (error) {
    console.error("[API ERROR] 질문 수정 실패:", error);
    return NextResponse.json(
      {
        error: "질문 수정 실패",
        message: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string; commentId: string } },
) {
  try {
    const commentId = Number(params.commentId);

    await prisma.qnABoardComment.delete({
      where: { commentId: commentId },
    });

    return NextResponse.json({ message: "댓글 삭제 성공" }, { status: 200 });
  } catch (error) {
    console.error("[API ERROR] 댓글 삭제 실패:", error);
    return NextResponse.json(
      {
        error: "댓글 삭제 실패",
        message: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    );
  }
}
