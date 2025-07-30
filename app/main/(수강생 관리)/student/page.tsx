"use client";

import React, { useState, useEffect } from "react";

import { useStudentFeatureStore } from "@/features/studentCRUD/model/store";
import { useStudentStore } from "@/entities/student/model/store";
import { StudentTable } from "@/entities/student/ui";
import { SearchInput, SortControls, Pagination } from "@/shared/ui";

import useAcademy from "@/components/hooks/useAcademy";
import AcademyFilter from "@/components/main/student/academyFilter";
import useFilteredSortedPaginatedUsers from "@/components/hooks/useFilteredSortedPaginatedUsers";

const Student = () => {
  const { isLoading: studentsLoading, readStudents } = useStudentFeatureStore();
  const { students, error } = useStudentStore();

  const { academys, isLoading: academysLoading, loadInitialAcademy } = useAcademy();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [sortKey, setSortKey] = useState<string | null>(null);
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
    readStudents();
    loadInitialAcademy();
    setSortKey("name");
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  // 에러 처리
  useEffect(() => {
    if (error) {
      console.error("학생 데이터 로드 에러:", error);
    }
  }, [error]);

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

        <SortControls
          sortOptions={[
            { key: "name", label: "이름순 정렬" },
            { key: "school", label: "학교순 정렬" },
          ]}
          currentSortKey={sortKey}
          onSortChange={setSortKey}
        />
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

        <div className="w-1/6">
          <SearchInput
            searchTerm={searchTerm}
            onSearchTermChange={(term: string) => {
              setSearchTerm(term);
              setCurrentPage(1);
            }}
            placeholder="학생 이름으로 검색..."
          />
        </div>
      </div>

      <div className="flex-grow">
        <StudentTable
          users={paginatedUsers}
          isLoading={studentsLoading || academysLoading}
          totalUsers={totalUsers}
        />
      </div>
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
