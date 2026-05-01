"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Student } from "@/src/entities/student/model/types";

interface StudentReadProps {
  users: Student[];
  isLoading?: boolean;
  totalUsers?: number;
  selectedIds?: number[];
  onToggleSelect?: (memberId: number) => void;
  onToggleSelectAll?: (memberIds: number[], select: boolean) => void;
}

const StudentReadSkeleton = () => {
  return (
    <div className="w-full overflow-x-auto">
      <table className="min-w-[840px] w-full table-fixed">
        <thead>
          <tr className="bg-gray-100 font-semibold text-gray-700 border-y border-gray-300">
            <th className="py-3 text-center w-12"></th>
            <th className="py-3 text-center">이름</th>
            <th className="py-3 text-center">학원</th>
            <th className="py-3 text-center">전화번호</th>
            <th className="py-3 text-center">고등학교</th>
            <th className="py-3 text-center">생년</th>
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: 20 }).map((_, index) => (
            <tr key={index} className="text-sm text-gray-800 border-b border-gray-200">
              <td className="py-3 text-center w-12">
                <div className="h-4 w-4 bg-gray-200 rounded animate-pulse mx-auto"></div>
              </td>
              <td className="py-3 text-center">
                <div className="h-4 bg-gray-200 rounded-xl animate-pulse mx-auto w-16"></div>
              </td>
              <td className="py-3 text-center">
                <div className="h-4 bg-gray-200 rounded-xl animate-pulse mx-auto w-20"></div>
              </td>
              <td className="py-3 text-center">
                <div className="h-4 bg-gray-200 rounded-xl animate-pulse mx-auto w-24"></div>
              </td>
              <td className="py-3 text-center">
                <div className="h-4 bg-gray-200 rounded-xl animate-pulse mx-auto w-28"></div>
              </td>
              <td className="py-3 text-center">
                <div className="h-4 bg-gray-200 rounded-xl animate-pulse mx-auto w-20"></div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const StudentRead: React.FC<StudentReadProps> = ({
  users,
  isLoading = true,
  totalUsers = 0,
  selectedIds = [],
  onToggleSelect,
  onToggleSelectAll,
}) => {
  const router = useRouter();
  const currentYear = new Date().getFullYear();

  if (isLoading) {
    return <StudentReadSkeleton />;
  }

  if (totalUsers === 0) {
    return (
      <div className="flex-grow h-screen flex items-center justify-center text-xl font-sansKR-SemiBold">
        검색된 학생이 없습니다
      </div>
    );
  }

  const selectionEnabled = !!onToggleSelect && !!onToggleSelectAll;
  const visibleIds = users.map((u) => u.memberId);
  const selectedSet = new Set(selectedIds);
  const allSelectedOnPage = visibleIds.length > 0 && visibleIds.every((id) => selectedSet.has(id));
  const someSelectedOnPage = visibleIds.some((id) => selectedSet.has(id));

  return (
    <div className="w-full overflow-x-auto">
      <table className="min-w-[840px] w-full table-fixed">
        <thead>
          <tr className="bg-gray-100 font-semibold text-gray-700 border-y border-gray-300">
            {selectionEnabled && (
              <th className="py-3 text-center w-12">
                <input
                  type="checkbox"
                  className="w-4 h-4 cursor-pointer"
                  checked={allSelectedOnPage}
                  ref={(el) => {
                    if (el) el.indeterminate = !allSelectedOnPage && someSelectedOnPage;
                  }}
                  onChange={(e) => onToggleSelectAll!(visibleIds, e.target.checked)}
                  aria-label="현재 페이지 전체 선택"
                />
              </th>
            )}
            <th className="py-3 text-center">이름</th>
            <th className="py-3 text-center">학원</th>
            <th className="py-3 text-center">전화번호</th>
            <th className="py-3 text-center">고등학교</th>
            <th className="py-3 text-center">생년</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => {
            const isSelected = selectedSet.has(user.memberId);
            return (
              <tr
                key={user.memberId}
                className={`text-sm text-gray-800 border-b border-gray-200 hover:bg-gray-50 transition cursor-pointer ${isSelected ? "bg-blue-50" : "bg-white"}`}
                onClick={() => router.push(`/main/student/${user.memberId}`)}
              >
                {selectionEnabled && (
                  <td
                    className="py-3 text-center w-12"
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleSelect!(user.memberId);
                    }}
                  >
                    <input
                      type="checkbox"
                      className="w-4 h-4 cursor-pointer"
                      checked={isSelected}
                      onChange={(e) => {
                        e.stopPropagation();
                        onToggleSelect!(user.memberId);
                      }}
                      onClick={(e) => e.stopPropagation()}
                      aria-label={`${user.studentName} 선택`}
                    />
                  </td>
                )}
                <td className="py-3 text-center">{user.studentName}</td>
                <td className="py-3 text-center">{user.academy?.academyName || "없음"}</td>
                <td className="py-3 text-center">{user.studentPhone}</td>
                <td className="py-3 text-center">{user.studentHighschool}</td>
                <td className="py-3 text-center">
                  {user.studentBirthYear}년({currentYear - user.studentBirthYear + 1}세)
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export { StudentRead };
