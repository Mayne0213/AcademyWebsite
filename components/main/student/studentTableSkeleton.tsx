"use client";

import React from "react";

const StudentTableSkeleton: React.FC = () => {
  return (
    <div className="w-full overflow-x-auto">
      <div className="min-w-[800px]">
        {/* Header */}
        <div className="grid grid-cols-6 bg-gray-100 font-semibold text-gray-700 border-y border-gray-300 py-3">
          <div className="text-center">이름</div>
          <div className="text-center">학원</div>
          <div className="text-center">전화번호</div>
          <div className="text-center">고등학교</div>
          <div className="text-center">생년</div>
          <div className="text-center">메모</div>
        </div>

        {/* Skeleton Rows */}
        {Array.from({ length: 20 }).map((_, index) => (
          <div
            key={index}
            className="grid grid-cols-6 border-b border-gray-200 py-3"
          >
            <div className="text-center">
              <div className="h-4 bg-gray-200 rounded-xl animate-pulse mx-auto w-16"></div>
            </div>
            <div className="text-center">
              <div className="h-4 bg-gray-200 rounded-xl animate-pulse mx-auto w-20"></div>
            </div>
            <div className="text-center">
              <div className="h-4 bg-gray-200 rounded-xl animate-pulse mx-auto w-24"></div>
            </div>
            <div className="text-center">
              <div className="h-4 bg-gray-200 rounded-xl animate-pulse mx-auto w-28"></div>
            </div>
            <div className="text-center">
              <div className="h-4 bg-gray-200 rounded-xl animate-pulse mx-auto w-20"></div>
            </div>
            <div className="text-center">
              <div className="h-4 bg-gray-200 rounded-xl animate-pulse mx-auto w-48"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudentTableSkeleton; 