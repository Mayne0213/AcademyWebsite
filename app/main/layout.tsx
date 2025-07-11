"use client";

import Sidebar from "../MainStructureComponent/sidebar";
import Navbar from "../MainStructureComponent/navbar";
import { Toaster } from "@/components/ui/sonner";
import { ReactNode, useEffect, useState } from "react";
import useMobileDetect from "@/components/hooks/useMobileDetect";

export default function RootLayout({ children }: { children: ReactNode }) {
  const deviceCondition = useMobileDetect();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if(deviceCondition === 3){
      setSidebarOpen(true)
    }

  },[deviceCondition])

  return (
    <div className="bg-gray-200 min-h-screen w-full flex">
      {(sidebarOpen) && (
        <Sidebar
          deviceCondition={deviceCondition}
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />
      )}

      <div className="w-full flex flex-col min-h-screen">
        <Navbar
          deviceCondition = {deviceCondition}
          onChange = {()=> setSidebarOpen(!sidebarOpen)}
        />

        <div className="p-[20px] w-full flex-1">{children}</div>
        <Toaster />
      </div>
    </div>
  );
}
