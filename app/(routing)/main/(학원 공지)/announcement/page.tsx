"use client";

import React, { useState } from "react";
import { Plus } from "lucide-react";
import ReadAnnouncement from "@/src/features/announcementCRUD/ui/ReadAnnouncement";
import CreateAnnouncement from "@/src/features/announcementCRUD/ui/CreateAnnouncement";
import { usePaginationStore, useTotalPages } from "@/src/shared/model/pagination";
import { Pagination } from "@/src/shared/ui";

const AnnouncementBoard = () => {
  const [writeNewAnnouncement, setWriteNewAnnouncement] = useState<boolean>(false);

  const { currentPage, setCurrentPage, totalCount } = usePaginationStore();
  const totalPages = useTotalPages();

  return (
    <main className="h-full flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <div className="text-2xl font-sansKR-Bold">
            학원 공지사항
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
      />

      <ReadAnnouncement />

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </main>
  );
};

export default AnnouncementBoard;
