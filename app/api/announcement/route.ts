import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma/client";
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
    const type = searchParams.get("type"); // summary 또는 detail
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

    // type에 따라 select 조건을 다르게 설정
    const isSummary = type === "summary";

    const selectFields: any = {
      announcementId: true,
      announcementTitle: true,
      createdAt: true,
      updatedAt: true,
      isItAssetAnnouncement: true,
      isItImportantAnnouncement: true,
      authorId: true,
      author: {
        select: {
          memberId: true,
          adminName: true,
        },
      },
      // 파일 개수만 가져오기 (상세 정보는 필요시에만)
      _count: {
        select: {
          announcementFiles: true,
        },
      },
    };

    // summary가 아닌 경우에만 content, academies, files 포함
    if (!isSummary) {
      selectFields.announcementContent = true;
      selectFields.academies = {
        select: {
          academyId: true,
          academyName: true,
        },
      };
      selectFields.announcementFiles = {
        include: {
          file: {
            select: {
              fileId: true,
              fileName: true,
              originalName: true,
              fileUrl: true,
              fileType: true,
            },
          },
        },
      };
    }

    // 페이지네이션 적용 - 최적화된 쿼리
    const [announcements, totalCount] = await prisma.$transaction([
      prisma.announcement.findMany({
        where: whereCondition,
        orderBy: [
          { isItImportantAnnouncement: 'desc' }, // 중요 공지 먼저
          { createdAt: 'desc' }                  // 그 다음 최신순
        ],
        skip: (page - 1) * pageSize,
        take: pageSize,
        select: selectFields,
      }),
      prisma.announcement.count({ where: whereCondition }),
    ]);

    // 프론트엔드에서 기대하는 형식으로 데이터 변환 - 최적화
    const transformedAnnouncements = announcements.map((announcement: any) => {
      const baseData = {
        announcementId: announcement.announcementId,
        announcementTitle: announcement.announcementTitle,
        createdAt: announcement.createdAt,
        updatedAt: announcement.updatedAt,
        isItAssetAnnouncement: announcement.isItAssetAnnouncement,
        isItImportantAnnouncement: announcement.isItImportantAnnouncement,
        authorId: announcement.authorId,
        author: announcement.author,
        // 파일 개수만 포함 (상세 정보는 필요시에만 로드)
        fileCount: announcement._count.announcementFiles,
      };

      // summary가 아닌 경우에만 content, academies, files 포함
      if (!isSummary) {
        return {
          ...baseData,
          announcementContent: announcement.announcementContent,
          announcementAcademies: announcement.academies,
          announcementFiles: announcement.announcementFiles?.map((af: any) => ({
            fileId: af.fileId,
            key: af.file.fileUrl,
            originalName: af.file.originalName,
            fileType: af.file.fileType,
          })) || [],
        };
      }

      return baseData;
    });

    return NextResponse.json({
      success: true,
      data: {
        announcements: transformedAnnouncements,
        totalCount: totalCount
      }
    }, { status: 200 });
  } catch (error) {
    console.error("[API ERROR] 공지사항 조회 실패:", error);
    return NextResponse.json(
      { success: false, message: "공지사항 조회에 실패했습니다." },
      { status: 500 },
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      announcementTitle,
      announcementContent,
      authorId,
      isItAssetAnnouncement,
      files, // [{ fileId }]
      academyIds, // [1, 2, 3] - 선택된 학원 ID 배열
    } = body;

    const announcementData = {
      announcementTitle,
      announcementContent,
      authorId,
      isItAssetAnnouncement,
      isItImportantAnnouncement: body.isItImportantAnnouncement || false,
      announcementFiles: files && files.length > 0
        ? {
            create: files.map((file: any) => ({
              fileId: file.fileId,
            })),
          }
        : undefined,
      academies: academyIds && academyIds.length > 0
        ? {
            connect: academyIds.map((academyId: number) => ({ academyId })),
          }
        : undefined,
    };

    const newAnnouncement = await prisma.announcement.create({
      data: announcementData,
      include: { 
        author: {
          select: {
            memberId: true,
            adminName: true,
          },
        },
        announcementFiles: {
          include: {
            file: {
              select: {
                fileId: true,
                fileName: true,
                originalName: true,
                fileUrl: true,
                fileType: true,
              },
            },
          },
        },
        academies: {
          select: {
            academyId: true,
            academyName: true,
          },
        },
      },
    });

    // 프론트엔드에서 기대하는 형식으로 데이터 변환
    const transformedAnnouncement = {
      announcementId: newAnnouncement.announcementId,
      announcementTitle: newAnnouncement.announcementTitle,
      announcementContent: newAnnouncement.announcementContent,
      createdAt: newAnnouncement.createdAt,
      updatedAt: newAnnouncement.updatedAt,
      isItAssetAnnouncement: newAnnouncement.isItAssetAnnouncement,
      isItImportantAnnouncement: newAnnouncement.isItImportantAnnouncement,
      authorId: newAnnouncement.authorId,
      author: newAnnouncement.author,
      announcementFiles: newAnnouncement.announcementFiles.map(af => ({
        fileId: af.fileId,
        key: af.file.fileUrl,
        originalName: af.file.originalName,
        fileType: af.file.fileType,
      })),
      announcementAcademies: newAnnouncement.academies,
    };

    return NextResponse.json({ success: true, data: transformedAnnouncement }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "공지사항 생성에 실패했습니다." },
      { status: 500 },
    );
  }
}
