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
    PERSONAL: "/api/qnaPersonal",
    COMMENT: {
      BY_QNA_ID: (qnaId: number) => `/api/qna/${qnaId}/comment`,
      BY_ID: (qnaId: number, commentId: number) => `/api/qna/${qnaId}/comment/${commentId}`,
    },
  },

  // 교재 관련 엔드포인트
  TEXTBOOK: {
    BASE: "/api/textbook",
    BY_ID: (id: number) => `/api/textbook/${id}`,
  },

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
    DELETE_S3: "/api/files/delete-s3",
    BY_TARGET: (targetType: string, targetId: number) => `/api/files/${targetType}/${targetId}`,
    SEARCH: "/api/files/search",
  },

  // 예약 관련 엔드포인트
  RESERVATION: {
    BASE: "/api/reservation/student",
    ADMIN: "/api/reservation/admin",
  },

  // 스케줄 관련 엔드포인트
  SCHEDULE: {
    ADMINS: "/api/schedule/student",
    ADMIN: "/api/schedule/admin",
    BY_ADMIN_ID: (adminId: number) => `/api/schedule/student?adminId=${adminId}`,
  },

  // 시험 관련 엔드포인트
  EXAM: {
    BASE: "/api/exam",
    BY_ID: (id: number) => `/api/exam/${id}`,
  },

  // 시험 결과 관련 엔드포인트
  EXAM_RESULT: {
    BASE: "/api/examResult",
    BY_ID: (id: number) => `/api/examResult/${id}`,
    STATISTICS: (examId: number) => `/api/examResult/statistics/${examId}`,
    STATISTICS_BY_ACADEMY: (examId: number, academyId: number) => `/api/examResult/statistics/${examId}/academy/${academyId}`,
  },

} as const;

// S3 설정
export const S3_CONFIG = {
  BUCKET_NAME: process.env.AWS_S3_BUCKET_NAME || 'jooeng',
  REGION: process.env.AWS_REGION || 'ap-northeast-2',
  ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID || '',
  SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY || '',
  BASE_PATH: 'Joossam', // 모든 파일이 Joossam 폴더 안에 저장됨
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