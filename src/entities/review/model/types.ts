// 리뷰 데이터 타입
export interface Review {
  id: number;
  reviewerName: string;
  reviewTitle: string;
  reviewContent: string;
  createdAt: string;
  updatedAt: string;
}

// 리뷰 상태
export interface ReviewState {
  reviews: Review[];
  isLoading: boolean;
}

// 리뷰 기본 액션
export interface ReviewBasicActions {
  readReviews: (reviews: Review[]) => void;
  setLoading: (isLoading: boolean) => void;
}

// 리뷰 팝업 상태
export interface ReviewPopupState {
  isVisible: boolean;
  hideUntil: string | null; // ISO 날짜 문자열
}

// 리뷰 팝업 액션
export interface ReviewPopupActions {
  showPopup: () => void;
  hidePopup: () => void;
  hideForOneDay: () => void;
  checkVisibility: () => void;
}
