"use client";

import Image from "next/image";
import useAcademy from "@/components/hooks/useAcademy";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SectionUp } from "./designSystem";

const STYLES = {
  title: "text-center font-MaruBuri-Bold mb-10 text-4xl smalltablet:text-5xl",
  grid: "smalltablet:grid smalltablet:grid-cols-2 smalltablet:gap-8 smalltablet:px-[2vw] tablet:grid-cols-3 tablet:px-[30px] desktop:grid-cols-3 desktop:px-[20px]",
  card: "flex flex-col bg-white rounded-2xl shadow-md overflow-hidden p-5 gap-4",
  imageWrapper: "relative h-48 rounded-xl overflow-hidden flex items-center justify-center bg-gray-100",
  cardTitle: "flex justify-between items-center border-b pb-3 text-xl font-MaruBuri-SemiBold",
  info: "text-right text-gray-700 font-MaruBuri-Light text-base whitespace-pre-line",
};

const HomePageAcademyDepartments = () => {
  const { academys, loadInitialAcademy } = useAcademy();
  const [selectedInfos, setSelectedInfos] = useState<string[]>([]);

  useEffect(() => {
    loadInitialAcademy();
  }, [loadInitialAcademy]);

  useEffect(() => {
    if (academys.length > 0) {
      setSelectedInfos(Array(academys.length).fill("주소"));
    }
  }, [academys]);

  const handleInfoChange = (index: number, value: string) => {
    const newSelected = [...selectedInfos];
    newSelected[index] = value;
    setSelectedInfos(newSelected);
  };

  return (
    <SectionUp className="relative py-16 max-w-7xl mx-auto px-4" amount={0.1}>
        <h2 className={STYLES.title}>현강 관별 소개</h2>
        <div className={`flex flex-col max-w-sm smalltablet:max-w-none smalltablet:grid gap-8 ${STYLES.grid}`}>
          {academys.map((academy, index) => (
            <AcademyDepartmentCard
              key={academy.academyId}
              academy={academy}
              selectedInfo={selectedInfos[index]}
              onInfoChange={handleInfoChange}
              index={index}
            />
          ))}
        </div>
    </SectionUp>
  );
};

const AcademyDepartmentCard = ({ academy, selectedInfo, onInfoChange, index }: {
  academy: any;
  selectedInfo: string;
  onInfoChange: (index: number, value: string) => void;
  index: number;
}) => (
  <div
    className={STYLES.card}
  >
    <div className={STYLES.imageWrapper}>
      {academy.mainImageUrl ? (
        <Image
          src={academy.mainImageUrl}
          alt={`${academy.academyName} 이미지`}
          fill
          sizes="(max-width: 600px) 100vw, (max-width: 990px) 50vw, (max-width: 1200px) 33vw, 25vw"
          className="object-cover"
        />
      ) : (
        <span className="text-gray-500 text-sm">사진 없음</span>
      )}
    </div>
    <div className={STYLES.cardTitle}>
      <span>{academy.academyName}</span>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="text-sm">
            {selectedInfo}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-40">
          <DropdownMenuLabel>정보 선택</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuRadioGroup
            value={selectedInfo}
            onValueChange={(value) => onInfoChange(index, value)}
          >
            <DropdownMenuRadioItem value="주소">
              주소
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="전화번호">
              전화번호
            </DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
    <div className={STYLES.info}>
      {selectedInfo === "주소"
        ? academy.academyAddress
        : academy.academyPhone}
    </div>
  </div>
);

export default HomePageAcademyDepartments;
