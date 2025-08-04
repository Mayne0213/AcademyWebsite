"use client";

import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { FILE_VALIDATION } from '@/src/entities/file/model';
import { useFileUpload } from '@/src/features/fileUpload';
import { toast } from 'sonner';
import type { File as FileEntity } from '@/src/entities/file/model/types';
import { DropzoneContent } from './DropzoneContent';

interface FileUploadDropzoneProps {
  onUploadComplete: (file: FileEntity) => void;
  multiple?: boolean;
  accept?: Record<string, string[]>;
  maxSize?: number;
  className?: string;
  disabled?: boolean;
  folder?: string;
}

const FileUploadDropzone: React.FC<FileUploadDropzoneProps> = ({
  onUploadComplete,
  multiple = false,
  accept = FILE_VALIDATION.getAcceptObject(),
  maxSize = 10 * 1024 * 1024, // 10MB
  className = "",
  disabled = false,
  folder = ""
}) => {
  // 내부 에러 핸들러
  const handleUploadError = (error: string) => {
    toast.error(`파일 업로드 실패: ${error}`);
  };

  const { isUploading, uploadProgress, uploadFiles } = useFileUpload(onUploadComplete, handleUploadError);

  const onDrop = useCallback(async (acceptedFiles: File[], rejectedFiles: any[]) => {
    if (rejectedFiles.length > 0) {
      rejectedFiles.forEach(({ file, errors }) => {
        errors.forEach((error: any) => {
          const message = FILE_VALIDATION.getErrorMessage(error, file.name);
          toast.error(message);
        });
      });
      return;
    }

    if (acceptedFiles.length === 0) return;

    await uploadFiles(acceptedFiles as any);
  }, [uploadFiles]);

  const { getRootProps, getInputProps, isDragActive, isDragReject } = useDropzone({
    onDrop,
    accept,
    multiple,
    maxSize,
    disabled: disabled || isUploading,
  });

  return (
    <div className={`w-full ${className}`}>
      <div
        {...getRootProps()}
        className={`
          relative border-2 border-dashed rounded-lg p-6 text-center transition-all duration-200
          ${isDragActive && !isDragReject 
            ? 'border-blue-500 bg-blue-50 scale-105' 
            : isDragReject
            ? 'border-red-500 bg-red-50'
            : 'border-gray-300 hover:border-gray-400'
          }
          ${disabled || isUploading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        `}
      >
        <input {...getInputProps()} />
        
        <div className="flex flex-col items-center justify-center space-y-4">
          <DropzoneContent
            isUploading={isUploading}
            isDragActive={isDragActive}
            isDragReject={isDragReject}
            uploadProgress={uploadProgress}
            maxSize={maxSize}
          />
        </div>
      </div>
    </div>
  );
};

export { FileUploadDropzone }; 