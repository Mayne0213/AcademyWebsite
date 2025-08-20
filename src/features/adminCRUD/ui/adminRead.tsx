"use client";

import { useEffect } from "react";
import { AdminItem } from "@/src/entities/admin/ui/AdminItem";
import { useAdminFeatureStore } from "@/src/features/adminCRUD";
import { useAdminStore } from "@/src/entities/admin/model/store";
import { Admin } from "@/src/entities/admin/model/types";

// 관리자 목록 컴포넌트
export const AdminRead = () => {
  const { readAdmins } = useAdminFeatureStore();
  const { admins, isLoading } = useAdminStore();

  useEffect(() => {
    readAdmins();
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex-grow">
      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <div className="text-lg font-sansKR-Medium text-gray-500">불러오는 중...</div>
        </div>
      ) : admins.length === 0 ? (
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="text-lg font-sansKR-Medium text-gray-500 mb-2">등록된 관리자가 없습니다</div>
            <div className="text-sm text-gray-400">새 관리자를 추가해보세요</div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 smalltablet:grid-cols-2 tablet:grid-cols-3 desktop:grid-cols-4 gap-4 smalltablet:gap-6">
          {admins.map((admin) => (
            <AdminItem key={admin.memberId} admin={admin as Admin} />
          ))}
        </div>
      )}
    </div>
  );
};
