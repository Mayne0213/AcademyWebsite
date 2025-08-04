"use client";

import React from "react";
import AcademyFilter from "@/src/entities/academy/ui/AcademyFilter";
import { Pagination } from "@/src/shared/ui";
import AttendanceItem from "@/components/main/attendance/attendanceItem";
import AllChangeToAttend from "./allChangeToAttend";
import { SearchInput } from "@/src/shared/ui";

interface AttendanceListProps {
  students: any[];
  academies: any[];
  paginatedUsers: any[];
  attendanceStatusMap: { [studentId: number]: string };
  searchTerm: string;
  currentPage: number;
  totalPages: number;
  selectedAcademy: string;
  onAcademyChange: (academy: string) => void;
  onPageChange: (page: number) => void;
  onStatusChange: (
    studentId: number,
    studentName: string,
    currentStatus: string,
    newStatus: string,
  ) => void;
  onAllChangeToAttend: () => void;
  onSearchTermChange: (term: string) => void;
}

const AttendanceList = ({
  students,
  academies,
  paginatedUsers,
  attendanceStatusMap,
  searchTerm,
  currentPage,
  totalPages,
  selectedAcademy,
  onAcademyChange,
  onPageChange,
  onStatusChange,
  onAllChangeToAttend,
  onSearchTermChange,
}: AttendanceListProps) => {
  return (
    <div className="min-h-[500px] flex flex-col bg-white rounded-xl p-6 shadow-md w-1/2">
      <div className="flex justify-between">
        <h1 className="text-xl font-bold mb-4">출석 관리</h1>
        <div className="font-sansKR-SemiBold text-lg items-center text-center">
          {new Date().toISOString().slice(0, 10).replace(/-/g, ".")}
        </div>
      </div>

      <div className="w-full flex justify-between mb-4">
        <div className="flex gap-2">
          <AcademyFilter
            selectedAcademy={selectedAcademy}
            onAcademyChange={(academy) => {
              onAcademyChange(academy);
            }}
            academies={academies}
          />
          <AllChangeToAttend
            selectedAcademy={selectedAcademy}
            onAllChangeToAttend={onAllChangeToAttend}
          />
        </div>
        <p className="text-xl mr-1">
          <SearchInput
            searchTerm={searchTerm}
            onSearchTermChange={onSearchTermChange}
            placeholder="학생 이름으로 검색..."
          />
        </p>
      </div>

      {paginatedUsers.length === 0 ? (
        <div className="font-sansKR-SemiBold text-xl flex items-center text-center justify-center mb-4 w-full h-full">
          검색된 학생이 없습니다
        </div>
      ) : (
        paginatedUsers.map((user) => {
          const status = attendanceStatusMap[user.studentId];
          return (
            <div key={user.studentId}>
              <AttendanceItem
                user={user}
                status={status}
                onStatusChange={onStatusChange}
                onAllChangeToAttend={onAllChangeToAttend}
              />
            </div>
          );
        })
      )}
      <p className="mb-4" />
      <div className={`${paginatedUsers.length === 0 ? "hidden" : ""}`}>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />
      </div>
    </div>
  );
};

export default AttendanceList;
