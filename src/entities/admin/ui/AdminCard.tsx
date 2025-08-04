import React from 'react';
import { Admin } from '@/src/entities/admin/model/types';

interface AdminCardProps {
  admin: Admin;
  variant?: 'default' | 'compact' | 'detailed';
  onClick?: () => void;
  className?: string;
}

export const AdminCard: React.FC<AdminCardProps> = ({
  admin,
  variant = 'default',
  onClick,
  className = ''
}) => {
  const displayName = admin.adminName;

  if (variant === 'compact') {
    return (
      <div
        className={`flex items-center space-x-3 p-3 bg-white rounded-lg border hover:shadow-md transition-shadow cursor-pointer ${className}`}
        onClick={onClick}
      >
        <div className="w-8 h-8 bg-red-300 rounded-full flex items-center justify-center">
          <span className="text-sm font-medium text-red-700">
            {displayName.charAt(0).toUpperCase()}
          </span>
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-gray-900 truncate">
            {displayName}
          </p>
          <p className="text-xs text-gray-500">
            {admin.adminPhone}
          </p>
        </div>
      </div>
    );
  }

  if (variant === 'detailed') {
    return (
      <div
        className={`p-4 bg-white rounded-lg border hover:shadow-lg transition-shadow cursor-pointer ${className}`}
        onClick={onClick}
      >
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-red-300 rounded-full flex items-center justify-center">
            <span className="text-lg font-medium text-red-700">
              {displayName.charAt(0).toUpperCase()}
            </span>
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900">
              {displayName}
            </h3>
            <p className="text-sm text-gray-600">
              전화번호: {admin.adminPhone}
            </p>
            {admin.adminPosition && (
              <p className="text-sm text-gray-600">
                직책: {admin.adminPosition}
              </p>
            )}
            {admin.adminMemo && (
              <p className="text-sm text-gray-600">
                메모: {admin.adminMemo}
              </p>
            )}
          </div>
          <span className="px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
            관리자
          </span>
        </div>
      </div>
    );
  }

  // Default variant
  return (
    <div
      className={`p-4 bg-white rounded-lg border hover:shadow-md transition-shadow cursor-pointer ${className}`}
      onClick={onClick}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-red-300 rounded-full flex items-center justify-center">
            <span className="text-sm font-medium text-red-700">
              {displayName.charAt(0).toUpperCase()}
            </span>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-900">
              {displayName}
            </h3>
            <p className="text-xs text-gray-500">
              {admin.adminPhone}
            </p>
          </div>
        </div>
        <span className="px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
          관리자
        </span>
      </div>
    </div>
  );
}; 