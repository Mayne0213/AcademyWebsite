"use client";

import Sidebar from "@/src/widgets/sidebar/MainSidebar";
import Navbar from "@/src/widgets/navbar/MainNavbar";
import { ReactNode, useState } from "react";
import DeviceType from "@/src/shared/lib/deviceType";

export default function RootLayout({ children }: { children: ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="w-full flex font-sansKR-Regular">
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

      <div className="w-full flex flex-col h-screen desktop:ml-[250px] pt-[60px]">
        <Navbar
          onChange={() => setSidebarOpen(!sidebarOpen)}
        />

        <div className="p-[20px] w-full flex-1 bg-gray-200">
          <main className="h-full desktop:min-h-[calc(100vh-100px)] rounded-xl bg-white text-gray-800 p-4 tablet:p-6">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
