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

type ActiveStatus = 'all' | 'active' | 'inactive';

interface ActiveFilterProps {
  selectedStatus: ActiveStatus;
  onStatusChange: (status: ActiveStatus) => void;
}

const ActiveFilter: React.FC<ActiveFilterProps> = ({
  selectedStatus,
  onStatusChange,
}) => {
  const getStatusLabel = (status: ActiveStatus) => {
    switch (status) {
      case 'active':
        return '재원생';
      case 'inactive':
        return '퇴원생';
      case 'all':
      default:
        return '전체 수강생';
    }
  };

  return (
    <div className="flex items-center gap-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="font-sansKR-Regular min-w-[120px]">
            {getStatusLabel(selectedStatus)}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel className="font-sansKR-Regular">
            수강생 상태
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuRadioGroup
            value={selectedStatus}
            onValueChange={(value) => onStatusChange(value as ActiveStatus)}
          >
            <DropdownMenuRadioItem
              value="all"
              className="font-sansKR-Light"
            >
              전체 수강생
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem
              value="active"
              className="font-sansKR-Light"
            >
              재원생
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem
              value="inactive"
              className="font-sansKR-Light"
            >
              퇴원생
            </DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default ActiveFilter;
