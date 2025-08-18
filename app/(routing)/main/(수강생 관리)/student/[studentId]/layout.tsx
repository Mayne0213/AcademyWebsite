"use client";

import Image from "next/image";
import { ReactNode, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import studentInformationBackground from "@/public/main/student/studentInformationBackground.jpg";
import { useStudentFeatureStore } from "@/src/features/studentCRUD/model/store";
import {
  Settings,
  User,
  Smartphone,
  LampDesk,
} from "lucide-react";
import { StudentCard, StudentMemo, useStudentStore } from "@/src/entities/student";

interface StudentLayoutProps {
  children: ReactNode;
}



export default function StudentLayout({ children }: StudentLayoutProps) {
  const params = useParams();
  const studentId = Number(params.studentId);
  const { studentDetail, isLoading } = useStudentStore();
  const { readStudentById, updateStudent } = useStudentFeatureStore();

  // 메모 업데이트 상태 관리
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    readStudentById(studentId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [studentId]);

  // 메모 업데이트 함수
  const handleUpdateMemo = async (memoText: string) => {
    if (!studentDetail) return;

    setIsSaving(true);
    try {
      const updatedStudentData = {
        ...studentDetail,
        studentMemo: memoText || undefined
      };

      await updateStudent(updatedStudentData);
    } catch (error) {
      console.error("메모 저장 실패:", error);
      throw error; // 에러를 다시 던져서 컴포넌트에서 처리할 수 있도록
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">학생 정보를 불러오는 중...</p>
        </div>
      </div>
    );
  }

  if (!studentDetail) {
    return (
      <div className="bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">학생을 찾을 수 없습니다.</p>
          <button
            onClick={() => window.history.back()}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            뒤로 가기
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Background Image - extends beyond parent padding */}
        <div className="relative bg-black h-64 w-[calc(100%+32px)] -mx-4 tablet:w-[calc(100%+48px)] tablet:-mx-6 tablet:-my-6 rounded-t-lg overflow-hidden">
        <Image
          src={studentInformationBackground}
          alt="Student Information Background"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40" />
      </div>

      {/* Main Content */}
      <div className="relative w-full -mt-32 z-10 px-6">
        <div >
          <div className="mb-8 flex gap-4">
            <StudentCard />

            {/* Student Memo */}
            <StudentMemo
              onUpdateMemo={handleUpdateMemo}
              isUpdating={isSaving}
            />

          </div>
            {/* Navigation Tabs */}
            <div className="bg-white w-full h-full space-y-4">
              <div className="flex justify-end border-b border-gray-200">
                <button className="flex items-center gap-2 px-6 py-4 text-blue-600 bg-blue-50 border-b-2 border-blue-600 transition-colors">
                  <User className="w-4 h-4" />
                  <span>상담</span>
                </button>
                <button className="flex items-center gap-2 px-6 py-4 text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition-colors">
                  <LampDesk className="w-4 h-4" />
                  <span>성적</span>
                </button>
                <button className="flex items-center gap-2 px-6 py-4 text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition-colors">
                  <Smartphone className="w-4 h-4" />
                  <span>Qna</span>
                </button>
                <button className="rounded-t-lg flex items-center gap-2 px-6 py-4 text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition-colors">
                  <Settings className="w-4 h-4" />
                  <span>설정</span>
                </button>
              </div>
              {children}
            </div>

        </div>
      </div>
    </div>
  );
}
