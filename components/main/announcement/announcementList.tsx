import React, { useEffect, useState } from "react";
import useAnnouncement from "@/components/hooks/useAnnouncement";
import AnnouncementItem from "./announcementItem";
import { Pagination } from "@/shared/ui";

const ITEMS_PER_PAGE = 10;

const AnnouncementList: React.FC = () => {
  const { announcements, totalCount, loadInitialAnnouncement } = useAnnouncement();
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);

  useEffect(() => {
    loadInitialAnnouncement(currentPage,ITEMS_PER_PAGE,false);
  }, [loadInitialAnnouncement, currentPage]);

  return (
    <div className="flex-1 space-y-4 relative">
      {announcements.length === 0 ? (
        <div className="absolute inset-0 font-sansKR-SemiBold text-2xl flex items-center justify-center">
          공지글이 없습니다.
        </div>
      ) : (
        <>
          <ul className="space-y-4">
            {announcements.map((announcement) => (
              <AnnouncementItem
                key={announcement.announcementId}
                announcement={announcement}
              />
            ))}
          </ul>

          {/* 페이지네이션 컴포넌트 */}
          <div className="mt-6 flex justify-center">
            <Pagination
              totalPages={totalPages}
              currentPage={currentPage}
              onPageChange={(page: number) => setCurrentPage(page)}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default AnnouncementList;
