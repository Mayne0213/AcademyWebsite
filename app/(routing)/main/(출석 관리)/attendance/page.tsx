"use client";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { useStudentStore } from "@/src/entities/student/model/store";
import { useAcademyFeatureStore } from "@/src/features/academyCRUD/model/store";
import { useAcademyStore } from "@/src/entities/academy/model/store";
import useAttendance from "@/components/hooks/useAttendanceStatusMap";
import useFilteredSortedPaginatedUsers from "@/components/hooks/useFilteredSortedPaginatedUsers";
import AttendanceList from "@/components/main/attendance/attendanceList";
import AttendanceStatsPanel from "@/components/main/attendance/attendanceStatsPanel";

const Attendance = () => {
  const { students, isLoading: studentsLoading } = useStudentStore();
  const { readAcademies } = useAcademyFeatureStore();
  const { academies } = useAcademyStore();
  const {
    attendances,
    attendanceStatusMap,
    loadInitialAttendances,
    addAttendance,
  } = useAttendance();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [selectedAcademyId, setSelectedAcademyId] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [sortKey, setSortKey] = useState<null | "name" | "school">("name");
  const today = new Date().toISOString().slice(0, 10).replace(/-/g, "");

  // selectedAcademy를 selectedAcademyId로 변환하여 사용
  const selectedAcademy = selectedAcademyId === null
    ? "전체"
    : academies.find(a => a.academyId === selectedAcademyId)?.academyName || "전체";

  useEffect(() => {
    loadInitialAttendances();
    readAcademies();
  }, [loadInitialAttendances, readAcademies]);

  const { paginatedUsers, totalPages } = useFilteredSortedPaginatedUsers({
    students,
    academies,
    searchTerm,
    selectedAcademy,
    sortKey,
    currentPage,
  });

  // 전체 출석 처리
  const handleAllChangeToAttend = () => {
    if (selectedAcademyId === null) return;

    const filteredStudents = students.filter(
      (student) => student.academyId === selectedAcademyId,
    );
    filteredStudents.forEach((student) => {
      addAttendance({
        attendanceId: 1,
        studentId: student.memberId,
        academyId: selectedAcademyId.toString(),
        attendanceDate: today,
        attendanceStatus: "출석",
      });
    });
    toast("전체 출석 처리 완료", {
      description: `${selectedAcademy} 학생들이 출석 처리되었습니다.`,
    });
  };

  // 출석 처리 핸들러
  const handleAttendanceClick = (
    studentId: number,
    studentName: string,
    currentStatus: string,
    newStatus: string,
  ) => {
    if (selectedAcademyId === null) return;

    addAttendance({
      attendanceId: 1,
      academyId: selectedAcademyId.toString(),
      studentId,
      attendanceDate: today,
      attendanceStatus: newStatus,
    });
    toast(`${newStatus} 처리 완료`, {
      description: `${studentName} 학생`,
    });
  };

  // 페이지 변경 핸들러
  const handlePageChange = (page: number) => {
    const validPage = Math.max(1, Math.min(page, totalPages));
    setCurrentPage(validPage);
  };

  if (studentsLoading) {
    return <div>로딩 중...</div>;
  }

  return (
    <div className="flex justify-between">
      {/* 출석 리스트 패널 */}
      <AttendanceList
        students={students}
        academies={academies}
        paginatedUsers={paginatedUsers}
        attendanceStatusMap={attendanceStatusMap}
        searchTerm={searchTerm}
        currentPage={currentPage}
        totalPages={totalPages}
        selectedAcademyId={selectedAcademyId}
        onAcademyChange={(academyId: number | null) => {
          setSelectedAcademyId(academyId);
          setCurrentPage(1);
        }}
        onPageChange={handlePageChange}
        onStatusChange={handleAttendanceClick}
        onAllChangeToAttend={handleAllChangeToAttend}
        onSearchTermChange={setSearchTerm}
      />
      <div className="w-[20px]" />
      {/* 출석 통계 패널 */}
      <AttendanceStatsPanel
        attendanceData={attendances}
        selectedAcademy={selectedAcademy}
      />
    </div>
  );
};

export default Attendance;
