import React from "react";
import { TextbookCategory, TEXTBOOK_CATEGORY_LABELS } from "@/src/entities/textbook/model/types";

interface TextbookSearchProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedCategory: TextbookCategory | 'ALL';
  setSelectedCategory: (category: TextbookCategory | 'ALL') => void;
  importantFilter: boolean;
  setImportantFilter: React.Dispatch<React.SetStateAction<boolean>>;
}

const TextbookSearch: React.FC<TextbookSearchProps> = ({
  searchTerm,
  setSearchTerm,
  selectedCategory,
  setSelectedCategory,
  importantFilter,
  setImportantFilter,
}) => {
  const categories: (TextbookCategory | 'ALL')[] = [
    'ALL',
    'LISTENING',
    'MATERIAL',
    'WEEKLY_TEST',
    'PPT',
    'ETC',
    'ASSISTANT'
  ];

  const getCategoryLabel = (category: TextbookCategory | 'ALL') => {
    if (category === 'ALL') return '전체';
    return TEXTBOOK_CATEGORY_LABELS[category];
  };

  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
      <div className="flex flex-none flex-wrap">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`rounded-md border transition px-4 py-2 mr-2 mb-2
              ${
                selectedCategory === cat
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-blue-50"
              }
            `}
          >
            {getCategoryLabel(cat)}
          </button>
        ))}

        <button
          onClick={() => setImportantFilter((f) => !f)}
          className={`rounded-md border transition px-4 py-2 mb-2
            ${
              importantFilter
                ? "bg-yellow-400 text-white border-yellow-400"
                : "bg-white text-gray-700 border-gray-300 hover:bg-yellow-50"
            }
          `}
          title="중요 교재만 보기"
        >
          중요
        </button>
      </div>

      <input
        type="text"
        placeholder="교재명으로 검색하기"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
};

export default TextbookSearch;
