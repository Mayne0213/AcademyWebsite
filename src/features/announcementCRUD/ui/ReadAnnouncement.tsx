"use client";

import React from "react";
import AnnouncementItemWithUD from "./AnnouncementItemWithUD";
import { Announcement } from "@/src/entities/announcement/model/types";

interface ReadAnnouncementProps {
  announcements: Announcement[];
  isLoading: boolean;
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


const ReadAnnouncement: React.FC<ReadAnnouncementProps> = ({
  announcements,
  isLoading,
  isAssetOnly = false,
}) => {
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
        <div className="h-screen font-sansKR-SemiBold text-2xl flex items-center justify-center">
          공지글이 없습니다.
        </div>
    );
  }

  return (
    <div className="flex-1 space-y-4 relative">
      <ul className="space-y-4">
        {announcements.map((announcement: Announcement) => (
          <AnnouncementItemWithUD
            key={announcement.announcementId}
            announcement={announcement}
            isAssetOnly={isAssetOnly}
          />
        ))}
      </ul>
    </div>
  );
};

export default ReadAnnouncement; 