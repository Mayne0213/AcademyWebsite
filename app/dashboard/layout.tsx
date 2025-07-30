import { ReactNode } from "react";
import Navbar from "../DashboardStructureComponent/navbar";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <div className="overflow-hidden font-sansKR-Regular break-keep">
      <Navbar />
      {children}
    </div>
  );
}
