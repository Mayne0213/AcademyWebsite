import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

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

    return NextResponse.json(updatedStudent);
  } catch (error) {
    console.error("PUT /api/student/[id] error:", error);
    return NextResponse.json(
      { message: "Failed to update student" },
      { status: 500 }
    );
  }
} 