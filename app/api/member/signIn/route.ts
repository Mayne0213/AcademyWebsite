import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { serialize } from "cookie";

import { prisma } from "@/lib/prisma";
const JWT_SECRET = process.env.JWT_SECRET!;

export async function POST(req: Request) {
  try {
    const { userId, userPassword } = await req.json();

    if (!userId || !userPassword) {
      return NextResponse.json(
        { success: false, message: "아이디와 비밀번호를 모두 입력해주세요." },
        { status: 400 },
      );
    }

    const user = await prisma.user.findUnique({
      where: { userId },
      include: {
        student: true,
        admin: true,
      },
    });

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "아이디 또는 비밀번호가 일치하지 않습니다.",
        },
        { status: 401 },
      );
    }

    const isPasswordCorrect = await bcrypt.compare(
      userPassword,
      user.userPassword,
    );
    if (!isPasswordCorrect) {
      return NextResponse.json(
        {
          success: false,
          message: "아이디 또는 비밀번호가 일치하지 않습니다.",
        },
        { status: 401 },
      );
    }

    const token = jwt.sign(
      { memberId: user.memberId, role: user.role },
      JWT_SECRET,
      { expiresIn: "3d" },
    );

    // 사용자 이름 설정
    let name = "";
    switch (user.role) {
      case "STUDENT":
        name = user.student?.studentName || "학생";
        break;
      case "ADMIN":
        name = user.admin?.adminName || "어드민";
        break;
      case "DEVELOPER":
        name = "개발자";
        break;
    }

    // 쿠키 설정
    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict" as const,
      path: "/",
      maxAge: 60 * 60 * 24 * 3, // 3일
    };

    const tokenCookie = serialize("token", token, cookieOptions);
    const roleCookie = serialize("role", user.role, cookieOptions);

    const response = NextResponse.json({
      success: true,
      user: {
        name,
        userId: user.userId,
        memberId: user.memberId,
        role: user.role,
      },
    });

    // response.headers.set("Set-Cookie", `${tokenCookie}; ${roleCookie}`);
    response.headers.append("Set-Cookie", tokenCookie);
    response.headers.append("Set-Cookie", roleCookie);

    return response;
  } catch (error) {
    console.error(
      "Login Error:",
      error instanceof Error ? error.message : error,
    );
    return NextResponse.json(
      { success: false, message: "서버 오류가 발생했습니다." },
      { status: 500 },
    );
  }
}
