// 공통 API 함수들

// 기본 API 설정
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '';

// 공통 헤더
const getDefaultHeaders = () => ({
  'Content-Type': 'application/json',
});

// 인증 헤더 (쿠키 포함)
const getAuthHeaders = () => ({
  ...getDefaultHeaders(),
  credentials: 'include' as const,
});

// 기본 fetch 래퍼
const apiRequest = async (
  url: string,
  options: RequestInit = {}
): Promise<Response> => {
  const response = await fetch(url, {
    ...options,
    headers: {
      ...getDefaultHeaders(),
      ...options.headers,
    },
  });

  if (!response.ok) {
    throw new Error(`API 요청 실패: ${response.status} ${response.statusText}`);
  }

  return response;
};

// GET 요청
export const apiGet = async <T>(url: string): Promise<T> => {
  const response = await apiRequest(url);
  return response.json();
};

// POST 요청
export const apiPost = async <T>(
  url: string,
  data: any,
  options: RequestInit = {}
): Promise<T> => {
  const response = await apiRequest(url, {
    method: 'POST',
    body: JSON.stringify(data),
    ...options,
  });
  return response.json();
};

// PUT 요청
export const apiPut = async <T>(
  url: string,
  data: any,
  options: RequestInit = {}
): Promise<T> => {
  const response = await apiRequest(url, {
    method: 'PUT',
    body: JSON.stringify(data),
    ...options,
  });
  return response.json();
};

// DELETE 요청
export const apiDelete = async <T>(
  url: string,
  options: RequestInit = {}
): Promise<T> => {
  const response = await apiRequest(url, {
    method: 'DELETE',
    ...options,
  });
  return response.json();
};

// 인증이 필요한 API 요청들
export const apiGetWithAuth = async <T>(url: string): Promise<T> => {
  const response = await apiRequest(url, {
    headers: getAuthHeaders(),
  });
  return response.json();
};

export const apiPostWithAuth = async <T>(
  url: string,
  data: any
): Promise<T> => {
  const response = await apiRequest(url, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: getAuthHeaders(),
  });
  return response.json();
};

export const apiPutWithAuth = async <T>(
  url: string,
  data: any
): Promise<T> => {
  const response = await apiRequest(url, {
    method: 'PUT',
    body: JSON.stringify(data),
    headers: getAuthHeaders(),
  });
  return response.json();
};

export const apiDeleteWithAuth = async <T>(url: string): Promise<T> => {
  const response = await apiRequest(url, {
    method: 'DELETE',
    headers: getAuthHeaders(),
  });
  return response.json();
};

// 파일 업로드 관련 API
export const uploadFile = async (
  file: File,
  folder?: string
): Promise<{ uploadUrl: string; key: string }> => {
  const apiUrl = folder 
    ? `/api/upload-url?fileType=${encodeURIComponent(file.type)}&folder=${encodeURIComponent(folder)}`
    : `/api/upload-url?fileType=${encodeURIComponent(file.type)}`;
  
  const res = await fetch(apiUrl);
  if (!res.ok) {
    throw new Error('Presigned URL 요청 실패');
  }
  
  return res.json();
};

export const uploadToS3 = async (
  uploadUrl: string,
  file: File
): Promise<void> => {
  const uploadRes = await fetch(uploadUrl, {
    method: 'PUT',
    body: file,
    headers: {
      'Content-Type': file.type,
    },
  });

  if (!uploadRes.ok) {
    throw new Error('S3 업로드 실패');
  }
};

export const deleteFile = async (fileUrl: string): Promise<void> => {
  const deleteResponse = await fetch(
    `/api/delete-file?fileUrl=${encodeURIComponent(fileUrl)}`,
    {
      method: 'DELETE',
    }
  );
  
  if (!deleteResponse.ok) {
    const errorData = await deleteResponse.json();
    throw new Error(errorData.error || '파일 삭제 실패');
  }
};

// API 응답 타입
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  totalCount: number;
  page: number;
  pageSize: number;
} 