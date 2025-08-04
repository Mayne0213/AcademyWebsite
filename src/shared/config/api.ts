// API 엔드포인트 설정
export const API_ENDPOINTS = {
  // 인증 관련 엔드포인트
  AUTH: {
    SIGN_IN: "/api/member/signIn",
    SIGN_UP: "/api/member/signUp",
    SIGN_UP_COMBINED: "/api/member/signUp",
    SIGN_OUT: "/api/member/signOut",
    ME: "/api/member/me",
  },

  // 학생 관련 엔드포인트
  STUDENT: {
    BASE: "/api/student",
    BY_ID: (id: number) => `/api/student/${id}`,
  },

  // 학원 관련 엔드포인트
  ACADEMY: {
    BASE: "/api/academy",
    BY_ID: (id: number) => `/api/academy/${id}`,
  },

  // 공지사항 관련 엔드포인트
  ANNOUNCEMENT: {
    BASE: "/api/announcement",
    BY_ID: (id: number) => `/api/announcement/${id}`,
  },

  // QnA 관련 엔드포인트
  QNA: {
    BASE: "/api/qna",
    BY_ID: (id: number) => `/api/qna/${id}`,
    COMMENT: {
      BY_QNA_ID: (qnaId: number) => `/api/qna/${qnaId}/comment`,
      BY_ID: (qnaId: number, commentId: number) => `/api/qna/${qnaId}/comment/${commentId}`,
    },
  },

  // 교재 관련 엔드포인트
  // TEXTBOOK: {
  //   BASE: "/api/textbook",
  //   BY_ID: (id: number) => `/api/textbook/${id}`,
  // },

  // 출석 관련 엔드포인트
  // ATTENDANCE: {
  //   BASE: "/api/attendance",
  //   BY_ID: (id: number) => `/api/attendance/${id}`,
  // },

  // 관리자 관련 엔드포인트
  ADMIN: {
    BASE: "/api/admin",
    BY_ID: (id: number) => `/api/admin/${id}`,
  },

  // 파일 관련 엔드포인트
  FILE: {
    BASE: "/api/files",
    BY_ID: (id: number) => `/api/files/${id}`,
    RELATION: "/api/files/relation",
    DOWNLOAD_URL: "/api/files/download-url",
    UPLOAD_URL: "/api/files/upload-url",
    BY_TARGET: (targetType: string, targetId: number) => `/api/files/${targetType}/${targetId}`,
    SEARCH: "/api/files/search",
  },

} as const;

// S3 설정
export const S3_CONFIG = {
  BUCKET_NAME: process.env.AWS_S3_BUCKET_NAME || 'jooeng',
  REGION: process.env.AWS_REGION || 'ap-northeast-2',
  ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID || '',
  SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY || '',
} as const;

// S3 클라이언트 인스턴스 (서버 사이드에서만 사용)
import { S3Client } from '@aws-sdk/client-s3';

export const s3Client = new S3Client({
  region: S3_CONFIG.REGION,
  credentials: {
    accessKeyId: S3_CONFIG.ACCESS_KEY_ID,
    secretAccessKey: S3_CONFIG.SECRET_ACCESS_KEY,
  },
});