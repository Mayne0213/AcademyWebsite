"use client";

import React from "react";
import Image from "next/image";
import favicon from "@/app/favicon.ico";
import { BarLoader } from "react-spinners";
import { useDeviceDetect } from "@/components/home/deviceType";

const Loading: React.FC = () => {
  const deviceCondition = useDeviceDetect();

  if (deviceCondition === null) {
    return (
      <div className="flex flex-col items-center justify-center fixed bg-white z-[9999] w-full h-full space-y-4">
      <Image src={favicon} alt="favicon" width={100} height={100} />
      <BarLoader color="#000000" width={200} />
    </div>
  );
  }
};

export default Loading;
