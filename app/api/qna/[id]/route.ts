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
    const { qnaTitle, qnaContent, qnaFiles } = body;

    if (!qnaTitle || !qnaContent) {
      return NextResponse.json({ success: false, message: "입력 값이 누락되었습니다." }, { status: 400 });
    }

    const updatedQna = await prisma.qnABoard.update({
      where: { qnaId: id },
      data: {
        qnaTitle,
        qnaContent,
        qnaFiles: qnaFiles && qnaFiles.length > 0 ? {
          deleteMany: {},
          create: qnaFiles.map((file: any) => ({
            fileId: file.fileId,
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
        qnaFiles: {
          include: {
            file: true,
          },
        },
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
        qnaFiles: { 
          include: { file: true } 
        } 
      },
    });

    if (!qna) {
      return NextResponse.json({ success: false, message: "질문을 찾을 수 없습니다." }, { status: 404 });
    }

    // S3에서 이미지 파일 삭제
    if (qna.qnaFiles && qna.qnaFiles.length > 0) {
      try {
        // S3 URL에서 key 추출
        const urlParts = qna.qnaFiles[0].file.fileUrl.split("/");
        const key = urlParts[urlParts.length - 1];

        if (key) {
          const command = new DeleteObjectCommand({
            Bucket: "jooeng",
            Key: key,
          });
          await s3Client.send(command);
          console.log(`S3 이미지 삭제 성공: ${key}`);
        }
      } catch (error) {
        console.error(`S3 이미지 삭제 실패: ${qna.qnaFiles}`, error);
        // 이미지 삭제 실패는 로그만 남기고 계속 진행
      }
    }

    // QnA 삭제
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
        qnaFiles: {
          include: {
            file: true,
          },
        },
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
