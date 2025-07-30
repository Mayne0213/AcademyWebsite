import { useMemo } from "react";

// 정렬 옵션
export interface SortOption {
  field: string;
  direction: 'asc' | 'desc';
}

// 정렬 가능한 아이템
export interface SortableItem {
  id: number | string;
  [key: string]: any;
}

// 정렬 옵션
export interface SortOptions<T extends SortableItem> {
  items: T[];
  sortOption: SortOption | null;
  customSorters?: Record<string, (a: T, b: T) => number>;
}

// 정렬 결과
export interface SortResult<T extends SortableItem> {
  sortedItems: T[];
  sortInfo: {
    field: string | null;
    direction: 'asc' | 'desc' | null;
  };
}

const useSort = <T extends SortableItem>({
  items,
  sortOption,
  customSorters = {},
}: SortOptions<T>): SortResult<T> => {

  const sortedItems = useMemo(() => {
    if (!sortOption) {
      return {
        sortedItems: items,
        sortInfo: {
          field: null,
          direction: null,
        },
      };
    }

    const sorted = [...items].sort((a, b) => {
      const { field, direction } = sortOption;
      
      // 커스텀 정렬 함수가 있는 경우 사용
      if (customSorters[field]) {
        const result = customSorters[field](a, b);
        return direction === 'desc' ? -result : result;
      }

      const aValue = a[field];
      const bValue = b[field];
      
      if (aValue == null && bValue == null) return 0;
      if (aValue == null) return 1;
      if (bValue == null) return -1;
      
      let comparison = 0;
      
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        comparison = aValue.localeCompare(bValue);
      } else if (typeof aValue === 'number' && typeof bValue === 'number') {
        comparison = aValue - bValue;
      } else {
        comparison = String(aValue).localeCompare(String(bValue));
      }
      
      return direction === 'desc' ? -comparison : comparison;
    });

    return {
      sortedItems: sorted,
      sortInfo: {
        field: sortOption.field,
        direction: sortOption.direction,
      },
    };
  }, [items, sortOption, customSorters]);

  return sortedItems;
};

export default useSort; 