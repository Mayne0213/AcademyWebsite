// 유효성 검사 정규식 및 설정
export const VALIDATION_PATTERNS = {
  // 사용자 ID (영문, 숫자, 특수문자 허용)
  USER_ID: /^[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+$/,
  
  // 전화번호 (하이픈 미포함, 숫자만)
  PHONE: /^01[0-9][0-9]{3,4}[0-9]{4}$/,
  
  // 비밀번호 (영문, 숫자, 특수문자 조합, 최소 8자)
  PASSWORD: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
  
  // 출생년도 (1900-2099)
  BIRTH_YEAR: /^(19|20)\d{2}$/,
  
  // 이메일
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  
  // 이름 (한글, 영문, 공백 허용)
  NAME: /^[가-힣a-zA-Z\s]+$/,
  
  // 파일 유효성 검사 설정
  FILE: {
    // 허용된 이미지 타입
    ALLOWED_IMAGE_TYPES: [
      "image/jpeg",
      "image/jpg", 
      "image/png",
      "image/gif",
      "image/webp",
    ] as const,
    
    // 허용된 문서 타입
    ALLOWED_DOCUMENT_TYPES: [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "application/vnd.ms-excel",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    ] as const,
    
    // 파일 크기 제한
    MAX_FILE_SIZE: 10 * 1024 * 1024, // 10MB
    MAX_IMAGE_SIZE: 5 * 1024 * 1024, // 5MB
  },
} as const; 