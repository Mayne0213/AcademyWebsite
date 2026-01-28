"use client";

import React from "react";
import { Button } from "@/src/shared/ui/button";
import { Filter, ChevronDown } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/src/shared/ui/dropdownMenu";

export interface FilterOption<T extends string> {
    value: T;
    label: string;
}

interface FilterDropdownProps<T extends string> {
    /** 현재 선택된 값 */
    value: T;
    /** 값 변경 핸들러 */
    onChange: (value: T) => void;
    /** 필터 옵션 목록 */
    options: FilterOption<T>[];
    /** 드롭다운 라벨 (헤더) */
    label?: string;
    /** 필터 아이콘 표시 여부 */
    showFilterIcon?: boolean;
    /** 최소 너비 */
    minWidth?: string;
    /** 버튼 variant */
    variant?: "outline" | "default" | "ghost";
}

export function FilterDropdown<T extends string>({
    value,
    onChange,
    options,
    label,
    showFilterIcon = true,
    minWidth = "120px",
    variant = "outline",
}: FilterDropdownProps<T>) {
    // 현재 선택된 옵션의 라벨 가져오기
    const selectedLabel = options.find((opt) => opt.value === value)?.label || "";

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant={variant}
                    className={`font-sansKR-Regular gap-2`}
                    style={{ minWidth }}
                >
                    {showFilterIcon && <Filter className="w-4 h-4 text-gray-500" />}
                    <span>{selectedLabel}</span>
                    <ChevronDown className="w-4 h-4 text-gray-500" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="min-w-[160px]">
                {label && (
                    <>
                        <DropdownMenuLabel className="font-sansKR-Regular">
                            {label}
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                    </>
                )}
                <DropdownMenuRadioGroup
                    value={value}
                    onValueChange={(newValue) => onChange(newValue as T)}
                >
                    {options.map((option) => (
                        <DropdownMenuRadioItem
                            key={option.value}
                            value={option.value}
                            className="font-sansKR-Light"
                        >
                            {option.label}
                        </DropdownMenuRadioItem>
                    ))}
                </DropdownMenuRadioGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

export default FilterDropdown;
