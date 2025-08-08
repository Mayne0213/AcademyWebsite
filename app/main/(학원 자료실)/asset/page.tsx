"use client";

import React, { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import { useAnnouncementFeatureStore } from "@/src/features/announcementCRUD/model/store";
import ReadAnnouncement from "@/src/features/announcementCRUD/ui/ReadAnnouncement";
import CreateAnnouncement from "@/src/features/announcementCRUD/ui/CreateAnnouncement";
import { useAnnouncementStore } from "@/src/entities/announcement/model/store";
import { usePaginationStore, useTotalPages } from "@/src/shared/model/pagination";
import { Pagination } from "@/src/shared/ui";

const AnnouncementBoard = () => {
  const [writeNewAnnouncement, setWriteNewAnnouncement] = useState<boolean>(false);

  const { announcements, isLoading } = useAnnouncementStore();
  const { readAnnouncements } = useAnnouncementFeatureStore();
  const { currentPage, setCurrentPage, totalCount } = usePaginationStore();
  const totalPages = useTotalPages();

  useEffect(() => {
    readAnnouncements(currentPage, 10, true);
  }, [readAnnouncements, currentPage]);

  return (
    <div className="min-h-[1000px] bg-white rounded-xl p-6 shadow-md flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <div className="text-2xl font-sansKR-Bold">
            학원 자료실
          </div>
          <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
            총 {totalCount}개
          </span>
        </div>
        <Plus
          className="cursor-pointer"
          onClick={() => {
            setWriteNewAnnouncement(!writeNewAnnouncement);
          }}
        />
      </div>

      <CreateAnnouncement
        isOpen={writeNewAnnouncement}
        onClose={() => setWriteNewAnnouncement(false)}
        isAssetOnly={true}
      />

      <div className="flex-grow">
        <ReadAnnouncement
          announcements={announcements}
          isLoading={isLoading}
          isAssetOnly={true}
        />
      </div>

      <div className="mt-4">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default AnnouncementBoard;
