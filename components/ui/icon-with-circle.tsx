import React from "react";

interface IconWithCircleProps {
  className?: string;
  iconClassName?: string;
  children?: React.ReactNode;
}

const IconWithCircle: React.FC<IconWithCircleProps> = ({ 
  className = "w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center",
  iconClassName = "w-8 h-8 text-gray-400",
  children 
}) => {
  return (
    <div className={className}>
      {children || (
        <svg
          className={iconClassName}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
      )}
    </div>
  );
};

export default IconWithCircle;