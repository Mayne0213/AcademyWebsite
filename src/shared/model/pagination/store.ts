import { create } from 'zustand';
import { PaginationStore } from './types';

// Pagination 전용 zustand store
export const usePaginationStore = create<PaginationStore>((set) => ({
  currentPage: 1,
  itemsPerPage: 10, // 기본값을 10으로 변경
  totalCount: 0,

  setCurrentPage: (currentPage: number) => set({ currentPage }),
  
  setItemsPerPage: (itemsPerPage: number) => set({ itemsPerPage }),
  
  setTotalCount: (totalCount: number) => set({ totalCount }),
  
}));

// totalPages를 계산하는 selector 함수
export const useTotalPages = () => {
  const { totalCount, itemsPerPage } = usePaginationStore();
  return Math.ceil(totalCount / itemsPerPage);
}; 