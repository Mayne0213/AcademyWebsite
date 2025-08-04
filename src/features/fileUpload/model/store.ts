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

        // 데이터베이스에 파일 정보 저장
        const fileData = {
          fileName: fileKey,
          originalName: file.name,
          fileUrl: fileKey,
          fileType: file.type,
          fileSize: file.size,
        };

        const savedFile = await fileApi.createFile(fileData);

        // 진행률 업데이트 (완료)
        setUploadProgress(prev => ({
          ...prev,
          [file.name]: 100
        }));

        onUploadComplete(savedFile);
      }
    } finally {
      setIsUploading(false);
      setUploadProgress({});
    }
  }, [onUploadComplete]);

  return {
    isUploading,
    uploadProgress,
    uploadFiles,
    resetUpload,
  };
}; 