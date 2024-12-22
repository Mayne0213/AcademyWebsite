import React from "react";
import Image from "next/image";
import logo from "@/public/title.png";
import { BarLoader } from "react-spinners";

const Loading: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center fixed bg-white z-[9999] w-full h-full">
      <Image src={logo} alt="Logo" width={300} height={150} className="mb-4" />
      <BarLoader color="#000000" width={200} />
    </div>
  );
};

export default Loading;
