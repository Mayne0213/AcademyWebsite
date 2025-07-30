import { FileItem, FileValidationResult } from './types';

// 파일 유효성 검사 설정
export const FILE_VALIDATION = {
  // 허용된 파일 타입
  ALLOWED_TYPES: [
    'image/jpeg',
    'image/jpg', 
    'image/png',
    'image/gif',
    'image/webp',
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'text/plain'
  ],

  // 최대 파일 크기 (10MB)
  MAX_FILE_SIZE: 10 * 1024 * 1024,

  // 허용된 파일 확장자
  ALLOWED_EXTENSIONS: [
    '.jpg', '.jpeg', '.png', '.gif', '.webp',
    '.pdf', '.doc', '.docx', '.xls', '.xlsx', '.txt'
  ],

  // 파일 유효성 검사
  validateFile: (file: File): FileValidationResult => {
    const errors: string[] = [];

    // 파일 타입 검사
    if (!FILE_VALIDATION.ALLOWED_TYPES.includes(file.type as any)) {
      errors.push(`지원하지 않는 파일 타입입니다: ${file.type}`);
    }

    // 파일 크기 검사
    if (file.size > FILE_VALIDATION.MAX_FILE_SIZE) {
      errors.push(`파일 크기가 너무 큽니다. 최대 ${FILE_VALIDATION.MAX_FILE_SIZE / (1024 * 1024)}MB까지 업로드 가능합니다.`);
    }

    // 파일명 검사
    if (!file.name || file.name.trim().length === 0) {
      errors.push('파일명이 유효하지 않습니다.');
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  },

  // 파일 확장자 검사
  validateFileExtension: (filename: string): boolean => {
    const extension = filename.toLowerCase().substring(filename.lastIndexOf('.'));
    return FILE_VALIDATION.ALLOWED_EXTENSIONS.includes(extension as any);
  },

  // 파일 크기 검사
  validateFileSize: (file: File): boolean => {
    return file.size <= FILE_VALIDATION.MAX_FILE_SIZE;
  },

  // 파일 타입 검사
  validateFileType: (file: File): boolean => {
    return FILE_VALIDATION.ALLOWED_TYPES.includes(file.type as any);
  },

  // 여러 파일 유효성 검사
  validateFiles: (files: File[]): FileValidationResult => {
    const errors: string[] = [];
    let hasValidFiles = false;

    for (const file of files) {
      const result = FILE_VALIDATION.validateFile(file);
      if (result.isValid) {
        hasValidFiles = true;
      } else {
        errors.push(`${file.name}: ${result.errors.join(', ')}`);
      }
    }

    return {
      isValid: hasValidFiles && errors.length === 0,
      errors
    };
  },

  // FileItem 유효성 검사
  validateFileItem: (fileItem: FileItem): FileValidationResult => {
    const errors: string[] = [];

    if (!fileItem.url || fileItem.url.trim().length === 0) {
      errors.push('파일 URL이 유효하지 않습니다.');
    }

    if (!fileItem.name || fileItem.name.trim().length === 0) {
      errors.push('파일명이 유효하지 않습니다.');
    }

    if (!fileItem.type || fileItem.type.trim().length === 0) {
      errors.push('파일 타입이 유효하지 않습니다.');
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  },

  // 여러 FileItem 유효성 검사
  validateFileItems: (fileItems: FileItem[]): FileValidationResult => {
    const errors: string[] = [];
    let hasValidFiles = false;

    for (const fileItem of fileItems) {
      const result = FILE_VALIDATION.validateFileItem(fileItem);
      if (result.isValid) {
        hasValidFiles = true;
      } else {
        errors.push(`${fileItem.name}: ${result.errors.join(', ')}`);
      }
    }

    return {
      isValid: hasValidFiles && errors.length === 0,
      errors
    };
  }
} as const; 