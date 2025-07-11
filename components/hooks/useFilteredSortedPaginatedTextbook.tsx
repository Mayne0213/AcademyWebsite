import { useState, useEffect, useMemo } from "react";
import { Textbook } from "../type/textbookType";

const ITEMS_PER_PAGE = 14;

interface UseTextbookFilterReturn {
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  selectedCategory: string;
  setSelectedCategory: React.Dispatch<React.SetStateAction<string>>;
  favoriteFilter: boolean;
  setFavoriteFilter: React.Dispatch<React.SetStateAction<boolean>>;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  filteredTextbooks: Textbook[];
  totalPages: number;
  visibleTextbooks: Textbook[];
}

const categories = ["독해", "문법", "어휘", "리스닝", "실전", "전체"];

export default function useTextbookFilter(textbooks: Textbook[]): UseTextbookFilterReturn {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("전체");
  const [favoriteFilter, setFavoriteFilter] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  // 필터링된 교재 목록 계산 (useMemo로 최적화)
  const filteredTextbooks = useMemo(() => {
    return textbooks
      .filter((tb) => {
        const categoryMatch =
          selectedCategory === "전체" ? true : tb.category === selectedCategory;
        const favoriteMatch = favoriteFilter ? tb.favorite === true : true;
        const searchMatch = tb.textbookName
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
        return categoryMatch && favoriteMatch && searchMatch;
      })
      .sort((a, b) => a.textbookName.localeCompare(b.textbookName, "ko-KR"));
  }, [textbooks, selectedCategory, favoriteFilter, searchTerm]);

  const totalPages = Math.ceil(filteredTextbooks.length / ITEMS_PER_PAGE);

  const visibleTextbooks = useMemo(() => {
    return filteredTextbooks.slice(
      (currentPage - 1) * ITEMS_PER_PAGE,
      currentPage * ITEMS_PER_PAGE
    );
  }, [filteredTextbooks, currentPage]);

  // 필터 변경 시 페이지 1로 초기화
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedCategory, favoriteFilter]);

  return {
    searchTerm,
    setSearchTerm,
    selectedCategory,
    setSelectedCategory,
    favoriteFilter,
    setFavoriteFilter,
    currentPage,
    setCurrentPage,
    filteredTextbooks,
    totalPages,
    visibleTextbooks,
  };
}
