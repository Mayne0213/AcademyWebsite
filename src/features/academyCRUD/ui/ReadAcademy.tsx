import React from "react";
import AcademyItemWithUD from "./AcademyItemWithUD";
import { useAcademyStore } from "@/src/entities/academy/model/store";

const AcademySkeleton = () => {
  return (
    <li className="border p-4 rounded-lg shadow-sm flex flex-col gap-4 animate-pulse">
      {/* 학원 사진 스켈레톤 */}
      <div className="w-full h-52 bg-gray-200 rounded-lg flex-shrink-0" />

      {/* 학원 정보 스켈레톤 */}
      <div className="">
        <div className="flex justify-between items-start">
          {/* 제목 스켈레톤 */}
          <div className="h-6 bg-gray-200 rounded-lg w-1/2" />
          {/* 버튼 스켈레톤 */}
          <div className="flex space-x-2">
            <div className="w-16 h-8 bg-gray-200 rounded-lg" />
            <div className="w-16 h-8 bg-gray-200 rounded-lg" />
          </div>
        </div>

        {/* 전화번호 스켈레톤 */}
        <div className="mt-2 flex items-center gap-2">
          <div className="w-5 h-5 bg-gray-200 rounded-lg" />
          <div className="h-4 bg-gray-200 rounded-lg w-32" />
        </div>

        {/* 주소 스켈레톤 */}
        <div className="mt-1 flex items-center gap-2">
          <div className="w-5 h-5 bg-gray-200 rounded-lg" />
          <div className="h-4 bg-gray-200 rounded-lg w-40" />
        </div>
      </div>
    </li>
  );
};

const ReadAcademy: React.FC = () => {
  const { academies, isLoading } = useAcademyStore();

  if (isLoading) {
    return (
      <ul className="grid grid-cols-3 gap-6">
        {Array.from({ length: 9 }).map((_, index) => (
          <AcademySkeleton key={index} />
        ))}
      </ul>
    );
  }

  return (
    <ul className="grid grid-cols-3 gap-6">
      {academies.length === 0 ? (
        <li className="col-span-3 h-screen flex justify-center items-center py-20">
          <span className="font-sansKR-SemiBold text-2xl">
            등록된 단과가 없습니다.
          </span>
        </li>
      ) : (
        academies.map((academy) => (
          <AcademyItemWithUD
            key={academy.academyId}
            academy={academy}
          />
        ))
      )}
    </ul>
  );
};

export default ReadAcademy; 