import jwt from "jsonwebtoken";
import { UserRole } from "@/shared/types";

// JWT 설정
export const JWT_CONFIG = {
  SECRET: process.env.JWT_SECRET || "your_jwt_secret_key",
  EXPIRES_IN: "7d", // 7일
  REFRESH_EXPIRES_IN: "30d", // 30일
  
  // 토큰 생성
  generateToken: (payload: { memberId: number; role: UserRole }) => {
    return jwt.sign(payload, JWT_CONFIG.SECRET, {
      expiresIn: JWT_CONFIG.EXPIRES_IN,
    });
  },
  
  // 토큰 검증
  verifyToken: (token: string) => {
    try {
      return jwt.verify(token, JWT_CONFIG.SECRET) as {
        memberId: number;
        role: UserRole;
        iat: number;
        exp: number;
      };
    } catch (error) {
      return null;
    }
  },
  
  // 리프레시 토큰 생성
  generateRefreshToken: (payload: { memberId: number; role: UserRole }) => {
    return jwt.sign(payload, JWT_CONFIG.SECRET, {
      expiresIn: JWT_CONFIG.REFRESH_EXPIRES_IN,
    });
  },
} as const;

// 쿠키 설정
export const COOKIE_CONFIG = {
  // 기본 쿠키 설정
  DEFAULT_OPTIONS: {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7일
  },
  
  // 토큰 쿠키 이름
  TOKEN_NAME: "token",
  REFRESH_TOKEN_NAME: "refreshToken",
  
  // 쿠키에서 토큰 추출
  extractTokenFromCookies: (cookieHeader: string | null) => {
    if (!cookieHeader) return null;
    
    const cookies = Object.fromEntries(
      cookieHeader.split("; ").map((cookie) => {
        const [name, ...rest] = cookie.split("=");
        return [name, rest.join("=")];
      })
    );
    
    return cookies[COOKIE_CONFIG.TOKEN_NAME] || null;
  },
} as const;

// 인증 미들웨어 설정
export const AUTH_MIDDLEWARE_CONFIG = {
  // 인증이 필요한 경로 패턴
  PROTECTED_PATHS: [
    "/api/admin",
    "/api/student",
    "/api/academy", 
    "/api/announcement",
    "/api/qna",
    "/api/textbook",
    "/api/attendance",
  ],
  
  // 인증이 필요하지 않은 경로 패턴
  PUBLIC_PATHS: [
    "/api/member/signIn",
    "/api/member/signUp",
    "/api/member/signUpCombined",
    "/api/upload-url",
    "/api/delete-file",
  ],
  
  // 특정 역할만 접근 가능한 경로
  ROLE_BASED_PATHS: {
    ADMIN: [
      "/api/admin",
      "/api/academy",
      "/api/announcement",
      "/api/textbook",
    ],
    STUDENT: [
      "/api/student",
      "/api/qna",
    ],
    DEVELOPER: [
      "/api/admin",
      "/api/student",
      "/api/academy",
      "/api/announcement",
      "/api/qna",
      "/api/textbook",
      "/api/attendance",
    ],
  },
} as const;

// 세션 설정
export const SESSION_CONFIG = {
  // 세션 타임아웃 (밀리초)
  TIMEOUT: 30 * 60 * 1000, // 30분
  
  // 자동 로그아웃 시간
  AUTO_LOGOUT_TIME: 24 * 60 * 60 * 1000, // 24시간
  
  // 세션 갱신 간격
  REFRESH_INTERVAL: 5 * 60 * 1000, // 5분
} as const;

// 인증 헬퍼 함수들
export const authHelpers = {
  // 경로가 보호된 경로인지 확인
  isProtectedPath: (path: string): boolean => {
    return AUTH_MIDDLEWARE_CONFIG.PROTECTED_PATHS.some(protectedPath =>
      path.startsWith(protectedPath)
    );
  },
  
  // 경로가 공개 경로인지 확인
  isPublicPath: (path: string): boolean => {
    return AUTH_MIDDLEWARE_CONFIG.PUBLIC_PATHS.some(publicPath =>
      path.startsWith(publicPath)
    );
  },
  
  // 사용자 역할이 경로에 접근 가능한지 확인
  hasRoleAccess: (path: string, userRole: UserRole): boolean => {
    const rolePaths = AUTH_MIDDLEWARE_CONFIG.ROLE_BASED_PATHS[userRole as keyof typeof AUTH_MIDDLEWARE_CONFIG.ROLE_BASED_PATHS];
    if (!rolePaths) return false;
    
    return rolePaths.some((rolePath: string) => path.startsWith(rolePath));
  },
  
  // 토큰이 만료되었는지 확인
  isTokenExpired: (token: string): boolean => {
    const decoded = JWT_CONFIG.verifyToken(token);
    if (!decoded) return true;
    
    const now = Math.floor(Date.now() / 1000);
    return decoded.exp < now;
  },
  
  // 토큰을 갱신해야 하는지 확인
  shouldRefreshToken: (token: string): boolean => {
    const decoded = JWT_CONFIG.verifyToken(token);
    if (!decoded) return false;
    
    const now = Math.floor(Date.now() / 1000);
    const timeUntilExpiry = decoded.exp - now;
    const refreshThreshold = 60 * 60; // 1시간 전에 갱신
    
    return timeUntilExpiry < refreshThreshold;
  },
} as const;

// 인증 에러 메시지
export const AUTH_ERROR_MESSAGES = {
  TOKEN_MISSING: "인증 토큰이 없습니다.",
  TOKEN_INVALID: "유효하지 않은 토큰입니다.",
  TOKEN_EXPIRED: "토큰이 만료되었습니다.",
  INSUFFICIENT_PERMISSIONS: "접근 권한이 없습니다.",
  USER_NOT_FOUND: "사용자를 찾을 수 없습니다.",
  LOGIN_REQUIRED: "로그인이 필요합니다.",
} as const;

// 인증 성공 메시지
export const AUTH_SUCCESS_MESSAGES = {
  LOGIN_SUCCESS: "로그인되었습니다.",
  LOGOUT_SUCCESS: "로그아웃되었습니다.",
  TOKEN_REFRESHED: "토큰이 갱신되었습니다.",
} as const; 