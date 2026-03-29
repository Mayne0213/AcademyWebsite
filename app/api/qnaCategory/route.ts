import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma/client";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret_key";

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

// [GET] 모든 카테고리 목록 조회
export async function GET() {
  try {
    const categories = await prisma.qnACategory.findMany({
      orderBy: { categoryName: "asc" },
    });

    return NextResponse.json({ success: true, data: categories }, { status: 200 });
  } catch (error) {
    console.error("[API ERROR] 카테고리 조회 실패:", error);
    return NextResponse.json(
      { success: false, message: "카테고리 조회에 실패했습니다." },
      { status: 500 },
    );
  }
}

// [POST] 카테고리 생성 (관리자/개발자만)
export async function POST(req: NextRequest) {
  try {
    const userPayload = await getUserFromToken(req);

    if (!userPayload || (userPayload.role !== "ADMIN" && userPayload.role !== "DEVELOPER")) {
      return NextResponse.json(
        { success: false, message: "관리자만 카테고리를 생성할 수 있습니다." },
        { status: 403 },
      );
    }

    const body = await req.json();
    const { categoryName } = body;

    if (!categoryName || !categoryName.trim()) {
      return NextResponse.json(
        { success: false, message: "카테고리 이름은 필수입니다." },
        { status: 400 },
      );
    }

    const trimmedName = categoryName.trim();

    if (trimmedName.length > 50) {
      return NextResponse.json(
        { success: false, message: "카테고리 이름은 50자를 초과할 수 없습니다." },
        { status: 400 },
      );
    }

    const category = await prisma.qnACategory.create({
      data: { categoryName: trimmedName },
    });

    return NextResponse.json({ success: true, data: category }, { status: 201 });
  } catch (error: any) {
    if (error?.code === "P2002") {
      return NextResponse.json(
        { success: false, message: "이미 존재하는 카테고리입니다." },
        { status: 409 },
      );
    }
    console.error("[API ERROR] 카테고리 생성 실패:", error);
    return NextResponse.json(
      { success: false, message: "카테고리 생성에 실패했습니다." },
      { status: 500 },
    );
  }
}
