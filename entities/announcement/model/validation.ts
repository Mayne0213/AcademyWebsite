import { Announcement, AnnouncementFile, UpdateAnnouncementRequest } from './types';
import { VALIDATION_FUNCTIONS } from '@/shared/lib/validation';
import { ERROR_MESSAGES } from '@/shared/config/messages';

// Announcement 유효성 검사 함수들
export const ANNOUNCEMENT_VALIDATION = {
  // Announcement 전체 유효성 검사
  validateAnnouncement: (announcement: Announcement): { isValid: boolean; errors: string[] } => {
    const errors: string[] = [];
    
    // ID 검사
    if (!announcement.announcementId || announcement.announcementId <= 0) {
      errors.push('유효하지 않은 공지사항 ID입니다.');
    }
    
    // 제목 검사
    if (!announcement.announcementTitle || announcement.announcementTitle.trim().length === 0) {
      errors.push('공지사항 제목은 필수입니다.');
    } else if (announcement.announcementTitle.trim().length > 200) {
      errors.push('공지사항 제목은 200자를 초과할 수 없습니다.');
    }
    
    // 내용 검사
    if (!announcement.announcementContent || announcement.announcementContent.trim().length === 0) {
      errors.push('공지사항 내용은 필수입니다.');
    }
    
    // 날짜 검사
    if (!announcement.createdAt || !(announcement.createdAt instanceof Date)) {
      errors.push('생성일은 필수입니다.');
    }
    
    if (!announcement.updatedAt || !(announcement.updatedAt instanceof Date)) {
      errors.push('수정일은 필수입니다.');
    }
    
    // 파일 검사
    if (announcement.announcementFiles && announcement.announcementFiles.length > 0) {
      for (const file of announcement.announcementFiles) {
        const fileValidation = ANNOUNCEMENT_VALIDATION.validateAnnouncementFile(file);
        if (!fileValidation.isValid) {
          errors.push(...fileValidation.errors);
        }
      }
    }
    
    return {
      isValid: errors.length === 0,
      errors
    };
  },

  // Announcement 생성용 유효성 검사 (ID 제외)
  validateAnnouncementForCreate: (announcement: Omit<Announcement, 'announcementId' | 'createdAt' | 'updatedAt' | 'author' | 'announcementAcademies'>): { isValid: boolean; errors: string[] } => {
    const errors: string[] = [];
    
    // 제목 검사
    if (!announcement.announcementTitle || announcement.announcementTitle.trim().length === 0) {
      errors.push('공지사항 제목은 필수입니다.');
    } else if (announcement.announcementTitle.trim().length > 200) {
      errors.push('공지사항 제목은 200자를 초과할 수 없습니다.');
    }
    
    // 내용 검사
    if (!announcement.announcementContent || announcement.announcementContent.trim().length === 0) {
      errors.push('공지사항 내용은 필수입니다.');
    }
    
    // 파일 검사
    if (announcement.announcementFiles && announcement.announcementFiles.length > 0) {
      for (const file of announcement.announcementFiles) {
        const fileValidation = ANNOUNCEMENT_VALIDATION.validateAnnouncementFile(file);
        if (!fileValidation.isValid) {
          errors.push(...fileValidation.errors);
        }
      }
    }
    
    return {
      isValid: errors.length === 0,
      errors
    };
  },

  // Announcement 업데이트용 유효성 검사
  validateAnnouncementForUpdate: (updateData: UpdateAnnouncementRequest): { isValid: boolean; errors: string[] } => {
    const errors: string[] = [];
    
    // 업데이트할 필드가 있는지 확인
    const hasUpdateFields = Object.keys(updateData).some(key => 
      key !== 'updatedAt' && updateData[key as keyof UpdateAnnouncementRequest] !== undefined
    );
    
    if (!hasUpdateFields) {
      errors.push('업데이트할 필드가 없습니다.');
    }
    
    // 제목 검사
    if (updateData.announcementTitle) {
      if (updateData.announcementTitle.trim().length === 0) {
        errors.push('공지사항 제목은 비어있을 수 없습니다.');
      } else if (updateData.announcementTitle.trim().length > 200) {
        errors.push('공지사항 제목은 200자를 초과할 수 없습니다.');
      }
    }
    
    // 내용 검사
    if (updateData.announcementContent && updateData.announcementContent.trim().length === 0) {
      errors.push('공지사항 내용은 비어있을 수 없습니다.');
    }
    
    // 파일 검사
    if (updateData.announcementFiles && updateData.announcementFiles.length > 0) {
      for (const file of updateData.announcementFiles) {
        const fileValidation = ANNOUNCEMENT_VALIDATION.validateAnnouncementFile(file);
        if (!fileValidation.isValid) {
          errors.push(...fileValidation.errors);
        }
      }
    }
    
    return {
      isValid: errors.length === 0,
      errors
    };
  },

  // AnnouncementFile 유효성 검사
  validateAnnouncementFile: (file: AnnouncementFile): { isValid: boolean; errors: string[] } => {
    const errors: string[] = [];
    
    if (!file.announcementFileKey || file.announcementFileKey.trim().length === 0) {
      errors.push('파일 키는 필수입니다.');
    }
    
    if (!file.announcementFileOriginalName || file.announcementFileOriginalName.trim().length === 0) {
      errors.push('파일 원본명은 필수입니다.');
    }
    
    if (!file.announcementFileType || file.announcementFileType.trim().length === 0) {
      errors.push('파일 타입은 필수입니다.');
    }
    
    if (!file.announcementId || file.announcementId <= 0) {
      errors.push('유효하지 않은 공지사항 ID입니다.');
    }
    
    // 파일 타입 검사
    if (file.announcementFileType) {
      const isImage = VALIDATION_FUNCTIONS.isValidImageType(file.announcementFileType);
      const isDocument = VALIDATION_FUNCTIONS.isValidDocumentType(file.announcementFileType);
      
      if (!isImage && !isDocument) {
        errors.push(ERROR_MESSAGES.FILE.INVALID_TYPE);
      }
    }
    
    // 업로드 날짜 검사
    if (!file.uploadedAt || !(file.uploadedAt instanceof Date)) {
      errors.push('업로드 날짜는 필수입니다.');
    }
    
    return {
      isValid: errors.length === 0,
      errors
    };
  },

  // Announcement 배열 유효성 검사
  validateAnnouncements: (announcements: Announcement[]): { isValid: boolean; errors: string[] } => {
    const errors: string[] = [];
    
    if (!Array.isArray(announcements)) {
      errors.push('공지사항 목록은 배열이어야 합니다.');
      return { isValid: false, errors };
    }
    
    for (let i = 0; i < announcements.length; i++) {
      const announcementValidation = ANNOUNCEMENT_VALIDATION.validateAnnouncement(announcements[i]);
      if (!announcementValidation.isValid) {
        errors.push(`공지사항 ${i + 1}: ${announcementValidation.errors.join(', ')}`);
      }
    }
    
    return {
      isValid: errors.length === 0,
      errors
    };
  },
} as const; 