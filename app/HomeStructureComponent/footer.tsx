"use client";

import Link from "next/link";
import tabs from "@/components/home/tabs";
import DeviceType, { useDeviceDetect } from "@/components/home/deviceType";
import academyInformation from "@/components/home/academyInformation";

const Footer: React.FC = () => {
  const deviceCondition = useDeviceDetect();

  return (
    <footer className="bg-gray-800 text-white p-10 font-sansKR-Regular">
      <div className={`${deviceCondition && deviceCondition <= DeviceType.SMALLTABLET ? "hidden" : "hidden flex"}`}>
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
        className={`${deviceCondition && deviceCondition <= DeviceType.SMALLTABLET ? "hidden" : ""} px-1 my-6 border-gray-500`}
      />

      <div className="text-xs ml-[10px]">
        <div
          className={`${deviceCondition && deviceCondition <= DeviceType.SMALLTABLET ? "text-center" : ""} text-gray-200`}
        >
          {academyInformation.academyName} ㅣ 대표 :{" "}
          {academyInformation.chairman}
          {deviceCondition && deviceCondition <= DeviceType.SMALLTABLET ? <br /> : "ㅣ"}
          학원전화 : {academyInformation.phoneNumber}
          {deviceCondition && deviceCondition <= DeviceType.SMALLTABLET ? <br /> : "ㅣ"}
          사업자등록번호 : {academyInformation.residentRegistrationNumber}
          <br />
          주소 : {academyInformation.address}
          {deviceCondition && deviceCondition <= DeviceType.SMALLTABLET ? <br /> : "ㅣ"}
          개인정보보호 책임자: 김민조
        </div>
        <div
          className={`mt-5 text-gray-400 ${deviceCondition && deviceCondition <= DeviceType.SMALLTABLET ? "text-center" : ""}`}
        >
          COPYRIGHTⓒ {academyInformation.academyName} All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
