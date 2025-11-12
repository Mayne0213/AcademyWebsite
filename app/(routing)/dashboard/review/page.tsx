"use client";

import { useState } from "react";
import Header from "@/src/widgets/header/DashboardHeader";
import { Button } from "@/src/shared/ui/button";
import { useRouter } from "next/navigation";
import { useAuth } from "@/src/app/providers";
import { apiPost } from "@/src/shared/api";
import { FORMATS } from "@/src/shared/lib/formats";
import { toast } from "sonner";

const ReviewPage: React.FC = () => {
  const router = useRouter();
  const { user } = useAuth();
  const [reviewTitle, setReviewTitle] = useState("");
  const [reviewContent, setReviewContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!reviewTitle.trim()) {
      toast.error("제목을 입력해주세요.");
      return;
    }

    if (!reviewContent.trim()) {
      toast.error("내용을 입력해주세요.");
      return;
    }

    if (!user) {
      toast.error("로그인이 필요합니다.");
      return;
    }

    setIsSubmitting(true);

    try {
      // 사용자 이름 가져오기
      const reviewerName = FORMATS.formatUserDisplayName(user);

      // API 호출로 리뷰 저장
      await apiPost('/api/review', {
        reviewerName,
        reviewTitle,
        reviewContent,
      });

      toast.success("리뷰가 성공적으로 제출되었습니다! 감사합니다.");
      router.push("/dashboard");
    } catch (error) {
      console.error("리뷰 제출 실패:", error);
      // toast.error는 apiPost 내부에서 이미 호출됨
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        title="리뷰 작성"
        description="여러분의 소중한 의견을 들려주세요"
      />

      <div className="max-w-3xl mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sm:p-8">
          <form onSubmit={handleSubmit} className="space-y-6">

            {/* 제목 입력 */}
            <div>
              <label
                htmlFor="reviewTitle"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                제목
              </label>
              <input
                id="reviewTitle"
                type="text"
                value={reviewTitle}
                onChange={(e) => setReviewTitle(e.target.value)}
                placeholder="리뷰 제목을 입력해주세요"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                maxLength={100}
              />
              <p className="mt-1 text-xs text-gray-500 text-right">
                {reviewTitle.length}/100
              </p>
            </div>

            {/* 내용 입력 */}
            <div>
              <label
                htmlFor="reviewContent"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                내용
              </label>
              <textarea
                id="reviewContent"
                value={reviewContent}
                onChange={(e) => setReviewContent(e.target.value)}
                placeholder="솔직한 리뷰를 남겨주세요. 여러분의 의견은 저희에게 큰 도움이 됩니다."
                rows={8}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                maxLength={1000}
              />
              <p className="mt-1 text-xs text-gray-500 text-right">
                {reviewContent.length}/1000
              </p>
            </div>

            {/* 안내 문구 */}
            <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
              <p className="text-sm text-blue-800 leading-relaxed">
                💡 작성해주신 리뷰는 서비스 개선에 소중하게 활용됩니다.
                <br />
                솔직하고 자세한 의견을 남겨주시면 더욱 감사하겠습니다.
              </p>
            </div>

            {/* 버튼 그룹 */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "제출 중..." : "리뷰 제출하기"}
              </Button>
              <Button
                type="button"
                onClick={() => router.back()}
                disabled={isSubmitting}
                className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                취소
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ReviewPage;
