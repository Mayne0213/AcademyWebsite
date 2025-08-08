import React, { useState } from "react";
import { useAuth } from "@/src/app/providers";
import { CreateAnnouncementRequest, AnnouncementDetail } from "@/src/entities/announcement/model/types";
import AnnouncementForm from "./AnnouncementForm";
import { useAnnouncementFeatureStore } from "../model/store";

interface CreateAnnouncementProps {
  isOpen: boolean;
  onClose: () => void;
  isAssetOnly?: boolean;
  announcement?: AnnouncementDetail; // 기존 데이터 (수정 시 사용)
}

const CreateAnnouncement: React.FC<CreateAnnouncementProps> = ({
  isOpen,
  onClose,
  isAssetOnly = false,
  announcement,
}) => {
  const { user } = useAuth();
  const { createAnnouncement, updateAnnouncement } = useAnnouncementFeatureStore();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 기존 데이터가 있으면 수정 모드, 없으면 생성 모드
  const isEditMode = !!announcement;

  // 초기 데이터 생성
  const initialData: AnnouncementDetail = announcement || {
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
    
    if (isEditMode) {
      // 수정 모드
      await updateAnnouncement(formData.announcementId, formData);
    } else {
      // 생성 모드
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
    }

    setIsSubmitting(false);
    onClose();
  };

  return (
    <AnnouncementForm
      initialData={initialData}
      onSubmit={handleSubmit}
      onCancel={onClose}
      submitButtonText={isEditMode ? "저장" : "추가"}
      isSubmitting={isSubmitting}
      isOpen={isOpen}
      modalTitle={isEditMode ? "공지사항 수정" : "신규 공지사항 작성"}
    />
  );
};

export default CreateAnnouncement; 