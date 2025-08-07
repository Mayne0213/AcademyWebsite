import { NextResponse } from "next/server";
import { prisma } from "@/prisma/client";

export async function PUT(
  req: Request,
  { params }: { params: { id: string; commentId: string } },
) {
  try {
    const commentId = Number(params.commentId);
    const body = await req.json();
    const { commentContent } = body;

    if (!commentContent) {
      return NextResponse.json({ success: false, message: "댓글 내용이 누락되었습니다." }, { status: 400 });
    }

    const updatedComment = await prisma.qnABoardComment.update({
      where: { commentId: commentId },
      data: {
        commentContent,
      },
      include: {
        student: {
          select: {
            memberId: true,
            studentName: true,
          },
        },
        admin: {
          select: {
            memberId: true,
            adminName: true,
          },
        },
      },
    });

    return NextResponse.json({ success: true, data: updatedComment }, { status: 200 });
  } catch (error) {
    console.error("[API ERROR] 댓글 수정 실패:", error);
    return NextResponse.json(
      { success: false, message: "댓글 수정에 실패했습니다." },
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

    return NextResponse.json({ success: true, message: "댓글 삭제 성공" }, { status: 200 });
  } catch (error) {
    console.error("[API ERROR] 댓글 삭제 실패:", error);
    return NextResponse.json(
      { success: false, message: "댓글 삭제에 실패했습니다." },
      { status: 500 },
    );
  }
}
