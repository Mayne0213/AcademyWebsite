"use client";

import Navbar from "../structureComponent/navbar";
import Footer from "../structureComponent/footer";
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
