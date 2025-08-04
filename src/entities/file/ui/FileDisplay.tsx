"use client";

import React, { useState } from 'react';
import type { File } from '@/src/entities/file/model/types';
import { fileApi } from '@/src/entities/file/api';
import { Download, Eye, X, FileImage, FileText, File as FileIcon } from 'lucide-react';
import { FORMATS } from '@/src/shared/lib/formats';

interface FileDisplayProps {
  file: File;
  onDelete?: (fileId: number) => void;
  showDelete?: boolean;
  className?: string;
}

const FileDisplay: React.FC<FileDisplayProps> = ({
  file,
  onDelete,
  showDelete = true,
  className = ""
}) => {
  const [signedUrl, setSignedUrl] = useState<string | null>(null);
  const [isLoadingUrl, setIsLoadingUrl] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const getFileIcon = (fileType: string) => {
    if (fileType.startsWith('image/')) {
      return <FileImage className="w-5 h-5 text-blue-500" />;
    } else if (fileType.includes('pdf') || fileType.includes('document')) {
      return <FileText className="w-5 h-5 text-red-500" />;
    } else {
      return <FileIcon className="w-5 h-5 text-gray-500" />;
    }
  };

  const getSignedUrl = async () => {
    if (signedUrl) return signedUrl;
    
    setIsLoadingUrl(true);
    try {
      const downloadUrl = await fileApi.getDownloadUrl(file.fileUrl); // fileUrl에 fileKey가 저장되어 있음
      setSignedUrl(downloadUrl);
      return downloadUrl;
    } finally {
      setIsLoadingUrl(false);
    }
  };

  const handleDownload = async () => {
    const url = await getSignedUrl();
    const link = document.createElement('a');
    link.href = url;
    link.download = file.originalName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePreview = async () => {
    const url = await getSignedUrl();
    if (file.fileType.startsWith('image/')) {
      window.open(url, '_blank');
    } else {
      handleDownload();
    }
  };

    const handleDelete = async () => {
    if (isDeleting) return;
    
    setIsDeleting(true);
    try {
      await fileApi.deleteFile(file.fileId);
      
      // 부모 컴포넌트에 삭제 완료 알림
      onDelete?.(file.fileId);
      
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className={`flex items-center justify-between p-3 bg-gray-50 rounded-lg border ${className}`}>
      <div className="flex items-center space-x-3 flex-1 min-w-0">
        {getFileIcon(file.fileType)}
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-gray-900 truncate">
            {file.originalName}
          </p>
          <p className="text-xs text-gray-500">
            {FORMATS.formatFileSize(file.fileSize || 0)} • {file.fileType}
          </p>
        </div>
      </div>
      
      <div className="flex items-center space-x-2 ml-3">
        <button
          onClick={handlePreview}
          disabled={isLoadingUrl}
          className="p-1 text-gray-500 hover:text-blue-600 transition-colors disabled:opacity-50"
          title="미리보기"
        >
          {isLoadingUrl ? (
            <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          ) : (
            <Eye className="w-4 h-4" />
          )}
        </button>
        
        <button
          onClick={handleDownload}
          disabled={isLoadingUrl}
          className="p-1 text-gray-500 hover:text-green-600 transition-colors disabled:opacity-50"
          title="다운로드"
        >
          {isLoadingUrl ? (
            <div className="w-4 h-4 border-2 border-green-600 border-t-transparent rounded-full animate-spin"></div>
          ) : (
            <Download className="w-4 h-4" />
          )}
        </button>
        
        {showDelete && (
          <button
            onClick={handleDelete}
            disabled={isDeleting}
            className="p-1 text-gray-500 hover:text-red-600 transition-colors disabled:opacity-50"
            title="삭제"
          >
            {isDeleting ? (
              <div className="w-4 h-4 border-2 border-red-600 border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <X className="w-4 h-4" />
            )}
          </button>
        )}
      </div>
    </div>
  );
};

export { FileDisplay }; 