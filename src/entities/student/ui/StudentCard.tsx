"use client";

import { useStudentStore } from "@/src/entities/student/model/store";
import { useStudentFeatureStore } from "@/src/features/studentCRUD/model/store";
import { useRouter } from "next/navigation";
import {
  User,
  Smartphone,
  GraduationCap,
  Calendar,
  Building2,
  Trash2
} from "lucide-react";

export function StudentCard() {
  const { studentDetail } = useStudentStore();
  const { deleteStudent } = useStudentFeatureStore();
  const router = useRouter();
  const currentYear = new Date().getFullYear();
  const age = currentYear - (studentDetail?.studentBirthYear || 0);

  // 학생 삭제 함수
  const handleDeleteStudent = async () => {
    if (!studentDetail) return;

    const confirmMessage = `정말로 ${studentDetail.studentName} 학생을 삭제하시겠습니까?\n\n이 작업은 되돌릴 수 없으며, 학생의 모든 데이터(시험 결과, QnA, 상담 기록 등)가 함께 삭제됩니다.`;
    if (confirm(confirmMessage)) {
      try {
        router.push('/main/student');
        await deleteStudent(studentDetail.memberId);
      } catch (error) {
        console.error('학생 삭제 실패:', error);
      }
    }
  };

  return (
    <div className="w-full max-w-lg bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200">
      <div className="p-6">
        {/* Header with profile icon and basic info */}
        <div className="flex items-start gap-4 mb-4">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
            <User className="w-8 h-8 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold text-gray-900 mb-1 truncate">
              {studentDetail?.studentName}
            </h3>
            <p className="text-sm text-gray-500">ID: {studentDetail?.userId}</p>

          </div>
          <button
                onClick={handleDeleteStudent}
                className="flex items-center space-x-1 px-3 py-1.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm"
                title="학생 삭제"
              >
                <Trash2 className="w-4 h-4" />
                <span>삭제</span>
              </button>
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