"use client";

import Image from "next/image";
import { useState } from "react";
import useDeviceDetect from "@/components/hooks/useMobileDetect";
import DeviceType from "@/components/deviceType";
import { LetterText, BookOpenTextIcon, Pencil, Headphones } from "lucide-react";
import m1TimeTable from "@/public/home/content/timeTable/middleSchool/m1Timetable.png";
import m1TimeTableRotated from "@/public/home/content/timeTable/middleSchool/m1TimetableRotated.png";
import m2TimeTable from "@/public/home/content/timeTable/middleSchool/m2Timetable.png";
import m2TimeTableRotated from "@/public/home/content/timeTable/middleSchool/m2TimetableRotated.png";
import m3TimeTable from "@/public/home/content/timeTable/middleSchool/m3Timetable.png";
import m3TimeTableRotated from "@/public/home/content/timeTable/middleSchool/m3TimetableRotated.png";

const getDeviceClasses = (deviceType: DeviceType) =>
  ({
    [DeviceType.Desktop]: {
      titleTextSize: "text-2xl",
      squareHeight: "h-[70px]",
      squarePadding: "mb-[50px]",
    },
    [DeviceType.Tablet]: {
      titleTextSize: "text-xl",
      squareHeight: "h-[60px]",
      squarePadding: "mb-[40px]",
    },
    [DeviceType.SmallTablet]: {
      titleTextSize: "text-lg",
      squareHeight: "h-[50px]",
      squarePadding: "mb-[30px]",
    },
    [DeviceType.Mobile]: {
      titleTextSize: "text-base",
      squareHeight: "h-[40px]",
      squarePadding: "",
    },
    null: {
      titleTextSize: "",
      squareHeight: "",
      squarePadding: "",
    },
  })[deviceType];

const Regular = () => {
  const [currentTab, setCurrentTab] = useState(1);
  const { titleTextSize, squareHeight, squarePadding } =
    getDeviceClasses(useDeviceDetect());

  return (
    <div>
      {useDeviceDetect() !== 0 && (
        <div
          className={`w-full rounded-full relative ${squarePadding} ${squareHeight} ${titleTextSize}`}
        >
          <button
            onClick={() => {
              setCurrentTab(1);
            }}
            className={`w-1/3 h-full border-2 rounded-s-full bg-blue-40 absolute left-0 flex items-center justify-center transition-all duration-300
                  ${currentTab === 1 ? "bg-blue-200" : ""}
                  `}
          >
            중등 1학년
          </button>

          <button
            onClick={() => {
              setCurrentTab(2);
            }}
            className={`w-1/3 h-full border-y-2 absolute left-1/3 right-1/3 items-center flex justify-center transition-all duration-300
                ${currentTab === 2 ? "bg-blue-200" : ""}
                `}
          >
            중등 2학년
          </button>

          <button
            onClick={() => {
              setCurrentTab(3);
            }}
            className={`w-1/3 h-full border-2 rounded-e-full absolute right-0 items-center flex justify-center transition-all duration-300
                  ${currentTab === 3 ? "bg-blue-200" : ""}
                  `}
          >
            중등 3학년
          </button>
        </div>
      )}
      {useDeviceDetect() === 0 && (
        <select
          value={currentTab}
          onChange={(e) => setCurrentTab(Number(e.target.value))}
          className="w-full mb-[20px] p-1 border-2 text-lg rounded-md"
        >
          <option value={1}>중등 1학년</option>
          <option value={2}>중등 2학년</option>
          <option value={3}>중등 3학년</option>
        </select>
      )}

      <div>
        <Image
          alt=""
          src={useDeviceDetect() === 0 ? m1TimeTableRotated : m1TimeTable}
          className={`border-l-2 border-b-2 ${currentTab === 1 ? "" : "hidden"}`}
        />
        <Image
          alt=""
          src={useDeviceDetect() === 0 ? m2TimeTableRotated : m2TimeTable}
          className={`border-l-2 border-b-2 ${currentTab === 2 ? "" : "hidden"}`}
        />
        <Image
          alt=""
          src={useDeviceDetect() === 0 ? m3TimeTableRotated : m3TimeTable}
          className={`border-l-2 border-b-2 ${currentTab === 3 ? "" : "hidden"}`}
        />
      </div>
    </div>
  );
};

export default Regular;

const curriculums = [
  {
    name: "문법",
    icon: <LetterText size={100} strokeWidth={1} />,
    description: "고등 입시를 위한 문법 다지기",
    imageUrl: "/home/content/middleSchool/grammar.jpg",
  },
  {
    name: "작문",
    icon: <Pencil size={100} strokeWidth={1} />,
    description: "필수 문장 학습",
    imageUrl: "/home/content/middleSchool/grammar.jpg",
  },
  {
    name: "독해",
    icon: <BookOpenTextIcon size={100} strokeWidth={1} />,
    description: "구조부터 분해하는 독해",
    imageUrl: "/home/content/middleSchool/grammar.jpg",
  },
  {
    name: "리스닝(LC)",
    icon: <Headphones size={100} strokeWidth={1} />,
    description: "고등학교 가기 전 완성하는 리스닝",
    imageUrl: "/home/content/middleSchool/grammar.jpg",
  },
];

const sfd = () => {
  return (
    <div className="">
      <div className="w-full flex justify-between text-center px-[30px] mb-[50px]">
        {curriculums.map((curriculum) => (
          <div
            className={`w-1/4 p-[30px] items-center flex flex-col border-r-2 ${curriculum.name === "문법" ? "border-l-2" : ""}`}
          >
            {curriculum.icon}
            <div className="border-b-2 border-blue-500 text-transparent">
              밑줄
            </div>
            <p className="font-sansKR-SemiBold text-2xl my-[10px]">
              {curriculum.name}
            </p>
            <p className="font-sansKR-Light text-sm">
              {curriculum.description}
            </p>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-[30px]">
        {curriculums.map((curriculum) => (
          <div className="bg-gray-100 rounded-3xl p-[30px] flex">
            {/* Book Cover */}
            <div className="flex">
              <Image
                src={curriculum.imageUrl}
                alt=""
                width={200}
                height={10}
                className="mr-4"
              />
            </div>

            <div className="text-4xl flex flex-col">
              <p className="font-sansKR-SemiBold text-3xl mb-4">
                {curriculum.name}
              </p>
              <p className="text-xl">[{curriculum.description}]</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
