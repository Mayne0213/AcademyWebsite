"use client";

import React, { useEffect, useState } from "react";
import { TextbookItem } from "@/src/entities/textbook/ui";
import { useTextbookStore } from "@/src/entities/textbook/model/store";
import { useTextbookFeatureStore, TextbookCU, TextbookSearch, TextbookUploadCard } from "@/src/features/textbookCRUD";
import { TextbookCategory } from "@/src/entities/textbook/model/types";
import { Pagination } from "@/src/shared/ui";

export default function TextbookPage() {
  const { textbooks, isLoading } = useTextbookStore();
  const { readTextbooks, deleteTextbook, toggleImportantTextbook } = useTextbookFeatureStore();

  const [isCreating, setIsCreating] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<TextbookCategory | 'ALL'>('ALL');
  const [importantFilter, setImportantFilter] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 11; // 업로드 카드 1개 + 교재 10개

  useEffect(() => {
    readTextbooks();
  }, [readTextbooks]);

  // 필터링된 교재 목록
  const filteredTextbooks = textbooks.filter(textbook => {
    const matchesSearch = textbook.textbookName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'ALL' || textbook.category === selectedCategory;
    const matchesImportant = !importantFilter || textbook.isImportant;
    return matchesSearch && matchesCategory && matchesImportant;
  });

  // 페이지네이션
  const totalPages = Math.max(1, Math.ceil(filteredTextbooks.length / (itemsPerPage - 1)));
  const startIndex = (currentPage - 1) * (itemsPerPage - 1);
  const visibleTextbooks = filteredTextbooks.slice(startIndex, startIndex + (itemsPerPage - 1));

  if (isLoading && textbooks.length === 0) {
    return (
      <div className="w-full mx-auto p-8 bg-white rounded-lg shadow-lg flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        <span className="ml-3 text-gray-600">교재 목록을 불러오는 중...</span>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col p-4">
      <header className="mb-8">
        <h1 className="text-4xl font-sansKR-SemiBold text-gray-900 mb-2">교재 목록</h1>
        <footer className="text-gray-400 text-sm">
          © {new Date().getFullYear()} 꽃필날연구소. All rights reserved.
        </footer>
      </header>

      <TextbookSearch
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        importantFilter={importantFilter}
        setImportantFilter={setImportantFilter}
      />

      {isCreating && (
        <div className="mb-6">
          <TextbookCU onClose={() => setIsCreating(false)} />
        </div>
      )}

      <ul className="grid grid-cols-3 gap-6 mb-8">
        <TextbookUploadCard onClick={() => setIsCreating(true)} />

        {visibleTextbooks.map((textbook) => (
          <TextbookItem
            key={textbook.textbookId}
            textbook={textbook}
            onToggleImportant={toggleImportantTextbook}
            onDelete={deleteTextbook}
          />
        ))}
      </ul>

      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
    </div>
  );
}
