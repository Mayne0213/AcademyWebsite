import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret_key";

// JWT 토큰에서 사용자 정보 추출하는 함수
async function getUserFromToken(req: NextRequest) {
  try {
    const cookieHeader = req.headers.get("cookie");
    if (!cookieHeader) return null;

    const cookies = Object.fromEntries(
      cookieHeader.split("; ").map((cookie) => {
        const [name, ...rest] = cookie.split("=");
        return [name, rest.join("=")];
      }),
    );
    const token = cookies["token"];
    if (!token) return null;

    const payload = jwt.verify(token, JWT_SECRET) as any;
    return payload;
  } catch (error) {
    return null;
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const isItAssetAnnouncement = searchParams.get("isItAssetAnnouncement");
    const isItImportantAnnouncement = searchParams.get("isItImportantAnnouncement");
    const page = parseInt(searchParams.get("page") || "1", 10);
    const pageSize = parseInt(searchParams.get("pageSize") || "10", 10);

    let filter: boolean | undefined = undefined;
    if (isItAssetAnnouncement === "true") filter = true;
    else if (isItAssetAnnouncement === "false") filter = false;

    const userPayload = await getUserFromToken(req);

    let whereCondition: any = { isItAssetAnnouncement: filter };

    if (userPayload && userPayload.role === "STUDENT") {
      const student = await prisma.student.findUnique({
        where: { memberId: userPayload.memberId },
        select: { academyId: true },
      });

      if (student) {
        whereCondition = {
          AND: [
            { isItAssetAnnouncement: filter },
            {
              academies: {
                some: {
                  academyId: student.academyId,
                },
              },
            },
          ],
        };
      }
    }

    // 페이지네이션 적용
    const [announcements, totalCount] = await prisma.$transaction([
      prisma.announcement.findMany({
        where: whereCondition,
        orderBy: [
          { isItImportantAnnouncement: 'desc' }, // 중요 공지 먼저
          { createdAt: 'desc' }                  // 그 다음 최신순
        ],
        skip: (page - 1) * pageSize,
        take: pageSize,
        select: {
          announcementId: true,
          title: true,
          updatedAt: true,
          isItImportantAnnouncement: true,
        },
      }),
      prisma.announcement.count({ where: whereCondition }),
    ]);

    return NextResponse.json({ announcements, totalCount }, { status: 200 });
  } catch (error) {
    console.error("[API ERROR] 공지사항 조회 실패:", error);
    return NextResponse.json(
      {
        error: "공지사항 조회 실패",
        message: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      title,
      content,
      authorId,
      isItAssetAnnouncement,
      files, // [{ url, name, type }]
      academyIds, // [1, 2, 3] - 선택된 학원 ID 배열
    } = body;

    const newAnnouncement = await prisma.announcement.create({
      data: {
        title,
        content,
        authorId,
        isItAssetAnnouncement,
        files: files && files.length > 0
          ? {
              create: files.map((file: any) => ({
                key: file.url,
                originalName: file.name,
                fileType: file.type,
              })),
            }
          : undefined,
        academies: academyIds && academyIds.length > 0
          ? {
              connect: academyIds.map((academyId: number) => ({ academyId })),
            }
          : undefined,
      },
      include: { 
        files: true,
        academies: {
          select: {
            academyId: true,
            academyName: true,
          },
        },
      },
    });

    return NextResponse.json(newAnnouncement, { status: 201 });
  } catch (error) {
    console.error("[API ERROR] 공지사항 생성 실패:", error);
    return NextResponse.json(
      {
        error: "공지사항 생성 실패",
        message: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    );
  }
}
