import React from "react";
import { UseFormRegister, FieldErrors } from "react-hook-form";
import { FileUploadDropzone, FileDisplay } from "@/src/entities/file/ui";
import type { File as FileEntity } from "@/src/entities/file/model/types";

interface QnaFormData {
  qnaTitle: string;
  qnaContent: string;
}

interface QnaCreateFormProps {
  register: UseFormRegister<QnaFormData>;
  errors: FieldErrors<QnaFormData>;
  files: FileEntity[];
  isSubmitting: boolean;
  titleLength: number;
  contentLength: number;
  onFileUploadComplete: (file: FileEntity) => void;
  onFileDelete: (fileId: number) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export const QnaCreateForm: React.FC<QnaCreateFormProps> = ({
  register,
  errors,
  files,
  isSubmitting,
  titleLength,
  contentLength,
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
          {...register("qnaTitle", {
            required: "제목을 입력해주세요",
            maxLength: {
              value: 100,
              message: "제목은 100자 이하여야 합니다",
            },
          })}
          maxLength={100}
          className={`w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 ${
            errors.qnaTitle ? "border-red-500" : "border-gray-300"
          }`}
          placeholder="예) 주간지 / 8주차 / Day3 5번"
        />
        {errors.qnaTitle && (
          <p className="text-xs text-red-500 mt-1">{errors.qnaTitle.message}</p>
        )}
        <p className="text-xs text-gray-500 mt-1">
          {titleLength}/100자
        </p>
      </div>

      <div>
        <label className="block text-sm text-gray-700 mb-1">
          내용 <span className="text-red-500">*</span>
        </label>
        <textarea
          {...register("qnaContent", {
            required: "내용을 입력해주세요",
            maxLength: {
              value: 1000,
              message: "내용은 1000자 이하여야 합니다",
            },
          })}
          rows={8}
          maxLength={1000}
          className={`w-full border whitespace-preline rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none ${
            errors.qnaContent ? "border-red-500" : "border-gray-300"
          }`}
          placeholder="예) 앞에 선행사가 있으니 관계대명사로 적절히 사용된거 아닌가요??"
        />
        {errors.qnaContent && (
          <p className="text-xs text-red-500 mt-1">{errors.qnaContent.message}</p>
        )}
        <p className="text-xs text-gray-500 mt-1">
          {contentLength}/1000자
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
