import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { S3Client, DeleteObjectCommand } from "@aws-sdk/client-s3";

const s3Client = new S3Client({
  region: "ap-northeast-2",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export async function GET(
  req: Request,
  { params }: { params: { id: string } },
) {
  try {
    const id = Number(params.id);

    const announcement = await prisma.announcement.findUnique({
      where: { announcementId: id },
      include: {
        author: {
          select: {
            adminName: true,
          },
        },
        files: true,
        academies: {
          select: {
            academyId: true,
            academyName: true,
          },
        },
      },
    });

    if (!announcement) {
      return NextResponse.json({ error: "공지사항을 찾을 수 없습니다." }, { status: 404 });
    }

    // 파일 데이터를 프론트엔드 형식으로 변환
    const result = {
      ...announcement,
      files: announcement.files.map((file: any) => ({
        url: file.key,
        name: file.originalName,
        type: file.fileType,
      })),
    };

    console.log("상세 조회 결과:", {
      announcementId: result.announcementId,
      title: result.title,
      filesCount: result.files.length,
      files: result.files,
    });

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error("[API ERROR] 공지사항 상세 조회 실패:", error);
    return NextResponse.json(
      {
        error: "공지사항 상세 조회 실패",
        message: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    );
  }
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } },
) {
  try {
    const id = Number(params.id);
    const body = await req.json();

    const {
      title,
      content,
      authorId,
      isItAssetAnnouncement,
      files, // 첨부파일 배열 [{ url, name, type }]
      academyIds, // [1, 2, 3] - 선택된 학원 ID 배열
    } = body;

    // 기존 첨부파일 모두 삭제
    await prisma.announcementFile.deleteMany({
      where: { announcementId: id },
    });

    // 공지사항 업데이트 및 첨부파일 새로 생성
    const updated = await prisma.announcement.update({
      where: { announcementId: id },
      data: {
        title,
        content,
        authorId,
        isItAssetAnnouncement: isItAssetAnnouncement || false,
        files:
          files && files.length > 0
            ? {
                create: files.map((file: any) => ({
                  key: file.url,
                  originalName: file.name,
                  fileType: file.type,
                })),
              }
            : undefined,
        academies: {
          set: [], // 기존 연결 해제
          ...(academyIds && academyIds.length > 0
            ? {
                connect: academyIds.map((academyId: number) => ({ academyId })),
              }
            : {}),
        },
      },
      include: { 
        files: true,
        academies: {
          select: {
            academyId: true,
            academyName: true,
          },
        },
      },
    });

    console.log("업데이트 완료:", updated);

    // 파일 데이터를 프론트엔드 형식으로 변환
    const result = {
      ...updated,
      files: updated.files.map((file: any) => ({
        url: file.key,
        name: file.originalName,
        type: file.fileType,
      })),
    };

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error("[API ERROR] 공지사항 수정 실패:", error);
    return NextResponse.json(
      {
        error: "공지사항 수정 실패",
        message: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } },
) {
  try {
    const id = Number(params.id);

    // 삭제하기 전에 첨부 파일 정보 가져오기
    const announcement = await prisma.announcement.findUnique({
      where: { announcementId: id },
      include: { files: true },
    });

    if (!announcement) {
      return NextResponse.json({ error: "공지사항을 찾을 수 없습니다." }, { status: 404 });
    }

    // S3에서 첨부 파일들 삭제
    if (announcement.files && announcement.files.length > 0) {
      const deletePromises = announcement.files.map(async (file) => {
        try {
          const command = new DeleteObjectCommand({
            Bucket: "jooeng",
            Key: file.key,
          });
          await s3Client.send(command);
          console.log(`S3 파일 삭제 성공: ${file.key}`);
        } catch (error) {
          console.error(`S3 파일 삭제 실패: ${file.key}`, error);
          // 개별 파일 삭제 실패는 로그만 남기고 계속 진행
        }
      });

      await Promise.all(deletePromises);
    }

    // 공지사항 삭제 (Cascade로 첨부 파일 레코드도 함께 삭제됨)
    await prisma.announcement.delete({
      where: { announcementId: id },
    });

    return NextResponse.json({ message: "삭제 성공" }, { status: 200 });
  } catch (error) {
    console.error("[API ERROR] 공지사항 삭제 실패:", error);
    return NextResponse.json(
      {
        error: "공지사항 삭제 실패",
        message: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    );
  }
}