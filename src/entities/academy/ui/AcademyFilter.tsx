"use client";

import React, { useMemo } from "react";
import { Button } from "@/src/shared/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/src/shared/ui/dropdownMenu";
import { Academy } from "../model/types";

interface AcademyFilterProps {
  selectedAcademyId: number | null;
  academies: Academy[];
  onAcademyChange: (academyId: number | null) => void;
  resetFilter?: () => void;
  isFiltered?: boolean;
}

const AcademyFilter: React.FC<AcademyFilterProps> = ({
  selectedAcademyId,
  academies,
  onAcademyChange,
  resetFilter,
  isFiltered,
}) => {
  // academies를 필터링용 형식으로 변환하고 "전체 학원" 옵션 추가
  const academyList = useMemo(() => [
    { id: null, name: '전체 학원' },
    ...academies.map(academy => ({
      id: academy.academyId,
      name: academy.academyName
    }))
  ], [academies]);
  const handleAcademyChange = (academyName: string) => {
    if (academyName === "전체") {
      onAcademyChange(null);
    } else {
      const academy = academyList.find(a => a.name === academyName);
      onAcademyChange(academy?.id || null);
    }
  };

  const getSelectedAcademyName = () => {
    if (selectedAcademyId === null) return "전체";
    const academy = academyList.find(a => a.id === selectedAcademyId);
    return academy?.name || "전체";
  };

  return (
    <div className="flex items-center gap-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="font-sansKR-Regular min-w-[120px]">
            {getSelectedAcademyName()}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel className="font-sansKR-Regular">
            학원 선택
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuRadioGroup
            value={getSelectedAcademyName()}
            onValueChange={handleAcademyChange}
          >
            {academyList.map((academy) => (
              <DropdownMenuRadioItem
                key={academy.id || 'all'}
                value={academy.name}
                className="font-sansKR-Light"
              >
                {academy.name}
              </DropdownMenuRadioItem>
            ))}
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default AcademyFilter;
