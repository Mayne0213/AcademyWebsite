"use client";

import React from "react";
import AcademyFilter from "@/components/main/student/academyFilter";
import Pagination from "@/components/main/student/paginationControls";
import AttendanceItem from "@/components/main/attendance/attendanceItem";
import AllChangeToAttend from "./allChangeToAttend";
import SearchBar from "../student/searchBar";

interface AttendanceListProps {
  students: any[];
  academys: any[];
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
  academys,
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
            users={students}
            academys={academys}
          />
          <AllChangeToAttend
            selectedAcademy={selectedAcademy}
            onAllChangeToAttend={onAllChangeToAttend}
          />
        </div>
        <p className="text-xl mr-1">
          <SearchBar
            searchTerm={searchTerm}
            onSearchTermChange={onSearchTermChange}
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
            <div>
              <AttendanceItem
                key={user.studentId}
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
