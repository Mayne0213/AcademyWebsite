import { API_ENDPOINTS } from "@/shared/config";
import { FileUploadResponse, FileDeleteResponse } from '../model/types';

// 파일 업로드 API 로직
export const fileApi = {
  // Presigned URL 요청
  getUploadUrl: async (
    file: File,
    folder?: string
  ): Promise<FileUploadResponse> => {
    const apiUrl = folder 
      ? `${API_ENDPOINTS.FILE.UPLOAD_URL}?fileType=${encodeURIComponent(file.type)}&folder=${encodeURIComponent(folder)}`
      : `${API_ENDPOINTS.FILE.UPLOAD_URL}?fileType=${encodeURIComponent(file.type)}`;
    
    const res = await fetch(apiUrl);
    if (!res.ok) {
      throw new Error('Presigned URL 요청 실패');
    }
    
    return res.json();
  },

  // S3 업로드
  uploadToS3: async (
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
  },

  // 파일 삭제
  deleteFile: async (fileUrl: string): Promise<FileDeleteResponse> => {
    const deleteResponse = await fetch(
      `${API_ENDPOINTS.FILE.DELETE}?fileUrl=${encodeURIComponent(fileUrl)}`,
      {
        method: 'DELETE',
      }
    );
    
    if (!deleteResponse.ok) {
      const errorData = await deleteResponse.json();
      throw new Error(errorData.error || '파일 삭제 실패');
    }
    
    return deleteResponse.json();
  },
} as const; 