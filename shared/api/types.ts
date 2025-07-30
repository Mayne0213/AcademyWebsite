// API 응답 타입
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

// API 요청 설정 타입
export interface ApiRequestConfig {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  headers?: Record<string, string>;
  body?: any;
  credentials?: RequestCredentials;
}

// API 에러 타입
export interface ApiError {
  message: string;
  status?: number;
  code?: string;
}