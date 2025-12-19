import { NextResponse } from "next/server";
import { S3Client, DeleteObjectCommand } from "@aws-sdk/client-s3";

const s3Client = new S3Client({
  region: "ap-northeast-2",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export async function DELETE(req: Request) {
  try {
    const { fileKey } = await req.json();

    if (!fileKey) {
      return NextResponse.json(
        { error: "파일 키가 필요합니다." },
        { status: 400 }
      );
    }

    // S3에서 파일 삭제
    const command = new DeleteObjectCommand({
      Bucket: "jooeng",
      Key: fileKey,
    });

    await s3Client.send(command);
    console.log(`S3 파일 삭제 성공: ${fileKey}`);

    return NextResponse.json(
      { success: true, message: "파일 삭제 성공" },
      { status: 200 }
    );
  } catch (error) {
    console.error("S3 파일 삭제 실패:", error);
    return NextResponse.json(
      {
        error: "S3 파일 삭제 실패",
        message: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
