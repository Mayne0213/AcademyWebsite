import { NextResponse } from "next/server";
import { prisma } from "@/prisma/client";
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
        announcementFiles: {
          include: {
            file: {
              select: {
                fileId: true,
                fileName: true,
                originalName: true,
                fileUrl: true,
                fileType: true,
              },
            },
          },
        },
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
      announcementFiles: announcement.announcementFiles.map((file: any) => ({
        fileId: file.fileId,
        key: file.file.fileUrl,
        originalName: file.file.originalName,
        fileType: file.file.fileType,
      })),
    };

    return NextResponse.json({ success: true, data: result }, { status: 200 });
  } catch (error) {
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

    // 기존 데이터 조회
    const existing = await prisma.announcement.findUnique({
      where: { announcementId: id },
      include: {
        announcementFiles: {
          include: {
            file: {
              select: {
                fileId: true,
                fileName: true,
                originalName: true,
                fileUrl: true,
                fileType: true,
              },
            },
          },
        },
        academies: true,
      },
    });

    if (!existing) {
      return NextResponse.json({ error: "공지사항을 찾을 수 없습니다." }, { status: 404 });
    }

    // 부분 업데이트를 위한 데이터 객체 생성
    const updateData: any = {};

    // 각 필드가 body에 포함되어 있을 때만 업데이트
    if (body.announcementTitle !== undefined) updateData.announcementTitle = body.announcementTitle;
    if (body.announcementContent !== undefined) updateData.announcementContent = body.announcementContent;
    if (body.authorId !== undefined) updateData.authorId = body.authorId;
    if (body.isItAssetAnnouncement !== undefined) updateData.isItAssetAnnouncement = body.isItAssetAnnouncement;
    if (body.isItImportantAnnouncement !== undefined) updateData.isItImportantAnnouncement = body.isItImportantAnnouncement;

    // 파일 처리
    if (body.files !== undefined) {
      // 기존 첨부파일 모두 삭제
      await prisma.announcementFile.deleteMany({
        where: { announcementId: id },
      });

      if (body.files && body.files.length > 0) {
        updateData.announcementFiles = {
          create: body.files.map((file: any) => ({
            fileId: file.fileId,
          })),
        };
      }
    }

    // 학원 연결 처리
    if (body.academyIds !== undefined) {
      updateData.academies = {
        set: [], // 기존 연결 해제
        ...(body.academyIds && body.academyIds.length > 0
          ? {
              connect: body.academyIds.map((academyId: number) => ({ academyId })),
            }
          : {}),
      };
    }

    // 공지사항 업데이트
    const updated = await prisma.announcement.update({
      where: { announcementId: id },
      data: updateData,
      include: { 
        author: {
          select: {
            memberId: true,
            adminName: true,
          },
        },
        announcementFiles: {
          include: {
            file: {
              select: {
                fileId: true,
                fileName: true,
                originalName: true,
                fileUrl: true,
                fileType: true,
              },
            },
          },
        },
        academies: {
          select: {
            academyId: true,
            academyName: true,
          },
        },
      },
    });

    // 파일 데이터를 프론트엔드 형식으로 변환
    const result = {
      ...updated,
      announcementFiles: updated.announcementFiles.map((file: any) => ({
        fileId: file.fileId,
        key: file.file.fileUrl,
        originalName: file.file.originalName,
        fileType: file.file.fileType,
      })),
    };

    return NextResponse.json({ success: true, data: result }, { status: 200 });
  } catch (error) {
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
      include: {
        announcementFiles: {
          include: {
            file: {
              select: {
                fileId: true,
                fileName: true,
                originalName: true,
                fileUrl: true,
                fileType: true,
              },
            },
          },
        },
      },
    });

    if (!announcement) {
      return NextResponse.json({ error: "공지사항을 찾을 수 없습니다.", message: "공지사항을 찾을 수 없습니다." }, { status: 404 });
    }

    // S3에서 첨부 파일들 삭제
    if (announcement.announcementFiles && announcement.announcementFiles.length > 0) {
      const deletePromises = announcement.announcementFiles.map(async (file: any) => {
        try {
          const command = new DeleteObjectCommand({
            Bucket: "jooeng",
            Key: file.file.fileUrl,
          });
          await s3Client.send(command);
        } catch (error) {
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
    return NextResponse.json(
      {
        error: "공지사항 삭제 실패",
        message: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    );
  }
}