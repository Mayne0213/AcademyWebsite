import { z } from 'zod';
import { Announcement, AnnouncementFile } from './types';
import { toast } from 'sonner';

// AnnouncementFile 스키마
export const AnnouncementFileSchema = z.object({
  announcementFileId: z.number(),
  announcementFileKey: z.string(),
  announcementFileOriginalName: z.string(),
  announcementFileType: z.string(),
  announcementId: z.number(),
  uploadedAt: z.date(),
});

// Announcement 스키마
export const AnnouncementSchema = z.object({
  announcementId: z.number(),
  title: z.string().min(1, '공지사항 제목은 필수입니다.').max(200, '공지사항 제목은 200자를 초과할 수 없습니다.'),
  content: z.string().min(1, '공지사항 내용은 필수입니다.'),
  isItAssetAnnouncement: z.boolean(),
  isItImportantAnnouncement: z.boolean(),
  announcementFiles: z.array(AnnouncementFileSchema).optional().default([]),
  announcementAcademies: z.array(z.any()).optional().default([]),
  authorId: z.number().optional(),
  author: z.any().optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const CreateAnnouncementSchema = z.object({
  announcementTitle: z.string().min(1, '공지사항 제목은 필수입니다.').max(200, '공지사항 제목은 200자를 초과할 수 없습니다.'),
  announcementContent: z.string().min(1, '공지사항 내용은 필수입니다.'),
  authorId: z.number(),
  isItAssetAnnouncement: z.boolean(),
  isItImportantAnnouncement: z.boolean(),
  academyIds: z.array(z.number()).min(1, '최소 하나의 학원을 선택해야 합니다.'),
  files: z.array(z.object({
    fileId: z.number(),
  })).optional().default([]),
});

export const UpdateAnnouncementSchema = z.object({
  announcementId: z.number(),
  announcementTitle: z.string().min(1, '공지사항 제목은 필수입니다.').max(200, '공지사항 제목은 200자를 초과할 수 없습니다.'),
  announcementContent: z.string().min(1, '공지사항 내용은 필수입니다.'),
  isItAssetAnnouncement: z.boolean(),
  isItImportantAnnouncement: z.boolean(),
  academyIds: z.array(z.number()).min(1, '최소 하나의 학원을 선택해야 합니다.'),
  files: z.array(z.object({
    fileId: z.number(),
  })).optional().default([]),
});

// 타입 안전성을 위한 타입 체크 함수
export const validateAnnouncementType = (data: unknown): data is Announcement => {
  return AnnouncementSchema.safeParse(data).success;
};

export const validateAnnouncementFileType = (data: unknown): data is AnnouncementFile => {
  return AnnouncementFileSchema.safeParse(data).success;
};

// 유효성 검사 함수들
export const ANNOUNCEMENT_VALIDATION = {
  // Announcement 전체 유효성 검사
  validateAnnouncement: (announcement: unknown) => {
    const result = AnnouncementSchema.safeParse(announcement);

    if (!result.success) {
      const errorMessage = result.error.issues[0].message || '유효하지 않은 데이터입니다.';
      toast.error(errorMessage);
      throw new Error(errorMessage);
    }
  },

  // Announcement 생성용 유효성 검사
  validateAnnouncementForCreate: (announcement: unknown) => {
    const result = CreateAnnouncementSchema.safeParse(announcement);

    if (!result.success) {
      const errorMessage = result.error.issues[0].message || '유효하지 않은 데이터입니다.';
      toast.error(errorMessage);
      throw new Error(errorMessage);
    }
  },

  // Announcement 업데이트용 유효성 검사
  validateAnnouncementForUpdate: (updateData: unknown) => {
    const result = UpdateAnnouncementSchema.safeParse(updateData);

    if (!result.success) {
      const errorMessage = result.error.issues[0].message || '유효하지 않은 데이터입니다.';
      toast.error(errorMessage);
      throw new Error(errorMessage);
    }
  },

  // AnnouncementFile 유효성 검사
  validateAnnouncementFile: (file: unknown) => {
    const result = AnnouncementFileSchema.safeParse(file);

    if (!result.success) {
      const errorMessage = result.error.issues[0].message || '유효하지 않은 데이터입니다.';
      toast.error(errorMessage);
      throw new Error(errorMessage);
    }
  },

  // Announcement 배열 유효성 검사
  validateAnnouncements: (announcements: unknown) => {
    const result = z.array(AnnouncementSchema).safeParse(announcements);

    if (!result.success) {
      const errorMessage = result.error.issues[0].message || '유효하지 않은 데이터입니다.';
      toast.error(errorMessage);
      throw new Error(errorMessage);
    }
  },
} as const; 