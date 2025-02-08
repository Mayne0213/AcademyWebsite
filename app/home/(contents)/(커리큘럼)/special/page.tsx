"use client";

import Image from "next/image";
import specialTimetable from "@/public/home/content/timeTable/special/specialTimetable.png";
import specialTimetableRotated from "@/public/home/content/timeTable/special/specialTimetableRotated.png";
import useDeviceDetect from "@/components/hooks/useMobileDetect";

const Sat = () => {
  return (
    <Image
      alt=""
      src={useDeviceDetect() === 0 ? specialTimetableRotated : specialTimetable}
      className={`border-l-2 border-b-2`}
    />
  );
};

export default Sat;
