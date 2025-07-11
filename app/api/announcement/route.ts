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

    let filter: boolean | undefined = undefined;
    if (isItAssetAnnouncement === "true") filter = true;
    else if (isItAssetAnnouncement === "false") filter = false;

    // 현재 로그인한 사용자 정보 가져오기
    const userPayload = await getUserFromToken(req);
    
    // 기본 where 조건: 공지/자료실 구분
    let whereCondition: any = { isItAssetAnnouncement: filter };

    // 사용자가 로그인되어 있고 학생인 경우, 해당 학생의 학원에 연결된 공지만 필터링
    if (userPayload && userPayload.role === "STUDENT") {
      // 학생의 학원 정보 가져오기
      const student = await prisma.student.findUnique({
        where: { memberId: userPayload.memberId },
        select: { academyId: true },
      });

      if (student) {
        // 해당 학원에 연결된 공지만 가져오기 (공지/자료실 구분과 함께)
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
    // 관리자나 개발자인 경우 모든 공지를 볼 수 있음 (기본 whereCondition 사용)

    const announcements = await prisma.announcement.findMany({
      where: whereCondition,
      orderBy: { createdAt: "desc" },
      select: {
        announcementId: true,
        title: true,
        updatedAt: true,
        // files: true, // 첨부파일은 상세에서만 불러오기
        // content: false, // content는 포함하지 않음
      },
    });

    // 파일 데이터 변환 제거 (상세에서만 처리)
    return NextResponse.json(announcements, { status: 200 });
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
