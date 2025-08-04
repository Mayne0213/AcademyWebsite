import React, { useState } from "react";
import { AnnouncementDetail } from "@/src/entities/announcement/model/types";
import AnnouncementForm from "./AnnouncementForm";
import { useAnnouncementFeatureStore } from "@/src/features/announcementCRUD/model/store";

interface UpdateAnnouncementProps {
  announcement?: AnnouncementDetail;
  onCancel: () => void;
}

const UpdateAnnouncement: React.FC<UpdateAnnouncementProps> = ({
  announcement,
  onCancel,
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { updateAnnouncement } = useAnnouncementFeatureStore();

  const handleSubmit = async (formData: AnnouncementDetail) => {
    setIsSubmitting(true);
    await updateAnnouncement(formData.announcementId, formData);
    setIsSubmitting(false);
    onCancel();
  };

  return (
      <AnnouncementForm
        initialData={announcement}
        onSubmit={handleSubmit}
        onCancel={onCancel}
        submitButtonText="저장"
        isSubmitting={isSubmitting}
        title="공지사항 수정"
      />
  );
};

export default UpdateAnnouncement; 