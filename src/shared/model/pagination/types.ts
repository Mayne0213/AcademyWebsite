// Pagination 관련 타입 정의
export interface PaginationState {
  currentPage: number;
  itemsPerPage: number;
  totalCount: number;
}

export interface PaginationActions {
  setCurrentPage: (currentPage: number) => void;
  setItemsPerPage: (itemsPerPage: number) => void;
  setTotalCount: (totalCount: number) => void;
  incrementTotalCount: () => void;
  decrementTotalCount: () => void;
}

export interface PaginationStore extends PaginationState, PaginationActions {}

// Pagination 계산 결과 타입
export interface PaginationInfo {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  startIndex: number;
  endIndex: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

// API 응답에서 pagination 정보를 포함하는 타입
export interface PaginatedResponse<T> {
  items: T[];
  totalCount: number;
  currentPage: number;
  itemsPerPage: number;
} 