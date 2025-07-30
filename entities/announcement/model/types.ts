import { Admin } from "@/entities/admin/model";
import { Academy } from "@/entities/academy/model";

// 공지 엔티티
export interface Announcement  {
  announcementId: number;
  announcementTitle: string;
  announcementContent: string;
  isItAssetAnnouncement: boolean;
  isItImportantAnnouncement: boolean;
  announcementFiles: AnnouncementFile[];
  announcementAcademies: Academy[];
  authorId?: number;
  author?: Admin;
  createdAt: Date;
  updatedAt: Date;
}

export interface AnnouncementFile {
  announcementFileId: number;
  announcementFileKey: string;
  announcementFileOriginalName: string;
  announcementFileType: string;
  announcementId: number;
  announcement: Announcement;
  uploadedAt: Date;
}

// 공지 배열
export interface AnnouncementState {
  announcements: Announcement[];
  isLoading: boolean;
  error: string | null;
}

// 공지 기본 타입
export interface AnnouncementBasicActions {
  readAnnouncements: (announcements: Announcement[]) => void;
  createAnnouncement: (announcement: Announcement) => void;
  updateAnnouncement: (updatedAnnouncement: Announcement) => void;
  deleteAnnouncement: (announcementId: number) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
  clearError: () => void;
}

// 공지 업데이트 요청 타입
export interface UpdateAnnouncementRequest {
  announcementTitle?: string;
  announcementContent?: string;
  isItAssetAnnouncement?: boolean;
  isItImportantAnnouncement?: boolean;
  announcementFiles?: AnnouncementFile[];
  announcementAcademies?: Academy[];
  updatedAt: Date;
}