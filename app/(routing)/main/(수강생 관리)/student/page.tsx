"use client";

import React, { useEffect, useState } from "react";
import { StudentRead } from "@/src/features/studentCRUD/ui/StudentRead";
import { useStudentFeatureStore } from "@/src/features/studentCRUD/model/store";
import { useStudentStore } from "@/src/entities/student/model/store";
import { SearchInput, SortControls, Pagination } from "@/src/shared/ui";

import { useAcademyFeatureStore } from "@/src/features/academyCRUD/model/store";
import { useAcademyStore } from "@/src/entities/academy/model/store";
import AcademyFilter from "@/src/entities/academy/ui/AcademyFilter";
import useFilteredSortedPaginatedUsers from "@/components/hooks/useFilteredSortedPaginatedUsers";

const Student = () => {
  const { readStudents } = useStudentFeatureStore();
  const { students, isLoading: studentsLoading } = useStudentStore();

  const { readAcademies } = useAcademyFeatureStore();
  const { academies, isLoading: academiesLoading } = useAcademyStore();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedAcademyId, setSelectedAcademyId] = useState<number | null>(null);

  // academyList를 AcademyFilter에서 사용할 수 있는 형태로 변환
  const academyList = [
    { id: null, name: '전체' },
    ...academies.map(academy => ({
      id: academy.academyId,
      name: academy.academyName
    }))
  ];

  // selectedAcademy를 selectedAcademyId로 변환하여 사용
  const selectedAcademy = selectedAcademyId === null
    ? "전체"
    : academies.find(a => a.academyId === selectedAcademyId)?.academyName || "전체";

  const { paginatedUsers, totalPages, totalUsers } = useFilteredSortedPaginatedUsers({
    students,
    academies,
    searchTerm,
    selectedAcademy,
    sortKey,
    currentPage,
  });

  useEffect(() => {
    readStudents();
    readAcademies();
    setSortKey("name");
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleAcademyChange = (academyId: number | null) => {
    setSelectedAcademyId(academyId);
    setCurrentPage(1);
  };

  return (
    <main className="h-full flex flex-col p-4">
      {/* 헤더 및 정렬 버튼 */}
      <div className="flex flex-col smalltablet:flex-row smalltablet:justify-between smalltablet:items-center gap-3 smalltablet:gap-4 mb-4 smalltablet:mb-6">
        <div className="flex smalltablet:flex-row smalltablet:items-center gap-2 smalltablet:gap-3">
          <h1 className="text-2xl smalltablet:text-2xl tablet:text-2xl desktop:text-3xl font-sansKR-SemiBold">학생 목록</h1>
          <span className="text-xs flex items-center justify-center text-center smalltablet:text-sm tablet:text-base text-gray-500 bg-gray-100 px-2 smalltablet:px-3 py-1 rounded-lg smalltablet:rounded-full">
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
      <div className="w-full flex flex-col smalltablet:flex-row smalltablet:justify-between gap-3 smalltablet:gap-4 mb-4 smalltablet:mb-6">
        <div className="w-full smalltablet:w-auto">
          <AcademyFilter
            selectedAcademyId={selectedAcademyId}
            academyList={academyList}
            onAcademyChange={handleAcademyChange}
          />
        </div>

        <div className="w-full smalltablet:w-1/3 tablet:w-1/4 desktop:w-1/6">
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
        <StudentRead
          users={paginatedUsers}
          isLoading={studentsLoading || academiesLoading}
          totalUsers={totalUsers}
        />
      </div>
      <div className={`${totalUsers === 0 ? "hidden" : ""} mt-4 smalltablet:mt-6`}>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </main>
  );
};

export default Student;
