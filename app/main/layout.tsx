"use client";

import Sidebar from "../MainStructureComponent/sidebar";
import Navbar from "../MainStructureComponent/navbar";
import { Toaster } from "@/components/ui/sonner";
import { ReactNode, useEffect, useState } from "react";
import DeviceType, { useDeviceDetect } from "@/components/home/deviceType";

export default function RootLayout({ children }: { children: ReactNode }) {
  const deviceCondition = useDeviceDetect();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if(deviceCondition === DeviceType.DESKTOP){
      setSidebarOpen(true)
    }

  },[deviceCondition])

  return (
    <div className="bg-gray-200 min-h-screen w-full flex font-sansKR-Regular">
      {(sidebarOpen) && (
        <Sidebar
          deviceCondition={deviceCondition ?? DeviceType.DESKTOP}
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />
      )}

      <div className="w-full flex flex-col min-h-screen">
        <Navbar
          deviceCondition={deviceCondition ?? DeviceType.DESKTOP}
          onChange={() => setSidebarOpen(!sidebarOpen)}
        />

        <div className="p-[20px] w-full flex-1">{children}</div>
        <Toaster />
      </div>
    </div>
  );
}
