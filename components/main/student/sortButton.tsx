import React from "react";

interface SortButtonProps {
  label: string;
  sortKey: "name" | "school";
  currentSortKey: "name" | "school" | null;
  onSort: (key: "name" | "school") => void;
}

const SortButton: React.FC<SortButtonProps> = ({
  label,
  sortKey,
  currentSortKey,
  onSort,
}) => {
  const isActive = sortKey === currentSortKey;

  return (
    <button
      className={`px-4 py-2 rounded-md text-sm border duration-300 transition-all ${
        isActive
          ? sortKey === "name"
            ? "bg-blue-500 text-white border-blue-500"
            : "bg-green-500 text-white border-green-500"
          : "bg-white text-gray-700 hover:bg-gray-100"
      }`}
      onClick={() => onSort(sortKey)}
    >
      {label}
    </button>
  );
};

export default SortButton;
