"use client";

import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import { FileItem } from '../model/types';
import { fileApi } from '../api';
import { FILE_VALIDATION } from '../model/validation';

interface FileUploadProps {
  onUploadComplete: (imageUrl: string) => void;
  onLoadingChange?: (isLoading: boolean) => void;
  initialImageUrl?: string;
  folder?: string;
}

const FileUpload: React.FC<FileUploadProps> = ({
  onUploadComplete,
  onLoadingChange,
  initialImageUrl,
  folder,
}) => {
  const [loading, setLoading] = useState(false);
  const [currentImageUrl, setCurrentImageUrl] = useState(initialImageUrl || "");

  // 로딩 상태가 변경될 때마다 부모에게 알림
  useEffect(() => {
    onLoadingChange?.(loading);
  }, [loading, onLoadingChange]);

  // initialImageUrl이 변경될 때만 동기화 (최초 한 번)
  useEffect(() => {
    if (initialImageUrl !== undefined) {
      setCurrentImageUrl(initialImageUrl || "");
    }
  }, [initialImageUrl]);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) {
      toast.error("파일을 선택해주세요.");
      return;
    }

    // 파일 유효성 검사
    const validation = FILE_VALIDATION.validateFile(selectedFile);
    if (!validation.isValid) {
      toast.error(validation.errors.join(', '));
      return;
    }

    setLoading(true);

    try {
      console.log("파일 선택됨:", {
        name: selectedFile.name,
        type: selectedFile.type,
        size: selectedFile.size,
      });

      const { uploadUrl, key } = await fileApi.getUploadUrl(selectedFile, folder);
      await fileApi.uploadToS3(uploadUrl, selectedFile);

      const imageUrl = `https://jooeng.s3.ap-northeast-2.amazonaws.com/${key}`;

      // 자식에서 모든 것 처리
      setCurrentImageUrl(imageUrl);
      onUploadComplete(imageUrl);
      toast.success("파일이 성공적으로 업로드되었습니다!");
    } catch (err) {
      console.error("업로드 에러:", err);
      toast.error("파일 업로드 실패: " + (err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  // 완전히 자체 처리하는 삭제 함수
  const handleImageDelete = async () => {
    console.log("파일 삭제 처리 시작");

    if (!currentImageUrl) {
      setCurrentImageUrl("");
      onUploadComplete("");
      return;
    }

    try {
      // S3에서 실제 파일 삭제
      await fileApi.deleteFile(currentImageUrl);

      // 1. 자식 컴포넌트에서 상태 업데이트
      setCurrentImageUrl("");

      // 2. 부모에게 알림
      onUploadComplete("");

      // 3. 사용자 피드백
      toast.success("파일이 성공적으로 삭제되었습니다!");

      console.log("파일 삭제 처리 완료");
    } catch (error) {
      console.error('파일 삭제 오류:', error);
      toast.error(`파일 삭제 실패: ${(error as Error).message}`);
    }
  };

  return (
    <div>
      <label className="block text-sm font-sansKR-SemiBold text-gray-700 mb-1">
        첨부 파일
      </label>

      {/* 기존 파일 미리보기 */}
      {currentImageUrl && (
        <div className="mb-4 p-3 border border-gray-200 rounded-md bg-gray-50">
          <p className="text-sm text-gray-600 mb-2">현재 첨부된 파일:</p>
          <div className="flex items-center justify-between">
            {/* 이미지 파일인 경우 미리보기, 아닌 경우 파일명 표시 */}
            {currentImageUrl.match(/\.(jpg|jpeg|png|gif|webp)$/i) ? (
              <img
                src={currentImageUrl}
                alt="첨부 파일"
                className="h-20 w-20 object-cover rounded-md border"
              />
            ) : (
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <svg
                  className="w-8 h-8 text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>첨부된 파일</span>
              </div>
            )}
            <button
              type="button"
              onClick={handleImageDelete}
              className="text-red-600 hover:text-red-800 text-sm px-3 py-1 border border-red-300 rounded-md hover:bg-red-50"
            >
              파일 삭제
            </button>
          </div>
        </div>
      )}

      {/* 새 파일 업로드 */}
      <input
        type="file"
        onChange={handleFileChange}
        disabled={loading}
        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4
                   file:rounded-md file:border-0 file:text-sm file:font-semibold
                   file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
      />
      {loading && (
        <p className="text-sm text-gray-500 mt-2">업로드 중입니다...</p>
      )}
    </div>
  );
};

export default FileUpload; 