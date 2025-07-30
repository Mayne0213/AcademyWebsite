import React, { useEffect } from "react";
import AcademyItem from "./academyItem";
import { useAcademyStore } from "@/entities/academy/model/store";
import { useAcademyFeatureStore } from "@/features/academy/model/store";

const AcademyList: React.FC = () => {
  const { readAcademies } = useAcademyFeatureStore();
  const { academies } = useAcademyStore();

  useEffect(() => {
    readAcademies();
  }, [readAcademies]);

  return (
    <ul className="grid grid-cols-3 gap-6 relative min-h-[300px]">
      {academies.length === 0 ? (
        <li className="col-span-3 flex justify-center items-center min-h-screen">
          <span className="font-sansKR-SemiBold text-2xl">
            등록된 단과가 없습니다.
          </span>
        </li>
      ) : (
        academies.map((academy) => (
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
