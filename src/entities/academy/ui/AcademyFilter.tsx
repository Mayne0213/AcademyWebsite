"use client";

import React from "react";
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
import { X } from "lucide-react";

interface AcademyFilterProps {
  selectedAcademyId: number | null;
  academyList: Array<{ id: number | null; name: string }>;
  onAcademyChange: (academyId: number | null) => void;
  resetFilter?: () => void;
  isFiltered?: boolean;
}

const AcademyFilter: React.FC<AcademyFilterProps> = ({
  selectedAcademyId,
  academyList,
  onAcademyChange,
  resetFilter,
  isFiltered,
}) => {
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
