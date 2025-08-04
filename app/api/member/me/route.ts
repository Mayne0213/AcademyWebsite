import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

import { prisma } from "@/prisma/client";
const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret_key";

export async function GET(req: Request) {
  try {
    // 쿠키에서 토큰 가져오기
    const cookieHeader = req.headers.get("cookie");

    if (!cookieHeader) {
      return NextResponse.json(
        { success: false, message: "로그인 필요", user: null },
        { status: 401 },
      );
    }

    // 쿠키 문자열에서 token 이름의 값 추출
    const cookies = Object.fromEntries(
      cookieHeader.split("; ").map((cookie) => {
        const [name, ...rest] = cookie.split("=");
        return [name, rest.join("=")];
      }),
    );

    const token = cookies["token"];

    if (!token) {
      return NextResponse.json(
        { success: false, message: "토큰이 없습니다.", user: null },
        { status: 401 },
      );
    }

    // 토큰 검증
    let payload: any;
    try {
      payload = jwt.verify(token, JWT_SECRET);
    } catch {
      return NextResponse.json(
        { success: false, message: "유효하지 않은 토큰입니다.", user: null },
        { status: 401 },
      );
    }

    const user = await prisma.user.findUnique({
      where: { memberId: payload.memberId },
      include: {
        student: true,
        admin: true,
      },
    });

    if (!user) {
      return NextResponse.json(
        { success: false, message: "사용자를 찾을 수 없습니다.", user: null },
        { status: 404 },
      );
    }

    // 역할별 이름 처리
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

    return NextResponse.json({
      success: true,
      data: {
        name,
        userId: user.userId,
        memberId: user.memberId,
        role: user.role,
        student: user.student ?? null,
        admin: user.admin ?? null,
      },
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "서버 오류가 발생했습니다.", user: null },
      { status: 500 },
    );
  }
}

export async function PATCH(req: Request) {
  try {
    // 쿠키에서 토큰 가져오기
    const cookieHeader = req.headers.get("cookie");
    if (!cookieHeader) {
      return NextResponse.json(
        { success: false, message: "로그인 필요" },
        { status: 401 },
      );
    }
    const cookies = Object.fromEntries(
      cookieHeader.split("; ").map((cookie) => {
        const [name, ...rest] = cookie.split("=");
        return [name, rest.join("=")];
      }),
    );
    const token = cookies["token"];
    if (!token) {
      return NextResponse.json(
        { success: false, message: "토큰이 없습니다." },
        { status: 401 },
      );
    }
    let payload: any;
    try {
      payload = jwt.verify(token, JWT_SECRET);
    } catch {
      return NextResponse.json(
        { success: false, message: "유효하지 않은 토큰입니다." },
        { status: 401 },
      );
    }
    // 유저 조회 및 권한 확인
    const user = await prisma.user.findUnique({
      where: { memberId: payload.memberId },
      include: { student: true, admin: true },
    });
    if (!user || user.role !== "STUDENT" || !user.student) {
      return NextResponse.json(
        { success: false, message: "학생만 수정할 수 있습니다." },
        { status: 403 },
      );
    }
    const body = await req.json();
    // User 정보
    const { userId, userPassword } = body;
    // Student 정보
    const {
      academyId,
      studentName,
      studentPhone,
      studentHighschool,
      studentBirthYear,
    } = body;
    // 업데이트
    let updateUserData: any = {
      userId: userId ?? undefined,
    };
    if (userPassword) {
      const bcrypt = await import('bcryptjs');
      const hashedPassword = await bcrypt.hash(userPassword, 10);
      updateUserData.userPassword = hashedPassword;
    }
    await prisma.user.update({
      where: { memberId: user.memberId },
      data: {
        ...updateUserData,
        student: {
          update: {
            academyId: academyId ?? undefined,
            studentName: studentName ?? undefined,
            studentPhone: studentPhone ?? undefined,
            studentHighschool: studentHighschool ?? undefined,
            studentBirthYear: studentBirthYear ?? undefined,
            // studentMemo, memberId는 수정 불가
          },
        },
      },
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "서버 오류가 발생했습니다." },
      { status: 500 },
    );
  }
}
