import React from 'react';
import { Academy } from '../model/types';

interface AcademyCardProps {
  academy: Academy;
  variant?: 'default' | 'compact' | 'detailed';
  onClick?: () => void;
  className?: string;
}

export const AcademyCard: React.FC<AcademyCardProps> = ({
  academy,
  variant = 'default',
  onClick,
  className = ''
}) => {
  const displayName = academy.academyName;

  if (variant === 'compact') {
    return (
      <div
        className={`flex items-center space-x-3 p-3 bg-white rounded-lg border hover:shadow-md transition-shadow cursor-pointer ${className}`}
        onClick={onClick}
      >
        <div className="w-8 h-8 bg-green-300 rounded-full flex items-center justify-center">
          <span className="text-sm font-medium text-green-700">
            {displayName.charAt(0).toUpperCase()}
          </span>
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-gray-900 truncate">
            {displayName}
          </p>
          <p className="text-xs text-gray-500">
            {academy.academyPhone}
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
          <div className="w-12 h-12 bg-green-300 rounded-full flex items-center justify-center">
            <span className="text-lg font-medium text-green-700">
              {displayName.charAt(0).toUpperCase()}
            </span>
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900">
              {displayName}
            </h3>
            <p className="text-sm text-gray-600">
              전화번호: {academy.academyPhone}
            </p>
            <p className="text-sm text-gray-600">
              주소: {academy.academyAddress}
            </p>
            <p className="text-xs text-gray-500 mt-2">
              등록일: {new Date(academy.createdAt).toLocaleDateString('ko-KR')}
            </p>
          </div>
          <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
            학원
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
          <div className="w-10 h-10 bg-green-300 rounded-full flex items-center justify-center">
            <span className="text-sm font-medium text-green-700">
              {displayName.charAt(0).toUpperCase()}
            </span>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-900">
              {displayName}
            </h3>
            <p className="text-xs text-gray-500">
              {academy.academyPhone}
            </p>
          </div>
        </div>
        <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
          학원
        </span>
      </div>
    </div>
  );
};
