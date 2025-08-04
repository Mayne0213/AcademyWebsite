import { Admin } from "@/src/entities/admin/model";
import { Academy } from "@/src/entities/academy/model";
import { File } from "@/src/entities/file/model/types";

// 공지 엔티티
export interface Announcement  {
  announcementId: number;
  announcementTitle: string;
  announcementContent: string;
  isItAssetAnnouncement: boolean;
  isItImportantAnnouncement: boolean;
  announcementFiles?: AnnouncementFile[]; // 선택적 (목록에서는 파일 개수만)
  fileCount?: number; // 파일 개수 (목록 조회 시 사용)
  announcementAcademies: Academy[];
  authorId?: number;
  author?: Admin;
  createdAt: Date;
  updatedAt: Date;
}

export interface AnnouncementFile {
  announcementId: number;
  fileId: number;
  announcement: Announcement;
  file: File;
}

// 공지 배열 (pagination 관련 상태 제거)
export interface AnnouncementState {
  announcements: Announcement[];
  isLoading: boolean;
}

// 공지 기본 타입 (pagination 관련 액션 제거)
export interface AnnouncementBasicActions {
  readAnnouncements: (announcements: Announcement[]) => void;
  createAnnouncement: (announcement: Announcement) => void;
  updateAnnouncement: (updatedAnnouncement: Announcement) => void;
  deleteAnnouncement: (announcementId: number) => void;
  setLoading: (isLoading: boolean) => void;
}

// 공지 업데이트 요청 타입
export interface UpdateAnnouncementRequest {
  announcementTitle?: string;
  announcementContent?: string;
  isItAssetAnnouncement?: boolean;
  isItImportantAnnouncement?: boolean;
  announcementFiles?: AnnouncementFile[];
  announcementAcademies?: Academy[];
}

// 공지 생성 요청 타입
export interface CreateAnnouncementRequest {
  announcementTitle: string;
  announcementContent: string;
  authorId: number;
  isItAssetAnnouncement: boolean;
  isItImportantAnnouncement: boolean;
  files?: FileItem[];
  academyIds?: number[];
}

// 파일 아이템 타입
export interface FileItem {
  fileId: number;
}

// 공지사항 상세 정보 타입
export interface AnnouncementDetail {
  announcementId: number;
  announcementTitle: string;
  announcementContent: string;
  isItAssetAnnouncement: boolean;
  isItImportantAnnouncement: boolean;
  authorId: number;
  announcementFiles: {
    fileId: number;
    key: string;
    originalName: string;
    fileType: string;
    fileSize: number;
  }[];
  academies: { academyId: number; academyName: string }[];
}