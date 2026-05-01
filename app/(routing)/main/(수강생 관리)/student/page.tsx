"use client";

import React, { useEffect, useState } from "react";
import { StudentRead } from "@/src/features/studentCRUD/ui/StudentRead";
import { useStudentFeatureStore } from "@/src/features/studentCRUD/model/store";
import { useStudentStore } from "@/src/entities/student/model/store";
import { ActiveFilter } from "@/src/entities/student/ui";
import { SearchInput, SortControls, Pagination } from "@/src/shared/ui";

import { useAcademyFeatureStore } from "@/src/features/academyCRUD/model/store";
import { useAcademyStore } from "@/src/entities/academy/model/store";
import AcademyFilter from "@/src/entities/academy/ui/AcademyFilter";
import useFilteredSortedPaginatedUsers from "@/components/hooks/useFilteredSortedPaginatedUsers";

const Student = () => {
  const { readStudents, toggleActive, deleteStudent } = useStudentFeatureStore();
  const { students, isLoading: studentsLoading } = useStudentStore();

  const { readAcademies } = useAcademyFeatureStore();
  const { academies, isLoading: academiesLoading } = useAcademyStore();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedAcademyId, setSelectedAcademyId] = useState<number | null>(null);
  const [activeStatusFilter, setActiveStatusFilter] = useState<'all' | 'active' | 'inactive'>('active');
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [isBulkProcessing, setIsBulkProcessing] = useState<boolean>(false);

  const handleToggleSelect = (memberId: number) => {
    setSelectedIds((prev) =>
      prev.includes(memberId) ? prev.filter((id) => id !== memberId) : [...prev, memberId]
    );
  };

  const handleToggleSelectAll = (memberIds: number[], select: boolean) => {
    setSelectedIds((prev) => {
      if (select) {
        const merged = new Set([...prev, ...memberIds]);
        return Array.from(merged);
      }
      const removeSet = new Set(memberIds);
      return prev.filter((id) => !removeSet.has(id));
    });
  };

  const runBulk = async (
    confirmMessage: string,
    action: (id: number) => Promise<void>
  ) => {
    if (selectedIds.length === 0) return;
    if (!window.confirm(confirmMessage)) return;
    setIsBulkProcessing(true);
    try {
      await Promise.all(selectedIds.map((id) => action(id)));
      setSelectedIds([]);
      await readStudents();
    } catch (error) {
      console.error("일괄 처리 중 오류:", error);
      alert("일부 학생 처리 중 오류가 발생했습니다.");
    } finally {
      setIsBulkProcessing(false);
    }
  };

  const handleBulkWithdraw = () =>
    runBulk(
      `선택한 ${selectedIds.length}명의 학생을 퇴원 처리하시겠습니까?\n\n퇴원 처리 후에도 데이터는 유지되며, 이후 복원할 수 있습니다.`,
      (id) => toggleActive(id, false)
    );

  const handleBulkRestore = () =>
    runBulk(
      `선택한 ${selectedIds.length}명의 학생을 재원생으로 복원하시겠습니까?`,
      (id) => toggleActive(id, true)
    );

  const handleBulkDelete = () =>
    runBulk(
      `선택한 ${selectedIds.length}명의 학생을 영구 삭제하시겠습니까?\n\n이 작업은 되돌릴 수 없습니다.`,
      (id) => deleteStudent(id)
    );



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
    activeStatusFilter,
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
        <div className="flex flex-col smalltablet:flex-row gap-2 w-full smalltablet:w-auto">
          <AcademyFilter
            selectedAcademyId={selectedAcademyId}
            academies={academies}
            onAcademyChange={handleAcademyChange}
          />

          <ActiveFilter
            selectedStatus={activeStatusFilter}
            onStatusChange={(status) => {
              setActiveStatusFilter(status);
              setCurrentPage(1);
            }}
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

      {selectedIds.length > 0 && (
        <div className="flex flex-col smalltablet:flex-row smalltablet:items-center smalltablet:justify-between gap-2 mb-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <span className="text-sm font-sansKR-SemiBold text-blue-900">
            {selectedIds.length}명 선택됨
          </span>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setSelectedIds([])}
              disabled={isBulkProcessing}
              className="px-3 py-1.5 text-sm rounded-md border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-50"
            >
              선택 해제
            </button>
            <button
              type="button"
              onClick={handleBulkRestore}
              disabled={isBulkProcessing}
              className="px-3 py-1.5 text-sm rounded-md bg-green-500 text-white hover:bg-green-600 disabled:opacity-50"
            >
              일괄 복원
            </button>
            <button
              type="button"
              onClick={handleBulkWithdraw}
              disabled={isBulkProcessing}
              className="px-3 py-1.5 text-sm rounded-md bg-amber-500 text-white hover:bg-amber-600 disabled:opacity-50"
            >
              일괄 퇴원
            </button>
            <button
              type="button"
              onClick={handleBulkDelete}
              disabled={isBulkProcessing}
              className="px-3 py-1.5 text-sm rounded-md bg-red-500 text-white hover:bg-red-600 disabled:opacity-50"
            >
              일괄 삭제
            </button>
          </div>
        </div>
      )}

      <div className="flex-grow">
        <StudentRead
          users={paginatedUsers}
          isLoading={studentsLoading || academiesLoading}
          totalUsers={totalUsers}
          selectedIds={selectedIds}
          onToggleSelect={handleToggleSelect}
          onToggleSelectAll={handleToggleSelectAll}
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
