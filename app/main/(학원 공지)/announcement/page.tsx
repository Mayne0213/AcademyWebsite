"use client";

import React, { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import useAnnouncement from "@/components/hooks/useAnnouncement";
import AddAnnouncement from "@/components/main/announcement/addAnnouncement";
import AnnouncementList from "@/components/main/announcement/announcementList";
import AnnouncementItem from "@/components/main/announcement/announcementItem";
import Pagination from "@/components/main/student/paginationControls";

const AnnouncementBoard = () => {
  const [writeNewAnnouncement, setWriteNewAnnouncement] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'announcement' | 'asset'>('announcement');
  const { loadInitialAnnouncement, loadInitialAsset, addAnnouncement } = useAnnouncement();

  useEffect(() => {
    loadInitialAnnouncement();
    loadInitialAsset();
  }, []);

  return (
    <div className="min-h-[1000px] bg-white rounded-xl p-6 shadow-md flex flex-col">
      <div className="flex justify-between">
        <div className="flex gap-4">
          <button
            className={`text-2xl font-bold mb-4 ${activeTab === 'announcement' ? 'text-blue-600 underline' : ''}`}
            onClick={() => setActiveTab('announcement')}
          >
            학원 공지사항
          </button>
          <button
            className={`text-2xl font-bold mb-4 ${activeTab === 'asset' ? 'text-blue-600 underline' : ''}`}
            onClick={() => setActiveTab('asset')}
          >
            학원 자료실
          </button>
        </div>
        <Plus
          className="cursor-pointer"
          onClick={() => {
            setWriteNewAnnouncement(!writeNewAnnouncement);
          }}
        />
      </div>

      {writeNewAnnouncement && (
        <AddAnnouncement
          onCancel={() => setWriteNewAnnouncement(false)}
          onAdd={(announcement) => {
            addAnnouncement(announcement);
            setWriteNewAnnouncement(false);
          }}
        />
      )}

      {activeTab === 'announcement' && <AnnouncementList />}
      {activeTab === 'asset' && <AssetAnnouncementList />}
    </div>
  );
};

const AssetAnnouncementList = () => {
  const { files, loadInitialAsset } = useAnnouncement();
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 8;
  const totalPages = Math.ceil(files.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;

  useEffect(() => {
    loadInitialAsset();
  }, []);

  return (
    <div className="flex-1 space-y-4 relative">
      {files.length === 0 ? (
        <div className="absolute inset-0 font-sansKR-SemiBold text-2xl flex items-center justify-center">
          자료실 공지글이 없습니다.
        </div>
      ) : (
        <>
          <ul className="space-y-4">
            {files.slice(startIndex, endIndex).map((announcement) => (
              <AnnouncementItem
                key={announcement.announcementId}
                announcement={announcement}
              />
            ))}
          </ul>
          <div className="mt-6 flex justify-center">
            <Pagination
              totalPages={totalPages}
              currentPage={currentPage}
              onPageChange={(page: any) => setCurrentPage(page)}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default AnnouncementBoard;
