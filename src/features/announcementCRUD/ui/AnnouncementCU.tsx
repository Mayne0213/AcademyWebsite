import React, { useState, useEffect } from "react";
import { Button } from "@/src/shared/ui/button";
import { AnnouncementDetail } from "@/src/entities/announcement/model/types";
import { FileUploadDropzone, FileDisplay } from "@/src/entities/file/ui";
import { File as FileEntity } from "@/src/entities/file/model/types";
import { convertAnnouncementFileToEntity } from "@/src/features/announcementCRUD/model/utils";
import { ANNOUNCEMENT_VALIDATION } from "@/src/entities/announcement/model/validation";
import { useAcademyFeatureStore } from "@/src/features/academyCRUD/model/store";
import { useAcademyStore } from "@/src/entities/academy/model/store";
import { useAnnouncementFeatureStore } from "../model/store";
import { useAuth } from "@/src/app/providers";
import { toast } from "sonner";

interface AnnouncementFormInput {
  announcementTitle: string;
  announcementContent: string;
  isItAssetAnnouncement: boolean;
}

interface AnnouncementCUProps {
  onClose: () => void;
  isAssetOnly?: boolean;
  announcement?: AnnouncementDetail; // 기존 데이터 (수정 시 사용)
}

const AnnouncementCU: React.FC<AnnouncementCUProps> = ({
  onClose,
  isAssetOnly = false,
  announcement,
}) => {
  const { createAnnouncement, updateAnnouncement } = useAnnouncementFeatureStore();
  const { readAcademies } = useAcademyFeatureStore();
  const { academies } = useAcademyStore();
  const { user } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 기존 데이터가 있으면 수정 모드, 없으면 생성 모드
  const mode = announcement ? 'update' : 'create';

  // 폼 상태 관리
  const [form, setForm] = useState<AnnouncementFormInput>({
    announcementTitle: "",
    announcementContent: "",
    isItAssetAnnouncement: false,
  });
  const [files, setFiles] = useState<FileEntity[]>([]);
  const [selectedAcademies, setSelectedAcademies] = useState<number[]>([]);

  // 학원 데이터 로드
  useEffect(() => {
    readAcademies();
  }, [readAcademies]);

  // 초기 데이터 설정
  useEffect(() => {
    if (mode === 'update' && announcement) {
      setForm({
        announcementTitle: announcement.announcementTitle,
        announcementContent: announcement.announcementContent,
        isItAssetAnnouncement: announcement.isItAssetAnnouncement,
      });
      
      const convertedFiles = announcement.announcementFiles?.map(convertAnnouncementFileToEntity) || [];
      setFiles(convertedFiles);

      // 선택된 학원들 설정
      const academyIds = announcement.academies?.map((academy: { academyId: number }) => academy.academyId) || [];
      setSelectedAcademies(academyIds);
    } else if (mode === 'create') {
      // 생성 모드에서 기본값 설정
      setForm(prev => ({
        ...prev,
        isItAssetAnnouncement: isAssetOnly,
      }));
    }
  }, [mode, announcement, academies, isAssetOnly]);

  // 파일 업로드 완료 핸들러
  const handleFileUploadComplete = (uploadedFile: FileEntity) => {
    setFiles(prev => [...prev, uploadedFile]);
  };

  // 파일 삭제 핸들러
  const handleFileDelete = (fileId: number) => {
    setFiles(prev => prev.filter(file => file.fileId !== fileId));
  };

  // 학원 선택 핸들러
  const handleAcademySelection = (academyId: number) => {
    setSelectedAcademies(prev => {
      if (prev.includes(academyId)) {
        return prev.filter(id => id !== academyId);
      } else {
        return [...prev, academyId];
      }
    });
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
  const handleSubmit = async () => {
    if (mode === 'create') {
      if (!user?.memberId) {
        toast.error('사용자 정보를 찾을 수 없습니다.');
        return;
      }

      const submitData = {
        announcementTitle: form.announcementTitle,
        announcementContent: form.announcementContent,
        authorId: user.memberId,
        isItAssetAnnouncement: form.isItAssetAnnouncement,
        isItImportantAnnouncement: false,
        academyIds: selectedAcademies,
        files: files.map(file => ({
          fileId: file.fileId,
        })),
      };
      ANNOUNCEMENT_VALIDATION.validateAnnouncementForCreate(submitData);
      
      setIsSubmitting(true);
      await createAnnouncement(submitData);
      setIsSubmitting(false);
      onClose();
    } else if (mode === 'update' && announcement) {
      const updateData = {
        announcementId: announcement.announcementId,
        announcementTitle: form.announcementTitle,
        announcementContent: form.announcementContent,
        authorId: announcement.authorId,
        isItAssetAnnouncement: form.isItAssetAnnouncement,
        isItImportantAnnouncement: announcement.isItImportantAnnouncement || false,
        files: files.map(file => ({
          fileId: file.fileId,
        })),
        academyIds: selectedAcademies,
      };
      ANNOUNCEMENT_VALIDATION.validateAnnouncementForUpdate(updateData);
      
      setIsSubmitting(true);
      await updateAnnouncement(updateData.announcementId, updateData);
      setIsSubmitting(false);
      onClose();
    }
  };

  const title = mode === 'create' ? "신규 공지 추가" : "공지 수정";
  const submitButtonText = mode === 'create' ? "추가" : "수정";

  return (
    <div className="mb-4">
      <div className="bg-white border-gray-300 rounded-lg border shadow-lg p-6">
        <h1 className="text-xl ml-2 mb-2">{title}</h1>
        
        {/* 제목 입력 */}
        <input
          type="text"
          name="announcementTitle"
          value={form.announcementTitle}
          onChange={handleChange}
          placeholder="공지 제목"
          required={mode === 'create'}
          className="w-full border p-2 mb-2"
        />
        
        {/* 내용 입력 */}
        <textarea
          name="announcementContent"
          value={form.announcementContent}
          onChange={handleChange}
          placeholder="공지 내용"
          required={mode === 'create'}
          className="w-full border p-2 mb-2"
          rows={4}
        />

        {/* 학원 선택 섹션 */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            공지 대상 학원 선택
          </label>
          <div className="border rounded-md p-3 bg-gray-50">
            <div className="grid grid-cols-2 gap-2">
              {academies.map((academy) => (
                <label
                  key={academy.academyId}
                  className="flex items-center space-x-2 cursor-pointer hover:bg-gray-100 p-2 rounded"
                >
                  <input
                    type="checkbox"
                    checked={selectedAcademies.includes(academy.academyId)}
                    onChange={() => handleAcademySelection(academy.academyId)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">{academy.academyName}</span>
                </label>
              ))}
            </div>
          </div>
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
              <h4 className="text-sm font-medium text-gray-700">
                {mode === 'create' ? "업로드된 파일" : "첨부된 파일"}
              </h4>
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
        <div className="w-full flex justify-end pt-4 border-t">
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
            onClick={onClose}
          >
            취소
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AnnouncementCU;
