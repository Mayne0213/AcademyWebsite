import React, { useState, useEffect } from "react";
import { Button } from "@/src/shared/ui/button";
import { AnnouncementDetail } from "@/src/entities/announcement/model/types";
import { FileUploadDropzone, FileDisplay } from "@/src/entities/file/ui";
import { File as FileEntity } from "@/src/entities/file/model/types";
import { 
  convertAnnouncementFileToEntity, 
  normalizeAnnouncementData 
} from "@/src/features/announcementCRUD/model/utils";
import { ANNOUNCEMENT_VALIDATION } from "@/src/entities/announcement/model/validation";

interface AnnouncementFormProps {
  initialData?: AnnouncementDetail;
  onSubmit: (data: AnnouncementDetail) => void;
  onCancel: () => void;
  submitButtonText: string;
  isSubmitting?: boolean;
  title: string;
}

const AnnouncementForm: React.FC<AnnouncementFormProps> = ({
  initialData,
  onSubmit,
  onCancel,
  submitButtonText,
  isSubmitting = false,
  title,
}) => {
  // 폼 상태 관리
  const [form, setForm] = useState({
    announcementTitle: "",
    announcementContent: "",
    isItAssetAnnouncement: false,
  });
  const [files, setFiles] = useState<FileEntity[]>([]);

  // 초기 데이터 설정
  useEffect(() => {
    if (initialData) {
      const normalizedData = normalizeAnnouncementData(initialData);
      setForm({
        announcementTitle: normalizedData.announcementTitle,
        announcementContent: normalizedData.announcementContent,
        isItAssetAnnouncement: normalizedData.isItAssetAnnouncement,
      });
      
      const convertedFiles = normalizedData.announcementFiles?.map(convertAnnouncementFileToEntity) || [];
      setFiles(convertedFiles);
    }
  }, [initialData]);

  // 파일 업로드 완료 핸들러
  const handleFileUploadComplete = (uploadedFile: FileEntity) => {
    setFiles(prev => [...prev, uploadedFile]);
  };

  // 파일 삭제 핸들러
  const handleFileDelete = (fileId: number) => {
    setFiles(prev => prev.filter(file => file.fileId !== fileId));
  };

  // 폼 필드 변경 핸들러
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    let fieldValue: any = value;
    if (type === "checkbox") {
      fieldValue = (e.target as HTMLInputElement).checked;
    }
    setForm(prev => ({ ...prev, [name]: fieldValue }));
  };

  // 폼 제출 핸들러
  const handleSubmit = () => {
    if (!initialData) {
      return;
    }
    
    // 수정 모드인지 확인 (announcementId가 0이 아닌 경우)
    const isEditMode = initialData.announcementId !== 0;
    
    if (isEditMode) {
      // 수정 모드: updateAnnouncement API에 맞는 형태로 데이터 구성
      const updateData = {
        announcementId: initialData.announcementId,
        announcementTitle: form.announcementTitle,
        announcementContent: form.announcementContent,
        authorId: initialData.authorId,
        isItAssetAnnouncement: form.isItAssetAnnouncement,
        isItImportantAnnouncement: initialData.isItImportantAnnouncement || false,
        files: files.map(file => ({
          fileId: file.fileId,
        })),
        academyIds: initialData.academies?.map(academy => academy.academyId) || [],
      };
      ANNOUNCEMENT_VALIDATION.validateAnnouncementForUpdate(updateData);
      onSubmit(updateData as any);
      

    } else {
      // 생성 모드: AnnouncementDetail 타입에 맞는 형태로 데이터 구성
      const submitData: AnnouncementDetail = {
        announcementId: initialData.announcementId,
        announcementTitle: form.announcementTitle,
        announcementContent: form.announcementContent,
        authorId: initialData.authorId,
        isItAssetAnnouncement: form.isItAssetAnnouncement,
        isItImportantAnnouncement: initialData.isItImportantAnnouncement || false,
        announcementFiles: files.map(file => ({
          fileId: file.fileId,
          key: file.fileUrl,
          originalName: file.originalName,
          fileType: file.fileType,
          fileSize: file.fileSize || 0,
        })),
        academies: initialData.academies || [],
      };
      ANNOUNCEMENT_VALIDATION.validateAnnouncementForCreate(submitData);
      onSubmit(submitData);
    }
  };

  return (
    <div>
      <h1 className="text-xl ml-2 mb-2">{title}</h1>
      
      {/* 제목 입력 */}
      <input
        type="text"
        name="announcementTitle"
        value={form.announcementTitle}
        onChange={handleChange}
        placeholder="공지 제목"
        className="w-full border p-2 mb-2"
      />
      
      {/* 내용 입력 */}
      <textarea
        name="announcementContent"
        value={form.announcementContent}
        onChange={handleChange}
        placeholder="공지 내용"
        className="w-full border p-2 mb-2"
        rows={4}
      />
      
      {/* 자료실 업로드 체크박스 */}
      <div className="flex items-center space-x-2 mb-2">
        <input
          type="checkbox"
          name="isItAssetAnnouncement"
          checked={form.isItAssetAnnouncement}
          onChange={handleChange}
          className="h-4 w-4 text-blue-600 border-gray-300 rounded"
          id="isItAssetAnnouncement"
        />
        <label htmlFor="isItAssetAnnouncement" className="text-sm text-gray-700 select-none">
          자료실로 업로드
        </label>
      </div>

      {/* 파일 업로드 섹션 */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          첨부 파일
        </label>
        <FileUploadDropzone
          onUploadComplete={handleFileUploadComplete}
          multiple={true}
          folder="announcement-files"
          className="mb-4"
        />
        
        {/* 업로드된 파일 목록 */}
        {files.length > 0 && (
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-gray-700">업로드된 파일:</h4>
            {files.map((file) => (
              <FileDisplay
                key={file.fileId}
                file={file}
                onDelete={handleFileDelete}
                showDelete={true}
              />
            ))}
          </div>
        )}
      </div>

      {/* 버튼 영역 */}
      <div className="w-full flex justify-end">
        <Button
          variant="default"
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="mr-2"
        >
          {isSubmitting ? "저장 중..." : submitButtonText}
        </Button>
        <Button
          variant="outline"
          onClick={onCancel}
        >
          취소
        </Button>
      </div>
    </div>
  );
};

export default AnnouncementForm; 