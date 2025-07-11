import React from "react";

interface SearchBarProps {
  searchTerm: string;
  onSearchTermChange: (term: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchTerm, onSearchTermChange }) => {
  return (
    <input
      type="text"
      placeholder="학생 이름 검색"
      value={searchTerm}
      onChange={(e) => {
        onSearchTermChange(e.target.value);
      }}
      className="px-4 py-2 border rounded-md text-sm w-64"
    />
  );
};

export default SearchBar;
