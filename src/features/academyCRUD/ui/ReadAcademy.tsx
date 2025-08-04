import React from "react";
import AcademyItemWithUD from "./AcademyItemWithUD";
import { useAcademyStore } from "@/src/entities/academy/model/store";

const ReadAcademy: React.FC = () => {
  const { academies, isLoading } = useAcademyStore();

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