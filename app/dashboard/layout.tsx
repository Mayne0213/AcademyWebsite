"use client";
import NextNProgress from "nextjs-toploader";
import Navbar from "../DashboardStructureComponent/navbar";
import { ReactNode } from "react";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <div className="overflow-hidden break-keep">
      <Navbar />
      {children}
    </div>
  );
}
