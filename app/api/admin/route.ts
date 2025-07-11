import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function GET(req: NextRequest) {
  try {
    const admins = await prisma.admin.findMany({
      include: {
        user: true,
      },
      orderBy: { memberId: "desc" },
    });
    const result = admins.map((a) => ({
      memberId: a.memberId,
      userId: a.user.userId,
      adminName: a.adminName,
      adminPhone: a.adminPhone,
    }));
    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "관리자 목록 조회 실패" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const {
      userId,
      userPassword,
      userCheckPassword,
      adminName,
      adminPhone,
    } = await req.json();

    // 유효성 검사
    if (!userId || !userPassword || !userCheckPassword || !adminName || !adminPhone) {
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
    const existingPhone = await prisma.admin.findUnique({ where: { adminPhone } });
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

      // 새로운 User + Admin 생성
      return await tx.user.create({
        data: {
          userId,
          userPassword: hashedPassword,
          role: "ADMIN",
          admin: {
            create: {
              adminName,
              adminPhone,
            },
          },
        },
        include: {
          admin: true,
        },
      });
    });

    return NextResponse.json(
      { success: true, user: createdUser },
      { status: 201 },
    );
  } catch (error) {
    console.error("[REGISTER_ADMIN_ERROR]", error);
    
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

export async function DELETE(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const memberId = Number(url.searchParams.get("memberId"));
    if (!memberId) {
      return NextResponse.json({ error: "memberId 필요" }, { status: 400 });
    }
    // 먼저 해당 관리자가 존재하는지 확인
    const existingAdmin = await prisma.admin.findUnique({ where: { memberId } });
    if (!existingAdmin) {
      return NextResponse.json({ error: "관리자를 찾을 수 없습니다." }, { status: 404 });
    }
    // 해당 관리자가 작성한 공지사항의 authorId를 null로 변경
    await prisma.announcement.updateMany({
      where: { authorId: memberId },
      data: { authorId: null }
    });
    // User 삭제 시 Admin도 cascade로 삭제됨
    await prisma.user.delete({ where: { memberId } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[DELETE_ADMIN_ERROR]", error);
    return NextResponse.json({ 
      error: "관리자 삭제 실패", 
      details: error instanceof Error ? error.message : String(error) 
    }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const memberId = Number(url.searchParams.get("memberId"));
    if (!memberId) {
      return NextResponse.json({ error: "memberId 필요" }, { status: 400 });
    }
    const body = await req.json();
    const { adminName, adminPhone, userPassword } = body;
    // 전화번호 중복 체크
    if (adminPhone) {
      const existing = await prisma.admin.findFirst({ where: { adminPhone, memberId: { not: memberId } } });
      if (existing) {
        return NextResponse.json({ error: "이미 등록된 전화번호입니다." }, { status: 409 });
      }
    }
    // 비밀번호 변경 시 해시
    let userUpdate: any = {};
    if (userPassword) {
      userUpdate.userPassword = await bcrypt.hash(userPassword, 10);
    }
    await prisma.admin.update({
      where: { memberId },
      data: {
        adminName: adminName ?? undefined,
        adminPhone: adminPhone ?? undefined,
      },
    });
    if (Object.keys(userUpdate).length > 0) {
      await prisma.user.update({ where: { memberId }, data: userUpdate });
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "관리자 수정 실패" }, { status: 500 });
  }
} 