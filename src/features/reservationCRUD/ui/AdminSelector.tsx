'use client';

import { useEffect } from 'react';
import { AdminWithSchedules } from '@/src/entities/reservation/model/types';
import { useReservationCRUDStore } from '../model';

interface AdminSelectorProps {
  selectedAdminId: number | null;
  onAdminSelect: (adminId: number) => void;
  availableAdmins?: AdminWithSchedules[];
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
    readAdmins 
  } = useReservationCRUDStore();

  useEffect(() => {
    if (!availableAdmins) {
      readAdmins();
    }
  }, [readAdmins, availableAdmins]);

  // 외부에서 전달받은 상담사 목록이 있으면 사용, 없으면 store에서 가져온 것 사용
  const displayAdmins = availableAdmins || admins;
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
      {displayAdmins.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          현재 예약 가능한 선생님이 없습니다.
        </div>
      ) : (
        <div className="grid grid-cols-1 smalltablet:grid-cols-2 tablet:grid-cols-3 gap-4">
          {displayAdmins.map((admin) => (
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
            </div>
          ))}
        </div>
      )}
    </div>
  );
}; 