import { z } from 'zod';
import { VALIDATION_FUNCTIONS } from '@/src/shared/lib/validation';
import { VALIDATION_PATTERNS } from '@/src/shared/config/validation';
import { ERROR_MESSAGES } from '@/src/shared/config/messages';
import type { File, CreateFileRequest } from './types';


const ALLOWED_IMAGE_TYPES = VALIDATION_PATTERNS.FILE.ALLOWED_IMAGE_TYPES;
const ALLOWED_DOCUMENT_TYPES = VALIDATION_PATTERNS.FILE.ALLOWED_DOCUMENT_TYPES;

// Zod 스키마 정의
export const FileSchema = z.object({
  fileId: z.number().positive('유효하지 않은 파일 ID입니다.'),
  fileName: z.string().min(1, '파일명을 입력해주세요.'),
  originalName: z.string().min(1, '원본 파일명을 입력해주세요.'),
  fileUrl: z.string().refine(VALIDATION_FUNCTIONS.isValidUrl, ERROR_MESSAGES.VALIDATION.INVALID_URL),
  fileType: z.string().refine(
    (type) => ALLOWED_IMAGE_TYPES.includes(type as any) || ALLOWED_DOCUMENT_TYPES.includes(type as any),
    '지원하지 않는 파일 타입입니다.'
  ),
  fileSize: z.number().optional(),
  createdAt: z.date(),
});

export const CreateFileSchema = FileSchema.pick({
  fileName: true,
  originalName: true,
  fileUrl: true,
  fileType: true,
  fileSize: true,
});



// 타입 안전성을 위한 타입 체크 함수
export const validateFileType = (data: unknown): data is File => {
  return FileSchema.safeParse(data).success;
};

export const validateCreateFileType = (data: unknown): data is CreateFileRequest => {
  return CreateFileSchema.safeParse(data).success;
};



// 유효성 검사 함수들
export const FILE_VALIDATION = {
  // File 전체 유효성 검사
  validateFile: (file: unknown) => {
    const result = FileSchema.safeParse(file);
    return {
      isValid: result.success,
      errors: result.success ? [] : result.error.issues.map((e: any) => e.message),
      data: result.success ? result.data : undefined,
    };
  },

  // File 생성용 유효성 검사
  validateFileForCreate: (file: unknown) => {
    const result = CreateFileSchema.safeParse(file);
    return {
      isValid: result.success,
      errors: result.success ? [] : result.error.issues.map((e: any) => e.message),
      data: result.success ? result.data : undefined,
    };
  },

  // 파일 타입 검증
  validateFileType: (fileType: string) => {
    return ALLOWED_IMAGE_TYPES.includes(fileType as any) || ALLOWED_DOCUMENT_TYPES.includes(fileType as any);
  },

  // 파일 크기 검증
  validateFileSize: (fileSize: number) => {
    return fileSize <= VALIDATION_PATTERNS.FILE.MAX_FILE_SIZE;
  },

  // react-dropzone용 accept 객체 생성
  getAcceptObject: () => ({
    'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.webp'],
    'application/pdf': ['.pdf'],
    'application/msword': ['.doc'],
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
    'application/vnd.ms-excel': ['.xls'],
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
  }),

  // 파일 업로드 에러 메시지 생성
  getErrorMessage: (error: any, fileName: string) => {
    let message = '';
    switch (error.code) {
      case 'file-invalid-type':
        message = `${fileName}: 지원하지 않는 파일 타입입니다.`;
        break;
      case 'file-too-large':
        message = `${fileName}: 파일 크기가 너무 큽니다. (최대 10MB)`;
        break;
      case 'file-too-small':
        message = `${fileName}: 파일 크기가 너무 작습니다.`;
        break;
      case 'too-many-files':
        message = '파일이 너무 많습니다.';
        break;
      default:
        message = `${fileName}: ${error.message}`;
    }
    return message;
  },

} as const;