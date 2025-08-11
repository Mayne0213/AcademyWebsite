import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Button } from "@/src/shared/ui/button";
import { Academy, AcademyFile } from "@/src/entities/academy/model/types";
import { FileUploadDropzone, FileDisplay } from "@/src/entities/file";
import type { File as FileType } from "@/src/entities/file/model/types";
import { useAcademyFeatureStore } from "../model/store";
import { VALIDATION_PATTERNS } from "@/src/shared/config/validation";

// 폼 데이터 타입 정의
interface AcademyFormData {
  academyName: string;
  academyPhone: string;
  academyAddress: string;
}

interface AcademyCUProps {
  mode: 'create' | 'update';
  academy?: Academy; // update 모드에서만 사용
  onAdd?: (academy: Omit<AcademyFormData, "academyId" | "createdAt"> & { files?: FileType[] }) => void;
  onCancel: () => void;
}

const AcademyCU: React.FC<AcademyCUProps> = ({
  mode,
  academy,
  onAdd,
  onCancel,
}) => {
  const { updateAcademy } = useAcademyFeatureStore();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isValid }
  } = useForm<AcademyFormData>({
    defaultValues: {
      academyName: "",
      academyPhone: "",
      academyAddress: "",
    },
    mode: 'onChange'
  });

  // mode나 academy가 변경될 때 폼 초기화
  useEffect(() => {
    if (mode === 'update' && academy) {
      reset({
        academyName: academy.academyName,
        academyPhone: academy.academyPhone,
        academyAddress: academy.academyAddress,
      });
    } else if (mode === 'create') {
      reset({
        academyName: "",
        academyPhone: "",
        academyAddress: "",
      });
    }
  }, [mode, academy, reset]);

  const [uploadedFiles, setUploadedFiles] = useState<FileType[]>([]);
  const [existingFiles, setExistingFiles] = useState<AcademyFile[]>([]);
  const [deletedFiles, setDeletedFiles] = useState<number[]>([]);

  useEffect(() => {
    if (mode === 'update' && academy) {
      setExistingFiles(academy.academyFiles || []);
    }
  }, [mode, academy]);

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

  const onSubmit = async (data: AcademyFormData) => {
    if (mode === 'create') {
      if (onAdd) {
        onAdd({
          academyName: data.academyName,
          academyPhone: data.academyPhone,
          academyAddress: data.academyAddress,
          files: uploadedFiles,
        });
        setUploadedFiles([]);
        onCancel();
      }
    } else if (mode === 'update' && academy) {
      const updateData = {
        academyId: academy.academyId,
        academyName: data.academyName,
        academyPhone: data.academyPhone,
        academyAddress: data.academyAddress,
        files: uploadedFiles,
        deletedFiles: deletedFiles,
      };
      updateAcademy(updateData.academyId, updateData);
    }
  };

  const isCreateMode = mode === 'create';
  const title = isCreateMode ? "신규 단과 추가" : "단과 수정";
  const submitButtonText = isCreateMode ? "추가" : "수정";

  return (
    <div className={`${isCreateMode ? 'rounded-md border-2 p-4 mb-4' : ''}`}>
      <h1 className="text-xl ml-2 mb-2">{title}</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
        <div>
          <Controller
            name="academyName"
            control={control}
            rules={{
              required: isCreateMode ? '단과 이름을 입력해주세요' : true,
              minLength: { value: 2, message: '단과 이름은 2자 이상 입력해주세요' }
            }}
            render={({ field }) => (
              <div>
                <input
                  {...field}
                  type="text"
                  placeholder="단과 이름"
                  className="w-full border p-2"
                />
                {errors.academyName && (
                  <p className="text-red-500 text-xs mt-1">{errors.academyName.message}</p>
                )}
              </div>
            )}
          />
        </div>

        <div>
          <Controller
            name="academyPhone"
            control={control}
            rules={{
              required: isCreateMode ? '전화번호를 입력해주세요' : true,
              pattern: {
                value: /^[0-9]+$/,
                message: '올바른 전화번호 형식을 입력해주세요 (하이픈은 없어야 합니다)'
              }
            }}
            render={({ field }) => (
              <div>
                <input
                  {...field}
                  type="text"
                  placeholder="전화번호"
                  className="w-full border p-2"
                />
                {errors.academyPhone && (
                  <p className="text-red-500 text-xs mt-1">{errors.academyPhone.message}</p>
                )}
              </div>
            )}
          />
        </div>

        <div>
          <Controller
            name="academyAddress"
            control={control}
            rules={{
              required: isCreateMode ? '주소를 입력해주세요' : true,
              minLength: { value: 5, message: '주소는 5자 이상 입력해주세요' }
            }}
            render={({ field }) => (
              <div>
                <input
                  {...field}
                  type="text"
                  placeholder="주소"
                  className="w-full border p-2"
                />
                {errors.academyAddress && (
                  <p className="text-red-500 text-xs mt-1">{errors.academyAddress.message}</p>
                )}
              </div>
            )}
          />
        </div>

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
            type="submit"
            disabled={!isValid}
            className="bg-blue-500 hover:bg-blue-700 text-white p-4 rounded mr-2 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {submitButtonText}
          </Button>
          <Button
            type="button"
            onClick={onCancel}
            className="bg-green-500 hover:bg-green-700 text-white p-4 rounded"
          >
            취소
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AcademyCU;
