// API 엔드포인트 설정
export const API_ENDPOINTS = {
  // 인증 관련 엔드포인트
  AUTH: {
    SIGN_IN: "/api/member/signIn",
    SIGN_UP: "/api/member/signUp",
    SIGN_UP_COMBINED: "/api/member/signUpCombined",
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

  // 파일 업로드 관련 엔드포인트
  FILE: {
    UPLOAD_URL: "/api/upload-url",
    DELETE: "/api/delete-file",
  },

} as const;