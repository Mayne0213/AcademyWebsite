import React from "react";
import { Button } from "@/shared/ui";
import { Academy } from "@/shared/types/entities";

interface AcademyCardProps {
  academy: Academy;
  onEdit?: (academy: Academy) => void;
  onDelete?: (academyId: number) => void;
  onView?: (academy: Academy) => void;
  showActions?: boolean;
}

export const AcademyCard: React.FC<AcademyCardProps> = ({
  academy,
  onEdit,
  onDelete,
  onView,
  showActions = false
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
            <span className="text-lg font-semibold text-blue-600">
              {academy.academyName.charAt(0)}
            </span>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{academy.academyName}</h3>
            <p className="text-sm text-gray-500">{academy.academyPhone}</p>
          </div>
        </div>
        <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
          학원
        </span>
      </div>

      <div className="space-y-2 mb-4">
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">학원 ID:</span>
          <span className="font-medium">{academy.academyId}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">주소:</span>
          <span className="font-medium">{academy.academyAddress}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">전화번호:</span>
          <span className="font-medium">{academy.academyPhone}</span>
        </div>
        {academy.mainImageUrl && (
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">메인 이미지:</span>
            <span className="font-medium">있음</span>
          </div>
        )}
      </div>

      {showActions && (
        <div className="flex space-x-2 pt-4 border-t border-gray-200">
          {onView && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => onView(academy)}
              className="flex-1"
            >
              보기
            </Button>
          )}
          {onEdit && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => onEdit(academy)}
              className="flex-1"
            >
              수정
            </Button>
          )}
          {onDelete && (
            <Button
              variant="destructive"
              size="sm"
              onClick={() => onDelete(academy.academyId)}
              className="flex-1"
            >
              삭제
            </Button>
          )}
        </div>
      )}
    </div>
  );
}; 