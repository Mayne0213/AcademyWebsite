import { useState } from "react";

// Props 인터페이스 정의
interface PaginationProps {
  totalPages: number; // 총 페이지 수
  currentPage: number; // 현재 페이지
  onPageChange: (page: number) => void; // 페이지 변경 핸들러 함수
}

function Pagination({
  totalPages,
  currentPage,
  onPageChange,
}: PaginationProps) {
  const [visiblePages, setVisiblePages] = useState<number[]>([1, 2, 3, 4, 5]);

  const handlePrev = () => {
    const newVisiblePages = visiblePages.map((page) => page - 5);
    if (newVisiblePages[0] === -4) {
      onPageChange(visiblePages[0]);
      return;
    }
    setVisiblePages(newVisiblePages);
    onPageChange(newVisiblePages[0]);
  };

  const handleNext = () => {
    const newVisiblePages = visiblePages.map((page) => page + 5);
    if (newVisiblePages[0] > totalPages) {
      console.log("DFG");
      onPageChange(visiblePages[visiblePages.length - 1]);
      return;
    }
    setVisiblePages(newVisiblePages);
    onPageChange(newVisiblePages[0]);
  };

  return (
    <div className={`flex items-center justify-center space-x-2`}>
      {/* 이전 버튼 */}
      <button
        onClick={handlePrev}
        className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md  transition"
      >
        이전
      </button>

      {/* 페이지 번호 버튼 */}
      {Array.from(
        { length: totalPages },
        (_, i) =>
          // visiblePages 범위 안에 있는 페이지 번호만 버튼으로 표시
          i + 1 >= visiblePages[0] &&
          i + 1 <= visiblePages[visiblePages.length - 1] && (
            <button
              key={i + 1}
              className={`px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md transition ${
                currentPage === i + 1
                  ? "font-sansKR-Bold"
                  : "bg-white border-gray-300"
              }`}
              onClick={() => onPageChange(i + 1)}
            >
              {i + 1}
            </button>
          ),
      )}

      {/* 다음 버튼 */}
      <button
        onClick={handleNext}
        className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md transition"
      >
        다음
      </button>
    </div>
  );
}

export default Pagination;
