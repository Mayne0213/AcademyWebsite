"use client";

import Image from "next/image";

import DeviceType from "@/components/deviceType";
import useDeviceDetect from "@/components/hooks/useMobileDetect";

const getGridClasses = (deviceType: DeviceType) =>
  ({
    [DeviceType.Desktop]: "grid-cols-3",
    [DeviceType.Tablet]: "grid-cols-2",
    [DeviceType.SmallTablet]: "grid-cols-2",
    [DeviceType.Mobile]: "grid-cols-1",
    null: "",
  })[deviceType];

const departments = [
  { name: "입구", imageUrl: "/home/content/view/entrance.jpg" },
  { name: "데스크", imageUrl: "/home/content/view/desk.jpg" },
  { name: "시험장소", imageUrl: "/home/content/view/entrance.jpg" },
  { name: "복도", imageUrl: "/home/content/view/hallway.jpg" },
  { name: "스터디룸", imageUrl: "/home/content/view/studyroom.jpg" },
  { name: "교실1", imageUrl: "/home/content/view/classroom1.jpg" },
  { name: "교실2", imageUrl: "/home/content/view/classroom2.jpg" },
  { name: "교실3", imageUrl: "/home/content/view/classroom3.jpg" },
  { name: "마케팅부", imageUrl: "/home/content/view/entrance.jpg" },
];

const View = () => {
  const gridAmount = getGridClasses(useDeviceDetect());

  return (
    <div className={`w-full mb-4 gap-4 grid ${gridAmount}`}>
      {departments.map((department) => (
        <div
          key={department.name}
          className="rounded-lg overflow-hidden shadow-lg aspect-[16/9]"
        >
          <div className="relative w-full h-0 pb-[56.25%]">
            <Image
              fill
              src={department.imageUrl}
              alt={department.name}
              className="object-cover"
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default View;
