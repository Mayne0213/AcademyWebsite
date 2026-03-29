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

// [DELETE] 카테고리 삭제 (관리자/개발자만)
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const userPayload = await getUserFromToken(req);

    if (!userPayload || (userPayload.role !== "ADMIN" && userPayload.role !== "DEVELOPER")) {
      return NextResponse.json(
        { success: false, message: "관리자만 카테고리를 삭제할 수 있습니다." },
        { status: 403 },
      );
    }

    const id = Number(params.id);

    await prisma.qnACategory.delete({
      where: { categoryId: id },
    });

    return NextResponse.json({ success: true, message: "카테고리가 삭제되었습니다." }, { status: 200 });
  } catch (error: any) {
    if (error?.code === "P2025") {
      return NextResponse.json(
        { success: false, message: "카테고리를 찾을 수 없습니다." },
        { status: 404 },
      );
    }
    console.error("[API ERROR] 카테고리 삭제 실패:", error);
    return NextResponse.json(
      { success: false, message: "카테고리 삭제에 실패했습니다." },
      { status: 500 },
    );
  }
}
