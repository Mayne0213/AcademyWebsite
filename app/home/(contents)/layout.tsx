"use client";

import React from "react";
import { Suspense } from "react";
import SubNavbar from "@/app/structureComponent/subNavbar";
import Loading from "@/app/loading";
import DeviceType from "@/components/deviceType";
import useDeviceDetect from "@/components/hooks/useMobileDetect";
import { useRouter } from "next/router";

const getMarginClasses = (deviceType: DeviceType) =>
  ({
    [DeviceType.Desktop]: "m-[30px]",
    [DeviceType.Tablet]: "m-[30px]",
    [DeviceType.SmallTablet]: "m-[20px]",
    [DeviceType.Mobile]: "m-[10px]",
    null: "",
  })[deviceType];

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
