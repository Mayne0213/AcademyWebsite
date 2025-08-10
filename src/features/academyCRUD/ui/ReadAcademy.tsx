import React from "react";
import AcademyItemWithUD from "./AcademyItemWithUD";
import { useAcademyStore } from "@/src/entities/academy/model/store";

const AcademySkeleton = () => {
  return (
    <li className="border p-3 smalltablet:p-4 tablet:p-6 rounded-lg shadow-sm flex flex-col gap-3 smalltablet:gap-4 tablet:gap-6 animate-pulse">
      {/* 학원 사진 스켈레톤 */}
      <div className="w-full h-32 smalltablet:h-40 tablet:h-52 bg-gray-200 rounded-lg flex-shrink-0" />

      {/* 학원 정보 스켈레톤 */}
      <div className="">
        <div className="flex justify-between items-start">
          {/* 제목 스켈레톤 */}
          <div className="h-5 smalltablet:h-6 tablet:h-6 bg-gray-200 rounded-lg w-1/2" />
          {/* 버튼 스켈레톤 */}
          <div className="flex space-x-1 smalltablet:space-x-2">
            <div className="w-12 smalltablet:w-14 tablet:w-16 h-6 smalltablet:h-7 tablet:h-8 bg-gray-200 rounded-lg" />
            <div className="w-12 smalltablet:w-14 tablet:w-16 h-6 smalltablet:h-7 tablet:h-8 bg-gray-200 rounded-lg" />
          </div>
        </div>

        {/* 전화번호 스켈레톤 */}
        <div className="mt-2 flex items-center gap-2">
          <div className="w-4 smalltablet:w-5 tablet:w-5 h-4 smalltablet:h-5 tablet:h-5 bg-gray-200 rounded-lg" />
          <div className="h-3 smalltablet:h-4 tablet:h-4 bg-gray-200 rounded-lg w-24 smalltablet:w-28 tablet:w-32" />
        </div>

        {/* 주소 스켈레톤 */}
        <div className="mt-1 flex items-center gap-2">
          <div className="w-4 smalltablet:w-5 tablet:w-5 h-4 smalltablet:h-5 tablet:h-5 bg-gray-200 rounded-lg" />
          <div className="h-3 smalltablet:h-4 tablet:h-4 bg-gray-200 rounded-lg w-28 smalltablet:w-32 tablet:w-40" />
        </div>
      </div>
    </li>
  );
};

const ReadAcademy: React.FC = () => {
  const { academies, isLoading } = useAcademyStore();

  if (isLoading) {
    return (
      <ul className="grid grid-cols-1 smalltablet:grid-cols-2 tablet:grid-cols-3 gap-3 smalltablet:gap-4 tablet:gap-6">
        {Array.from({ length: 9 }).map((_, index) => (
          <AcademySkeleton key={index} />
        ))}
      </ul>
    );
  }

  return (
    <ul className="grid grid-cols-1 smalltablet:grid-cols-2 tablet:grid-cols-3 gap-3 smalltablet:gap-4 tablet:gap-6">
      {academies.length === 0 ? (
        <li className="col-span-1 smalltablet:col-span-2 tablet:col-span-3 h-screen flex justify-center items-center py-20">
          <span className="font-sansKR-SemiBold text-lg smalltablet:text-xl tablet:text-2xl text-center px-4">
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