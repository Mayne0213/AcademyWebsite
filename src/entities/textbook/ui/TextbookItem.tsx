"use client";

import React from "react";
import { Download, Trash, Star, FileText, Headphones } from "lucide-react";
import { Textbook, TEXTBOOK_CATEGORY_LABELS } from "@/src/entities/textbook/model/types";
import { fileApi } from "@/src/entities/file/api";

interface TextbookItemProps {
  textbook: Textbook;
  onToggleImportant?: (textbookId: number, isImportant: boolean) => void;
  onDelete?: (textbookId: number) => void;
}

const TextbookItem: React.FC<TextbookItemProps> = ({
  textbook,
  onToggleImportant,
  onDelete,
}) => {
  const handleDelete = () => {
    if (onDelete) {
      const confirmed = window.confirm(
        "정말 삭제하시겠습니까?\n삭제된 파일은 복구될 수 없습니다.",
      );
      if (confirmed) {
        onDelete(textbook.textbookId);
      }
    }
  };

  const handleDownload = async () => {
    try {
      const downloadUrl = await fileApi.getDownloadUrl(textbook.fileName);
      window.open(downloadUrl, '_blank');
    } catch (error) {
      console.error("다운로드 실패:", error);
    }
  };

  const isAudio = textbook.fileType?.startsWith('audio/');

  return (
    <li className="bg-white rounded-lg border border-gray-200 shadow-sm flex flex-col justify-between max-h-[160px]">
      <div className="p-4 flex flex-col">
        <div className="flex justify-between items-start mb-2">
          <div className="flex items-center gap-2">
            {isAudio ? (
              <Headphones className="w-5 h-5 text-purple-500 shrink-0" />
            ) : (
              <FileText className="w-5 h-5 text-red-500 shrink-0" />
            )}
            <p className="font-sansKR-SemiBold text-lg">
              {textbook.textbookName}
            </p>
          </div>
          {onToggleImportant && (
            <button
              onClick={() => onToggleImportant(textbook.textbookId, !textbook.isImportant)}
              className="text-yellow-400 hover:text-yellow-500 ml-2"
            >
              {textbook.isImportant ? <Star fill="currentColor" /> : <Star />}
            </button>
          )}
        </div>
        <p className="text-sm text-gray-500">
          생성일: {new Date(textbook.createdAt).toLocaleDateString("ko-KR")}
        </p>
      </div>
      <div className="border-t border-gray-100 p-4 flex justify-between items-center space-x-2">
        <p className="text-sm text-gray-500">{TEXTBOOK_CATEGORY_LABELS[textbook.category]}</p>
        <div className="space-x-3 text-gray-500">
          <button
            onClick={handleDownload}
            title="다운로드"
            className="hover:text-blue-600"
          >
            <Download />
          </button>
          {onDelete && (
            <button
              onClick={handleDelete}
              title="교재 삭제"
              className="hover:text-red-600"
            >
              <Trash />
            </button>
          )}
        </div>
      </div>
    </li>
  );
};

export default TextbookItem;
