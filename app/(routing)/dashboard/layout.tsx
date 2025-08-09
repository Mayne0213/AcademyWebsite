import { ReactNode } from "react";
import Navbar from "@/src/widgets/navbar/DashboardNavbar";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <div className="overflow-hidden font-sansKR-Regular break-keep">
      <Navbar />
      {children}
    </div>
  );
}
