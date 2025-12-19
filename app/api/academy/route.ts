import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma/client";

export async function GET(req: NextRequest) {
  try {
    const academies = await prisma.academy.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        files: true,
      },
    });

    return NextResponse.json({ success: true, data: academies }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, message: "학원 목록 조회에 실패했습니다." }, { status: 500 },);
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { academyName, academyPhone, academyAddress, files } = body;

    // 1. 전화번호 중복 체크
    const existingAcademyPhone = await prisma.academy.findUnique({
      where: { academyPhone },
    });

    if (existingAcademyPhone) {
      return NextResponse.json(
        { success: false, message: "이미 등록된 전화번호입니다." },
        { status: 409 },
      );
    }

    const existingAcademyName = await prisma.academy.findUnique({
      where: { academyName },
    });
    if (existingAcademyName) {
      return NextResponse.json(
        { success: false, message: "이미 등록된 학원명입니다." },
        { status: 409 },
      );
    }

    // 2. Academy 생성
    const newAcademy = await prisma.academy.create({
      data: {
        academyName,
        academyPhone,
        academyAddress,
      },
    });

    // 3. 파일 연결 (파일이 있는 경우)
    if (files && files.length > 0) {
      await prisma.academyFile.createMany({
        data: files.map((file: any) => ({
          academyId: newAcademy.academyId,
          fileName: file.fileName,
          originalName: file.originalName,
          fileUrl: file.fileUrl,
          fileType: file.fileType,
          fileSize: file.fileSize || null,
        })),
      });
    }

    // 4. 결과 조회 (파일 포함)
    const resultWithFiles = await prisma.academy.findUnique({
      where: { academyId: newAcademy.academyId },
      include: {
        files: true,
      },
    });

    return NextResponse.json(
      { success: true, data: resultWithFiles },
      { status: 201 },
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "서버 오류가 발생했습니다." },{ status: 500 },
    );
  }
}