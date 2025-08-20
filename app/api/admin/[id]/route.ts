import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma/client";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const adminId = Number(params.id);
    const url = new URL(req.url);
    const type = url.searchParams.get("type") || "detail";
    
    if (!adminId || isNaN(adminId)) {
      return NextResponse.json(
        { success: false, message: "유효하지 않은 관리자 ID입니다." },
        { status: 400 }
      );
    }

    const admin = await prisma.admin.findUnique({
      where: { memberId: adminId },
      include: {
        user: true,
        announcements: type === "detail",
        academies: type === "detail",
      },
    });

    if (!admin) {
      return NextResponse.json(
        { success: false, message: "관리자를 찾을 수 없습니다." },
        { status: 404 }
      );
    }

    if (type === "summary") {
      // AdminSummary 형태로 응답
      const result = {
        memberId: admin.memberId,
        adminName: admin.adminName,
        adminPosition: admin.adminPosition,
      };
      return NextResponse.json(
        { success: true, data: result },
        { status: 200 }
      );
    } else {
      // Admin 타입에 맞는 형태로 응답 데이터 구성
      const result = {
        memberId: admin.memberId,
        name: admin.adminName,
        userId: admin.user.userId,
        role: admin.user.role,
        createdAt: admin.user.createdAt,
        updatedAt: admin.user.updatedAt,
        adminName: admin.adminName,
        adminPhone: admin.adminPhone,
        adminPosition: admin.adminPosition || "ADMIN",
        adminMemo: admin.adminMemo,
        announcements: admin.announcements || [],
        academies: admin.academies || [],
      };

      return NextResponse.json(
        { success: true, data: result },
        { status: 200 }
      );
    }
  } catch (error) {
    console.error("[GET_ADMIN_DETAIL_ERROR]", error);
    return NextResponse.json(
      { success: false, message: "관리자 상세 정보 조회에 실패했습니다." },
      { status: 500 }
    );
  }
}
