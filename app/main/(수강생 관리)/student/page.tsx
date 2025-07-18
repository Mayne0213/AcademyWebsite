"use client";

import React, { useState, useEffect } from "react";

import useStudent from "@/components/hooks/useStudents";
import useFilteredSortedPaginatedUsers from "@/components/hooks/useFilteredSortedPaginatedUsers";
import useAcademy from "@/components/hooks/useAcademy";
import AcademyFilter from "@/components/main/student/academyFilter";
import Pagination from "@/components/main/student/paginationControls";
import SearchBar from "@/components/main/student/searchBar";
import SortButton from "@/components/main/student/sortButton";
import StudentRegister from "@/components/main/student/studentRegister";
import StudentTable from "@/components/main/student/studentTable";

const Student = () => {
  const { students, loadInitialStudents } = useStudent();
  const { academys, loadInitialAcademy } = useAcademy();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [sortKey, setSortKey] = useState<null | "name" | "school">(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedAcademy, setSelectedAcademy] = useState<string>("전체");

  const { paginatedUsers, totalPages } = useFilteredSortedPaginatedUsers({
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
        <h1 className="text-xl font-bold">학생 목록</h1>

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
        <div className="flex gap-2">
          <AcademyFilter
            selectedAcademy={selectedAcademy}
            onAcademyChange={(academy) => {
              setSelectedAcademy(academy);
              setCurrentPage(1);
            }}
            // users={students}
            academys={academys}
          />
        </div>

        <SearchBar
          searchTerm={searchTerm}
          onSearchTermChange={(term) => {
            setSearchTerm(term);
            setCurrentPage(1);
          }}
        />
      </div>
      {paginatedUsers.length === 0 ? (
        <div className="flex-grow flex items-center justify-center text-xl font-sansKR-SemiBold">
          검색된 학생이 없습니다
        </div>
      ) : (
        <StudentTable users={paginatedUsers} academys={academys} />
      )}
      <div className={`${paginatedUsers.length === 0 ? "hidden" : ""} mt-4`}>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
};

const StudentListPage = () => {
  const { students, loadInitialStudents } = useStudent();

  useEffect(() => {
    loadInitialStudents();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">학생 목록</h1>

      {students.length === 0 ? (
        <p>학생 데이터가 없습니다.</p>
      ) : (
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-4 py-2 text-left">
                이름
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left">
                학원 ID
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left">
                전화번호
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left">
                출신고등학교
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left">
                출생년도
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left">
                메모
              </th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.memberId} className="hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2">
                  {student.studentName}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {student.academyId}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {student.studentPhone}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {student.studentHighschool || "-"}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {student.studentBirthYear}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {student.studentMemo || "-"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

// export default StudentListPage;
export default Student;
