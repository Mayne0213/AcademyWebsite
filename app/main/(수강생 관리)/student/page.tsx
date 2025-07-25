"use client";

import React, { useState, useEffect } from "react";

import useStudent from "@/components/hooks/useStudents";
import useFilteredSortedPaginatedUsers from "@/components/hooks/useFilteredSortedPaginatedUsers";
import useAcademy from "@/components/hooks/useAcademy";
import AcademyFilter from "@/components/main/student/academyFilter";
import Pagination from "@/components/main/student/paginationControls";
import SearchBar from "@/components/main/student/searchBar";
import SortButton from "@/components/main/student/sortButton";
import StudentTable from "@/components/main/student/studentTable";
import StudentTableSkeleton from "@/components/main/student/studentTableSkeleton";

const Student = () => {
  const { students, isLoading: studentsLoading, loadInitialStudents } = useStudent();
  const { academys, isLoading: academysLoading, loadInitialAcademy } = useAcademy();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [sortKey, setSortKey] = useState<null | "name" | "school">(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedAcademy, setSelectedAcademy] = useState<string>("전체");

  const { paginatedUsers, totalPages, totalUsers } = useFilteredSortedPaginatedUsers({
    students,
    academys,
    searchTerm,
    selectedAcademy,
    sortKey,
    currentPage,
  });

  useEffect(() => {
    loadInitialStudents();
    loadInitialAcademy();
  }, [loadInitialStudents, loadInitialAcademy]);

  useEffect(() => {
    setSortKey("name");
  }, [students]);

  return (
    <div className="min-h-screen flex flex-col bg-white rounded-xl p-6 shadow-md">
      {/* 헤더 및 정렬 버튼 */}
      <div className="flex justify-between mb-4">
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-sansKR-SemiBold">학생 목록</h1>
          <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
            총 {totalUsers}명
          </span>
        </div>

        <div className="flex gap-2">
          <SortButton
            label="이름순 정렬"
            sortKey="name"
            currentSortKey={sortKey}
            onSort={setSortKey}
          />
          <SortButton
            label="학교순 정렬"
            sortKey="school"
            currentSortKey={sortKey}
            onSort={setSortKey}
          />
        </div>
      </div>

      {/* 필터 + 학생 추가 + 검색 */}
      <div className="w-full flex justify-between mb-4">
        <AcademyFilter
          selectedAcademy={selectedAcademy}
          onAcademyChange={(academy) => {
            setSelectedAcademy(academy);
            setCurrentPage(1);
          }}
          academys={academys}
        />

        <SearchBar
          searchTerm={searchTerm}
          onSearchTermChange={(term) => {
            setSearchTerm(term);
            setCurrentPage(1);
          }}
        />
      </div>
      {studentsLoading || academysLoading ? (
        <div className="flex-grow">
          <StudentTableSkeleton />
        </div>
      ) : totalUsers === 0 ? (
        <div className="flex-grow flex items-center justify-center text-xl font-sansKR-SemiBold">
          검색된 학생이 없습니다
        </div>
      ) : (
        <div className="flex-grow">
          <StudentTable users={paginatedUsers} academys={academys} />
        </div>
      )}
      <div className={`${totalUsers === 0 ? "hidden" : ""} mt-4`}>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default Student;
