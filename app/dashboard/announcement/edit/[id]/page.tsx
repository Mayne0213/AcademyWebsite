"use client";

import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import useAcademy from "@/components/hooks/useAcademy";
import Header from "@/app/DashboardStructureComponent/header";
import { toast } from "sonner";
import S3ImageUploadMultiple from "@/components/s3ImageUploadMultiple";

// 파일 타입 정의
interface FileItem {
  url: string;
  name: string;
  type: string;
}

// 공지사항 타입 정의
interface AnnouncementDetail {
  announcementId: number;
  title: string;
  content: string;
  isItAssetAnnouncement: boolean;
  authorId: number;
  files: FileItem[];
  academies: { academyId: number; academyName: string }[];
}

const EditAnnouncementPage = () => {
  const router = useRouter();
  const { id } = useParams();
  const { academys, loadInitialAcademy } = useAcademy();

  const [announcement, setAnnouncement] = useState<AnnouncementDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedAcademyIds, setSelectedAcademyIds] = useState<number[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false); // 제출 로딩 상태 추가
  const [isFileUploading, setIsFileUploading] = useState(false); // 파일 업로드 로딩 상태 추가

  useEffect(() => {
    loadInitialAcademy();
  }, [loadInitialAcademy]);

  // 공지사항 상세 정보 불러오기
  useEffect(() => {
    const fetchAnnouncement = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/announcement/${id}`);
        if (res.ok) {
          const data = await res.json();
          setAnnouncement(data);
          setSelectedAcademyIds(data.academies?.map((a: any) => a.academyId) || []);
        } else {
          toast.error("공지사항을 불러올 수 없습니다.");
          router.push("/dashboard/announcement");
        }
      } catch (error) {
        toast.error("공지사항을 불러오는 중 오류가 발생했습니다.");
        router.push("/dashboard/announcement");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchAnnouncement();
    }
  }, [id, router]);

  const [form, setForm] = useState({
    title: "",
    content: "",
    isItAssetAnnouncement: false,
  });

  const [files, setFiles] = useState<FileItem[]>([]);

  // 폼 초기화
  useEffect(() => {
    if (announcement) {
      setForm({
        title: announcement.title,
        content: announcement.content,
        isItAssetAnnouncement: announcement.isItAssetAnnouncement,
      });
      setFiles(announcement.files || []);
    }
  }, [announcement]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const target = e.target as HTMLInputElement;
    const { name, value, type, checked } = target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // 파일 업로드 핸들러
  const handleFilesUploadComplete = (uploadedFiles: FileItem[]) => {
    setFiles(uploadedFiles);
  };

  // 파일 업로드 로딩 상태 핸들러
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

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!announcement) return;

    if (!form.title.trim() || !form.content.trim()) {
      toast.error("제목과 내용을 모두 입력해주세요.");
      return;
    }

    try {
      const updatedAnnouncement = {
        announcementId: announcement.announcementId,
        title: form.title,
        content: form.content,
        authorId: announcement.authorId,
        isItAssetAnnouncement: form.isItAssetAnnouncement,
        files,
        academyIds: selectedAcademyIds,
      };

      const res = await fetch(`/api/announcement/${announcement.announcementId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedAnnouncement),
      });

      if (res.ok) {
        toast.success("공지사항이 수정되었습니다.");
        router.push("/dashboard/announcement");
      } else {
        toast.error("수정 중 오류가 발생했습니다.");
      }
    } catch (err) {
      toast.error("수정 중 오류가 발생했습니다.");
    }
  };

  if (loading) {
    return (
      <div className="p-6 text-center text-gray-500">
        공지사항을 불러오는 중...
      </div>
    );
  }

  if (!announcement) {
    return (
      <div className="p-6 text-center text-gray-500">
        공지사항을 찾을 수 없습니다.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header title="공지 수정" description="공지사항 내용을 수정하세요" />
      <div className="max-w-3xl mx-auto px-4 mt-6">
        <form
          onSubmit={onSubmit}
          className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-6"
        >
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              제목
            </label>
            <input
              name="title"
              value={form.title}
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
              name="content"
              value={form.content}
              onChange={handleChange}
              rows={8}
              required
              className="w-full border rounded-md px-3 py-2"
            />
          </div>

          {/* 체크박스 */}
          <div className="flex items-center space-x-4">
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
          </div>

          {/* 학원 선택 */}
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
            <p className="text-xs text-gray-500 mt-1">
              선택하지 않으면 모든 학원에서 볼 수 있습니다.
            </p>
          </div>

          {/* 파일 업로드 */}
          <S3ImageUploadMultiple 
            onUploadComplete={handleFilesUploadComplete} 
            initialFiles={files} 
            folder="dashboard/announcement" 
            onLoadingChange={handleFileUploadLoading}
          />

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isSubmitting || isFileUploading} // 파일 업로드 중에도 비활성화
              className={`px-4 py-2 rounded-md transition-all duration-200 ${
                isSubmitting || isFileUploading
                  ? "bg-gray-400 text-gray-600 cursor-not-allowed"
                  : "bg-blue-600 text-white hover:bg-blue-700"
              }`}
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2 inline-block"></div>
                  수정 중...
                </>
              ) : isFileUploading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2 inline-block"></div>
                  파일 업로드 중...
                </>
              ) : (
                "공지 수정"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditAnnouncementPage;