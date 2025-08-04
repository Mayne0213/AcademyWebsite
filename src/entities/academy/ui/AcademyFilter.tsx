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

interface AcademyFilterProps {
  selectedAcademy: string;
  onAcademyChange: (academy: string) => void;
  academies: { academyName: string }[];
}

const AcademyFilter: React.FC<AcademyFilterProps> = ({
  selectedAcademy,
  onAcademyChange,
  academies,
}) => {
  const academyOptions = [
    "전체",
    ...new Set((academies || []).map((academy) => academy.academyName)),
  ];

  return (
    <div className="flex justify-between gap-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="font-sansKR-Regular">
            {selectedAcademy}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel className="font-sansKR-Regular">
            학원 선택
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuRadioGroup
            value={selectedAcademy}
            onValueChange={onAcademyChange}
          >
            {academyOptions.map((academy) => (
              <DropdownMenuRadioItem
                key={academy}
                value={academy}
                className="font-sansKR-Light"
              >
                {academy}
              </DropdownMenuRadioItem>
            ))}
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default AcademyFilter;
