import React, { useState, useEffect } from "react";
import AcademyItem from "./academyItem";
import useAcademy from "@/components/hooks/useAcademy";

const AcademyList: React.FC = () => {
  const { academys, loadInitialAcademy } = useAcademy();

  useEffect(() => {
    loadInitialAcademy();
  }, [loadInitialAcademy]);

  return (
    <ul className="grid grid-cols-3 gap-6 relative min-h-[300px]">
      {academys.length === 0 ? (
        <li className="col-span-3 flex justify-center items-center min-h-screen">
          <span className="font-sansKR-SemiBold text-2xl">
            등록된 단과가 없습니다.
          </span>
        </li>
      ) : (
        academys.map((academy) => (
          <AcademyItem
            key={academy.academyId}
            academy={academy}
          />
        ))
      )}
    </ul>
  );
};

export default AcademyList;
