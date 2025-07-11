import { NextRequest, NextResponse } from "next/server";
import { S3Client, DeleteObjectCommand } from "@aws-sdk/client-s3";

const s3Client = new S3Client({
  region: "ap-northeast-2",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const fileUrl = searchParams.get("fileUrl");

    if (!fileUrl) {
      return NextResponse.json(
        { error: "fileUrl이 필요합니다." },
        { status: 400 },
      );
    }

    // S3 URL에서 key 추출
    // https://jooeng.s3.ap-northeast-2.amazonaws.com/folder/filename.ext -> folder/filename.ext
    const bucketUrl = "https://jooeng.s3.ap-northeast-2.amazonaws.com/";
    let key = "";
    if (fileUrl.startsWith(bucketUrl)) {
      key = fileUrl.substring(bucketUrl.length);
    } else if (fileUrl.startsWith("/")) {
      // 상대 경로로 들어온 경우
      key = fileUrl.replace(/^\//, "");
    } else {
      return NextResponse.json(
        { error: "유효한 S3 URL이 아닙니다." },
        { status: 400 },
      );
    }

    if (!key) {
      return NextResponse.json(
        { error: "유효한 S3 URL이 아닙니다." },
        { status: 400 },
      );
    }

    console.log("S3에서 삭제할 파일 key:", key);

    const command = new DeleteObjectCommand({
      Bucket: "jooeng",
      Key: key,
    });

    try {
      await s3Client.send(command);
      console.log("S3 파일 삭제 성공:", key);
      return NextResponse.json({ 
        success: true, 
        message: "파일이 성공적으로 삭제되었습니다.",
        deletedKey: key 
      });
    } catch (error: any) {
      // S3에서 이미 없는 파일(AccessDenied, NoSuchKey 등)은 성공으로 간주
      const msg = (error && error.Code) || (error && error.name) || (error && error.message) || "";
      if (
        msg.includes("NoSuchKey") ||
        msg.includes("NotFound") ||
        msg.includes("AccessDenied")
      ) {
        console.warn("S3 파일이 이미 없거나 접근 불가:", key, msg);
        return NextResponse.json({ 
          success: true, 
          message: "파일이 이미 없거나 접근 불가로 간주되어 삭제 성공 처리.",
          deletedKey: key 
        });
      }
      console.error("S3 파일 삭제 실패:", error);
      return NextResponse.json(
        { error: "파일 삭제 중 오류가 발생했습니다: " + (error as Error).message },
        { status: 500 },
      );
    }
  } catch (error) {
    console.error("S3 파일 삭제 실패:", error);
    return NextResponse.json(
      { error: "파일 삭제 중 오류가 발생했습니다: " + (error as Error).message },
      { status: 500 },
    );
  }
} 