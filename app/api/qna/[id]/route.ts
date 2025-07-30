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

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    const id = Number(params.id);

    // 삭제하기 전에 QnA 정보 가져오기
    const qna = await prisma.qnABoard.findUnique({
      where: { qnaId: id },
    });

    if (!qna) {
      return NextResponse.json({ error: "질문을 찾을 수 없습니다." }, { status: 404 });
    }

    // S3에서 이미지 파일 삭제
    if (qna.qnaImageUrl) {
      try {
        // S3 URL에서 key 추출
        const urlParts = qna.qnaImageUrl.split("/");
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
        console.error(`S3 이미지 삭제 실패: ${qna.qnaImageUrl}`, error);
        // 이미지 삭제 실패는 로그만 남기고 계속 진행
      }
    }

    // QnA 삭제
    await prisma.qnABoard.delete({
      where: { qnaId: id },
    });

    return NextResponse.json({ message: "질문 삭제 성공" }, { status: 200 });
  } catch (error) {
    console.error("[API ERROR] 질문 삭제 실패:", error);
    return NextResponse.json(
      {
        error: "질문 삭제 실패",
        message: error instanceof Error ? error.message : String(error),
      },
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
        comments: {
          include: {
            user: {
              select: {
                memberId: true,
                role: true,
                student: {
                  select: {
                    studentName: true,
                  },
                },
                admin: {
                  select: {
                    adminName: true,
                  },
                },
              },
            },
          },
        },
      },
    });
    if (!qna) {
      return NextResponse.json({ error: "QnA를 찾을 수 없습니다." }, { status: 404 });
    }
    return NextResponse.json(qna, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "QnA 상세 조회 실패", message: error instanceof Error ? error.message : String(error) },
      { status: 500 },
    );
  }
}
