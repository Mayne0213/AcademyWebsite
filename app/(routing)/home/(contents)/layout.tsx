"use client";

import React from "react";
// import SubNavbar from "@/src/widgets/navbar/HomeSubNavbar";
import DeviceType from "@/src/shared/lib/deviceType";
import { useDeviceDetect } from "@/src/shared/lib/deviceType";

const getMarginClasses = (deviceType: DeviceType | null) => {
  if (!deviceType) return "";
  return {
    [DeviceType.DESKTOP]: "m-[30px]",
    [DeviceType.TABLET]: "m-[30px]",
    [DeviceType.SMALLTABLET]: "m-[20px]",
    [DeviceType.MOBILE]: "m-[10px]",
  }[deviceType] || "";
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const margin = getMarginClasses(useDeviceDetect());

  return (
    <div className="">
      {/* <SubNavbar /> */}
        <div className="flex items-center justify-center">
          <div
            className={`w-full max-w-[1400px] flex items-center justify-center ${margin}`}
          >
            {children}
          </div>
        </div>
    </div>
  );
}
