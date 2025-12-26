import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma/client";
import { DeleteObjectCommand } from "@aws-sdk/client-s3";
import { S3_CONFIG, s3Client } from "@/src/shared/config/api";

// GET - 전체 교재 목록 조회
export async function GET(req: NextRequest) {
  try {
    const textbooks = await prisma.textbook.findMany({
      orderBy: [
        { isImportant: 'desc' }, // 중요 교재 먼저
        { createdAt: 'desc' }    // 최신순
      ],
    });

    return NextResponse.json({
      success: true,
      data: textbooks
    }, { status: 200 });
  } catch (error) {
    console.error("[API ERROR] 교재 목록 조회 실패:", error);
    return NextResponse.json(
      { success: false, message: "교재 목록 조회에 실패했습니다." },
      { status: 500 },
    );
  }
}

// POST - 교재 생성
export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      textbookName,
      fileName,
      fileType,
      fileSize,
      isImportant,
      category,
    } = body;

    // 필수 필드 검증
    if (!textbookName || !fileName || !category) {
      return NextResponse.json(
        { success: false, message: "필수 필드가 누락되었습니다." },
        { status: 400 },
      );
    }

    const newTextbook = await prisma.textbook.create({
      data: {
        textbookName,
        fileName,
        fileType: fileType || 'application/pdf',
        fileSize: fileSize || null,
        isImportant: isImportant || false,
        category,
      },
    });

    return NextResponse.json(
      { success: true, data: newTextbook },
      { status: 201 }
    );
  } catch (error) {
    console.error("[API ERROR] 교재 생성 실패:", error);
    return NextResponse.json(
      { success: false, message: "교재 생성에 실패했습니다." },
      { status: 500 },
    );
  }
}

// DELETE - 교재 삭제 (DB + S3)
export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const textbookId = parseInt(searchParams.get("textbookId") || "0", 10);

    if (!textbookId) {
      return NextResponse.json(
        { success: false, message: "교재 ID가 필요합니다." },
        { status: 400 },
      );
    }

    // 교재 정보 조회 (S3 파일 삭제를 위해)
    const textbook = await prisma.textbook.findUnique({
      where: { textbookId },
    });

    if (!textbook) {
      return NextResponse.json(
        { success: false, message: "교재를 찾을 수 없습니다." },
        { status: 404 },
      );
    }

    // DB에서 교재 삭제
    await prisma.textbook.delete({
      where: { textbookId },
    });

    // S3에서 파일 삭제
    try {
      const deleteCommand = new DeleteObjectCommand({
        Bucket: S3_CONFIG.BUCKET_NAME,
        Key: textbook.fileName,
      });
      await s3Client.send(deleteCommand);
    } catch (s3Error) {
      console.error("S3 파일 삭제 실패:", s3Error);
      // S3 삭제 실패해도 DB는 이미 삭제되었으므로 계속 진행
    }

    return NextResponse.json(
      { success: true, message: "교재가 성공적으로 삭제되었습니다." },
      { status: 200 }
    );
  } catch (error) {
    console.error("[API ERROR] 교재 삭제 실패:", error);
    return NextResponse.json(
      { success: false, message: "교재 삭제에 실패했습니다." },
      { status: 500 },
    );
  }
}
