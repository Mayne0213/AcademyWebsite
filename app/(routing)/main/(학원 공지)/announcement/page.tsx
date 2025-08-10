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
    <main className="h-full flex flex-col p-4">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <div className="text-2xl smalltablet:text-2xl tablet:text-2xl desktop:text-3xl font-sansKR-Bold">
            학원 공지사항
          </div>
          <span className="text-xs flex items-center justify-center text-center smalltablet:text-sm tablet:text-base text-gray-500 bg-gray-100 px-2 smalltablet:px-3 py-1 rounded-lg smalltablet:rounded-full">
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

      {writeNewAnnouncement && (
        <CreateAnnouncement
          onClose={() => setWriteNewAnnouncement(false)}
        />
      )}

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
