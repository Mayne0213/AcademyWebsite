import { Academy } from "@/src/entities/academy/model/types";
import { QnABoard } from "@/src/entities/qna/model/types";
import { Announcement } from "@/src/entities/announcement/model/types";

// File 엔티티 타입 정의
export interface File {
  fileId: number;
  fileName: string;
  originalName: string;
  fileUrl: string;
  fileType: string;
  fileSize?: number;
  createdAt: Date;
}

// 중간 테이블 타입들
export interface AcademyFile {
  academyId: number;
  fileId: number;
  academy: Academy;
  file: File;
}

export interface QnaFile {
  qnaId: number;
  fileId: number;
  qna: QnABoard;
  file: File;
}

export interface AnnouncementFile {
  announcementId: number;
  fileId: number;
  announcement: Announcement;
  file: File;
}

// 파일 생성 요청 타입
export interface CreateFileRequest {
  fileName: string;
  originalName: string;
  fileUrl: string;
  fileType: string;
  fileSize?: number;
}
