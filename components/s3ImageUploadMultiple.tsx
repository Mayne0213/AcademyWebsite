"use client";

import React, { useState, useEffect } from "react";
import { toast } from "sonner";

interface FileItem {
  url: string;
  name: string;
  type: string;
}

interface S3ImageUploadMultipleProps {
  onUploadComplete: (files: FileItem[]) => void;
  onLoadingChange?: (isLoading: boolean) => void; // 로딩 상태 콜백 추가
  initialFiles: FileItem[];
  folder?: string;
}

const S3ImageUploadMultiple: React.FC<S3ImageUploadMultipleProps> = ({ 
  onUploadComplete, 
  onLoadingChange,
  initialFiles, 
  folder 
}) => {
  const [loading, setLoading] = useState(false);

  // 로딩 상태가 변경될 때마다 부모에게 알림
  useEffect(() => {
    onLoadingChange?.(loading);
  }, [loading, onLoadingChange]);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;
    if (!selectedFiles || selectedFiles.length === 0) {
      toast.error("파일을 선택해주세요.");
      return;
    }

    setLoading(true);
    const uploaded: FileItem[] = [...initialFiles];

    for (let i = 0; i < selectedFiles.length; i++) {
      const file = selectedFiles[i];
      try {
        const apiUrl = `/api/upload-url?fileType=${encodeURIComponent(file.type)}&folder=${encodeURIComponent(folder || "")}`;
        const res = await fetch(apiUrl);
        if (!res.ok) throw new Error("Presigned URL 요청 실패");
        const { uploadUrl, key } = await res.json();
        const uploadRes = await fetch(uploadUrl, {
          method: "PUT",
          body: file,
          headers: { "Content-Type": file.type },
        });
        if (!uploadRes.ok) throw new Error("S3 업로드 실패");
        const url = key.startsWith("http")
          ? key
          : `https://jooeng.s3.ap-northeast-2.amazonaws.com/${key.startsWith("/") ? key.slice(1) : key}`;
        uploaded.push({ url, name: file.name, type: file.type });
      } catch (err) {
        toast.error(`파일 업로드 실패: ${(err as Error).message}`);
      }
    }
    onUploadComplete(uploaded);
    setLoading(false);
    toast.success("모든 파일이 업로드되었습니다!");
  };

  const handleFileDelete = async (index: number) => {
    const fileToDelete = initialFiles[index];
    const updated = initialFiles.filter((_, i) => i !== index);
    try {
      const deleteResponse = await fetch(`/api/delete-file?fileUrl=${encodeURIComponent(fileToDelete.url)}`, {
        method: 'DELETE',
      });
      if (!deleteResponse.ok) {
        const errorData = await deleteResponse.json();
        throw new Error(errorData.error || '파일 삭제 실패');
      }
      toast.success("파일이 성공적으로 삭제되었습니다!");
    } catch (error) {
      console.error('파일 삭제 오류:', error);
      toast.error(`파일 삭제 실패: ${(error as Error).message}`);
    } finally {
      onUploadComplete(updated);
    }
  };

  return (
    <div>
      <label className="block text-sm font-sansKR-SemiBold text-gray-700 mb-1">첨부 파일</label>
      {/* 기존 파일 목록 */}
      {initialFiles.length > 0 && (
        <div className="mb-4">
          <p className="text-sm text-gray-600 mb-2">현재 첨부된 파일:</p>
          <ul className="space-y-2">
            {initialFiles.map((file, idx) => (
              <li key={idx} className="flex items-center gap-2 border rounded-md p-2 bg-gray-50">
                <span className="flex-1 text-sm break-all">{file.name}</span>
                <button
                  type="button"
                  onClick={() => handleFileDelete(idx)}
                  className="text-red-600 hover:text-red-800 text-xs px-2 py-1 border border-red-300 rounded-md hover:bg-red-50"
                >
                  삭제
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
      {/* 새 파일 업로드 */}
      <input
        type="file"
        multiple
        onChange={handleFileChange}
        disabled={loading}
        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
      />
      {loading && <p className="text-sm text-gray-500 mt-2">업로드 중입니다...</p>}
    </div>
  );
};

export default S3ImageUploadMultiple; 