"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Student } from "@/components/type/studentType";
import { Academy } from "@/components/type/academyType";

interface StudentTableProps {
  users: Student[];
  academys: Academy[];
}

const StudentTable: React.FC<StudentTableProps> = ({ users, academys }) => {
  const router = useRouter();
  const currentYear = new Date().getFullYear();

  return (
    <div className="w-full overflow-x-auto">
      <div className="min-w-[800px]">
        {/* Header */}
        <div className="grid grid-cols-6 bg-gray-100 font-semibold text-gray-700 border-y border-gray-300 py-3">
          <div className="text-center">이름</div>
          <div className="text-center">학원</div>
          <div className="text-center">전화번호</div>
          <div className="text-center">고등학교</div>
          <div className="text-center">생년</div>
          <div className="text-center">메모</div>
        </div>

        {/* Rows */}
        {users.map((user) => {
          const academy = academys.find((a) => a.academyId === user.academyId);

          return (
            <div
              key={user.memberId}
              className="grid grid-cols-6 cursor-pointer text-sm text-gray-800 border-b border-gray-200 py-3 hover:bg-gray-50 transition"
              onClick={() => router.push(`/main/student/${user.memberId}`)}
            >
              <div className="text-center">{user.studentName}</div>
              <div className="text-center">
                {academy?.academyName || "없음"}
              </div>
              <div className="text-center">{user.studentPhone}</div>
              <div className="text-center">{user.studentHighschool}</div>
              <div className="text-center">
                {user.studentBirthYear}년(
                {currentYear - user.studentBirthYear + 1}세)
              </div>
              <div className="text-center">{user.studentMemo}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StudentTable;
