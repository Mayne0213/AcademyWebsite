import { PaginationInfo } from './types';

// Pagination 정보를 계산하는 유틸리티 함수
export const calculatePaginationInfo = (
  totalItems: number,
  currentPage: number,
  itemsPerPage: number
): PaginationInfo => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const validCurrentPage = Math.max(1, Math.min(currentPage, totalPages));
  
  const startIndex = (validCurrentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems);
  
  return {
    currentPage: validCurrentPage,
    totalPages,
    totalItems,
    itemsPerPage,
    startIndex,
    endIndex,
    hasNextPage: validCurrentPage < totalPages,
    hasPrevPage: validCurrentPage > 1,
  };
};

// 페이지 번호 배열을 생성하는 함수 (UI용)
export const generatePageNumbers = (
  currentPage: number,
  totalPages: number,
  maxVisiblePages: number = 5
): (number | string)[] => {
  if (totalPages <= maxVisiblePages) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }
  
  const pages: (number | string)[] = [];
  const halfVisible = Math.floor(maxVisiblePages / 2);
  
  if (currentPage <= halfVisible + 1) {
    // 앞쪽 페이지들
    for (let i = 1; i <= maxVisiblePages - 1; i++) {
      pages.push(i);
    }
    pages.push('...');
    pages.push(totalPages);
  } else if (currentPage >= totalPages - halfVisible) {
    // 뒤쪽 페이지들
    pages.push(1);
    pages.push('...');
    for (let i = totalPages - maxVisiblePages + 2; i <= totalPages; i++) {
      pages.push(i);
    }
  } else {
    // 중간 페이지들
    pages.push(1);
    pages.push('...');
    for (let i = currentPage - halfVisible; i <= currentPage + halfVisible; i++) {
      pages.push(i);
    }
    pages.push('...');
    pages.push(totalPages);
  }
  
  return pages;
}; 