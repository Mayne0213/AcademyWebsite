"use client";

import React, { useEffect, useState } from "react";
import { ReviewRead } from "@/src/features/reviewCRUD";
import { usePaginationStore, useTotalPages } from "@/src/shared/model/pagination";
import { Pagination } from "@/src/shared/ui";
import { toggleApi } from "@/src/entities/toggle";


const ReviewBoard = () => {
  const { currentPage, setCurrentPage, totalCount } = usePaginationStore();
  const totalPages = useTotalPages();
  const ITEMS_PER_PAGE = 10;

  const [isReviewPopupOn, setIsReviewPopupOn] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchToggle = async () => {
      try {
        const toggle = await toggleApi.getToggle();
        setIsReviewPopupOn(toggle.isReviewPopupOn);
      } catch (error) {
        console.error("Toggle 설정 로드 실패:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchToggle();
  }, []);

  const handleToggleChange = async () => {
    const newValue = !isReviewPopupOn;
    setIsReviewPopupOn(newValue);

    try {
      await toggleApi.updateToggle(newValue);
      // toast.success(newValue ? "리뷰 팝업이 활성화되었습니다." : "리뷰 팝업이 비활성화되었습니다.");
    } catch (error) {
      console.error("Toggle 업데이트 실패:", error);
      setIsReviewPopupOn(!newValue); // 실패 시 원래대로 복구
    }
  };

  return (
    <main className="h-full flex flex-col p-4">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <div className="text-2xl smalltablet:text-2xl tablet:text-2xl desktop:text-3xl font-sansKR-Bold">
            학생 리뷰
          </div>
          <span className="text-xs flex items-center justify-center text-center smalltablet:text-sm tablet:text-base text-gray-500 bg-gray-100 px-2 smalltablet:px-3 py-1 rounded-lg smalltablet:rounded-full">
            총 {totalCount}개
          </span>
        </div>

        {/* 리뷰 팝업 토글 버튼 */}
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-700 font-sansKR-Medium">리뷰 팝업</span>
          <button
            onClick={handleToggleChange}
            disabled={isLoading}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
              isReviewPopupOn ? 'bg-blue-600' : 'bg-gray-200'
            } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                isReviewPopupOn ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>
      </div>

      {/* 리뷰 목록 */}
      <div className="flex-1 overflow-y-auto">
        <ReviewRead itemsPerPage={ITEMS_PER_PAGE} currentPage={currentPage} />
      </div>

      {/* 페이지네이션 */}
      {totalPages > 1 && (
        <div className="mt-6">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      )}
    </main>
  );
};

export default ReviewBoard;
