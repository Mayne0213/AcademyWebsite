// Toggle 데이터 타입
export interface Toggle {
  id: number;
  isReviewPopupOn: boolean;
  createdAt: string;
  updatedAt: string;
}

// Toggle 상태
export interface ToggleState {
  toggle: Toggle | null;
  isLoading: boolean;
}

// Toggle 기본 액션
export interface ToggleBasicActions {
  setToggle: (toggle: Toggle) => void;
  setLoading: (isLoading: boolean) => void;
}
