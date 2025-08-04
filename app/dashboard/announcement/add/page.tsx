"use client";

import Header from "@/src/widgets/header/DashboardHeader";
import CreateAnnouncement from "@/src/entities/announcement/ui/CreateAnnouncement";

const AddAnnouncementPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header title="공지 추가" description="공지사항을 추가하세요" />
      <CreateAnnouncement />
    </div>
  );
};

export default AddAnnouncementPage;