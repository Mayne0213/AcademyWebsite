import React, { useEffect, useState } from "react";
import useAnnouncement from "@/components/hooks/useAnnouncement";
import AnnouncementItem from "./announcementItem";
import Pagination from "../student/paginationControls";

const ITEMS_PER_PAGE = 8;

const AnnouncementList: React.FC = () => {
  const { announcements, loadInitialAnnouncement } = useAnnouncement();
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(announcements.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;

  useEffect(() => {
    loadInitialAnnouncement();
  }, []);

  return (
    <div className="flex-1 space-y-4 relative">
      {announcements.length === 0 ? (
        <div className="absolute inset-0 font-sansKR-SemiBold text-2xl flex items-center justify-center">
          공지글이 없습니다.
        </div>
      ) : (
        <>
          <ul className="space-y-4">
            {announcements.slice(startIndex, endIndex).map((announcement) => (
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
              onPageChange={(page) => setCurrentPage(page)}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default AnnouncementList;
