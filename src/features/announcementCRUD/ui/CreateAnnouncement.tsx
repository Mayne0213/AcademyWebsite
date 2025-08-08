import React, { useState } from "react";
import { useAuth } from "@/contexts/authContexts";
import { CreateAnnouncementRequest,AnnouncementDetail } from "@/src/entities/announcement/model/types";
import AnnouncementForm from "./AnnouncementForm";

import { useAnnouncementFeatureStore } from "../model/store";
import Modal from "@/src/shared/ui/Modal";

interface CreateAnnouncementProps {
  isOpen: boolean;
  onClose: () => void;
  isAssetOnly?: boolean;
}

const CreateAnnouncement: React.FC<CreateAnnouncementProps> = ({
  isOpen,
  onClose,
  isAssetOnly = false,
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
    isItAssetAnnouncement: isAssetOnly,
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
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="신규 공지사항 작성"
      size="lg"
    >
      <AnnouncementForm
        initialData={initialData}
        onSubmit={handleSubmit}
        onCancel={onClose}
        submitButtonText="추가"
        isSubmitting={isSubmitting}
      />
    </Modal>
  );
};

export default CreateAnnouncement; 