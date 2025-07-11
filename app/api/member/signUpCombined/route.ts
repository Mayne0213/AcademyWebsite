import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const {
      userId,
      userPassword,
      userCheckPassword,
      studentName,
      studentPhone,
      studentHighschool,
      studentBirthYear,
      studentMemo,
      academyId,
    } = await req.json();

    // 유효성 검사
    if (
      !userId ||
      !userPassword ||
      !userCheckPassword ||
      !studentName ||
      !studentPhone ||
      !studentBirthYear ||
      !academyId
    ) {
      return NextResponse.json(
        { success: false, message: "필수 정보를 모두 입력해주세요." },
        { status: 400 },
      );
    }

    if (userPassword !== userCheckPassword) {
      return NextResponse.json(
        { success: false, message: "비밀번호가 일치하지 않습니다." },
        { status: 409 },
      );
    }

    // 중복 체크: 전화번호
    const existingPhone = await prisma.student.findUnique({
      where: { studentPhone },
    });
    if (existingPhone) {
      return NextResponse.json(
        { success: false, message: "이미 등록된 전화번호입니다." },
        { status: 409 },
      );
    }

    const hashedPassword = await bcrypt.hash(userPassword, 10);

    // 트랜잭션으로 안전하게 처리
    const createdUser = await prisma.$transaction(async (tx) => {
      // 기존 User가 있는지 확인
      const existingUser = await tx.user.findUnique({ 
        where: { userId },
        include: {
          admin: true,
          student: true,
        }
      });
      
      if (existingUser) {
        // 활성 계정인지 확인
        if (existingUser.admin || existingUser.student) {
          throw new Error("이미 사용 중인 아이디입니다.");
        } else {
          // 삭제된 계정이므로 기존 User 삭제
          await tx.user.delete({ where: { memberId: existingUser.memberId } });
        }
      }

      // 새로운 User + Student 생성
      return await tx.user.create({
        data: {
          userId,
          userPassword: hashedPassword,
          role: "STUDENT",
          student: {
            create: {
              studentName,
              studentPhone,
              studentHighschool,
              studentBirthYear: parseInt(studentBirthYear),
              studentMemo,
              academy: {
                connect: {
                  academyId: parseInt(academyId),
                },
              },
            },
          },
        },
        include: {
          student: true,
        },
      });
    });

    return NextResponse.json(
      { success: true, user: createdUser },
      { status: 201 },
    );
  } catch (error) {
    console.error("[REGISTER_FULL_ERROR]", error);
    
    // 트랜잭션 에러 처리
    if (error instanceof Error && error.message === "이미 사용 중인 아이디입니다.") {
      return NextResponse.json(
        { success: false, message: error.message },
        { status: 409 },
      );
    }
    
    return NextResponse.json(
      { success: false, message: "서버 오류가 발생했습니다." },
      { status: 500 },
    );
  }
}
