"use client";

import { useStudentStore } from "@/src/entities/student/model/store";
import {
  User,
  Smartphone,
  GraduationCap,
  Calendar,
  Building2,
  FileText
} from "lucide-react";

export function StudentCard() {
  const { studentDetail } = useStudentStore();
  const currentYear = new Date().getFullYear();
  const age = currentYear - (studentDetail?.studentBirthYear || 0);

  return (
    <div className="w-full max-w-lg bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200">
      <div className="p-6">
        {/* Header with profile icon and basic info */}
        <div className="flex items-start gap-4 mb-4">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
            <User className="w-8 h-8 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-xl font-bold text-gray-900 mb-1 truncate">
              {studentDetail?.studentName}
            </h3>
            <span className="inline-block px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full mb-2">
              {studentDetail?.role}
            </span>
            <p className="text-sm text-gray-500">ID: {studentDetail?.userId}</p>
          </div>
        </div>

        {/* Student information */}
        <div className="space-y-3">
          {/* Phone */}
          <div className="flex items-center gap-3 text-sm">
            <Smartphone className="w-4 h-4 text-gray-400 flex-shrink-0" />
            <span className="text-gray-700">{studentDetail?.studentPhone}</span>
          </div>

          {/* Birth Year & Age */}
          <div className="flex items-center gap-3 text-sm">
            <Calendar className="w-4 h-4 text-gray-400 flex-shrink-0" />
            <span className="text-gray-700">
              {studentDetail?.studentBirthYear}년생 ({age}세)
            </span>
          </div>

          {/* High School */}
          {studentDetail?.studentHighschool && (
            <div className="flex items-center gap-3 text-sm">
              <GraduationCap className="w-4 h-4 text-gray-400 flex-shrink-0" />
              <span className="text-gray-700 truncate">{studentDetail?.studentHighschool}</span>
            </div>
          )}

          {/* Academy */}
          <div className="flex items-center gap-3 text-sm">
            <Building2 className="w-4 h-4 text-gray-400 flex-shrink-0" />
            <span className="text-gray-700 truncate">{studentDetail?.academy?.academyName}</span>
          </div>
        </div>

        {/* Footer with additional info */}
        <div className="mt-4 pt-4 border-t border-gray-100">
          <div className="flex justify-between items-center text-xs text-gray-500">
            <span>QnA: {studentDetail?.studentQnas?.length || 0}건</span>
            {studentDetail?.createdAt && (
              <span>
                가입일: {new Date(studentDetail?.createdAt).toLocaleDateString('ko-KR')}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}