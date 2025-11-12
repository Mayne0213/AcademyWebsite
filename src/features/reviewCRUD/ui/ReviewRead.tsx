'use client';

import { useEffect, useState } from 'react';
import { Star, Calendar, ChevronDown, ChevronUp, Trash2 } from 'lucide-react';
import { useReviewStore } from '@/src/entities/review/model/store';
import { useReviewFeatureStore } from '../model/store';
import { reviewApi } from '@/src/entities/review/api';
import { Modal } from '@/src/shared/ui/Modal';
import { Button } from '@/src/shared/ui/button';

interface ReviewReadProps {
  itemsPerPage: number;
  currentPage: number;
}

export default function ReviewRead({ itemsPerPage, currentPage }: ReviewReadProps) {
  const { reviews, isLoading } = useReviewStore();
  const { readReviews } = useReviewFeatureStore();
  const [expandedReviewId, setExpandedReviewId] = useState<number | null>(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);
  const [reviewToDelete, setReviewToDelete] = useState<number | null>(null);

  useEffect(() => {
    readReviews(currentPage, itemsPerPage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, itemsPerPage]);

  const toggleExpand = (reviewId: number) => {
    setExpandedReviewId(expandedReviewId === reviewId ? null : reviewId);
  };

  const openDeleteModal = (reviewId: number) => {
    setReviewToDelete(reviewId);
    setDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setDeleteModalOpen(false);
    setReviewToDelete(null);
  };

  const handleDelete = async () => {
    if (reviewToDelete === null) return;

    try {
      await reviewApi.deleteReview(reviewToDelete);
      // 삭제 후 현재 페이지 다시 로드
      await readReviews(currentPage, itemsPerPage);
      closeDeleteModal();
    } catch (error) {
      console.error("리뷰 삭제 실패:", error);
      // 성공/에러 toast는 API 레이어에서 이미 표시됨
    }
  };

  // 로딩 스켈레톤
  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="animate-pulse bg-white rounded-xl shadow-sm border p-4 smalltablet:p-6">
            <div className="h-5 bg-gray-200 rounded w-1/3 mb-3"></div>
            <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
          </div>
        ))}
      </div>
    );
  }

  // 빈 상태
  if (reviews.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-sm border p-12 text-center">
        <Star className="h-16 w-16 mx-auto mb-4 text-gray-300" />
        <p className="text-gray-500 text-lg font-sansKR-Medium">아직 작성된 리뷰가 없습니다.</p>
      </div>
    );
  }

  // 리뷰 목록
  return (
    <div className="space-y-4">
      {reviews.map((review) => {
        const isExpanded = expandedReviewId === review.id;
        return (
          <div
            key={review.id}
            className="bg-white rounded-xl shadow-sm border overflow-hidden hover:shadow-md transition-shadow"
          >
            {/* 리뷰 헤더 - 항상 표시 */}
            <div className="p-4 sm:p-6 relative text-sm smalltablet:text-base">
              <div className="flex justify-between items-start gap-2 sm:gap-4">
                <div
                  className="flex-1 min-w-0 space-y-2 cursor-pointer"
                  onClick={() => toggleExpand(review.id)}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                    <h3 className="text-base smalltablet:text-lg text-gray-900 font-sansKR-SemiBold">
                      {review.reviewTitle}
                    </h3>
                  </div>
                  <div className="flex flex-wrap items-center gap-2 text-gray-500 text-xs smalltablet:text-sm">
                    <span className="font-sansKR-Medium">{review.reviewerName}</span>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>
                        {new Date(review.createdAt).toLocaleDateString("ko-KR")}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-1 sm:gap-2" onClick={(e) => e.stopPropagation()}>
                  <button
                    onClick={() => openDeleteModal(review.id)}
                    className="p-1 sm:p-2 text-gray-500 hover:text-red-600 transition-colors"
                    title="삭제"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => toggleExpand(review.id)}
                    className="p-1 sm:p-2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {isExpanded ? (
                      <ChevronUp className="w-5 h-5" />
                    ) : (
                      <ChevronDown className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* 리뷰 내용 - 펼쳤을 때만 표시 */}
            {isExpanded && (
              <div className="border-t border-gray-100 p-4 sm:p-6 bg-gray-25 space-y-4">
                <div className="prose prose-sm max-w-none space-y-4">
                  <p className="text-gray-700 leading-relaxed whitespace-pre-wrap text-base smalltablet:text-lg">
                    {review.reviewContent}
                  </p>
                </div>
              </div>
            )}
          </div>
        );
      })}

      {/* 삭제 확인 모달 */}
      <Modal
        isOpen={deleteModalOpen}
        onClose={closeDeleteModal}
        title="리뷰 삭제"
        size="sm"
      >
        <div className="space-y-4">
          <p className="text-gray-700">
            정말 삭제하시겠습니까?
            <br />
            삭제된 리뷰는 복구될 수 없습니다.
          </p>
          <div className="flex justify-end gap-2">
            <Button
              variant="outline"
              onClick={closeDeleteModal}
            >
              취소
            </Button>
            <Button
              variant="destructive"
              onClick={handleDelete}
            >
              삭제
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
