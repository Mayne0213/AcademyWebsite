// app/api/student/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma/client";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const phone = searchParams.get('phone');

    if (phone) {
      // 전화번호로 특정 학생 검색
      const student = await prisma.student.findUnique({
        where: { studentPhone: phone },
        include: {
          academy: true,
          user: {
            select: {
              memberId: true,
              userId: true,
              role: true
            }
          }
        },
      });

      if (!student) {
        return NextResponse.json(
          { success: false, message: "해당 전화번호의 학생을 찾을 수 없습니다." },
          { status: 404 }
        );
      }

      return NextResponse.json({ success: true, data: student });
    }

    // 모든 학생 목록 조회
    const students = await prisma.student.findMany({
      include: {
        academy: true,
      },
    });
    return NextResponse.json({ success: true, data: students });
  } catch (error) {
    console.error("GET /api/student error:", error);
    return NextResponse.json(
      { success: false, message: "학생 목록 조회에 실패했습니다." },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    if (!body.memberId) {
      return NextResponse.json(
        { success: false, message: "memberId is required" },
        { status: 400 },
      );
    }

    // User 존재 여부 체크 (optional)
    const userExists = await prisma.user.findUnique({
      where: { memberId: body.memberId },
    });
    if (!userExists) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 },
      );
    }

    const newStudent = await prisma.student.create({
      data: {
        memberId: body.memberId,
        academyId: body.academyId,
        studentName: body.studentName,
        studentPhone: body.studentPhone,
        studentHighschool: body.studentHighschool ?? null,
        studentBirthYear: body.studentBirthYear,
        studentMemo: body.studentMemo ?? null,
        user: {
          connect: { memberId: body.memberId },
        },
        academy: {
            connect: { academyId: body.academyId },
            },
      },
    });

    return NextResponse.json({ success: true, data: newStudent });
  } catch (error) {
    console.error("POST /api/student error:", error);
    return NextResponse.json(
      { success: false, message: "학생 생성에 실패했습니다." },
      { status: 500 },
    );
  }
}