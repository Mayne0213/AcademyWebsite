"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import useAnnouncement from "@/components/hooks/useAnnouncement";
import useAcademy from "@/components/hooks/useAcademy";
import Header from "@/app/DashboardStructureComponent/header";
import { toast } from "sonner";
import { useAuth } from "@/contexts/authContexts";
import S3ImageUploadMultiple from "@/components/s3ImageUploadMultiple";

// 파일 타입 정의
interface FileItem {
  url: string;
  name: string;
  type: string;
}

interface AnnouncementFormInput {
  title: string;
  content: string;
  authorId: number;
  isItAssetAnnouncement: boolean;
  files?: FileItem[];
  academyIds?: number[];
}

const AddAnnouncementPage = () => {
  const [files, setFiles] = useState<FileItem[]>([]);
  const [selectedAcademyIds, setSelectedAcademyIds] = useState<number[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isFileUploading, setIsFileUploading] = useState(false);
  const router = useRouter();
  const { academys, loadInitialAcademy } = useAcademy();
  const { addAnnouncement } = useAnnouncement();
  const { user } = useAuth();

  const [form, setForm] = useState({
    title: "",
    content: "",
    isItAssetAnnouncement: false,
  });

  useEffect(() => {
    loadInitialAcademy();
  }, [loadInitialAcademy]);

  useEffect(() => {
    if (academys.length > 0) {
      const allAcademyIds = academys.map(academy => academy.academyId);
      setSelectedAcademyIds(allAcademyIds);
    }
  }, [academys]);

  const handleFileUploadLoading = (isLoading: boolean) => {
    setIsFileUploading(isLoading);
  };

  const handleAcademyToggle = (academyId: number) => {
    setSelectedAcademyIds(prev => 
      prev.includes(academyId)
        ? prev.filter(id => id !== academyId)
        : [...prev, academyId]
    );
  };

  const handleAdd = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const target = e.target as HTMLInputElement;
    const { name, value, type, checked } = target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.title.trim() || !form.content.trim()) {
      toast.error("제목과 내용을 모두 입력해주세요.");
      return;
    }

    try {
      const newAnnouncement: AnnouncementFormInput = {
        title: form.title,
        content: form.content,
        authorId: user?.memberId as number,
        isItAssetAnnouncement: form.isItAssetAnnouncement,
        files,
        academyIds: selectedAcademyIds.length > 0 ? selectedAcademyIds : undefined,
      };

      await addAnnouncement(newAnnouncement);
      if(form.isItAssetAnnouncement){
        router.push("/dashboard/assets");
      }else{
        router.push("/dashboard/announcement");
      }
    } catch (err) {
      toast.error("공지 작성 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header title="공지 추가" description="공지사항을 추가하세요" />
      <div className="max-w-3xl mx-auto px-4 mt-6">
        <form
          onSubmit={onSubmit}
          className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-6"
        >
          <div>
            <label className="block text-sm text-gray-700 mb-1">제목</label>
            <input
              name="title"
              value={form.title}
              onChange={handleAdd}
              required
              className="w-full border rounded-md px-3 py-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              내용
            </label>
            <textarea
              name="content"
              value={form.content}
              onChange={handleAdd}
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
              onChange={handleAdd}
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
              {academys.map((academy) => (
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

          <S3ImageUploadMultiple 
            onUploadComplete={setFiles} 
            initialFiles={files} 
            folder="dashboard/announcement" 
            onLoadingChange={handleFileUploadLoading}
          />

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isSubmitting || isFileUploading}
              className={`px-4 py-2 rounded-md transition-all duration-200 ${
                isSubmitting || isFileUploading
                  ? "bg-gray-400 text-gray-600 cursor-not-allowed"
                  : "bg-blue-600 text-white hover:bg-blue-700"
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
                "공지 작성"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddAnnouncementPage;