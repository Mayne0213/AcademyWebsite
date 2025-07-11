import { NextRequest, NextResponse } from "next/server";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const s3Client = new S3Client({
  region: "ap-northeast-2",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export async function GET(req: NextRequest) {
  try {
    console.log("=== Presigned URL 생성 시작 ===");
    console.log(
      "AWS_ACCESS_KEY_ID:",
      process.env.AWS_ACCESS_KEY_ID ? "설정됨" : "없음",
    );
    console.log(
      "AWS_SECRET_ACCESS_KEY:",
      process.env.AWS_SECRET_ACCESS_KEY ? "설정됨" : "없음",
    );

    const { searchParams } = new URL(req.url);
    const fileType = searchParams.get("fileType");
    let folder = searchParams.get("folder") || ""; // folder 파라미터 추가

    // academy 폴더명은 /main/academy로 강제 변환
    if (folder === "academy") {
      folder = "/main/academy";
    }

    if (!fileType) {
      return NextResponse.json(
        { error: "fileType이 필요합니다." },
        { status: 400 },
      );
    }

    const ext = fileType.split("/")[1];
    if (!ext) {
      return NextResponse.json(
        { error: "유효한 fileType이 아닙니다." },
        { status: 400 },
      );
    }

    // folder 경로를 포함한 파일명 생성
    const uniqueFileName = folder 
      ? `${folder}/${Date.now()}-${Math.floor(Math.random() * 1e6)}.${ext}`
      : `${Date.now()}-${Math.floor(Math.random() * 1e6)}.${ext}`;
    console.log("생성된 파일명:", uniqueFileName);
    console.log("폴더 경로:", folder);

    const command = new PutObjectCommand({
      Bucket: "jooeng",
      Key: uniqueFileName,
      ContentType: fileType,
      ACL: "public-read",
    });

    console.log("S3 Command 생성 완료");

    const uploadUrl = await getSignedUrl(s3Client, command, {
      expiresIn: 300,
    });

    console.log("Presigned URL 생성 성공:", uploadUrl);
    console.log("=== Presigned URL 생성 완료 ===");

    return NextResponse.json({ uploadUrl, key: uniqueFileName });
  } catch (error) {
    console.error("=== Presigned URL 생성 실패 ===");
    console.error("에러 상세:", error);
    return NextResponse.json(
      { error: "서버 오류: " + (error as Error).message },
      { status: 500 },
    );
  }
}
