interface SearchProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  favoriteFilter: boolean;
  setFavoriteFilter: React.Dispatch<React.SetStateAction<boolean>>;
}

const Search: React.FC<SearchProps> = ({
  searchTerm,
  setSearchTerm,
  selectedCategory,
  setSelectedCategory,
  favoriteFilter,
  setFavoriteFilter,
}) => {
  const categories = ["전체","독해", "문법", "어휘", "리스닝", "실전"];

  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
      <div className="flex flex-none">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`rounded-md border transition px-4 py-2 mr-2
              ${
                selectedCategory === cat
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-blue-50"
              }
            `}
          >
            {cat}
          </button>
        ))}

        <button
          onClick={() => setFavoriteFilter((f) => !f)}
          className={`rounded-md border transition px-4 py-2
            ${
              favoriteFilter
                ? "bg-yellow-400 text-white border-yellow-400"
                : "bg-white text-gray-700 border-gray-300 hover:bg-yellow-50"
            }
          `}
          title="즐겨찾기 교재만 보기"
        >
          즐겨찾기
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

export default Search;
