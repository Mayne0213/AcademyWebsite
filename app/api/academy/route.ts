import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const academies = await prisma.academy.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        academyImages: true,
      },
    });
    const bucketUrl = "https://jooeng.s3.ap-northeast-2.amazonaws.com/";
    const result = academies.map(a => ({
      ...a,
      mainImageUrl: a.academyMainImage
        ? (a.academyMainImage.startsWith("http")
            ? a.academyMainImage
            : bucketUrl + (a.academyMainImage.startsWith("/") ? a.academyMainImage.slice(1) : a.academyMainImage))
        : undefined,
      images: (a.academyImages || []).map(img => ({
        url: img.academyImageUrl.startsWith("http")
          ? img.academyImageUrl
          : bucketUrl + (img.academyImageUrl.startsWith("/") ? img.academyImageUrl.slice(1) : img.academyImageUrl),
        name: img.academyImageName,
        type: "image/*",
      })),
    }));
    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error("[API ERROR] 학원 목록 조회 실패:", error);
    return NextResponse.json(
      {
        error: "학원 목록 조회 실패",
        message: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { academyName, academyPhone, academyAddress, images, mainImageUrl } = body;
    // 1. Academy 생성
    const newAcademy = await prisma.academy.create({
      data: {
        academyName,
        academyPhone,
        academyAddress,
        academyMainImage: mainImageUrl || null,
      },
    });
    // 2. 이미지들 저장 (있으면)
    if (images && Array.isArray(images) && images.length > 0) {
      await prisma.academyImage.createMany({
        data: images.map((img: any) => ({
          academyId: newAcademy.academyId,
          academyImageUrl: img.url,
          academyImageName: img.name || (img.url ? decodeURIComponent(img.url.split('/').pop() || "") : "")
        })),
      });
    }
    // 3. images 포함해서 반환
    const academyWithImages = await prisma.academy.findUnique({
      where: { academyId: newAcademy.academyId },
      include: { academyImages: true },
    });
    return NextResponse.json({
      ...academyWithImages,
      mainImageUrl: academyWithImages?.academyMainImage,
    }, { status: 201 });
  } catch (error) {
    console.error("[API ERROR] 학원 생성 실패:", error);
    return NextResponse.json(
      {
        error: "학원 생성 실패",
        message: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    );
  }
}