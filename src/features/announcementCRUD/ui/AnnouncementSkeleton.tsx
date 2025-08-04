import React from "react";

const AnnouncementSkeleton: React.FC = () => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-300 overflow-hidden animate-pulse">
      {/* Header Skeleton */}
      <div className="p-4 sm:p-6">
        <div className="flex justify-between items-start gap-2 sm:gap-4">
          <div className="flex-1 min-w-0 space-y-2">
            {/* Title skeleton */}
            <div className="h-6 bg-gray-200 rounded w-3/4"></div>
            
            {/* Meta info skeleton */}
            <div className="flex flex-wrap items-center gap-2">
              <div className="flex items-center gap-1">
                <div className="w-4 h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded w-16"></div>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-4 h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded w-20"></div>
              </div>
            </div>
          </div>

          {/* Action buttons skeleton */}
          <div className="flex items-center gap-1 sm:gap-2">
            <div className="w-6 h-6 bg-gray-200 rounded"></div>
            <div className="w-6 h-6 bg-gray-200 rounded"></div>
            <div className="w-6 h-6 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnnouncementSkeleton; 