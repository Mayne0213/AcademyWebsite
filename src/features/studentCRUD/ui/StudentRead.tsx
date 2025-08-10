"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Student } from "@/src/entities/student/model/types";

interface StudentReadProps {
  users: Student[];
  isLoading?: boolean;
  totalUsers?: number;
}

const StudentReadSkeleton = () => {
  return (
    <div className="w-full overflow-x-auto">
      <table className="min-w-[800px] w-full table-fixed">
        <thead>
          <tr className="bg-gray-100 font-semibold text-gray-700 border-y border-gray-300">
            <th className="py-3 text-center w-1/6">이름</th>
            <th className="py-3 text-center w-1/6">학원</th>
            <th className="py-3 text-center w-1/6">전화번호</th>
            <th className="py-3 text-center w-1/6">고등학교</th>
            <th className="py-3 text-center w-1/6">생년</th>
            <th className="py-3 text-center w-1/6">메모</th>
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: 20 }).map((_, index) => (
            <tr key={index} className="text-sm text-gray-800 border-b border-gray-200">
              <td className="py-3 text-center w-1/6">
                <div className="h-4 bg-gray-200 rounded-xl animate-pulse mx-auto w-16"></div>
              </td>
              <td className="py-3 text-center w-1/6">
                <div className="h-4 bg-gray-200 rounded-xl animate-pulse mx-auto w-20"></div>
              </td>
              <td className="py-3 text-center w-1/6">
                <div className="h-4 bg-gray-200 rounded-xl animate-pulse mx-auto w-24"></div>
              </td>
              <td className="py-3 text-center w-1/6">
                <div className="h-4 bg-gray-200 rounded-xl animate-pulse mx-auto w-28"></div>
              </td>
              <td className="py-3 text-center w-1/6">
                <div className="h-4 bg-gray-200 rounded-xl animate-pulse mx-auto w-20"></div>
              </td>
              <td className="py-3 text-center w-1/6">
                <div className="h-4 bg-gray-200 rounded-xl animate-pulse mx-auto w-48"></div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const StudentRead: React.FC<StudentReadProps> = ({ users, isLoading = true, totalUsers = 0 }) => {
  const router = useRouter();
  const currentYear = new Date().getFullYear();

  // 로딩 중일 때 스켈레톤 반환
  if (isLoading) {
    return <StudentReadSkeleton />;
  }

  // 검색 결과가 없을 때 메시지 반환
  if (totalUsers === 0) {
    return (
      <div className="flex-grow h-screen flex items-center justify-center text-xl font-sansKR-SemiBold">
        검색된 학생이 없습니다
      </div>
    );
  }

  return (
    <div className="w-full overflow-x-auto">
      <table className="min-w-[800px] w-full table-fixed">
        <thead>
          <tr className="bg-gray-100 font-semibold text-gray-700 border-y border-gray-300">
            <th className="py-3 text-center w-1/6">이름</th>
            <th className="py-3 text-center w-1/6">학원</th>
            <th className="py-3 text-center w-1/6">전화번호</th>
            <th className="py-3 text-center w-1/6">고등학교</th>
            <th className="py-3 text-center w-1/6">생년</th>
            <th className="py-3 text-center w-1/6">메모</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.memberId} className="text-sm bg-white text-gray-800 border-b border-gray-200 hover:bg-gray-50 transition">
              <td className="py-3 text-center cursor-pointer w-1/6" onClick={() => router.push(`/main/student/${user.memberId}`)}>
                {user.studentName}
              </td>
              <td className="py-3 text-center w-1/6">{user.academy?.academyName || "없음"}</td>
              <td className="py-3 text-center w-1/6">{user.studentPhone}</td>
              <td className="py-3 text-center w-1/6">{user.studentHighschool}</td>
              <td className="py-3 text-center w-1/6">{user.studentBirthYear}년({currentYear - user.studentBirthYear + 1}세)</td>
              <td className="py-3 text-center w-1/6">{user.studentMemo}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export { StudentRead };
