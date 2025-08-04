import React from 'react';
import { Student } from '../model/types';

interface StudentCardProps {
  student: Student;
  variant?: 'default' | 'compact' | 'detailed';
  onClick?: () => void;
  className?: string;
}

export const StudentCard: React.FC<StudentCardProps> = ({
  student,
  variant = 'default',
  onClick,
  className = ''
}) => {
  const displayName = student.studentName;

  if (variant === 'compact') {
    return (
      <div
        className={`flex items-center space-x-3 p-3 bg-white rounded-lg border hover:shadow-md transition-shadow cursor-pointer ${className}`}
        onClick={onClick}
      >
        <div className="w-8 h-8 bg-blue-300 rounded-full flex items-center justify-center">
          <span className="text-sm font-medium text-blue-700">
            {displayName.charAt(0).toUpperCase()}
          </span>
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-gray-900 truncate">
            {displayName}
          </p>
          <p className="text-xs text-gray-500">
            {student.studentPhone}
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
          <div className="w-12 h-12 bg-blue-300 rounded-full flex items-center justify-center">
            <span className="text-lg font-medium text-blue-700">
              {displayName.charAt(0).toUpperCase()}
            </span>
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900">
              {displayName}
            </h3>
            <p className="text-sm text-gray-600">
              전화번호: {student.studentPhone}
            </p>
            <p className="text-sm text-gray-600">
              학교: {student.studentHighschool}
            </p>
            <p className="text-sm text-gray-600">
              출생년도: {student.studentBirthYear}
            </p>
            {student.studentMemo && (
              <p className="text-sm text-gray-600">
                메모: {student.studentMemo}
              </p>
            )}
          </div>
          <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            학생
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
          <div className="w-10 h-10 bg-blue-300 rounded-full flex items-center justify-center">
            <span className="text-sm font-medium text-blue-700">
              {displayName.charAt(0).toUpperCase()}
            </span>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-900">
              {displayName}
            </h3>
            <p className="text-xs text-gray-500">
              {student.studentPhone}
            </p>
          </div>
        </div>
        <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
          학생
        </span>
      </div>
    </div>
  );
}; 