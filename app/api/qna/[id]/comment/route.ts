import { NextResponse } from "next/server";
import { prisma } from "@/prisma/client";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { commentContent, commentMemberId, qnaId } = body;

    console.log("댓글 생성 요청 데이터:", { commentContent, commentMemberId, qnaId });

    // 유효성 검사
    if (!commentContent || !commentMemberId || isNaN(qnaId)) {
      return NextResponse.json({ success: false, message: "입력 값이 누락되었습니다." }, { status: 400 });
    }

    // 사용자 타입 확인 (Student인지 Admin인지)
    const user = await prisma.user.findUnique({
      where: { memberId: commentMemberId },
      include: {
        student: true,
        admin: true,
      },
    });

    console.log("찾은 사용자 정보:", user);

    if (!user) {
      return NextResponse.json({ success: false, message: "사용자를 찾을 수 없습니다." }, { status: 404 });
    }

    // 댓글 생성 데이터 준비
    const commentData: any = {
      commentContent,
      qnaId: qnaId,
    };

    // 사용자 타입에 따라 적절한 필드 설정
    if (user.student) {
      // 학생인 경우
      commentData.studentId = commentMemberId;
      console.log("학생 댓글 생성:", commentData);
    } else if (user.admin) {
      // 관리자인 경우
      commentData.adminId = commentMemberId;
      console.log("관리자 댓글 생성:", commentData);
    } else {
      return NextResponse.json({ success: false, message: "유효하지 않은 사용자입니다." }, { status: 400 });
    }

    // 댓글 생성
    const newComment = await prisma.qnABoardComment.create({
      data: commentData,
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

    console.log("생성된 댓글:", newComment);

    return NextResponse.json({ success: true, data: newComment }, { status: 201 });
  } catch (error) {
    console.error("[API ERROR] QnA 댓글 생성 실패:", error);
    console.error("에러 상세 정보:", {
      name: error instanceof Error ? error.name : 'Unknown',
      message: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined
    });
    return NextResponse.json(
      { success: false, message: "QnA 댓글 생성에 실패했습니다." },
      { status: 500 },
    );
  }
}
