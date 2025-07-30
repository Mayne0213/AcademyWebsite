import useSearch from "./useSearch";
import useSort from "./useSort";
import usePagination from "./usePagination";

// 통합 데이터 타입
export interface DataItem {
  id: number | string;
  [key: string]: any;
}

// 통합 옵션
export interface DataManagementOptions<T extends DataItem> {
  items: T[];
  searchTerm: string;
  searchFields: string[];
  sortOption: { field: string; direction: 'asc' | 'desc' } | null;
  currentPage: number;
  itemsPerPage?: number;
  customSorters?: Record<string, (a: T, b: T) => number>;
}

// 통합 결과
export interface DataManagementResult<T extends DataItem> {
  // 최종 결과
  paginatedItems: T[];
  
  // 각 단계별 결과
  searchResult: {
    filteredItems: T[];
    totalMatches: number;
  };
  sortResult: {
    sortedItems: T[];
    sortInfo: { field: string | null; direction: 'asc' | 'desc' | null };
  };
  paginationResult: {
    paginationInfo: {
      currentPage: number;
      totalPages: number;
      totalItems: number;
      hasNextPage: boolean;
      hasPrevPage: boolean;
    };
    visiblePages: number[];
  };
}

const useDataManagement = <T extends DataItem>({
  items,
  searchTerm,
  searchFields,
  sortOption,
  currentPage,
  itemsPerPage = 20,
  customSorters = {},
}: DataManagementOptions<T>): DataManagementResult<T> => {

  // 1단계: 검색
  const searchResult = useSearch({
    items,
    searchTerm,
    searchFields,
  });

  // 2단계: 정렬
  const sortResult = useSort({
    items: searchResult.filteredItems,
    sortOption,
    customSorters,
  });

  // 3단계: 페이지네이션
  const paginationResult = usePagination({
    items: sortResult.sortedItems,
    currentPage,
    itemsPerPage,
  });

  return {
    paginatedItems: paginationResult.paginatedItems,
    searchResult: {
      filteredItems: searchResult.filteredItems,
      totalMatches: searchResult.totalMatches,
    },
    sortResult: {
      sortedItems: sortResult.sortedItems,
      sortInfo: sortResult.sortInfo,
    },
    paginationResult: {
      paginationInfo: paginationResult.paginationInfo,
      visiblePages: paginationResult.visiblePages,
    },
  };
};

export default useDataManagement; 