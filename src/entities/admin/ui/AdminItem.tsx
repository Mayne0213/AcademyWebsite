"use client";

import { Button } from "@/src/shared/ui/button";
import { Trash2, User } from "lucide-react";
import { Admin } from '@/src/entities/admin/model/types';
import { useAdminFeatureStore } from '@/src/features/adminCRUD';

interface AdminItemProps {
  admin: Admin;
  className?: string;
}

// 편집과 삭제가 가능한 관리자 아이템 컴포넌트
export const AdminItem: React.FC<AdminItemProps> = ({
  admin,
  className = ''
}) => {
  const { deleteAdmin } = useAdminFeatureStore();

  const handleDelete = async () => {
    if (!window.confirm(`정말 삭제하시겠습니까? (${admin.adminName})`)) return;
    try {
      await deleteAdmin(admin.memberId);
    } catch (error) {
      console.error("관리자 삭제 실패:", error);
    }
  };

  return (
    <>
      <div className={`group ${className}`}>
        <div className="relative p-6 bg-gradient-to-br from-white to-gray-50 rounded-xl border-2 border-gray-100 hover:border-blue-200 transition-all duration-300 hover:shadow-lg">
          {/* 헤더 영역 */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center space-x-4">
              {/* 아바타 */}
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-md">
                  <span className="text-lg font-sansKR-Bold text-white">
                    <User className="w-6 h-6" />
                  </span>
                </div>
              </div>
              
              {/* 기본 정보 */}
              <div className="flex-1">
                <h3 className="text-lg font-sansKR-Bold text-gray-900 mb-1">
                  {admin.adminName}
                </h3>
                <div className="flex items-center space-x-2 mb-2">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-sansKR-Medium bg-blue-100 text-blue-800 max-w-32 truncate">
                    {admin.adminPosition}
                  </span>
                </div>
              </div>
            </div>

            {/* 액션 버튼들 */}
              <Button
                variant="ghost"
                size="sm"
                onClick={handleDelete}
                className="h-9 w-9 p-0 hover:bg-red-100 rounded-full"
              >
                <Trash2 className="h-4 w-4 text-red-600" />
              </Button>
          </div>

          {/* 하단 정보 */}
          <div className="border-t border-gray-100 pt-3">
            <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
              <span className="font-sansKR-Medium">{admin.adminPhone}</span>
            </div>
          </div>

          {/* 호버 효과 */}
          <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-50 to-purple-50 opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none"></div>
        </div>
      </div>
    </>
  );
};
