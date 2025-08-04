import React from 'react';
import { Upload, AlertCircle } from 'lucide-react';
import { UploadProgress } from './UploadProgress';

interface DropzoneContentProps {
  isUploading: boolean;
  isDragActive: boolean;
  isDragReject: boolean;
  uploadProgress: Record<string, number>;
  maxSize: number;
}

const DropzoneContent: React.FC<DropzoneContentProps> = ({
  isUploading,
  isDragActive,
  isDragReject,
  uploadProgress,
  maxSize,
}) => {
  if (isUploading) {
    return (
      <>
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <p className="text-sm text-gray-600">업로드 중...</p>
        <UploadProgress uploadProgress={uploadProgress} />
      </>
    );
  }

  return (
    <>
      <div className="flex items-center justify-center w-16 h-16 rounded-full bg-gray-100">
        {isDragReject ? (
          <AlertCircle className="w-8 h-8 text-red-500" />
        ) : (
          <Upload className="w-8 h-8 text-gray-400" />
        )}
      </div>
      <div className="text-sm text-gray-600">
        {isDragReject ? (
          <p className="font-medium text-red-600">지원하지 않는 파일입니다</p>
        ) : isDragActive ? (
          <p className="font-medium text-blue-600">파일을 여기에 놓으세요</p>
        ) : (
          <>
            <p className="font-medium">파일을 드래그하거나 클릭하여 업로드</p>
            <p className="text-xs text-gray-500 mt-1">
              최대 {Math.round(maxSize / (1024 * 1024))}MB까지 업로드 가능
            </p>
          </>
        )}
      </div>
    </>
  );
};

export { DropzoneContent }; 