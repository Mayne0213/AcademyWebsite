import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/prisma/client';
import { DeleteObjectCommand } from '@aws-sdk/client-s3';
import { S3_CONFIG, s3Client } from '@/src/shared/config/api';

// S3에서 파일 삭제
const deleteFileFromS3 = async (fileKey: string): Promise<void> => {
  try {
    const command = new DeleteObjectCommand({
      Bucket: S3_CONFIG.BUCKET_NAME,
      Key: fileKey,
    });

    await s3Client.send(command);
  } catch (error: any) {
    throw new Error(`S3 파일 삭제에 실패했습니다: ${error.message}`);
  }
};

// 파일 생성
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { fileName, originalName, fileUrl, fileType, fileSize } = body;

    if (!fileName || !originalName || !fileUrl || !fileType) {
      return NextResponse.json(
        { error: '필수 필드가 누락되었습니다.' },
        { status: 400 }
      );
    }

    const file = await prisma.file.create({
      data: {
        fileName,
        originalName,
        fileUrl,
        fileType,
        fileSize: fileSize || null,
      },
    });

    return NextResponse.json(file);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || '파일 생성에 실패했습니다.' },
      { status: 500 }
    );
  }
}

// 모든 파일 조회
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const filter = Object.fromEntries(searchParams.entries());
    
    const files = await prisma.file.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json(files);
  } catch (error: any) {
    console.error('File list error:', error);
    return NextResponse.json(
      { error: error.message || '파일 목록 조회에 실패했습니다.' },
      { status: 500 }
    );
  }
}

// 파일 삭제
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const fileId = searchParams.get('fileId');

    if (!fileId) {
      return NextResponse.json(
        { error: 'fileId가 필요합니다.' },
        { status: 400 }
      );
    }

    // 파일 정보 조회
    const file = await prisma.file.findUnique({
      where: { fileId: Number(fileId) },
    });

    if (!file) {
      return NextResponse.json(
        { error: '파일을 찾을 수 없습니다.' },
        { status: 404 }
      );
    }

    // S3에서 파일 삭제
    try {
      await deleteFileFromS3(file.fileName);
      console.log(`S3 파일 삭제 성공: ${file.fileName}`);
    } catch (s3Error: any) {
      console.error(`S3 파일 삭제 실패: ${file.fileName}`, s3Error);
      // S3 삭제 실패는 로그만 남기고 계속 진행 (DB 삭제는 성공)
    }

    // DB에서 파일 정보 삭제
    await prisma.file.delete({
      where: { fileId: Number(fileId) },
    });

    return NextResponse.json(
      { message: '파일이 성공적으로 삭제되었습니다.' },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('File delete error:', error);
    return NextResponse.json(
      { error: error.message || '파일 삭제에 실패했습니다.' },
      { status: 500 }
    );
  }
} 