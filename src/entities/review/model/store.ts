import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { ReviewState, ReviewBasicActions, ReviewPopupState, ReviewPopupActions, Review } from './types';

const STORAGE_KEY = 'review-popup-state';

// 리뷰 목록 스토어
export const useReviewStore = create<ReviewState & ReviewBasicActions>((set) => ({
  // 초기 상태
  reviews: [],
  isLoading: true,

  // 리뷰 목록 읽기
  readReviews: (reviews: Review[]) => set({
    reviews,
    isLoading: false
  }),

  // 로딩 상태 설정
  setLoading: (isLoading: boolean) => set({ isLoading }),
}));

// 리뷰 팝업 스토어
export const useReviewPopupStore = create<ReviewPopupState & ReviewPopupActions>()(
  persist(
    (set, get) => ({
      // 초기 상태
      isVisible: false,
      hideUntil: null,

      // 팝업 표시
      showPopup: () => set({ isVisible: true }),

      // 팝업 숨기기
      hidePopup: () => set({ isVisible: false }),

      // 하루동안 숨기기
      hideForOneDay: () => {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        tomorrow.setHours(0, 0, 0, 0); // 다음날 00:00:00으로 설정

        set({
          isVisible: false,
          hideUntil: tomorrow.toISOString(),
        });
      },

      // 가시성 확인 (페이지 로드 시 호출)
      checkVisibility: () => {
        const { hideUntil } = get();

        if (!hideUntil) {
          set({ isVisible: true });
          return;
        }

        const now = new Date();
        const hideUntilDate = new Date(hideUntil);

        if (now >= hideUntilDate) {
          // 숨기기 기간이 지났으면 팝업 표시
          set({
            isVisible: true,
            hideUntil: null,
          });
        } else {
          // 아직 숨기기 기간이면 팝업 숨김
          set({ isVisible: false });
        }
      },
    }),
    {
      name: STORAGE_KEY,
    }
  )
);
