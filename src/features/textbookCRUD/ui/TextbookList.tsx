import React, { useEffect, useState } from "react";
import { TextbookItem } from "@/src/entities/textbook/ui";
import { useTextbookStore } from "@/src/entities/textbook/model/store";
import { useTextbookFeatureStore } from "../model/store";
import { TextbookCategory, TEXTBOOK_CATEGORY_LABELS } from "@/src/entities/textbook/model/types";

interface TextbookListProps {
  categoryFilter?: TextbookCategory | 'ALL';
  importantOnly?: boolean;
}

const TextbookList: React.FC<TextbookListProps> = ({
  categoryFilter = 'ALL',
  importantOnly = false,
}) => {
  const { textbooks, isLoading } = useTextbookStore();
  const { readTextbooks, deleteTextbook, toggleImportantTextbook } = useTextbookFeatureStore();

  useEffect(() => {
    readTextbooks();
  }, [readTextbooks]);

  // 필터링된 교재 목록
  const filteredTextbooks = textbooks.filter(textbook => {
    const matchesCategory = categoryFilter === 'ALL' || textbook.category === categoryFilter;
    const matchesImportant = !importantOnly || textbook.isImportant;
    return matchesCategory && matchesImportant;
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        <span className="ml-3 text-gray-600">교재 목록을 불러오는 중...</span>
      </div>
    );
  }

  if (filteredTextbooks.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        등록된 교재가 없습니다.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {filteredTextbooks.map((textbook) => (
        <TextbookItem
          key={textbook.textbookId}
          textbook={textbook}
          onDelete={deleteTextbook}
          onToggleImportant={toggleImportantTextbook}
        />
      ))}
    </div>
  );
};

export default TextbookList;
