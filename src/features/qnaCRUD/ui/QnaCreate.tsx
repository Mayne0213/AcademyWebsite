import React from "react";
import { FileUploadDropzone, FileDisplay } from "@/src/entities/file/ui";
import type { File as FileEntity } from "@/src/entities/file/model/types";

interface QnaFormProps {
  form: {
    qnaTitle: string;
    qnaContent: string;
  };
  files: FileEntity[];
  isSubmitting: boolean;
  onFormChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onFileUploadComplete: (file: FileEntity) => void;
  onFileDelete: (fileId: number) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export const QnaCreate: React.FC<QnaFormProps> = ({
  form,
  files,
  isSubmitting,
  onFormChange,
  onFileUploadComplete,
  onFileDelete,
  onSubmit,
}) => {
  return (
    <form
      onSubmit={onSubmit}
      className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-6"
    >
      <div>
        <label className="block text-sm text-gray-700 mb-1">
          제목 <span className="text-red-500">*</span>
        </label>
        <input
          name="qnaTitle"
          value={form.qnaTitle}
          onChange={onFormChange}
          required
          maxLength={100}
          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="예) 주간지 / 8주차 / Day3 5번"
        />
        <p className="text-xs text-gray-500 mt-1">
          {form.qnaTitle.length}/100자
        </p>
      </div>

      <div>
        <label className="block text-sm text-gray-700 mb-1">
          내용 <span className="text-red-500">*</span>
        </label>
        <textarea
          name="qnaContent"
          value={form.qnaContent}
          onChange={onFormChange}
          rows={8}
          required
          maxLength={1000}
          className="w-full border whitespace-preline border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
          placeholder="예) 앞에 선행사가 있으니 관계대명사로 적절히 사용된거 아닌가요??"
        />
        <p className="text-xs text-gray-500 mt-1">
          {form.qnaContent.length}/1000자
        </p>
      </div>

      {/* 파일 업로드 */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          첨부 파일
        </label>
        <FileUploadDropzone
          onUploadComplete={onFileUploadComplete}
          multiple={true}
          folder="qna-files"
          className="mb-4"
        />
        
        {/* 업로드된 파일 목록 */}
        {files.length > 0 && (
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-gray-700">업로드된 파일:</h4>
            {files.map((file) => (
              <FileDisplay
                key={file.fileId}
                file={file}
                onDelete={onFileDelete}
              />
            ))}
          </div>
        )}
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isSubmitting}
          className={`px-4 py-2 rounded-md transition-all duration-200 ${
            isSubmitting
              ? "bg-gray-400 text-gray-600 cursor-not-allowed"
              : "bg-blue-600 text-white hover:bg-blue-700"
          }`}
        >
          {isSubmitting ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2 inline-block"></div>
              등록 중...
            </>
          ) : (
            "질문 등록"
          )}
        </button>
      </div>
    </form>
  );
};
