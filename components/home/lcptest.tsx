"use client";
import Image from "next/image";
import JooMain from "@/public/homeCopy/jooMain.png";


const LCPTest = () => {
        return (
        <div className="w-full h-screen bg-red-500 flex items-center justify-center">
            <Image
            width={1000}
            height={1000}
            src={JooMain}
            alt="주혜연"
            sizes="(max-width: 768px) 400px, (max-width: 1200px) 600px, 800px"
            className="h-full w-auto object-contain"
            loading="eager"
          />

        </div>
    );
};

export default LCPTest;