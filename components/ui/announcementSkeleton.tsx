import React from "react";

interface Props {
  count?: number;
  isCompact?: boolean;
}

const AnnouncementSkeleton: React.FC<Props> = ({ count = 6, isCompact = false }) => (
  <>
    {Array.from({ length: count }).map((_, i) => (
      <div
        key={i}
        className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden h-[100px] animate-pulse"
      >
        <div className={`p-4 sm:p-6 ${isCompact ? "text-sm" : ""}`}>
          <div className="flex justify-between items-start gap-2 sm:gap-4">
            <div className="flex-1 min-w-0 space-y-2">
              {/* 제목 스켈레톤 */}
              <div
                className={`bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%] animate-[shimmer_1.5s_ease-in-out_infinite] rounded-full ${isCompact ? "h-4" : "h-5"}`}
                style={{ width: `${Math.random() * 30 + 50}%` }}
              />
              {/* 메타 정보 스켈레톤 */}
              <div className="flex flex-wrap items-center gap-2">
                <div className="flex items-center gap-1">
                  <div className="w-4 h-4 bg-gray-200 rounded-full animate-pulse" />
                  <div className="h-3 w-16 bg-gray-200 rounded-full animate-pulse" />
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-4 h-4 bg-gray-200 rounded-full animate-pulse" />
                  <div className="h-3 w-20 bg-gray-200 rounded-full animate-pulse" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    ))}
  </>
);

export default AnnouncementSkeleton; 