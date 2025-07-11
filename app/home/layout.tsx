"use client";

import Navbar from "../HomeStructureComponent/navbar";
import Footer from "../HomeStructureComponent/footer";
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
