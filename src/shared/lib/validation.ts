import { VALIDATION_PATTERNS } from '@/src/shared/config';
import { ERROR_MESSAGES } from '@/src/shared/config/messages';

// 유효성 검사 함수들
export const VALIDATION_FUNCTIONS = {
  // 기본 유효성 검사
  isValidUserId: (userId: string): boolean => {
    return VALIDATION_PATTERNS.USER_ID.test(userId);
  },
  
  isValidPhone: (phone: string): boolean => {
    return VALIDATION_PATTERNS.PHONE.test(phone);
  },
  
  isValidPassword: (password: string): boolean => {
    return VALIDATION_PATTERNS.PASSWORD.test(password);
  },
  
  isValidBirthYear: (year: string): boolean => {
    return VALIDATION_PATTERNS.BIRTH_YEAR.test(year);
  },
  
  isValidEmail: (email: string): boolean => {
    return VALIDATION_PATTERNS.EMAIL.test(email);
  },
  
  isValidName: (name: string): boolean => {
    return VALIDATION_PATTERNS.NAME.test(name);
  },

  // URL 검증 (새로 추가)
  isValidUrl: (url: string): boolean => {
    // 빈 문자열 체크
    if (!url || url.trim() === '') {
      return false;
    }

    try {
      // 완전한 URL인 경우
      new URL(url);
      return true;
    } catch {
      // 상대 경로나 프로토콜이 없는 URL도 허용
      // 파일 경로나 이미지 경로로 보이는 경우 허용
      return url.includes('/') || url.includes('.') || url.startsWith('data:');
    }
  },

  // 파일 유효성 검사
  isValidImageType: (fileType: string): boolean => {
    return VALIDATION_PATTERNS.FILE.ALLOWED_IMAGE_TYPES.includes(fileType as any);
  },
  
  isValidDocumentType: (fileType: string): boolean => {
    return VALIDATION_PATTERNS.FILE.ALLOWED_DOCUMENT_TYPES.includes(fileType as any);
  },
  
  isValidFileSize: (size: number, isImage: boolean = false): boolean => {
    const maxSize = isImage ? VALIDATION_PATTERNS.FILE.MAX_IMAGE_SIZE : VALIDATION_PATTERNS.FILE.MAX_FILE_SIZE;
    return size <= maxSize;
  },

  // 파일 업로드 검증
  validateFileUpload: (file: File): { isValid: boolean; errors: string[] } => {
    const errors: string[] = [];
    
    const isImage = VALIDATION_FUNCTIONS.isValidImageType(file.type);
    const isDocument = VALIDATION_FUNCTIONS.isValidDocumentType(file.type);
    
    if (!isImage && !isDocument) {
      errors.push(ERROR_MESSAGES.FILE.INVALID_TYPE);
    }
    
    if (!VALIDATION_FUNCTIONS.isValidFileSize(file.size, isImage)) {
      errors.push(ERROR_MESSAGES.FILE.TOO_LARGE);
    }
    
    return {
      isValid: errors.length === 0,
      errors
    };
  },
} as const; 