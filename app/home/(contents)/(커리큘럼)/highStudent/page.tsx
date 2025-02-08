"use client";

import Image from "next/image";
import { useState } from "react";
import useDeviceDetect from "@/components/hooks/useMobileDetect";
import DeviceType from "@/components/deviceType";
import h1TimeTable from "@/public/home/content/timeTable/highSchool/h1Timetable.png";
import h1TimeTableRotated from "@/public/home/content/timeTable/highSchool/h1TimetableRotated.png";
import h2TimeTable from "@/public/home/content/timeTable/highSchool/h2Timetable.png";
import h2TimeTableRotated from "@/public/home/content/timeTable/highSchool/h2TimetableRotated.png";
import h3TimeTable from "@/public/home/content/timeTable/highSchool/h3Timetable.png";
import h3TimeTableRotated from "@/public/home/content/timeTable/highSchool/h3TimetableRotated.png";

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
            고등 1학년
          </button>

          <button
            onClick={() => {
              setCurrentTab(2);
            }}
            className={`w-1/3 h-full border-y-2 absolute left-1/3 right-1/3 items-center flex justify-center transition-all duration-300
                ${currentTab === 2 ? "bg-blue-200" : ""}
                `}
          >
            고등 2학년
          </button>

          <button
            onClick={() => {
              setCurrentTab(3);
            }}
            className={`w-1/3 h-full border-2 rounded-e-full absolute right-0 items-center flex justify-center transition-all duration-300
                  ${currentTab === 3 ? "bg-blue-200" : ""}
                  `}
          >
            고등 3학년
          </button>
        </div>
      )}
      {useDeviceDetect() === 0 && (
        <select
          value={currentTab}
          onChange={(e) => setCurrentTab(Number(e.target.value))}
          className="w-full mb-[20px] p-1 border-2 text-lg rounded-md"
        >
          <option value={1}>고등 1학년</option>
          <option value={2}>고등 2학년</option>
          <option value={3}>고등 3학년</option>
        </select>
      )}

      <div>
        <Image
          alt=""
          src={useDeviceDetect() === 0 ? h1TimeTableRotated : h1TimeTable}
          className={`border-l-2 border-b-2 ${currentTab === 1 ? "" : "hidden"}`}
        />
        <Image
          alt=""
          src={useDeviceDetect() === 0 ? h2TimeTableRotated : h2TimeTable}
          className={`border-l-2 border-b-2 ${currentTab === 2 ? "" : "hidden"}`}
        />
        <Image
          alt=""
          src={useDeviceDetect() === 0 ? h3TimeTableRotated : h3TimeTable}
          className={`border-l-2 border-b-2 ${currentTab === 3 ? "" : "hidden"}`}
        />
      </div>
    </div>
  );
};

export default Regular;
