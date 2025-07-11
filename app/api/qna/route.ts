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

// [GET] QnA 게시글 + 댓글 + 작성자 정보 조회 (관리자/개발자만 모든 QnA 조회 가능)
export async function GET(req: NextRequest) {
  try {
    // 현재 로그인한 사용자 정보 가져오기
    const userPayload = await getUserFromToken(req);
    
    // 로그인하지 않은 사용자나 학생은 접근 불가
    if (!userPayload || userPayload.role === "STUDENT") {
      return NextResponse.json(
        { error: "관리자만 모든 QnA를 볼 수 있습니다." },
        { status: 403 }
      );
    }

    const QnAs = await prisma.qnABoard.findMany({
      orderBy: { createdAt: "desc" },
      select: {
        qnaId: true,
        qnaTitle: true,
        updatedAt: true,
        user: {
          select: {
            memberId: true,
            role: true,
            student: {
              select: {
                studentName: true,
              },
            },
            admin: {
              select: {
                adminName: true,
              },
            },
          },
        },
      },
    });

    return NextResponse.json(QnAs, { status: 200 });
  } catch (error) {
    console.error("[API ERROR] QnA 조회 실패:", error);

    const errorMessage = error instanceof Error ? error.message : String(error);

    return NextResponse.json(
      {
        error: "QnA 조회 실패",
        message: errorMessage,
      },
      { status: 500 },
    );
  }
}

// [POST] QnA 글 생성
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { qnaTitle, qnaContent, qnaUserId, qnaImageUrl } = body;

    if (!qnaTitle || !qnaContent) {
      return NextResponse.json({ error: "입력 값 누락" }, { status: 400 });
    }

    const newQnA = await prisma.qnABoard.create({
      data: {
        qnaTitle,
        qnaContent,
        qnaUserId,
        qnaImageUrl,
      },
    });

    return NextResponse.json(newQnA, { status: 201 });
  } catch (error) {
    console.error("[API ERROR] QnA 생성 실패:", error);

    const errorMessage = error instanceof Error ? error.message : String(error);

    return NextResponse.json(
      {
        error: "QnA 생성 실패",
        message: errorMessage,
      },
      { status: 500 },
    );
  }
}
