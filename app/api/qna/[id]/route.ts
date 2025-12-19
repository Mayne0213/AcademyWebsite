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

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const id = Number(params.id);
    const body = await req.json();
    const { qnaTitle, qnaContent, files } = body;

    if (!qnaTitle || !qnaContent) {
      return NextResponse.json({ success: false, message: "입력 값이 누락되었습니다." }, { status: 400 });
    }

    const updatedQna = await prisma.qnABoard.update({
      where: { qnaId: id },
      data: {
        qnaTitle,
        qnaContent,
        files: files && files.length > 0 ? {
          deleteMany: {},
          create: files.map((file: any) => ({
            fileName: file.fileName,
            originalName: file.originalName,
            fileUrl: file.fileUrl,
            fileType: file.fileType,
            fileSize: file.fileSize || null,
          })),
        } : undefined,
      },
      include: {
        student: {
          select: {
            memberId: true,
            studentName: true,
          },
        },
        files: true,
      },
    });

    return NextResponse.json({ success: true, data: updatedQna }, { status: 200 });
  } catch (error) {
    console.error("[API ERROR] QnA 수정 실패:", error);
    return NextResponse.json(
      { success: false, message: "QnA 수정에 실패했습니다." },
      { status: 500 },
    );
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    const id = Number(params.id);

    // 삭제하기 전에 QnA 정보 가져오기
    const qna = await prisma.qnABoard.findUnique({
      where: { qnaId: id },
      include: {
        files: true
      },
    });

    if (!qna) {
      return NextResponse.json({ success: false, message: "질문을 찾을 수 없습니다." }, { status: 404 });
    }

    // S3에서 파일 삭제
    if (qna.files && qna.files.length > 0) {
      const deletePromises = qna.files.map(async (file: any) => {
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

    // QnA 삭제 (QnAFile은 CASCADE로 자동 삭제됨)
    await prisma.qnABoard.delete({
      where: { qnaId: id },
    });

    return NextResponse.json({ success: true, message: "질문 삭제 성공" }, { status: 200 });
  } catch (error) {
    console.error("[API ERROR] 질문 삭제 실패:", error);
    return NextResponse.json(
      { success: false, message: "질문 삭제에 실패했습니다." },
      { status: 500 },
    );
  }
}

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const id = Number(params.id);
    const qna = await prisma.qnABoard.findUnique({
      where: { qnaId: id },
      include: {
        student: {
          select: {
            memberId: true,
            studentName: true,
          },
        },
        files: true,
        comments: {
          include: {
            student: {
              select: {
                memberId: true,
                studentName: true,
              },
            },
            admin: {
              select: {
                memberId: true,
                adminName: true,
              },
            },
          },
        },
      },
    });
    if (!qna) {
      return NextResponse.json({ success: false, message: "QnA를 찾을 수 없습니다." }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: qna }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "QnA 상세 조회에 실패했습니다." },
      { status: 500 },
    );
  }
}
