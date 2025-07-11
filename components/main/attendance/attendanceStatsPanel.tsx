"use client";

import React from "react";
import AttendanceStatusChart from "@/components/main/attendance/attendanceBar";

interface AttendanceStatsPanelProps {
  attendanceData: any[];
  selectedAcademy: string;
}

const AttendanceStatsPanel = ({ attendanceData,selectedAcademy }: AttendanceStatsPanelProps) => {
  const today = new Date().toISOString().slice(0, 10).replace(/-/g, "");
  return (
    <div className="h-full bg-white rounded-xl p-6 shadow-md w-1/2">
      <h1 className="text-xl font-bold mb-4">출석 통계</h1>

      <div className="w-full bg-gray-200 text-gray-700 p-2 mb-2">일일 출석 통계</div>
      {selectedAcademy === "전체" ? (
        <div className={`border-2 rounded-sm w-full h-[185px] flex justify-center items-center text-xl`}>단과를 선택해주세요.</div>
      ):
        <AttendanceStatusChart attendanceData={attendanceData.filter((attendanceData) => (attendanceData.attendanceDate === today && attendanceData.academyId === selectedAcademy))} type="Bar" />
      }

      <div className="w-full bg-gray-200 text-gray-700 p-2 my-2">단과 출석 통계</div>
      {selectedAcademy === "전체" ? (
        <div className={`border-2 rounded-sm w-full h-[185px] flex justify-center items-center text-xl`}>단과를 선택해주세요.</div>
      ):
        <AttendanceStatusChart attendanceData={attendanceData.filter((attendanceData) => attendanceData.academyId === selectedAcademy)} type="Bar" />
      }

      <div className="w-full bg-gray-200 text-gray-700 p-2 my-2">전체 출석 통계</div>
      <AttendanceStatusChart attendanceData={attendanceData} type="Circle" />
    </div>
  );
};

export default AttendanceStatsPanel;
