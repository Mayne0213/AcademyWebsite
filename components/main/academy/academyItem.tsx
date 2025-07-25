import React, { useState } from "react";
import { Academy } from "@/components/type/academyType";
import { Button } from "@/components/ui/button";
import EditAcademy from "./editAcademy";
import { Phone, MapPin } from "lucide-react";
import useAcademy from "@/components/hooks/useAcademy";
import Image from "next/image";

interface Props {
  academy: Academy;
}

const AcademyItem: React.FC<Props> = ({ academy }) => {
  const [isEditing, setIsEditing] = useState(false);
  const { updateAcademy, removeAcademy } = useAcademy();

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleUpdate = (updated: Academy) => {
    updateAcademy(updated);
    setIsEditing(false);
  };

  const handleDelete = () => {
    const confirmed = window.confirm(
      "정말 삭제하시겠습니까?\n삭제된 단과는 복구할 수 없습니다.",
    );
    if (confirmed) {
      removeAcademy(academy);
    }
  };

  if (isEditing) {
    return (
      <li className="border p-4 rounded-lg shadow-sm">
        <EditAcademy
          academy={academy}
          onUpdate={handleUpdate}
          onCancel={handleCancel}
        />
      </li>
    );
  } else {
    return (
      <li className="border p-4 rounded-lg shadow-sm flex flex-col gap-4">
        {/* 학원 사진 영역 */}
        {academy.mainImageUrl ? (
          <div className="w-full h-52 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden relative">
            <Image
              src={academy.mainImageUrl}
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
                onClick={handleEdit}
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

          {academy.academyPhone && (
            <p className="text-gray-700 mt-2 flex items-center gap-2">
              <Phone size={20} /> : {academy.academyPhone}
            </p>
          )}

          {academy.academyAddress && (
            <p className="text-gray-700 mt-1 flex items-center gap-2">
              <MapPin size={20} /> : {academy.academyAddress}
            </p>
          )}
        </div>
      </li>
    );
  }
};

export default AcademyItem;
