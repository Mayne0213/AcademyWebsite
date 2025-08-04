import React, { useState } from "react";
import { Academy } from "@/src/entities/academy/model/types";
import { Button } from "@/src/shared/ui/button";
import UpdateAcademy from "./UpdateAcademy";  
import { Phone, MapPin } from "lucide-react";
import SignedImage from "@/src/shared/ui/SignedImage";
import { useAcademyFeatureStore } from "@/src/features/academyCRUD/model/store";

interface Props {
  academy: Academy;
}

const AcademyItemWithUD: React.FC<Props> = ({ academy }) => {
  const [isEditing, setIsEditing] = useState(false);
  const { updateAcademy, deleteAcademy } = useAcademyFeatureStore();

  const handleUpdate = (updateData: { academyId: number; academyName: string; academyPhone: string; academyAddress: string; files?: any[]; deletedFiles?: number[] }) => {
    updateAcademy(updateData.academyId, updateData);
    setIsEditing(false);
  };

  const handleDelete = () => {
    const confirmed = window.confirm(
      "정말 삭제하시겠습니까?\n삭제된 단과는 복구할 수 없습니다.",
    );
    if (confirmed) {
      deleteAcademy(academy.academyId);
    }
  };

  if (isEditing) {
    return (
      <li className="border p-4 rounded-lg shadow-sm">
        <UpdateAcademy
          academy={academy}
          onUpdate={handleUpdate}
          onCancel={() => setIsEditing(false)}
        />
      </li>
    );
  } else {
    return (
      <li className="border p-4 rounded-lg shadow-sm flex flex-col gap-4">
        {/* 학원 사진 영역 */}
        {academy.academyFiles && academy.academyFiles.length > 0 ? (
          <div className="w-full h-52 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden relative flex-shrink-0">
            <SignedImage
              fileKey={academy.academyFiles[0].file.fileUrl}
              alt="학원 대표 이미지"
              fill
              sizes="(max-width: 600px) 100vw, (max-width: 990px) 50vw, (max-width: 1200px) 33vw, 25vw"
              className="object-cover"
            />
          </div>
        ) : (
          <div className="w-full h-52 bg-gray-200 rounded-lg flex items-center justify-center flex-shrink-0">
            <span className="text-gray-500 text-sm">사진 없음</span>
          </div>
        )}

        {/* 학원 정보 영역 */}
        <div className="">
          <div className="flex justify-between items-start">
            <h3 className="text-xl">{academy.academyName}</h3>
            <div className="flex space-x-2">
              <Button
                onClick={() => setIsEditing(true)}
                className="bg-blue-500 hover:bg-blue-700"
              >
                수정
              </Button>
              <Button
                onClick={handleDelete}
                className="bg-red-500 hover:bg-red-700"
              >
                삭제
              </Button>
            </div>
          </div>
          <p className="text-gray-700 mt-2 flex items-center gap-2">
            <Phone size={20} /> : {academy.academyPhone}
          </p>

          <p className="text-gray-700 mt-1 flex items-center gap-2">
            <MapPin size={20} /> : {academy.academyAddress}
          </p>
        </div>
      </li>
    );
  }
};

export default AcademyItemWithUD; 