import React, { useEffect, useState } from "react";
import { Button } from "@/src/shared/ui/button";
import { Academy, AcademyFile } from "@/src/entities/academy/model/types";
import { FileUploadDropzone, FileDisplay } from "@/src/entities/file";
import type { File as FileType } from "@/src/entities/file/model/types";

interface UpdateAcademyProps {
  academy: Academy;
  onUpdate: (updateData: { academyId: number; academyName: string; academyPhone: string; academyAddress: string; files?: FileType[]; deletedFiles?: number[] }) => void;
  onCancel: () => void;
}

const UpdateAcademy: React.FC<UpdateAcademyProps> = ({
  academy,
  onUpdate,
  onCancel,
}) => {
  const [form, setForm] = useState({
    academyName: academy.academyName,
    academyPhone: academy.academyPhone,
    academyAddress: academy.academyAddress,
  });
  const [uploadedFiles, setUploadedFiles] = useState<FileType[]>([]);
  const [existingFiles, setExistingFiles] = useState<AcademyFile[]>(academy.academyFiles || []);
  const [deletedFiles, setDeletedFiles] = useState<number[]>([]);

  useEffect(() => {
    setForm({
      academyName: academy.academyName,
      academyPhone: academy.academyPhone,
      academyAddress: academy.academyAddress,
    });

    // 기존 파일들 설정
    setExistingFiles(academy.academyFiles || []);
  }, [academy]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleUploadComplete = (file: FileType) => {
    setUploadedFiles(prev => [...prev, file]);
  };

  const handleUploadError = (error: string) => {
    console.error('Upload error:', error);
  };

  const handleFileDelete = (fileId: number) => {
    // 기존 파일에서 삭제하고 deletedFiles에 추가
    const deletedFile = existingFiles.find(file => file.fileId === fileId);
    if (deletedFile) {
      setDeletedFiles(prev => [...prev, fileId]);
      setExistingFiles(prev => prev.filter(file => file.fileId !== fileId));
    } else {
      // 업로드된 파일에서 삭제
      setUploadedFiles(prev => prev.filter(file => file.fileId !== fileId));
    }
  };



  const handleSubmit = () => {
    const updateData = {
      academyId: academy.academyId,
      academyName: form.academyName,
      academyPhone: form.academyPhone,
      academyAddress: form.academyAddress,
      files: uploadedFiles,
      deletedFiles: deletedFiles,
    };

    onUpdate(updateData);
    onCancel();
  };

  return (
    <div>
      <h1 className="text-xl ml-2 mb-2">단과 수정</h1>
      <input
        type="text"
        name="academyName"
        value={form.academyName}
        onChange={handleChange}
        placeholder="단과 이름"
        className="w-full border p-2 mb-2"
      />
      <input
        type="text"
        name="academyPhone"
        value={form.academyPhone}
        onChange={handleChange}
        placeholder="전화번호 (선택)"
        className="w-full border p-2 mb-2"
      />
      <input
        type="text"
        name="academyAddress"
        value={form.academyAddress}
        onChange={handleChange}
        placeholder="주소 (선택)"
        className="w-full border p-2 mb-2"
      />

      {/* 파일 업로드 영역 */}
      <div className="mb-4">
        <h3 className="text-sm font-medium text-gray-700 mb-2">학원 이미지 추가</h3>
        <FileUploadDropzone
          onUploadComplete={handleUploadComplete}
          accept={{
            'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.webp']
          }}
          multiple={true}
          folder="academy-images"
          className="mb-4"
        />
      </div>

      {/* 기존 파일 목록 */}
      {existingFiles.length > 0 && (
        <div className="mb-4">
          <h3 className="text-sm font-medium text-gray-700 mb-2">기존 이미지</h3>
          <div className="space-y-2">
            {existingFiles.map((file) => (
              <FileDisplay
                key={file.fileId}
                file={file.file}
                onDelete={handleFileDelete}
                showDelete={true}
              />
            ))}
          </div>
        </div>
      )}

      {/* 업로드된 파일 목록 */}
      {uploadedFiles.length > 0 && (
        <div className="mb-4">
          <h3 className="text-sm font-medium text-gray-700 mb-2">추가할 이미지</h3>
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
          수정
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

export default UpdateAcademy; 