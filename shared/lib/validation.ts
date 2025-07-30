import { VALIDATION_PATTERNS } from '@/shared/config';
import { ERROR_MESSAGES } from '@/shared/config/messages';

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