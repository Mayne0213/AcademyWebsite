import React from "react";

interface SearchInputProps {
  searchTerm: string;
  onSearchTermChange: (term: string) => void;
  placeholder?: string;
  className?: string;
}

const SearchInput: React.FC<SearchInputProps> = ({
  searchTerm,
  onSearchTermChange,
  placeholder = "검색어를 입력하세요...",
  className = "",
}) => {
  return (
    <div className={`relative ${className}`}>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => onSearchTermChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-4 py-2 border text-sm border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
    </div>
  );
};

export default SearchInput; 