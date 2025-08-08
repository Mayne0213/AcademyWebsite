'use client';

import { useEffect } from 'react';
import { Admin } from '@/src/entities/admin/model/types';
import { useCounselingBookingStore } from '../model';

// AdminSelector에서 실제로 사용하는 필드들만 포함하는 타입
interface AdminSelectorItem {
  memberId: number;
  adminName: string;
  adminPosition: string;
  adminPhone: string;
}

interface AdminSelectorProps {
  selectedAdminId: number | null;
  onAdminSelect: (adminId: number) => void;
  availableAdmins?: AdminSelectorItem[];
  isLoadingAdmins?: boolean;
}

export const AdminSelector = ({ 
  selectedAdminId, 
  onAdminSelect, 
  availableAdmins,
  isLoadingAdmins = false 
}: AdminSelectorProps) => {
  const { 
    admins, 
    isLoading, 
    error,
    fetchAdmins 
  } = useCounselingBookingStore();

  useEffect(() => {
    if (!availableAdmins) {
      fetchAdmins();
    }
  }, [fetchAdmins, availableAdmins]);

  // 외부에서 전달받은 상담사 목록이 있으면 사용, 없으면 store에서 가져온 것 사용
  const displayAdmins = availableAdmins || admins.map(admin => ({
    memberId: admin.memberId,
    adminName: admin.adminName,
    adminPosition: admin.adminPosition,
    adminPhone: admin.adminPhone
  }));
  const displayLoading = isLoadingAdmins || isLoading;

  if (displayLoading) {
    return (
      <div className="flex justify-center items-center h-32">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-600 p-4">
        {error}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">상담사 선택</h3>
      {displayAdmins.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          현재 예약 가능한 상담사가 없습니다.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {displayAdmins.map((admin: AdminSelectorItem) => (
            <div
              key={admin.memberId}
              className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                selectedAdminId === admin.memberId
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => onAdminSelect(admin.memberId)}
            >
              <h4 className="font-medium">{admin.adminName}</h4>
              <p className="text-sm text-gray-600">{admin.adminPosition}</p>
              <p className="text-sm text-gray-500">{admin.adminPhone}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}; 