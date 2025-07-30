import React from "react";

export interface SortOption {
  key: string;
  label: string;
}

interface SortControlsProps {
  sortOptions: SortOption[];
  currentSortKey: string | null;
  onSortChange: (sortKey: string | null) => void;
  className?: string;
}

const SortControls: React.FC<SortControlsProps> = ({
  sortOptions,
  currentSortKey,
  onSortChange,
  className = "",
}) => {
  return (
    <div className={`flex gap-2 ${className}`}>
      {sortOptions.map((option) => {
        const isActive = option.key === currentSortKey;
        
        return (
          <button
            key={option.key}
            onClick={() => onSortChange(option.key)}
            className={`px-4 py-2 rounded-md text-sm border duration-300 transition-all ${
              isActive
                ? "bg-blue-500 text-white border-blue-500"
                : "bg-white text-gray-700 hover:bg-gray-100"
            }`}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
};

export default SortControls; 