import { Admin } from "@/src/entities/admin/model";
import { Academy } from "@/src/entities/academy/model";

// 공지 요약 정보 (목록용)
export interface AnnouncementSummary {
  announcementId: number;
  announcementTitle: string;
  isItAssetAnnouncement: boolean;
  isItImportantAnnouncement: boolean;
  fileCount?: number;
  authorId?: number;
  author?: Admin;
  createdAt: Date;
  updatedAt: Date;
}

// 공지 엔티티 (상세 정보)
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
  fileId: number;
  fileType: string;
  originalName: string;
  key: string;
}

export interface AnnouncementState {
  announcements: (Announcement | AnnouncementSummary)[];
  isLoading: boolean;
  isDetailLoading: { [announcementId: number]: boolean };
}

export interface AnnouncementBasicActions {
  readAnnouncementSummaries: (announcementSummaries: AnnouncementSummary[]) => void;
  readAnnouncements: (announcements: Announcement[]) => void;
  getAnnouncementSummary: (announcementSummary: AnnouncementSummary) => void;
  getAnnouncement: (announcement: Announcement) => void;
  createAnnouncement: (announcement: Announcement) => void;
  updateAnnouncement: (updatedAnnouncement: Announcement) => void;
  deleteAnnouncement: (announcementId: number) => void;
  setLoading: (isLoading: boolean) => void;
  setDetailLoading: (announcementId: number, isLoading: boolean) => void;
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