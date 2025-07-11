"use client";

import Link from "next/link";
import tabs from "@/components/home/tabs";
import useDeviceDetect from "@/components/hooks/useMobileDetect";
import academyInformation from "@/components/home/academyInformation";

const Footer: React.FC = () => {
  const deviceCondition = useDeviceDetect();

  return (
    <footer className="bg-gray-800 text-white p-10 font-sansKR-Regular">
      <div className={`${deviceCondition <= 1 ? "hidden" : "hidden flex"}`}>
        {tabs.map((tab, index) => (
          <div
            key={index}
            className={`${index === 0 ? "ml-[10px]" : ""}
                        ${deviceCondition === 2 ? "text-sm mr-12" : "text-base mr-16"}
                        text-white cursor-pointer hover:font-sansKR-Bold`}
          >
            <Link href={tab.href}>{tab.label}</Link>
          </div>
        ))}
      </div>

      <hr
        className={`${deviceCondition <= 1 ? "hidden" : ""} px-1 my-6 border-gray-500`}
      />

      <div className="text-xs ml-[10px]">
        <div
          className={`${deviceCondition <= 1 ? "text-center" : ""} text-gray-200`}
        >
          {academyInformation.academyName} ㅣ 대표 :{" "}
          {academyInformation.chairman}
          {deviceCondition <= 1 ? <br /> : "ㅣ"}
          학원전화 : {academyInformation.phoneNumber}
          {deviceCondition <= 1 ? <br /> : "ㅣ"}
          사업자등록번호 : {academyInformation.residentRegistrationNumber}
          <br />
          주소 : {academyInformation.address}
          {deviceCondition <= 1 ? <br /> : "ㅣ"}
          개인정보보호 책임자: 김민조
        </div>
        <div
          className={`mt-5 text-gray-400 ${deviceCondition <= 1 ? "text-center" : ""}`}
        >
          COPYRIGHTⓒ {academyInformation.academyName} All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
