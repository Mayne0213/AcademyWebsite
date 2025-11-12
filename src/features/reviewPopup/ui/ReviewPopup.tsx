'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { X } from 'lucide-react';
import { useReviewPopupStore } from '@/src/entities/review';
import { toggleApi } from '@/src/entities/toggle';
import { Button } from '@/src/shared/ui/button';

export default function ReviewPopup() {
  const router = useRouter();
  const { isVisible, hidePopup, hideForOneDay, checkVisibility } = useReviewPopupStore();
  const [isReviewPopupOn, setIsReviewPopupOn] = useState<boolean | null>(null); // null로 초기화
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // 컴포넌트 마운트 시 가시성 확인
    checkVisibility();
  }, [checkVisibility]);

  useEffect(() => {
    // Toggle 설정 확인
    const fetchToggle = async () => {
      try {
        const toggle = await toggleApi.getToggle();
        setIsReviewPopupOn(toggle.isReviewPopupOn);
      } catch (error) {
        console.error('Toggle 설정 로드 실패:', error);
        // 실패 시 기본값(true) 유지
        setIsReviewPopupOn(true);
      } finally {
        setIsLoading(false);
      }
    };
    fetchToggle();
  }, []);

  // 로딩 중이거나, isReviewPopupOn이 false이거나, isVisible이 false이면 팝업을 보여주지 않음
  if (isLoading || !isVisible || !isReviewPopupOn) return null;

  const handleReviewClick = () => {
    // 리뷰 페이지로 이동
    router.push('/dashboard/review');
    hidePopup();
  };

  return (
    <>
      {/* 배경 오버레이 */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
        onClick={hidePopup}
      >
        {/* 팝업 콘텐츠 */}
        <div
          className="bg-white rounded-2xl shadow-2xl max-w-md w-full relative animate-[fadeIn_0.3s_ease-out]"
          onClick={(e) => e.stopPropagation()}
        >
          {/* 닫기 버튼 */}
          <button
            onClick={hidePopup}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="닫기"
          >
            <X className="w-6 h-6" />
          </button>

          {/* 팝업 본문 */}
          <div className="p-8">
            {/* 아이콘 */}
            <div className="w-16 h-16 mx-auto mb-6 bg-blue-100 rounded-full flex items-center justify-center">
              <svg
                className="w-8 h-8 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                />
              </svg>
            </div>

            {/* 제목 */}
            <h2 className="text-2xl font-bold text-gray-900 text-center mb-4">
              리뷰를 남겨주세요!
            </h2>

            {/* 설명 */}
            <p className="text-gray-600 text-center mb-8 leading-relaxed">
              여러분의 소중한 의견은 저희에게 큰 힘이 됩니다.
              <br />
              몇 분만 시간을 내어 리뷰를 남겨주시겠어요?
            </p>

            {/* 버튼 그룹 */}
            <div className="space-y-3">
              <Button
                onClick={handleReviewClick}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors duration-200"
              >
                리뷰 작성하기
              </Button>

              <Button
                onClick={hideForOneDay}
                className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-3 rounded-lg transition-colors duration-200"
              >
                하루동안 보지 않기
              </Button>

              <button
                onClick={hidePopup}
                className="w-full text-gray-500 hover:text-gray-700 font-medium py-2 transition-colors duration-200"
              >
                닫기
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 애니메이션 정의 */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </>
  );
}
