"use client";

import React from "react";
import { Suspense } from "react";
import SubNavbar from "@/app/structureComponent/subNavbar";
import Loading from "@/app/loading";
import DeviceType from "@/components/deviceType";
import useDeviceDetect from "@/components/hooks/useMobileDetect";

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
    <div>
      <SubNavbar />
      <Suspense fallback={<Loading />}>
        <div className={margin}>{children}</div>
      </Suspense>
    </div>
  );
}
