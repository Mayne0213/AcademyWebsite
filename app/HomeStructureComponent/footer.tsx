"use client";

import Link from "next/link";
import tabs from "@/components/home/tabs";
import DeviceType, { useDeviceDetect } from "@/components/home/deviceType";
import academyInformation from "@/components/home/academyInformation";

const Footer: React.FC = () => {
  const deviceCondition = useDeviceDetect();

  return (
    <footer className="bg-gray-800 text-white p-10 font-sansKR-Regular">
      <div className="hidden tablet:flex">
        {tabs.map((tab, index) => (
          <div
            key={index}
            className={`${index === 0 ? "ml-[10px]" : ""}
                        ${deviceCondition === DeviceType.TABLET ? "text-sm mr-12" : "text-base mr-16"}
                        text-white cursor-pointer hover:font-sansKR-Bold`}
          >
            <Link href={tab.href}>{tab.label}</Link>
          </div>
        ))}
      </div>

      <hr
        className="hidden tablet:block px-1 my-6 border-gray-500"
      />

      <div className="text-xs ml-[10px]">
        <div
          className="text-center tablet:text-left text-gray-200 whitespace-pre"
        >
          {academyInformation.academyName}   ㅣ   대표 :{" "}
          {academyInformation.chairman}
          <br className="tablet:hidden" />
          <p className="hidden tablet:inline">{"   "}|{"   "}</p>
          사업자등록번호 : {academyInformation.residentRegistrationNumber}
          <br />
          주소 : {academyInformation.address}
          <br className="tablet:hidden" />
          <p className="hidden tablet:inline">{"   "}|{"   "}</p>
          개인정보보호 책임자: 김민조
        </div>
        <div
          className="mt-5 text-gray-400 tablet:text-left text-center"
        >
          COPYRIGHTⓒ {academyInformation.academyName} All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
