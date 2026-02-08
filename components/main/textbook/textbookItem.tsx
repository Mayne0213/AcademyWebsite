import { Textbook } from "@/components/type/textbookType";
import { Pencil, Download, Trash, Star, FileText, Headphones } from "lucide-react";
import React from "react";

interface TextbookProps {
  textbook: Textbook;
  onToggleFavorite: (textbookId: number) => void;
  onRemoveTextbook: (textbook: Textbook) => void;
}

const TextbookItem: React.FC<TextbookProps> = ({
  textbook,
  onToggleFavorite,
  onRemoveTextbook,
}) => {
  const isAudio = textbook.fileType === "audio";

  return (
    <li
      key={textbook.textbookId}
      className="bg-white rounded-lg border border-gray-200 shadow-sm flex flex-col justify-between max-h-[160px]"
    >
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
          <button
            onClick={() => onToggleFavorite(textbook.textbookId)}
            className="text-yellow-400 hover:text-yellow-500 ml-2"
          >
            {textbook.favorite ? <Star fill="currentColor" /> : <Star />}
          </button>
        </div>
        <p className="text-sm text-gray-500">
          생성일: {new Date(textbook.createdAt).toLocaleDateString("ko-KR")}
        </p>
      </div>
      <div className="border-t border-gray-100 p-4 flex justify-between items-center space-x-2">
        <p className="text-sm text-gray-500">{textbook.category}</p>
        <div className="space-x-3 text-gray-500">
          <button
            onClick={() => alert("다운로드 준비 중")}
            title="다운로드"
            className="hover:text-blue-600"
          >
            <Download />
          </button>
          <button
            onClick={() => alert("수정 준비 중")}
            title="교재 수정"
            className="hover:text-blue-600"
          >
            <Pencil />
          </button>
          <button
            onClick={() => onRemoveTextbook(textbook)}
            title="교재 삭제"
            className="hover:text-red-600"
          >
            <Trash />
          </button>
        </div>
      </div>
    </li>
  );
};

export default TextbookItem;
