import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useAuth } from "@/src/app/providers";
import { useQnAFeatureStore } from "@/src/features/qnaCRUD";
import { FileUploadDropzone, FileDisplay } from "@/src/entities/file/ui";
import type { File as FileEntity } from "@/src/entities/file/model/types";
import type { CreateQnARequest } from "@/src/entities/qna/model/types";

export const QnaCreate: React.FC = () => {
  const router = useRouter();
  const { createQnA } = useQnAFeatureStore();
  const { user } = useAuth();

  const [form, setForm] = useState({
    qnaTitle: "",
    qnaContent: "",
  });

  // 파일 업로드 상태 관리
  const [files, setFiles] = useState<FileEntity[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // 파일 업로드 완료 시 호출되는 함수
  const handleFileUploadComplete = (file: FileEntity) => {
    setFiles(prev => [...prev, file]);
    toast.success("파일이 성공적으로 업로드되었습니다!");
  };

  // 파일 삭제 함수
  const handleFileDelete = (fileId: number) => {
    setFiles(prev => prev.filter(file => file.fileId !== fileId));
    toast.info("파일이 제거되었습니다.");
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user?.memberId) {
      toast.error("로그인이 필요합니다.");
      return;
    }

    if (!form.qnaTitle.trim()) {
      toast.error("제목을 입력해주세요.");
      return;
    }

    if (!form.qnaContent.trim()) {
      toast.error("내용을 입력해주세요.");
      return;
    }

    setIsSubmitting(true);

    try {
      const newQna: CreateQnARequest = {
        qnaTitle: form.qnaTitle.trim(),
        qnaContent: form.qnaContent.trim(),
        qnaUserId: user.memberId,
        isItAnswered: false,
        files: files,
      };

      await createQnA(newQna);
      toast.success("질문이 성공적으로 등록되었습니다!");
      router.push("/dashboard/qna");
    } catch (error) {
      console.error("질문 등록 오류:", error);
      toast.error("질문 등록 중 오류가 발생했습니다.");
    } finally {
      setIsSubmitting(false);
    }
  };

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
          onChange={handleChange}
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
          onChange={handleChange}
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
          onUploadComplete={handleFileUploadComplete}
          multiple={true}
          folder="qna"
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
                onDelete={handleFileDelete}
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
