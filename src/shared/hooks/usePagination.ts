import { useMemo } from "react";

// 페이지네이션 가능한 아이템
export interface PaginatableItem {
  id: number | string;
  [key: string]: any;
}

// 페이지네이션 옵션
export interface PaginationOptions<T extends PaginatableItem> {
  items: T[];
  currentPage: number;
  itemsPerPage?: number;
  maxVisiblePages?: number;
}

// 페이지네이션 결과
export interface PaginationResult<T extends PaginatableItem> {
  paginatedItems: T[];
  paginationInfo: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
    startIndex: number;
    endIndex: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
  visiblePages: number[];
}

const usePagination = <T extends PaginatableItem>({
  items,
  currentPage,
  itemsPerPage = 20,
  maxVisiblePages = 5,
}: PaginationOptions<T>): PaginationResult<T> => {

  const paginationResult = useMemo(() => {
    const totalItems = items.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    
    // 현재 페이지가 유효한지 확인
    const validCurrentPage = Math.max(1, Math.min(currentPage, totalPages));
    
    const startIndex = (validCurrentPage - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, totalItems);
    
    const paginatedItems = items.slice(startIndex, endIndex);
    
    // 보여줄 페이지 번호들 계산
    const getVisiblePages = () => {
      if (totalPages <= maxVisiblePages) {
        return Array.from({ length: totalPages }, (_, i) => i + 1);
      }
      
      const pages: number[] = [];
      const halfVisible = Math.floor(maxVisiblePages / 2);
      
      if (validCurrentPage <= halfVisible + 1) {
        // 앞쪽 페이지들
        for (let i = 1; i <= maxVisiblePages - 1; i++) {
          pages.push(i);
        }
        pages.push(totalPages);
      } else if (validCurrentPage >= totalPages - halfVisible) {
        // 뒤쪽 페이지들
        pages.push(1);
        for (let i = totalPages - maxVisiblePages + 2; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        // 중간 페이지들
        pages.push(1);
        for (let i = validCurrentPage - halfVisible; i <= validCurrentPage + halfVisible; i++) {
          pages.push(i);
        }
        pages.push(totalPages);
      }
      
      return pages;
    };

    return {
      paginatedItems,
      paginationInfo: {
        currentPage: validCurrentPage,
        totalPages,
        totalItems,
        itemsPerPage,
        startIndex,
        endIndex,
        hasNextPage: validCurrentPage < totalPages,
        hasPrevPage: validCurrentPage > 1,
      },
      visiblePages: getVisiblePages(),
    };
  }, [items, currentPage, itemsPerPage, maxVisiblePages]);

  return paginationResult;
};

export default usePagination; 