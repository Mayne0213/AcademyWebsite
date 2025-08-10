"use client";

import React, { useEffect } from "react";
import { AnnouncementItem } from "@/src/entities/announcement/ui";
import { useAnnouncementStore } from "@/src/entities/announcement/model/store";
import { useAnnouncementFeatureStore } from "@/src/features/announcementCRUD/model/store";
import { usePaginationStore } from "@/src/shared/model/pagination";

interface AnnouncementReadProps {
  isAssetOnly?: boolean;
}

const AnnouncementSkeleton = () => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-300 overflow-hidden animate-pulse">
      {/* Header Skeleton */}
      <div className="p-4 sm:p-6">
        <div className="flex justify-between items-start gap-2 sm:gap-4">
          <div className="flex-1 min-w-0 space-y-2">
            {/* Title skeleton */}
            <div className="h-6 bg-gray-200 rounded-lg w-3/4" />
            
            {/* Meta info skeleton */}
            <div className="flex flex-wrap items-center gap-2">
              <div className="flex items-center gap-1">
                <div className="w-4 h-4 bg-gray-200 rounded-lg" />
                <div className="h-4 bg-gray-200 rounded-lg w-16" />
              </div>
              <div className="flex items-center gap-1">
                <div className="w-4 h-4 bg-gray-200 rounded-lg" />
                <div className="h-4 bg-gray-200 rounded-lg w-20" />
              </div>
            </div>
          </div>

          {/* Action buttons skeleton */}
          <div className="flex items-center gap-1 sm:gap-2">
            <div className="w-6 h-6 bg-gray-200 rounded-lg" />
            <div className="w-6 h-6 bg-gray-200 rounded-lg" />
          </div>
        </div>
      </div>
    </div>
  );
};

const AnnouncementRead: React.FC<AnnouncementReadProps> = ({
  isAssetOnly = false,
}) => {
  const { announcements, isLoading } = useAnnouncementStore();
  const { readAnnouncements } = useAnnouncementFeatureStore();
  const { currentPage } = usePaginationStore();

  useEffect(() => {
    readAnnouncements(currentPage, 6, isAssetOnly);
  }, [readAnnouncements, currentPage, isAssetOnly]);

  if (isLoading) {
    return (
      <div className="flex-1 space-y-4 relative">
        <ul className="space-y-4">
          {Array.from({ length: 10 }).map((_, index) => (
            <AnnouncementSkeleton key={index} />
          ))}
        </ul>
      </div>
    );
  }

  if (announcements.length === 0) {
    return (
        <div className="flex-1 w-full font-sansKR-SemiBold text-2xl flex items-center justify-center">
          공지글이 없습니다.
        </div>
    );
  }

  return (
    <div className="flex-1 space-y-4 relative">
      <ul className="space-y-4">
        {announcements.map((announcement) => (
          <AnnouncementItem
            key={announcement.announcementId}
            announcement={announcement}
          />
        ))}
      </ul>
    </div>
  );
};

export default AnnouncementRead; 