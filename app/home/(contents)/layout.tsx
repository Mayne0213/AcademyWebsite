"use client";

import React from "react";
import { Suspense } from "react";
import SubNavbar from "@/app/HomeStructureComponent/subNavbar";
import Loading from "@/app/loading";
import DeviceType from "@/components/home/deviceType";
import { useDeviceDetect } from "@/components/home/deviceType";

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
      <SubNavbar />
      <Suspense fallback={<Loading />}>
        <div className="flex items-center justify-center">
          <div
            className={`w-full max-w-[1400px] flex items-center justify-center ${margin}`}
          >
            {children}
          </div>
        </div>
      </Suspense>
    </div>
  );
}
