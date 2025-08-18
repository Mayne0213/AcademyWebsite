import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma/client";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const memberId = Number(params.id);

    if (isNaN(memberId)) {
      return NextResponse.json(
        { success: false, message: "Invalid memberId" },
        { status: 400 }
      );
    }

    const student = await prisma.student.findUnique({
      where: { memberId },
      include: {
        academy: true,
        user: {
          select: {
            memberId: true,
            userId: true,
            role: true,
            createdAt: true,
            updatedAt: true
          }
        },
        qnas: {
          select: {
            qnaId: true,
            qnaTitle: true,
            createdAt: true
          }
        }
      },
    });

    if (!student) {
      return NextResponse.json(
        { success: false, message: "학생을 찾을 수 없습니다." },
        { status: 404 }
      );
    }

    // Transform data to match Student interface
    const transformedStudent = {
      ...student.user,
      name: student.studentName, // Use studentName as name for UserInfo interface
      academyId: student.academyId,
      studentName: student.studentName,
      studentPhone: student.studentPhone,
      studentHighschool: student.studentHighschool,
      studentBirthYear: student.studentBirthYear,
      studentMemo: student.studentMemo,
      studentQnas: student.qnas, // Use qnas from schema
      academy: student.academy
    };

    return NextResponse.json({ success: true, data: transformedStudent });
  } catch (error) {
    console.error("GET /api/student/[id] error:", error);
    return NextResponse.json(
      { success: false, message: "학생 조회에 실패했습니다." },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const memberId = Number(params.id);
    
    if (isNaN(memberId)) {
      return NextResponse.json(
        { message: "Invalid memberId" },
        { status: 400 }
      );
    }

    // User 삭제 시 Student도 자동 삭제됨 (ON DELETE CASCADE)
    await prisma.user.delete({ where: { memberId } });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE /api/student/[id] error:", error);
    return NextResponse.json(
      { message: "Failed to delete student" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const memberId = Number(params.id);
    
    if (isNaN(memberId)) {
      return NextResponse.json(
        { message: "Invalid memberId" },
        { status: 400 }
      );
    }

    const body = await request.json();

    const updatedStudent = await prisma.student.update({
      where: { memberId },
      data: {
        academyId: body.academyId,
        studentName: body.studentName,
        studentPhone: body.studentPhone,
        studentHighschool: body.studentHighschool ?? null,
        studentBirthYear: body.studentBirthYear,
        studentMemo: body.studentMemo ?? null,
      },
    });

    return NextResponse.json({ success: true, data: updatedStudent });
  } catch (error) {
    console.error("PUT /api/student/[id] error:", error);
    return NextResponse.json(
      { message: "Failed to update student" },
      { status: 500 }
    );
  }
} 