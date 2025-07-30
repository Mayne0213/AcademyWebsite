"use client"

import React, { useEffect } from "react";
import useTextbook from "@/components/hooks/useTextbook";
import { Pagination } from "@/shared/ui";
import Search from "@/components/main/textbook/search";
import UploadTextbook from "@/components/main/textbook/uploadTextbook";
import useFilteredSortedPaginatedTextbook from "@/components/hooks/useFilteredSortedPaginatedTextbook";
import TextbookItem from "@/components/main/textbook/textbookItem";

const TextbookManagement = () => {
  const { textbooks, loadInitialTextbook, updateTextbook, removeTextbook } = useTextbook();

  useEffect(() => {
    loadInitialTextbook();
  }, []);

  const {
    searchTerm,
    setSearchTerm,
    selectedCategory,
    setSelectedCategory,
    favoriteFilter,
    setFavoriteFilter,
    currentPage,
    setCurrentPage,
    visibleTextbooks,
    totalPages,
  } = useFilteredSortedPaginatedTextbook(textbooks);

  const toggleFavorite = (id: number) => {
    const textbook = textbooks.find((tb) => tb.textbookId === id);
    if (!textbook) return;

    updateTextbook({ ...textbook, favorite: !textbook.favorite });
  };

  return (
    <div className="w-full mx-auto p-8 bg-white rounded-lg shadow-lg flex flex-col min-h-screen">
      <header className="mb-8">
        <h1 className="text-4xl font-sansKR-SemiBold text-gray-900 mb-2">교재 목록</h1>
        <footer className="text-gray-400 text-sm">
          © {new Date().getFullYear()} 꽃필날연구소. All rights reserved.
        </footer>
      </header>

      <Search
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        favoriteFilter={favoriteFilter}
        setFavoriteFilter={setFavoriteFilter}
      />

      <ul className={`grid grid-cols-3 gap-6 mb-8`}>
        <UploadTextbook/>

        {visibleTextbooks.map((textbook) => (
          <TextbookItem
            key={textbook.textbookId}
            textbook={textbook}
            onToggleFavorite={toggleFavorite}
            onRemoveTextbook={removeTextbook}
          />
        ))}
      </ul>

      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
    </div>
  );
};

export default TextbookManagement;
