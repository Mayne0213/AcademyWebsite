import React, { useEffect, useState } from "react";
import { Button } from "@/src/shared/ui/button";
import { Academy, AcademyFile } from "@/src/entities/academy/model/types";
import { FileUploadDropzone, FileDisplay } from "@/src/entities/file";
import type { File as FileType } from "@/src/entities/file/model/types";
import { useAcademyFeatureStore } from "../model/store";
import { ACADEMY_VALIDATION } from "@/src/entities/academy/model/validation";

interface AcademyFormInput {
  academyName: string;
  academyPhone: string;
  academyAddress: string;
}

interface AcademyCUProps {
  mode: 'create' | 'update';
  academy?: Academy; // update 모드에서만 사용
  onAdd?: (academy: Omit<AcademyFormInput, "academyId" | "createdAt"> & { files?: FileType[] }) => void;
  onCancel: () => void;
}

const AcademyCU: React.FC<AcademyCUProps> = ({
  mode,
  academy,
  onAdd,
  onCancel,
}) => {
  const { updateAcademy } = useAcademyFeatureStore();
  const [form, setForm] = useState<AcademyFormInput>({
    academyName: "",
    academyPhone: "",
    academyAddress: "",
  });
  const [uploadedFiles, setUploadedFiles] = useState<FileType[]>([]);
  const [existingFiles, setExistingFiles] = useState<AcademyFile[]>([]);
  const [deletedFiles, setDeletedFiles] = useState<number[]>([]);

  useEffect(() => {
    if (mode === 'update' && academy) {
      setForm({
        academyName: academy.academyName,
        academyPhone: academy.academyPhone,
        academyAddress: academy.academyAddress,
      });
      setExistingFiles(academy.academyFiles || []);
    }
  }, [mode, academy]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleUploadComplete = (file: FileType) => {
    setUploadedFiles(prev => [...prev, file]);
  };

  const handleFileDelete = (fileId: number) => {
    if (mode === 'update') {
      // 기존 파일에서 삭제하고 deletedFiles에 추가
      const deletedFile = existingFiles.find(file => file.fileId === fileId);
      if (deletedFile) {
        setDeletedFiles(prev => [...prev, fileId]);
        setExistingFiles(prev => prev.filter(file => file.fileId !== fileId));
        return;
      }
    }
    // 업로드된 파일에서 삭제
    setUploadedFiles(prev => prev.filter(file => file.fileId !== fileId));
  };

  const handleSubmit = async () => {
    if (mode === 'create') {
      if (onAdd) {
        onAdd({
          academyName: form.academyName,
          academyPhone: form.academyPhone,
          academyAddress: form.academyAddress,
          files: uploadedFiles,
        });
        setForm({ academyName: "", academyPhone: "", academyAddress: "" });
        setUploadedFiles([]);
        onCancel();
      }
    } else if (mode === 'update' && academy) {
      const updateData = {
        academyId: academy.academyId,
        academyName: form.academyName,
        academyPhone: form.academyPhone,
        academyAddress: form.academyAddress,
        files: uploadedFiles,
        deletedFiles: deletedFiles,
      };
      ACADEMY_VALIDATION.validateAcademyForUpdate(updateData);
      updateAcademy(updateData.academyId, updateData);
    }
  };

  const isCreateMode = mode === 'create';
  const title = isCreateMode ? "신규 단과 추가" : "단과 수정";
  const submitButtonText = isCreateMode ? "추가" : "수정";

  return (
    <div className={`${isCreateMode ? 'rounded-md border-2 p-4 mb-4' : ''}`}>
      <h1 className="text-xl ml-2 mb-2">{title}</h1>
      <input
        type="text"
        name="academyName"
        value={form.academyName}
        onChange={handleChange}
        placeholder="단과 이름"
        required={isCreateMode}
        className="w-full border p-2 mb-2"
      />
      <input
        type="text"
        name="academyPhone"
        value={form.academyPhone}
        onChange={handleChange}
        placeholder="전화번호"
        required={isCreateMode}
        className="w-full border p-2 mb-2"
      />
      <input
        type="text"
        name="academyAddress"
        value={form.academyAddress}
        onChange={handleChange}
        placeholder="주소"
        required={isCreateMode}
        className="w-full border p-2 mb-2"
      />

      {/* 파일 업로드 영역 */}
      <div className="mb-4">
        <h3 className="text-sm font-medium text-gray-700 mb-2">
          {isCreateMode ? "학원 이미지 업로드" : "학원 이미지 추가"}
        </h3>
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

      {/* 기존 파일 목록 (update 모드에서만 표시) */}
      {!isCreateMode && existingFiles.length > 0 && (
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
          <h3 className="text-sm font-medium text-gray-700 mb-2">
            {isCreateMode ? "업로드된 이미지" : "추가할 이미지"}
          </h3>
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
          {submitButtonText}
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

export default AcademyCU;
