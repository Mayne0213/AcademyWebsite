"use client";

import Navbar from "@/src/widgets/navbar/HomeNavbar";
import Footer from "@/src/widgets/footer/HomeFooter";
import { ReactNode } from "react";

export default function RootLayout({ children }: { children: ReactNode }) {

  return (
    <div className="overflow-hidden break-keep">
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}