import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret_key";

// JWT 토큰에서 사용자 정보 추출하는 함수
async function getUserFromToken(req: NextRequest) {
  try {
    const cookieHeader = req.headers.get("cookie");
    if (!cookieHeader) return null;

    const cookies = Object.fromEntries(
      cookieHeader.split("; ").map((cookie) => {
        const [name, ...rest] = cookie.split("=");
        return [name, rest.join("=")];
      }),
    );
    const token = cookies["token"];
    if (!token) return null;

    const payload = jwt.verify(token, JWT_SECRET) as any;
    return payload;
  } catch (error) {
    return null;
  }
}

// [GET] 현재 로그인한 사용자의 QnA 게시글 조회
export async function GET(req: NextRequest) {
  try {
    // 현재 로그인한 사용자 정보 가져오기
    const userPayload = await getUserFromToken(req);
    
    if (!userPayload) {
      return NextResponse.json(
        { error: "로그인이 필요합니다." },
        { status: 401 }
      );
    }

    // 학생만 개인 QnA를 볼 수 있도록 제한
    if (userPayload.role !== "STUDENT") {
      return NextResponse.json(
        { error: "학생만 개인 QnA를 볼 수 있습니다." },
        { status: 403 }
      );
    }

    const qnas = await prisma.qnABoard.findMany({
      where: { qnaUserId: userPayload.memberId },
      orderBy: { createdAt: "desc" },
      select: {
        qnaId: true,
        qnaTitle: true,
        updatedAt: true,
        student: {
          select: {
            memberId: true,
            studentName: true,
          },
        },
      },
    });

    return NextResponse.json(qnas, { status: 200 });
  } catch (error) {
    console.error("[API ERROR] QnA 조회 실패:", error);
    return NextResponse.json(
      {
        error: "QnA 조회 실패",
        message: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
