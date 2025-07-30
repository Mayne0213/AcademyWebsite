// app/api/student/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const students = await prisma.student.findMany({
      include: {
        academy: true,
      },
    });
    return NextResponse.json(students);
  } catch (error) {
    console.error("GET /api/student error:", error);
    return NextResponse.json(
      { message: "Failed to get students" },
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

    return NextResponse.json({ success: true, student: newStudent });
  } catch (error) {
    console.error("POST /api/student error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to create student" },
      { status: 500 },
    );
  }
}