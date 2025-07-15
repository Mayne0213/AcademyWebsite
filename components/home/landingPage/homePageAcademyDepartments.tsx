"use client";

import Image from "next/image";
import useAcademy from "@/components/hooks/useAcademy";
import BackgroundDot from "../backgroundDot";
import { useEffect, useState } from "react";
import DeviceType, { useDeviceDetect } from "@/components/home/deviceType";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { DESIGN_SYSTEM } from "./designSystem";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const HomePageAcademyDepartments = () => {
  const { academys, loadInitialAcademy } = useAcademy();
  const deviceType = useDeviceDetect();
  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const getGridCols = () => {
    if (windowWidth < 700) {
      return "grid-cols-1";
    } else if (windowWidth < 800) {
      return "grid-cols-2";
    } else if (deviceType === DeviceType.SMALLTABLET) {
      return "grid-cols-2";
    } else if (deviceType === DeviceType.TABLET) {
      return "grid-cols-3";
    } else {
      return "grid-cols-3";
    }
  };

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
    <section className="py-16 bg-gray-50 relative">
      <BackgroundDot />
      <div className="container max-w-7xl mx-auto px-4 relative">
        <h2
                      className={`text-center font-MaruBuri-Bold mb-10 ${deviceType === DeviceType.MOBILE ? "text-4xl" : "text-5xl"}`}
        >
          현강 관별 소개
        </h2>
        <div className={`grid gap-8 ${getGridCols()}`}>
          {academys.map((academy, index) => (
            <motion.div
              key={index}
              {...DESIGN_SYSTEM.animations.fadeInUp}
              transition={{
                ...DESIGN_SYSTEM.animations.fadeInUp.transition,
              }}
              className="flex flex-col bg-white rounded-2xl shadow-md overflow-hidden p-5 gap-4"
            >
              {/* 이미지 */}
              <div className="relative h-48 rounded-xl overflow-hidden flex items-center justify-center bg-gray-100">
                {academy.mainImageUrl ? (
                  <Image
                  src={academy.mainImageUrl}
                  alt="학원 이미지"
                  fill
                  sizes="100vw"
                  className="object-cover"
                />
                ) : (
                  <span className="text-gray-500 text-sm">사진 없음</span>
                )}
              </div>

              {/* 상단 제목 + 드롭다운 */}
              <div className="flex justify-between items-center border-b pb-3 text-xl font-MaruBuri-SemiBold">
                <span>{academy.academyName}</span>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="text-sm">
                      {selectedInfos[index]}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-40">
                    <DropdownMenuLabel>정보 선택</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuRadioGroup
                      value={selectedInfos[index]}
                      onValueChange={(value) => handleInfoChange(index, value)}
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

              {/* 선택된 정보 출력 */}
              <div className="text-right text-gray-700 font-MaruBuri-Light text-base whitespace-pre-line">
                {selectedInfos[index] === "주소"
                  ? academy.academyAddress
                  : academy.academyPhone}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomePageAcademyDepartments;
