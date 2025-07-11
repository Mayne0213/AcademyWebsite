import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Announcement } from "@/components/type/announcementType";
import S3ImageUploadMultiple from "@/components/s3ImageUploadMultiple";
import AttachedFile from "@/components/attachedFile";

interface FileItem {
  url: string;
  name: string;
  type: string;
}

interface EditAnnouncementProps {
  announcement?: Announcement; // ← optional 처리
  onUpdate: (announcement: Announcement) => void;
  onCancel: () => void;
}

const EditAnnouncement: React.FC<EditAnnouncementProps> = ({
  announcement,
  onUpdate,
  onCancel,
}) => {
  const [form, setForm] = useState({
    title: "",
    content: "",
    isItAssetAnnouncement: false,
  });
  const [files, setFiles] = useState<FileItem[]>(announcement?.files || []);

  useEffect(() => {
    if (announcement) {
      setForm({
        title: announcement.title,
        content: announcement.content || "",
        isItAssetAnnouncement: announcement.isItAssetAnnouncement,
      });
      setFiles(announcement.files || []);
    }
  }, [announcement]);

  const handleFilesUploadComplete = (uploadedFiles: FileItem[]) => {
    setFiles(uploadedFiles);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    let fieldValue: any = value;
    if (type === "checkbox") {
      fieldValue = (e.target as HTMLInputElement).checked;
    }
    setForm((prev) => ({
      ...prev,
      [name]: fieldValue,
    }));
  };

  const handleSubmit = () => {
    if (!form.title.trim() || !form.content.trim()) {
      alert("제목과 내용을 모두 입력해주세요.");
      return;
    }
    if (!announcement) return;
    onUpdate({
      ...announcement,
      title: form.title,
      content: form.content,
      isItAssetAnnouncement: form.isItAssetAnnouncement,
      files,
      updatedAt: new Date().toISOString(),
    });
    onCancel();
  };

  if (!announcement) return null; // 또는 로딩 표시

  return (
    <div>
      <h1 className="text-xl ml-2 mb-2">공지사항 수정</h1>
      <input
        type="text"
        name="title"
        value={form.title}
        onChange={handleChange}
        placeholder="공지 제목"
        className="w-full border p-2 mb-2"
      />
      <textarea
        name="content"
        value={form.content}
        onChange={handleChange}
        placeholder="공지 내용"
        className="w-full border p-2 mb-2"
        rows={4}
      />
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
      <S3ImageUploadMultiple 
        onUploadComplete={setFiles} 
        initialFiles={files} 
      />
      {files && files.length > 0 && (
        <div className="mb-2">
          <AttachedFile files={files} />
        </div>
      )}
      <div className="w-full flex justify-end">
        <Button
          onClick={handleSubmit}
          className="bg-blue-500 hover:bg-blue-700 text-white p-4 rounded mr-2"
        >
          저장
        </Button>
        <Button
          onClick={onCancel}
          className="bg-green-500 hover:bg-green-700 text-white p-4 rounded"
        >
          취소
        </Button>
      </div>
    </div>
  );
};

export default EditAnnouncement;
