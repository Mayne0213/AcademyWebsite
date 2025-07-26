// 환경 변수 상수
export const ENV = {
  JWT_SECRET: process.env.JWT_SECRET || "your_jwt_secret_key",
  DATABASE_URL: process.env.DATABASE_URL,
  AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID,
  AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY,
  AWS_REGION: process.env.AWS_REGION || "ap-northeast-2",
} as const;

// AWS S3 설정
export const S3_CONFIG = {
  BUCKET_NAME: "jooeng",
  BUCKET_URL: "https://jooeng.s3.ap-northeast-2.amazonaws.com",
  REGION: "ap-northeast-2",
} as const;

// API 엔드포인트
export const API_ENDPOINTS = {
  // 인증 관련
  AUTH: {
    SIGN_IN: "/api/member/signIn",
    SIGN_OUT: "/api/member/signOut",
    SIGN_UP: "/api/member/signUpCombined",
    ME: "/api/member/me",
  },
  
  // 학생 관련
  STUDENT: {
    LIST: "/api/student",
    DETAIL: (id: number) => `/api/student/${id}`,
  },
  
  // 학원 관련
  ACADEMY: {
    LIST: "/api/academy",
    DETAIL: (id: number) => `/api/academy/${id}`,
  },
  
  // 공지사항 관련
  ANNOUNCEMENT: {
    LIST: "/api/announcement",
    DETAIL: (id: number) => `/api/announcement/${id}`,
  },
  
  // QnA 관련
  QNA: {
    LIST: "/api/qna",
    PERSONAL: "/api/qnaPersonal",
    DETAIL: (id: number) => `/api/qna/${id}`,
    COMMENT: (qnaId: number) => `/api/qna/${qnaId}/comment`,
    COMMENT_DETAIL: (qnaId: number, commentId: number) => 
      `/api/qna/${qnaId}/comment/${commentId}`,
  },
  
  // 파일 관련
  FILE: {
    UPLOAD_URL: "/api/upload-url",
    DELETE: "/api/delete-file",
  },
} as const;

// 사용자 역할
export const USER_ROLES = {
  STUDENT: "STUDENT",
  ADMIN: "ADMIN",
  DEVELOPER: "DEVELOPER",
} as const;

// 파일 업로드 설정
export const FILE_UPLOAD = {
  MAX_FILE_SIZE: 10 * 1024 * 1024, // 10MB
  ALLOWED_IMAGE_TYPES: [
    "image/jpeg",
    "image/jpg", 
    "image/png",
    "image/gif",
    "image/webp",
  ],
  ALLOWED_DOCUMENT_TYPES: [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "application/vnd.ms-excel",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  ],
} as const;

// 유효성 검사 정규식
export const VALIDATION_PATTERNS = {
  USER_ID: /^[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+$/,
  PHONE: /^01[0-9]-?[0-9]{3,4}-?[0-9]{4}$/,
  PASSWORD: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
  BIRTH_YEAR: /^(19|20)\d{2}$/,
} as const;

// 에러 메시지
export const ERROR_MESSAGES = {
  // 인증 관련
  AUTH: {
    LOGIN_FAILED: "로그인에 실패했습니다.",
    SIGNUP_FAILED: "회원가입에 실패했습니다.",
    UNAUTHORIZED: "인증이 필요합니다.",
    FORBIDDEN: "접근 권한이 없습니다.",
  },
  
  // API 관련
  API: {
    FETCH_FAILED: "데이터를 불러오는데 실패했습니다.",
    CREATE_FAILED: "생성에 실패했습니다.",
    UPDATE_FAILED: "수정에 실패했습니다.",
    DELETE_FAILED: "삭제에 실패했습니다.",
  },
  
  // 파일 관련
  FILE: {
    UPLOAD_FAILED: "파일 업로드에 실패했습니다.",
    DELETE_FAILED: "파일 삭제에 실패했습니다.",
    INVALID_TYPE: "지원하지 않는 파일 형식입니다.",
    TOO_LARGE: "파일 크기가 너무 큽니다.",
  },
  
  // 유효성 검사
  VALIDATION: {
    REQUIRED: "필수 입력 항목입니다.",
    INVALID_FORMAT: "올바른 형식으로 입력해주세요.",
    PASSWORD_MISMATCH: "비밀번호가 일치하지 않습니다.",
    INVALID_PHONE: "올바른 전화번호 형식을 입력해주세요.",
    INVALID_BIRTH_YEAR: "올바른 출생년도를 입력해주세요.",
  },
} as const;

// 성공 메시지
export const SUCCESS_MESSAGES = {
  // 인증 관련
  AUTH: {
    LOGIN_SUCCESS: "로그인되었습니다.",
    SIGNUP_SUCCESS: "회원가입이 완료되었습니다.",
    LOGOUT_SUCCESS: "로그아웃되었습니다.",
  },
  
  // CRUD 관련
  CRUD: {
    CREATE_SUCCESS: "생성되었습니다.",
    UPDATE_SUCCESS: "수정되었습니다.",
    DELETE_SUCCESS: "삭제되었습니다.",
  },
  
  // 파일 관련
  FILE: {
    UPLOAD_SUCCESS: "파일이 업로드되었습니다.",
    DELETE_SUCCESS: "파일이 삭제되었습니다.",
  },
} as const;

// 날짜 포맷
export const DATE_FORMATS = {
  DISPLAY: "yyyy-MM-dd",
  DISPLAY_WITH_TIME: "yyyy-MM-dd HH:mm",
  DISPLAY_FULL: "yyyy년 MM월 dd일",
  DISPLAY_FULL_WITH_TIME: "yyyy년 MM월 dd일 HH:mm",
} as const;

 