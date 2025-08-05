// entities/file/api/index.ts
import type { File, CreateFileRequest } from "@/src/entities/file/model/types";
import { apiPost, apiDelete } from "@/src/shared/api/http";
import { API_ENDPOINTS } from "@/src/shared/config/api";
import { FILE_VALIDATION } from "@/src/entities/file/model/validation";
import { toast } from "sonner";

// 파일 API 관련 함수들
export const fileApi = {
  getDownloadUrl: async (fileKey: string): Promise<string> => {
    try {
      const result = await apiPost<{ downloadUrl: string }>(API_ENDPOINTS.FILE.DOWNLOAD_URL, { fileKey });
      return result.downloadUrl;
    } catch (error) {
      throw error;
    }
  },

  // S3 업로드 URL 생성
  getUploadUrl: async (fileName: string, fileType: string): Promise<{ uploadUrl: string; fileKey: string }> => {
    try {
      const result = await apiPost<{ uploadUrl: string; fileKey: string }>(API_ENDPOINTS.FILE.UPLOAD_URL, {
        fileName,
        fileType,
      });
      return result;
    } catch (error) {
      throw error;
    }
  },

  // S3에 파일 업로드
  uploadToS3: async (uploadUrl: string, file: globalThis.File): Promise<void> => {
    try {
      const uploadResponse = await fetch(uploadUrl, {
        method: 'PUT',
        body: file,
        headers: {
          'Content-Type': file.type,
          'Cache-Control': 'no-cache',
        },
      });

      if (!uploadResponse.ok) {
        const errorMessage = `S3 업로드에 실패했습니다. (${uploadResponse.status}: ${uploadResponse.statusText})`;
        toast.error(errorMessage);
        throw new Error(errorMessage);
      }
    } catch (error: any) {
      const errorMessage = error.message || 'S3 업로드에 실패했습니다.';
      toast.error(errorMessage);
      throw new Error(errorMessage);
    }
  },

  // 파일 생성
  createFile: async (fileData: CreateFileRequest): Promise<File> => {
    try {
      const validation = FILE_VALIDATION.validateFileForCreate(fileData);
      if (!validation.isValid) {
        const errorMessage = validation.errors[0] || '유효하지 않은 파일 데이터입니다.';
        toast.error(errorMessage);
        throw new Error(errorMessage);
      }

      const result = await apiPost<File>(API_ENDPOINTS.FILE.BASE, fileData);
      toast.success("파일이 성공적으로 생성되었습니다.");

      return result;
    } catch (error) {
      if (error instanceof Error && error.message.includes("validation")) {
        toast.error("입력 정보를 확인해주세요.");
      }
      throw error;
    }
  },

  // 파일 삭제 (DB + S3)
  deleteFile: async (fileId: number): Promise<number> => {
    try {
      await apiDelete<void>(`${API_ENDPOINTS.FILE.BASE}?fileId=${fileId}`);
      toast.success("파일이 성공적으로 삭제되었습니다.");

      return fileId;
    } catch (error) {
      throw error;
    }
  },
};