import React, { useState } from "react";
import { Academy } from "@/src/entities/academy/model/types";
import { Button } from "@/src/shared/ui/button";
import AcademyCU from "@/src/features/academyCRUD/ui/AcademyCU";  
import { Phone, MapPin } from "lucide-react";
import SignedImage from "@/src/shared/ui/SignedImage";
import { useAcademyFeatureStore } from "@/src/features/academyCRUD/model/store";

interface Props {
  academy: Academy;
}

const AcademyItem: React.FC<Props> = ({ academy }) => {
  const [isEditing, setIsEditing] = useState(false);
  const { deleteAcademy } = useAcademyFeatureStore();

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
      <li className="border p-3 smalltablet:p-4 tablet:p-6 rounded-lg shadow-sm">
        <AcademyCU
          mode="update"
          academy={academy}
          onCancel={() => setIsEditing(false)}
        />
      </li>
    );
  } else {
    return (
      <li className="border p-3 smalltablet:p-4 tablet:p-6 rounded-lg shadow-sm flex flex-col gap-3 smalltablet:gap-4 tablet:gap-6">
        {/* 학원 사진 영역 */}
        {academy.academyFiles && academy.academyFiles.length > 0 ? (
          <div className="w-full h-32 smalltablet:h-40 tablet:h-52 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden relative flex-shrink-0">
            <SignedImage
              fileKey={academy.academyFiles[0].file.fileUrl}
              alt="학원 대표 이미지"
              fill
              sizes="(max-width: 600px) 100vw, (max-width: 990px) 50vw, (max-width: 1200px) 33vw, 25vw"
              className="object-cover"
            />
          </div>
        ) : (
          <div className="w-full h-32 smalltablet:h-40 tablet:h-52 bg-gray-200 rounded-lg flex items-center justify-center flex-shrink-0">
            <span className="text-gray-500 text-xs smalltablet:text-sm">사진 없음</span>
          </div>
        )}

        {/* 학원 정보 영역 */}
        <div className="">
          <div className="flex justify-between items-start gap-2">
            <h3 className="text-lg smalltablet:text-xl tablet:text-xl font-medium truncate flex-1">{academy.academyName}</h3>
            <div className="flex space-x-1 smalltablet:space-x-2 flex-shrink-0">
              <Button
                onClick={() => setIsEditing(true)}
                className="bg-blue-500 hover:bg-blue-700 text-xs smalltablet:text-sm px-2 smalltablet:px-3 py-1 smalltablet:py-2 h-7 smalltablet:h-8"
              >
                수정
              </Button>
              <Button
                onClick={handleDelete}
                className="bg-red-500 hover:bg-red-700 text-xs smalltablet:text-sm px-2 smalltablet:px-3 py-1 smalltablet:py-2 h-7 smalltablet:h-8"
              >
                삭제
              </Button>
            </div>
          </div>
          <p className="text-gray-700 mt-2 flex items-center gap-2 text-sm smalltablet:text-base">
            <Phone className="w-4 smalltablet:w-5 tablet:w-5 h-4 smalltablet:h-5 tablet:h-5 flex-shrink-0" /> 
            <span className="truncate">{academy.academyPhone}</span>
          </p>

          <p className="text-gray-700 mt-1 flex items-center gap-2 text-sm smalltablet:text-base">
            <MapPin className="w-4 smalltablet:w-5 tablet:w-5 h-4 smalltablet:h-5 tablet:h-5 flex-shrink-0" /> 
            <span className="truncate">{academy.academyAddress}</span>
          </p>
        </div>
      </li>
    );
  }
};

export default AcademyItem;
