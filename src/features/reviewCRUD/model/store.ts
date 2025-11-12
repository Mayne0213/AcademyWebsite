import { useCallback } from 'react';
import { reviewApi } from '@/src/entities/review/api';
import { useReviewStore } from '@/src/entities/review/model/store';
import { usePaginationStore } from '@/src/shared/model/pagination';

// API 호출과 전역 상태 관리를 통합하는 훅
export const useReviewFeatureStore = () => {
  const entityStore = useReviewStore.getState();
  const paginationStore = usePaginationStore.getState();

  const readReviews = useCallback(async (page: number, itemsPerPage: number) => {
    entityStore.setLoading(true);
    try {
      const result = await reviewApi.readReviews(page, itemsPerPage);
      entityStore.readReviews(result.reviews);
      paginationStore.setTotalCount(result.totalCount);
      paginationStore.setCurrentPage(page);
      paginationStore.setItemsPerPage(itemsPerPage);
      return result;
    } finally {
      entityStore.setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    readReviews,
  };
};
