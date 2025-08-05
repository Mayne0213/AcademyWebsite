import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAnnouncementFeatureStore } from '@/src/features/announcementCRUD/model/store';
import { useAcademyFeatureStore } from '@/src/features/academyCRUD/model/store';
import { useAcademyStore } from '@/src/entities/academy/model/store';
import { useAuth } from '@/contexts/authContexts';
import { toast } from 'sonner';
import { CreateAnnouncementRequest } from '@/src/entities/announcement/model/types';
import { FileUploadDropzone, FileDisplay } from '@/src/entities/file/ui';
import type { File as FileEntity } from '@/src/entities/file/model/types';

const CreateAnnouncement: React.FC = () => {
  const [files, setFiles] = useState<FileEntity[]>([]);
  const [selectedAcademyIds, setSelectedAcademyIds] = useState<number[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isFileUploading, setIsFileUploading] = useState(false);
  
  const router = useRouter();
  const { readAcademies } = useAcademyFeatureStore();
  const { academies } = useAcademyStore();
  const { createAnnouncement } = useAnnouncementFeatureStore();
  const { user } = useAuth();

  const [form, setForm] = useState({
    announcementTitle: '',
    announcementContent: '',
    isItAssetAnnouncement: false,
    isItImportantAnnouncement: false,
  });

  useEffect(() => {
    readAcademies();
  }, [readAcademies]);

  useEffect(() => {
    if (academies.length > 0) {
      const allAcademyIds = academies.map(academy => academy.academyId);
      setSelectedAcademyIds(allAcademyIds);
    }
  }, [academies]);

  const handleFileUploadComplete = (file: FileEntity) => {
    setFiles(prev => [...prev, file]);
  };

  const handleFileDelete = (fileId: number) => {
    setFiles(prev => prev.filter(file => file.fileId !== fileId));
  };

  const handleAcademyToggle = (academyId: number) => {
    setSelectedAcademyIds(prev => 
      prev.includes(academyId)
        ? prev.filter(id => id !== academyId)
        : [...prev, academyId]
    );
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const target = e.target as HTMLInputElement;
    const { name, value, type, checked } = target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.announcementTitle.trim() || !form.announcementContent.trim()) {
      toast.error('제목과 내용을 모두 입력해주세요.');
      return;
    }

    if (!user?.memberId) {
      toast.error('사용자 정보를 찾을 수 없습니다.');
      return;
    }

    try {
      setIsSubmitting(true);

      const newAnnouncement: CreateAnnouncementRequest = {
        announcementTitle: form.announcementTitle,
        announcementContent: form.announcementContent,
        authorId: user.memberId,
        isItAssetAnnouncement: form.isItAssetAnnouncement,
        isItImportantAnnouncement: form.isItImportantAnnouncement,
        files: files.map(file => ({
          fileId: file.fileId,
        })),
        academyIds: selectedAcademyIds.length > 0 ? selectedAcademyIds : undefined,
      };

      createAnnouncement(newAnnouncement);
      
      if (form.isItAssetAnnouncement) {
        router.push('/dashboard/assets');
      } else {
        router.push('/dashboard/announcement');
      }
    } catch (err) {
      toast.error('공지 작성 중 오류가 발생했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 mt-6">
      <form
        onSubmit={onSubmit}
        className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-6"
      >
        <div>
          <label className="block text-sm text-gray-700 mb-1">제목</label>
                      <input
              name="announcementTitle"
              value={form.announcementTitle}
              onChange={handleChange}
              required
              className="w-full border rounded-md px-3 py-2"
            />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            내용
          </label>
                      <textarea
              name="announcementContent"
              value={form.announcementContent}
              onChange={handleChange}
              rows={8}
              required
              className="w-full border rounded-md px-3 py-2"
            />
        </div>

        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            name="isItAssetAnnouncement"
            checked={form.isItAssetAnnouncement}
            onChange={handleChange}
            className="h-4 w-4 text-blue-600 border-gray-300 rounded"
            id="isItAssetAnnouncement"
          />
          <label
            htmlFor="isItAssetAnnouncement"
            className="text-sm text-gray-700 select-none"
          >
            자료실에 업로드
          </label>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            공지를 볼 수 있는 학원 선택
          </label>
          <div className="grid grid-cols-2 gap-3 max-h-40 overflow-y-auto border border-gray-200 rounded-md p-3">
            {academies.map((academy) => (
              <div key={academy.academyId} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id={`academy-${academy.academyId}`}
                  checked={selectedAcademyIds.includes(academy.academyId)}
                  onChange={() => handleAcademyToggle(academy.academyId)}
                  className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                />
                <label
                  htmlFor={`academy-${academy.academyId}`}
                  className="text-sm text-gray-700 select-none cursor-pointer"
                >
                  {academy.academyName}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* 파일 업로드 */}
        <div>
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
                />
              ))}
            </div>
          )}
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isSubmitting || isFileUploading}
            className={`px-4 py-2 rounded-md transition-all duration-200 ${
              isSubmitting || isFileUploading
                ? 'bg-gray-400 text-gray-600 cursor-not-allowed'
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2 inline-block"></div>
                공지 작성 중...
              </>
            ) : isFileUploading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2 inline-block"></div>
                파일 업로드 중...
              </>
            ) : (
              '공지 작성'
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateAnnouncement; 