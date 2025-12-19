import { useState, useCallback } from 'react';
import { fileApi } from '@/src/entities/file/api';
import type { File as FileEntity } from '@/src/entities/file/model/types';

interface UploadProgress {
  [fileName: string]: number;
}

interface UseFileUploadReturn {
  isUploading: boolean;
  uploadProgress: UploadProgress;
  uploadFiles: (files: File[]) => Promise<void>;
  resetUpload: () => void;
}

export const useFileUpload = (
  onUploadComplete: (file: FileEntity) => void,
  onUploadError?: (error: string) => void
): UseFileUploadReturn => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<UploadProgress>({});

  const resetUpload = useCallback(() => {
    setIsUploading(false);
    setUploadProgress({});
  }, []);

  const uploadFiles = useCallback(async (acceptedFiles: File[]) => {
    if (acceptedFiles.length === 0) return;

    setIsUploading(true);
    setUploadProgress({});

    try {
      for (let i = 0; i < acceptedFiles.length; i++) {
        const file = acceptedFiles[i];

        try {
          // 진행률 업데이트
          setUploadProgress(prev => ({
            ...prev,
            [file.name]: 0
          }));

          // API를 통해 S3 업로드 URL 생성
          const { uploadUrl, fileKey } = await fileApi.getUploadUrl(file.name, file.type);

          // 진행률 업데이트 (URL 생성 완료)
          setUploadProgress(prev => ({
            ...prev,
            [file.name]: 30
          }));

          // S3에 파일 업로드
          await fileApi.uploadToS3(uploadUrl, file);

          // 진행률 업데이트 (S3 업로드 완료)
          setUploadProgress(prev => ({
            ...prev,
            [file.name]: 70
          }));

          // 파일 메타데이터 생성 (DB 저장은 엔티티 생성 시 수행)
          const fileData: FileEntity = {
            fileId: 0, // 임시 ID (엔티티 생성 시 실제 ID 할당됨)
            fileName: fileKey,
            originalName: file.name,
            fileUrl: fileKey,
            fileType: file.type,
            fileSize: file.size,
            createdAt: new Date(),
          };

          // 진행률 업데이트 (완료)
          setUploadProgress(prev => ({
            ...prev,
            [file.name]: 100
          }));

          onUploadComplete(fileData);
        } catch (error) {
          console.error(`파일 업로드 실패 (${file.name}):`, error);
          if (onUploadError) {
            const errorMessage = error instanceof Error ? error.message : '알 수 없는 오류가 발생했습니다.';
            onUploadError(`${file.name}: ${errorMessage}`);
          }
        }
      }
    } finally {
      setIsUploading(false);
      setUploadProgress({});
    }
  }, [onUploadComplete, onUploadError]);

  return {
    isUploading,
    uploadProgress,
    uploadFiles,
    resetUpload,
  };
}; 