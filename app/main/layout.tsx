"use client";

import Sidebar from "../MainStructureComponent/sidebar";
import Navbar from "../MainStructureComponent/navbar";
import { ReactNode, useState } from "react";
import DeviceType from "@/components/home/deviceType";

export default function RootLayout({ children }: { children: ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="bg-gray-200 min-h-screen w-full flex font-sansKR-Regular">
      {/* 사이드바 - 데스크톱에서는 항상 표시, 모바일에서는 조건부 표시 */}
      <div className="hidden desktop:block">
        <Sidebar
          deviceCondition={DeviceType.DESKTOP}
          isOpen={true}
          onClose={() => {}}
        />
      </div>

      {/* 모바일/태블릿용 사이드바 - 오버레이로 표시 */}
      {sidebarOpen && (
        <Sidebar
          deviceCondition={DeviceType.MOBILE}
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />
      )}

      <div className="w-full flex flex-col min-h-screen desktop:ml-[250px] mt-[60px]">
        <Navbar
          onChange={() => setSidebarOpen(!sidebarOpen)}
        />

        <div className="p-[20px] w-full flex-1">{children}</div>
      </div>
    </div>
  );
}
