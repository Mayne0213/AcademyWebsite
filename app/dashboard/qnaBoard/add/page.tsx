"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useQna } from "@/components/hooks/useQna";
import Header from "@/app/DashboardStructureComponent/header";
import { toast } from "sonner";
import { useAuth } from "@/contexts/authContexts";
import { FileUpload } from "@/entities/file";

interface QnaFormInput {
  qnaTitle: string;
  qnaContent: string;
  qnaUserId: number;
  qnaImageUrl?: string;
}

const AddQnAPage = () => {
  const router = useRouter();
  const { addQna } = useQna();
  const { user } = useAuth();

  const [form, setForm] = useState({
    qnaTitle: "",
    qnaContent: "",
  });

  // 업로드된 이미지 URL 상태 관리
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isImageUploading, setIsImageUploading] = useState(false); // 이미지 업로드 로딩 상태 추가

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // 이미지 업로드 완료 시 호출되는 함수
  const handleImageUploadComplete = (imageUrl: string) => {
    setUploadedImageUrl(imageUrl);
    toast.success("이미지가 성공적으로 업로드되었습니다!");
  };

  // 이미지 업로드 로딩 상태 핸들러
  const handleImageUploadLoading = (isLoading: boolean) => {
    setIsImageUploading(isLoading);
  };

  // 업로드된 이미지 제거 함수
  const handleRemoveImage = () => {
    setUploadedImageUrl("");
    toast.info("이미지가 제거되었습니다.");
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
      const newQna: QnaFormInput = {
        qnaTitle: form.qnaTitle.trim(),
        qnaContent: form.qnaContent.trim(),
        qnaUserId: user.memberId,
        qnaImageUrl: uploadedImageUrl || "",
      };

      addQna(newQna);
      toast.success("질문이 성공적으로 등록되었습니다!");
      router.push("/dashboard/qnaBoard");
    } catch (error) {
      console.error("질문 등록 오류:", error);
      toast.error("질문 등록 중 오류가 발생했습니다.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header title="질문 작성" description="궁금한 점을 등록하세요" />
      <div className="max-w-3xl mx-auto px-4 mt-6">
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

          {/* 이미지 업로드 섹션 */}
          <div>
          <FileUpload
              onUploadComplete={handleImageUploadComplete} 
              onLoadingChange={handleImageUploadLoading}
              folder="dashboard/qna" 
            />
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isSubmitting || isImageUploading} // 이미지 업로드 중에도 비활성화
              className={`px-4 py-2 rounded-md transition-all duration-200 ${
                isSubmitting || isImageUploading
                  ? "bg-gray-400 text-gray-600 cursor-not-allowed"
                  : "bg-blue-600 text-white hover:bg-blue-700"
              }`}
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2 inline-block"></div>
                  등록 중...
                </>
              ) : isImageUploading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2 inline-block"></div>
                  이미지 업로드 중...
                </>
              ) : (
                "질문 등록"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddQnAPage;
