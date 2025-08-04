// 에러 메시지
export const ERROR_MESSAGES = {
  // 인증 관련
  AUTH: {
    LOGIN_FAILED: "로그인에 실패했습니다.",
    SIGNUP_FAILED: "회원가입에 실패했습니다.",
    UNAUTHORIZED: "인증이 필요합니다.",
    FORBIDDEN: "접근 권한이 없습니다.",
    TOKEN_EXPIRED: "토큰이 만료되었습니다.",
    TOKEN_INVALID: "유효하지 않은 토큰입니다.",
    INSUFFICIENT_PERMISSIONS: "권한이 부족합니다.",
  },
  
  // API 관련
  API: {
    FETCH_FAILED: "데이터를 불러오는데 실패했습니다.",
    CREATE_FAILED: "생성에 실패했습니다.",
    UPDATE_FAILED: "수정에 실패했습니다.",
    DELETE_FAILED: "삭제에 실패했습니다.",
    SERVER_ERROR: "서버 오류가 발생했습니다.",
    NETWORK_ERROR: "네트워크 오류가 발생했습니다.",
  },
  
  // 파일 관련
  FILE: {
    UPLOAD_FAILED: "파일 업로드에 실패했습니다.",
    DELETE_FAILED: "파일 삭제에 실패했습니다.",
    INVALID_TYPE: "지원하지 않는 파일 형식입니다.",
    TOO_LARGE: "파일 크기가 너무 큽니다.",
    INVALID_IMAGE_TYPE: "지원하지 않는 이미지 형식입니다.",
    INVALID_DOCUMENT_TYPE: "지원하지 않는 문서 형식입니다.",
    FILE_NOT_FOUND: "파일을 찾을 수 없습니다.",
  },
  
  // 유효성 검사
  VALIDATION: {
    REQUIRED: "필수 입력 항목입니다.",
    INVALID_FORMAT: "올바른 형식으로 입력해주세요.",
    PASSWORD_MISMATCH: "비밀번호가 일치하지 않습니다.",
    INVALID_PHONE: "올바른 전화번호 형식을 입력해주세요.",
    INVALID_BIRTH_YEAR: "올바른 출생년도를 입력해주세요.",
    INVALID_EMAIL: "올바른 이메일 형식을 입력해주세요.",
    INVALID_NAME: "올바른 이름 형식을 입력해주세요.",
    INVALID_ADDRESS: "올바른 주소 형식을 입력해주세요.",
    INVALID_URL: "올바른 URL 형식을 입력해주세요.",
    PASSWORD_TOO_WEAK: "비밀번호는 영문, 숫자, 특수문자를 포함하여 8자 이상이어야 합니다.",
  },
  
  // 환경 변수 관련
  ENV: {
    MISSING_REQUIRED_VARS: "필수 환경 변수가 설정되지 않았습니다.",
    AWS_CONFIG_MISSING: "AWS 설정이 완료되지 않았습니다.",
    DATABASE_CONFIG_MISSING: "데이터베이스 설정이 완료되지 않았습니다.",
  },
} as const;

// 성공 메시지
export const SUCCESS_MESSAGES = {
  // 인증 관련
  AUTH: {
    LOGIN_SUCCESS: "로그인되었습니다.",
    SIGNUP_SUCCESS: "회원가입이 완료되었습니다.",
    LOGOUT_SUCCESS: "로그아웃되었습니다.",
    PASSWORD_CHANGED: "비밀번호가 변경되었습니다.",
    PROFILE_UPDATED: "프로필이 업데이트되었습니다.",
  },
  
  // CRUD 관련
  CRUD: {
    CREATE_SUCCESS: "생성되었습니다.",
    UPDATE_SUCCESS: "수정되었습니다.",
    DELETE_SUCCESS: "삭제되었습니다.",
    SAVE_SUCCESS: "저장되었습니다.",
  },
  
  // 파일 관련
  FILE: {
    UPLOAD_SUCCESS: "파일이 업로드되었습니다.",
    DELETE_SUCCESS: "파일이 삭제되었습니다.",
    UPLOAD_URL_GENERATED: "업로드 URL이 생성되었습니다.",
  },
  
  // 학생 관리 관련
  STUDENT: {
    REGISTER_SUCCESS: "학생이 등록되었습니다.",
    UPDATE_SUCCESS: "학생 정보가 수정되었습니다.",
    DELETE_SUCCESS: "학생이 삭제되었습니다.",
  },
  
  // 공지사항 관련
  ANNOUNCEMENT: {
    CREATE_SUCCESS: "공지사항이 등록되었습니다.",
    UPDATE_SUCCESS: "공지사항이 수정되었습니다.",
    DELETE_SUCCESS: "공지사항이 삭제되었습니다.",
  },
  
  // QnA 관련
  QNA: {
    CREATE_SUCCESS: "질문이 등록되었습니다.",
    UPDATE_SUCCESS: "질문이 수정되었습니다.",
    DELETE_SUCCESS: "질문이 삭제되었습니다.",
    COMMENT_CREATE_SUCCESS: "댓글이 등록되었습니다.",
    COMMENT_UPDATE_SUCCESS: "댓글이 수정되었습니다.",
    COMMENT_DELETE_SUCCESS: "댓글이 삭제되었습니다.",
  },
} as const; 