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

export async function PUT(
  req: Request,
  { params }: { params: { id: string } },
) {
  try {
    const id = Number(params.id);
    const body = await req.json();
    
    const { academyName, academyPhone, academyAddress, images, mainImageUrl } = body;

    // 1. Academy 정보 수정
    const updated = await prisma.academy.update({
      where: { academyId: id },
      data: { 
        academyName, 
        academyPhone, 
        academyAddress,
        academyMainImage: mainImageUrl || null,
      },
    });

    // 2. 기존 이미지 모두 삭제 전 S3에서도 삭제
    const prevImages = await prisma.academyImage.findMany({ where: { academyId: id } });
    for (const img of prevImages) {
      if (img.academyImageUrl) {
        try {
          // S3 URL에서 key 추출
          const bucketUrl = "https://jooeng.s3.ap-northeast-2.amazonaws.com/";
          if (img.academyImageUrl.startsWith(bucketUrl)) {
            const key = img.academyImageUrl.substring(bucketUrl.length);
            const command = new DeleteObjectCommand({
              Bucket: "jooeng",
              Key: key,
            });
            await s3Client.send(command);
          }
        } catch (e) {
          console.error("S3 이미지 삭제 실패:", img.academyImageUrl, e);
        }
      }
    }
    await prisma.academyImage.deleteMany({ where: { academyId: id } });
    if (images && Array.isArray(images) && images.length > 0) {
      await prisma.academyImage.createMany({
        data: images.map((img: any) => ({
          academyId: id,
          academyImageUrl: img.url,
          academyImageName: img.name || (img.url ? decodeURIComponent(img.url.split('/').pop() || "") : "")
        })),
      });
    }

    // 3. images 포함해서 반환
    const academyWithImages = await prisma.academy.findUnique({
      where: { academyId: id },
      include: { images: true },
    });

    const bucketUrl = "https://jooeng.s3.ap-northeast-2.amazonaws.com/";
    return NextResponse.json({
      ...academyWithImages,
      mainImageUrl: academyWithImages?.academyMainImage
        ? (academyWithImages.academyMainImage.startsWith("http")
            ? academyWithImages.academyMainImage
            : bucketUrl + (academyWithImages.academyMainImage.startsWith("/") ? academyWithImages.academyMainImage.slice(1) : academyWithImages.academyMainImage))
        : undefined,
      images: (academyWithImages?.images || []).map(img => ({
        url: img.academyImageUrl.startsWith("http")
          ? img.academyImageUrl
          : bucketUrl + (img.academyImageUrl.startsWith("/") ? img.academyImageUrl.slice(1) : img.academyImageUrl),
        name: img.academyImageName,
        type: "image/*",
      })),
    }, { status: 200 });
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

    // 삭제 전 모든 이미지 S3에서 삭제
    const prevImages = await prisma.academyImage.findMany({ where: { academyId: id } });
    for (const img of prevImages) {
      if (img.academyImageUrl) {
        try {
          const bucketUrl = "https://jooeng.s3.ap-northeast-2.amazonaws.com/";
          if (img.academyImageUrl.startsWith(bucketUrl)) {
            const key = img.academyImageUrl.substring(bucketUrl.length);
            const command = new DeleteObjectCommand({
              Bucket: "jooeng",
              Key: key,
            });
            await s3Client.send(command);
          }
        } catch (e) {
          console.error("S3 이미지 삭제 실패:", img.academyImageUrl, e);
        }
      }
    }

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