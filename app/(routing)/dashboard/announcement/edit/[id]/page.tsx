"use client";

import Header from "@/src/widgets/header/DashboardHeader";
import UpdateAnnouncement from "@/src/entities/announcement/ui/UpdateAnnouncement";

const EditAnnouncementPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header title="공지 수정" description="공지사항 내용을 수정하세요" />
      <UpdateAnnouncement />
    </div>
  );
};

export default EditAnnouncementPage;