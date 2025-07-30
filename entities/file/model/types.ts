// 파일 관련 타입 정의
export interface FileItem {
  url: string;
  name: string;
  type: string;
}

export interface FileUploadResponse {
  uploadUrl: string;
  key: string;
}

export interface FileDeleteResponse {
  success: boolean;
  message?: string;
}

// 파일 업로드 상태
export interface FileUploadState {
  isUploading: boolean;
  progress: number;
  error: string | null;
}

// 파일 유효성 검사 결과
export interface FileValidationResult {
  isValid: boolean;
  errors: string[];
} 