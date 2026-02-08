import React, { useRef, useState } from "react";
import { useTextbookFeatureStore } from "../model/store";
import { fileApi } from "@/src/entities/file/api";
import { TextbookCategory, TEXTBOOK_CATEGORY_LABELS } from "@/src/entities/textbook/model/types";
import { toast } from "sonner";

interface TextbookUploadCardProps {
  onClick?: () => void;
}

const TextbookUploadCard: React.FC<TextbookUploadCardProps> = ({ onClick }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const { createTextbook } = useTextbookFeatureStore();

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // PDF 또는 오디오 파일 체크
    const allowedTypes = [
      'application/pdf',
      'audio/mpeg', 'audio/wav', 'audio/mp4', 'audio/ogg', 'audio/aac',
    ];
    if (!allowedTypes.includes(file.type)) {
      toast.error('PDF 또는 오디오 파일만 업로드 가능합니다.');
      return;
    }

    setIsUploading(true);

    try {
      // 1. S3 업로드 URL 생성
      const { uploadUrl, fileKey } = await fileApi.getUploadUrl(file.name, file.type, 'file');

      // 2. S3에 파일 업로드
      await fileApi.uploadToS3(uploadUrl, file);

      // 3. 교재 생성 (파일명을 교재명으로 사용, 기본 카테고리는 MATERIAL, 오디오는 LISTENING)
      const isAudio = file.type.startsWith('audio/');
      const extension = file.name.substring(file.name.lastIndexOf('.'));
      await createTextbook({
        textbookName: file.name.replace(extension, ''),
        fileName: fileKey,
        fileType: file.type,
        fileSize: file.size,
        isImportant: false,
        category: isAudio ? 'LISTENING' : 'MATERIAL',
      });

      // 파일 입력 초기화
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (error) {
      console.error('파일 업로드 실패:', error);
      toast.error('파일 업로드에 실패했습니다.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleClick = () => {
    if (isUploading) return;
    
    if (onClick) {
      onClick();
    } else {
      fileInputRef.current?.click();
    }
  };

  return (
    <section
      className={`w-full border border-dashed border-gray-300 rounded-lg items-center justify-center flex flex-col cursor-pointer hover:bg-blue-50 transition-colors h-[160px] ${
        isUploading ? 'opacity-50 cursor-not-allowed' : ''
      }`}
      onClick={handleClick}
    >
      <input
        ref={fileInputRef}
        type="file"
        accept="application/pdf,audio/mpeg,audio/wav,audio/mp4,audio/ogg,audio/aac"
        className="hidden"
        onChange={handleFileChange}
        disabled={isUploading}
      />
      <label className="text-blue-600 font-semibold text-lg cursor-pointer pointer-events-none">
        {isUploading ? '업로드 중...' : '+ 교재 PDF / 오디오 파일 업로드'}
      </label>
      {isUploading && (
        <div className="mt-2 animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
      )}
    </section>
  );
};

export default TextbookUploadCard;
