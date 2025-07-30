import { useMemo } from "react";

// 범용 데이터 타입
export interface SearchableItem {
  id: number | string;
  [key: string]: any;
}

// 검색 옵션
export interface SearchOptions<T extends SearchableItem> {
  items: T[];
  searchTerm: string;
  searchFields: string[];  // 검색할 필드들
  caseSensitive?: boolean;
}

// 검색 결과
export interface SearchResult<T extends SearchableItem> {
  filteredItems: T[];
  totalMatches: number;
  searchStats: {
    totalItems: number;
    matchedItems: number;
  };
}

const useSearch = <T extends SearchableItem>({
  items,
  searchTerm,
  searchFields,
  caseSensitive = false,
}: SearchOptions<T>): SearchResult<T> => {

  const filteredItems = useMemo(() => {
    if (!searchTerm.trim()) {
      return {
        filteredItems: items,
        totalMatches: items.length,
        searchStats: {
          totalItems: items.length,
          matchedItems: items.length,
        },
      };
    }

    const searchValue = caseSensitive ? searchTerm : searchTerm.toLowerCase();
    
    const filtered = items.filter((item) => {
      return searchFields.some((field) => {
        const value = item[field];
        if (value == null) return false;
        
        const itemValue = caseSensitive ? String(value) : String(value).toLowerCase();
        return itemValue.includes(searchValue);
      });
    });

    return {
      filteredItems: filtered,
      totalMatches: filtered.length,
      searchStats: {
        totalItems: items.length,
        matchedItems: filtered.length,
      },
    };
  }, [items, searchTerm, searchFields, caseSensitive]);

  return filteredItems;
};

export default useSearch; 