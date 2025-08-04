import React, { useState } from "react";
import { useAuth } from "@/contexts/authContexts";
import { CreateAnnouncementRequest } from "@/src/entities/announcement/model/types";
import AnnouncementForm from "./AnnouncementForm";
import { AnnouncementDetail } from "@/src/entities/announcement/model/types";
import { useAnnouncementFeatureStore } from "../model/store";

interface CreateAnnouncementProps {
  onCancel: () => void;
}

const CreateAnnouncement: React.FC<CreateAnnouncementProps> = ({
  onCancel,
}) => {
  const { user } = useAuth();
  const { createAnnouncement } = useAnnouncementFeatureStore();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 초기 데이터 생성
  const initialData: AnnouncementDetail = {
    announcementId: 0, // 새로 생성할 것이므로 임시 ID
    announcementTitle: "",
    announcementContent: "",
    authorId: user?.memberId as number,
    isItAssetAnnouncement: false,
    isItImportantAnnouncement: false,
    announcementFiles: [],
    academies: [],
  };

  const handleSubmit = async (formData: AnnouncementDetail) => {
    setIsSubmitting(true);
    
    // CreateAnnouncementRequest 타입에 맞게 변환
    const createRequest: CreateAnnouncementRequest = {
      announcementTitle: formData.announcementTitle,
      announcementContent: formData.announcementContent,
      authorId: formData.authorId,
      isItAssetAnnouncement: formData.isItAssetAnnouncement,
      isItImportantAnnouncement: formData.isItImportantAnnouncement,
      files: formData.announcementFiles.map(file => ({
        fileId: file.fileId,
      })),
    };
    
    await createAnnouncement(createRequest);
    setIsSubmitting(false);
    onCancel();
  };

  return (
    <AnnouncementForm
      initialData={initialData}
      onSubmit={handleSubmit}
      onCancel={onCancel}
      submitButtonText="추가"
      isSubmitting={isSubmitting}
      title="신규 공지사항 작성"
    />
  );
};

export default CreateAnnouncement; 