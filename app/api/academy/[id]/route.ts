import { NextResponse } from "next/server";
import { prisma } from "@/prisma/client";
import { DeleteObjectCommand } from "@aws-sdk/client-s3";
import { s3Client } from "@/src/shared/config/api";

export async function PUT(
  req: Request,
  { params }: { params: { id: string } },
) {
  try {
    const id = Number(params.id);
    const body = await req.json();

    const { academyName, academyPhone, academyAddress, files, deletedFiles } = body;

    // Academy 정보 수정
    const updated = await prisma.academy.update({
      where: { academyId: id },
      data: { 
        academyName, 
        academyPhone, 
        academyAddress,
      },
    });

    // 삭제된 파일들 처리
    if (deletedFiles && deletedFiles.length > 0) {
      await prisma.academyFile.deleteMany({
        where: {
          academyId: id,
          fileId: {
            in: deletedFiles
          }
        }
      });
    }

    // 파일 생성 (파일이 있는 경우)
    if (files && files.length > 0) {
      await prisma.academyFile.createMany({
        data: files.map((file: any) => ({
          academyId: id,
          fileName: file.fileName,
          originalName: file.originalName,
          fileUrl: file.fileUrl,
          fileType: file.fileType,
          fileSize: file.fileSize || null,
        })),
      });
    }

    // 수정된 Academy 정보 조회 (파일 포함)
    const resultWithFiles = await prisma.academy.findUnique({
      where: { academyId: id },
      include: {
        files: true
      },
    });

    return NextResponse.json({ success: true, data: resultWithFiles }, { status: 200 });
  } catch (error) {
    console.error("[API ERROR] 학원 수정 실패:", error);
    return NextResponse.json(
      {
        error: "학원 수정 실패",
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

    // 삭제하기 전에 학원 정보와 첨부 파일 정보 가져오기
    const academyWithFiles = await prisma.academy.findUnique({
      where: { academyId: id },
      include: {
        academyStudents: true,
        academyAdmins: true,
        files: true
      },
    });

    if (!academyWithFiles) {
      return NextResponse.json(
        { success: false, message: "존재하지 않는 학원입니다." },
        { status: 404 },
      );
    }

    if (academyWithFiles.academyStudents.length > 0) {
      return NextResponse.json(
        { success: false, message: "소속된 학생이 존재하여 삭제할 수 없습니다." },
        { status: 409 },
      );
    }

    if (academyWithFiles.academyAdmins.length > 0) {
      return NextResponse.json(
        { success: false, message: "소속된 관리자가 존재하여 삭제할 수 없습니다." },
        { status: 409 },
      );
    }

    // S3에서 파일 삭제
    if (academyWithFiles.files && academyWithFiles.files.length > 0) {
      const deletePromises = academyWithFiles.files.map(async (file: any) => {
        try {
          const key = file.fileName;
          if (key) {
            const command = new DeleteObjectCommand({
              Bucket: "jooeng",
              Key: key,
            });
            await s3Client.send(command);
            console.log(`S3 파일 삭제 성공: ${key}`);
          }
        } catch (error) {
          console.error(`S3 파일 삭제 실패: ${file.fileName}`, error);
          // S3 삭제 실패는 로그만 남기고 계속 진행
        }
      });

      await Promise.all(deletePromises);
    }

    // Academy 삭제 (AcademyFile은 CASCADE로 자동 삭제됨)
    await prisma.academy.delete({
      where: { academyId: id },
    });

    return NextResponse.json({ message: "학원 삭제 성공" }, { status: 200 });
  } catch (error) {
    console.error("[API ERROR] 학원 삭제 실패:", error);
    return NextResponse.json(
      {
        error: "학원 삭제 실패",
        message: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    );
  }
}