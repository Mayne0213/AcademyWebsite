"use client";

import { useEffect } from "react";
import Header from "@/src/widgets/header/DashboardHeader";
import { AnnouncementCard } from "@/src/entities/announcement/ui";
import { useAnnouncementStore } from "@/src/entities/announcement/model/store";
import { useAnnouncementFeatureStore } from "@/src/features/announcementCRUD/model/store";
import { usePaginationStore, useTotalPages } from "@/src/shared/model/pagination";
import { Pagination } from "@/src/shared/ui";
import { Calendar } from "lucide-react";

// 로딩 스켈레톤 컴포넌트
const AnnouncementSkeleton = () => (
  <div className="space-y-4">
    {Array.from({ length: 6 }).map((_, i) => (
      <div
        key={i}
        className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden h-[100px]"
      >
        <div className="p-4 sm:p-6 text-sm smalltablet:text-base">
          <div className="flex justify-between items-start gap-2 sm:gap-4">
            <div className="flex-1 min-w-0 space-y-2">
              <div
                className="bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-[shimmer_1.5s_ease-in-out_infinite] rounded-full h-4 smalltablet:h-5"
                style={{ width: `${Math.random() * 30 + 50}%` }}
              />
              <div className="flex flex-wrap items-center gap-2">
                <div className="hidden smalltablet:flex items-center gap-1">
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
  </div>
);

// 빈 상태 컴포넌트
const EmptyState = () => (
  <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
    <div className="text-gray-400 mb-4">
      <Calendar className="w-12 h-12 mx-auto" />
    </div>
    <p className="text-gray-500">공지사항이 없습니다.</p>
  </div>
);

const Announcements: React.FC = () => {
  const ITEMS_PER_PAGE = 10;

  const { announcements, isLoading } = useAnnouncementStore();
  const { currentPage, setCurrentPage, totalCount } = usePaginationStore();
  const { readAnnouncements } = useAnnouncementFeatureStore();

  useEffect(() => {
    readAnnouncements(currentPage, ITEMS_PER_PAGE, false);
  }, [currentPage, readAnnouncements]);

  const totalPages = useTotalPages();

  return (
    <div className="min-h-screen bg-gray-50 space-y-6">
      <Header title="공지사항" description="중요한 공지 사항을 확인하세요" />

      <div className="max-w-6xl mx-auto px-4">
        <div className="space-y-4">
          {isLoading ? (
            <AnnouncementSkeleton />
          ) : totalCount === 0 ? (
            <EmptyState />
          ) : (
            announcements.map((announcement) => (
              <AnnouncementCard
                key={announcement.announcementId}
                announcement={announcement}
              />
            ))
          )}

          {totalPages > 1 && (
            <div className="flex justify-center">
              <Pagination
                totalPages={totalPages}
                currentPage={currentPage}
                onPageChange={setCurrentPage}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Announcements;
