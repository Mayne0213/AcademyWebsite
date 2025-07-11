"use client";

import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Header from "@/app/DashboardStructureComponent/header";
import { Qna } from "@/components/type/qnaType";
import S3ImageUpload from "@/components/s3ImageUpload";
import { toast } from "sonner";

const EditQnAPage = () => {
  const router = useRouter();
  const { id } = useParams();

  const [qna, setQna] = useState<Qna | null>(null);
  const [loading, setLoading] = useState(true);
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isImageUploading, setIsImageUploading] = useState(false); // 이미지 업로드 로딩 상태 추가

  // QnA 상세 정보 불러오기
  useEffect(() => {
    const fetchQna = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/qna/${id}`);
        if (res.ok) {
          const data = await res.json();
          setQna(data);
          setUploadedImageUrl(data.qnaImageUrl || "");
        } else {
          toast.error("질문을 불러올 수 없습니다.");
          router.push("/dashboard/qnaBoard");
        }
      } catch (error) {
        toast.error("질문을 불러오는 중 오류가 발생했습니다.");
        router.push("/dashboard/qnaBoard");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchQna();
    }
  }, [id, router]);

  const [form, setForm] = useState({
    qnaTitle: "",
    qnaContent: "",
  });

  // 폼 초기화
  useEffect(() => {
    if (qna) {
      setForm({
        qnaTitle: qna.qnaTitle,
        qnaContent: qna.qnaContent,
      });
    }
  }, [qna]);

  const handleImageUploadComplete = (imageUrl: string) => {
    setUploadedImageUrl(imageUrl);
  };

  // 이미지 업로드 로딩 상태 핸들러
  const handleImageUploadLoading = (isLoading: boolean) => {
    setIsImageUploading(isLoading);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRemoveImage = () => {
    setUploadedImageUrl("");
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!qna) return;

    if (!form.qnaTitle.trim() || !form.qnaContent.trim()) {
      toast.error("제목과 내용을 모두 입력해주세요.");
      return;
    }

    try {
      setIsSubmitting(true);
      const updatedQnA = {
        qnaTitle: form.qnaTitle.trim(),
        qnaContent: form.qnaContent.trim(),
        qnaImageUrl: uploadedImageUrl,
      };

      const res = await fetch(`/api/qna/${qna.qnaId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedQnA),
      });

      if (res.ok) {
        toast.success("질문이 수정되었습니다.");
        router.push("/dashboard/qnaBoard");
      } else {
        toast.error("수정 중 오류가 발생했습니다.");
      }
    } catch (err) {
      toast.error("수정 중 오류가 발생했습니다.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="p-6 text-center text-gray-500">질문을 불러오는 중...</div>
    );
  }

  if (!qna) {
    return (
      <div className="p-6 text-center text-gray-500">질문을 찾을 수 없습니다.</div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header title="질문 수정" description="질문 내용을 수정하세요" />
      <div className="max-w-3xl mx-auto px-4 mt-6">
        <form
          onSubmit={onSubmit}
          className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-6"
        >
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              제목
            </label>
            <input
              name="qnaTitle"
              value={form.qnaTitle}
              onChange={handleChange}
              required
              className="w-full border rounded-md px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              내용
            </label>
            <textarea
              name="qnaContent"
              value={form.qnaContent}
              onChange={handleChange}
              rows={8}
              required
              className="w-full border rounded-md px-3 py-2"
            />
          </div>

          {/* 이미지 업로드 */}
          <S3ImageUpload
            onUploadComplete={handleImageUploadComplete}
            initialImageUrl={uploadedImageUrl}
            folder="dashboard/qna"
            onLoadingChange={handleImageUploadLoading}
          />

          {/* 제출 버튼 */}
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
                  수정 중...
                </>
              ) : isImageUploading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2 inline-block"></div>
                  이미지 업로드 중...
                </>
              ) : (
                "질문 수정"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditQnAPage;
