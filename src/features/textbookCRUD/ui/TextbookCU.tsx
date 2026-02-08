import React, { useState } from "react";
import { Button } from "@/src/shared/ui/button";
import { FileUploadDropzone } from "@/src/entities/file/ui";
import { File as FileEntity } from "@/src/entities/file/model/types";
import { TextbookCategory, TEXTBOOK_CATEGORY_LABELS } from "@/src/entities/textbook/model/types";
import { useTextbookFeatureStore } from "../model/store";
import { toast } from "sonner";

interface TextbookCUProps {
  onClose: () => void;
}

const TextbookCU: React.FC<TextbookCUProps> = ({ onClose }) => {
  const { createTextbook } = useTextbookFeatureStore();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [form, setForm] = useState({
    category: 'MATERIAL' as TextbookCategory,
    isImportant: false,
  });
  const [uploadedFile, setUploadedFile] = useState<FileEntity | null>(null);

  // 파일 업로드 완료 핸들러
  const handleFileUploadComplete = (file: FileEntity) => {
    setUploadedFile(file);
  };

  // 폼 제출 핸들러
  const handleSubmit = async () => {
    if (!uploadedFile) {
      toast.error("파일을 업로드해주세요.");
      return;
    }

    setIsSubmitting(true);
    try {
      await createTextbook({
        textbookName: uploadedFile.originalName,
        fileName: uploadedFile.fileName,
        fileType: uploadedFile.fileType,
        fileSize: uploadedFile.fileSize,
        isImportant: form.isImportant,
        category: form.category,
      });

      // 초기화
      setUploadedFile(null);
      setForm({
        category: 'MATERIAL',
        isImportant: false,
      });
      onClose();
    } catch (error) {
      console.error("교재 등록 오류:", error);
      toast.error("교재 등록 중 오류가 발생했습니다.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white border border-gray-300 rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4 text-gray-900">교재 추가</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* 카테고리 선택 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            카테고리 <span className="text-red-500">*</span>
          </label>
          <select
            value={form.category}
            onChange={(e) => setForm(prev => ({ ...prev, category: e.target.value as TextbookCategory }))}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            {(Object.keys(TEXTBOOK_CATEGORY_LABELS) as TextbookCategory[]).map((category) => (
              <option key={category} value={category}>
                {TEXTBOOK_CATEGORY_LABELS[category]}
              </option>
            ))}
          </select>
        </div>

        {/* 중요 표시 */}
        <div className="flex items-end">
          <label className="flex items-center gap-2 cursor-pointer pb-2">
            <input
              type="checkbox"
              checked={form.isImportant}
              onChange={(e) => setForm(prev => ({ ...prev, isImportant: e.target.checked }))}
              className="rounded border-gray-300 text-yellow-500 focus:ring-yellow-500 w-4 h-4"
            />
            <span className="text-sm text-gray-700">중요 교재로 표시</span>
          </label>
        </div>
      </div>

      {/* 파일 업로드 섹션 */}
      <div className="mt-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          파일 업로드 (PDF, 오디오) <span className="text-red-500">*</span>
        </label>
        <FileUploadDropzone
          onUploadComplete={handleFileUploadComplete}
          multiple={false}
          accept={{
            'application/pdf': ['.pdf'],
            'audio/mpeg': ['.mp3'],
            'audio/wav': ['.wav'],
            'audio/mp4': ['.m4a'],
            'audio/ogg': ['.ogg'],
            'audio/aac': ['.aac'],
          }}
          folder="file"
        />

        {/* 업로드된 파일 표시 */}
        {uploadedFile && (
          <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded-md">
            <p className="text-sm text-green-700">
              <span className="font-medium">✓ 파일 업로드 완료:</span> {uploadedFile.originalName}
            </p>
          </div>
        )}
      </div>

      {/* 버튼 영역 */}
      <div className="flex justify-end gap-2 mt-6 pt-4 border-t">
        <Button
          variant="outline"
          onClick={onClose}
        >
          취소
        </Button>
        <Button
          variant="default"
          onClick={handleSubmit}
          disabled={isSubmitting || !uploadedFile}
          className="bg-blue-600 hover:bg-blue-700"
        >
          {isSubmitting ? "저장 중..." : "추가"}
        </Button>
      </div>
    </div>
  );
};

export default TextbookCU;
