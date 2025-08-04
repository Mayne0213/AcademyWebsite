import React, { useState } from "react";
import { Button } from "@/src/shared/ui/button";
import { FileUploadDropzone, FileDisplay } from "@/src/entities/file";
import type { File } from "@/src/entities/file/model/types";

interface AcademyFormInput {
  academyName: string;
  academyPhone: string;
  academyAddress: string;
}

interface CreateAcademyProps {
  onAdd: (academy: Omit<AcademyFormInput, "academyId" | "createdAt"> & { files?: File[] }) => void;
  onCancel: () => void;
}

const CreateAcademy: React.FC<CreateAcademyProps> = ({ onAdd, onCancel }) => {
  const [form, setForm] = useState<AcademyFormInput>({
    academyName: "",
    academyPhone: "",
    academyAddress: "",
  });
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleUploadComplete = (file: File) => {
    setUploadedFiles(prev => [...prev, file]);
  };

  const handleUploadError = (error: string) => {
    console.error('Upload error:', error);
  };

  const handleFileDelete = (fileId: number) => {
    setUploadedFiles(prev => prev.filter(file => file.fileId !== fileId));
  };

  const handleSubmit = () => {
    onAdd({
      academyName: form.academyName,
      academyPhone: form.academyPhone,
      academyAddress: form.academyAddress,
      files: uploadedFiles,
    });
    setForm({ academyName: "", academyPhone: "", academyAddress: "" });
    setUploadedFiles([]);
    onCancel();
  };

  return (
    <div className="rounded-md border-2 p-4 mb-4">
      <h1 className="text-xl ml-2 mb-2">신규 단과 추가</h1>
      <input
        type="text"
        name="academyName"
        value={form.academyName}
        onChange={handleChange}
        placeholder="단과 이름"
        required
        className="w-full border p-2 mb-2"
      />
      <input
        type="text"
        name="academyPhone"
        value={form.academyPhone}
        onChange={handleChange}
        placeholder="전화번호"
        required
        className="w-full border p-2 mb-2"
      />
      <input
        type="text"
        name="academyAddress"
        value={form.academyAddress}
        onChange={handleChange}
        placeholder="주소"
        required
        className="w-full border p-2 mb-2"
      />

      {/* 파일 업로드 영역 */}
      <div className="mb-4">
        <h3 className="text-sm font-medium text-gray-700 mb-2">학원 이미지 업로드</h3>
        <FileUploadDropzone
          onUploadComplete={handleUploadComplete}
          accept={{
            'image/*': ['.jpeg', '.jpg', '.png', '', '.webp']
          }}
          multiple={true}
          folder="academy-images"
          className="mb-4"
        />
      </div>

      {/* 업로드된 파일 목록 */}
      {uploadedFiles.length > 0 && (
        <div className="mb-4">
          <h3 className="text-sm font-medium text-gray-700 mb-2">업로드된 이미지</h3>
          <div className="space-y-2">
            {uploadedFiles.map((file) => (
              <FileDisplay
                key={file.fileId}
                file={file}
                onDelete={handleFileDelete}
                showDelete={true}
              />
            ))}
          </div>
        </div>
      )}

      <div className="w-full flex justify-end">
        <Button
          onClick={handleSubmit}
          className="bg-blue-500 hover:bg-blue-700 text-white p-4 rounded mr-2"
        >
          추가
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

export default CreateAcademy; 