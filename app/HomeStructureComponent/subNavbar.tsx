"use client";

import React from "react";
import Link from "next/link";
import Image, { StaticImageData } from "next/image";
import { usePathname } from "next/navigation";

import tabs from "@/components/home/tabs";
import GetTabsValue from "@/components/home/getTabsValue";
import DeviceType from "@/components/home/deviceType";
import useDeviceDetect from "@/components/hooks/useMobileDetect";

const SubNavbar: React.FC = () => {
  const pathname = usePathname();
  const deviceCondition = useDeviceDetect();

  const currentTab = tabs.find(
    (tab) => GetTabsValue("Title", pathname) === tab.label,
  );

  const getDeviceClasses = (deviceType: DeviceType) =>
    ({
      [DeviceType.Desktop]: {
        imageSize: "h-[500px]",
        textSize: "text-7xl",
        content: GetTabsValue("Title", pathname) as string,
        subTitle: "text-5xl",
        subTitleEnglish: "text-lg mb-[5px]",
        subContentOuterpadding: "px-[30px] mt-[30px]",
        subContentTextSize: "text-sm mt-[20px]",
      },
      [DeviceType.Tablet]: {
        imageSize: "h-[300px]",
        textSize: "text-6xl",
        content: GetTabsValue("Title", pathname) as string,
        subTitle: "text-4xl",
        subTitleEnglish: "text-base mb-[5px]",
        subContentOuterpadding: "px-[30px] mt-[25px]",
        subContentTextSize: "text-sm mt-[15px]",
      },
      [DeviceType.SmallTablet]: {
        imageSize: "h-[250px]",
        textSize: "text-5xl",
        content: GetTabsValue("SubTitle", pathname) as string,
        subTitle: "hidden",
        subTitleEnglish: "hidden",
        subContentOuterpadding: "px-[20px] mt-[25px]",
        subContentTextSize: "text-sm",
      },
      [DeviceType.Mobile]: {
        imageSize: "h-[200px]",
        textSize: "text-4xl",
        content: GetTabsValue("SubTitle", pathname) as string,
        subTitle: "hidden",
        subTitleEnglish: "hidden",
        subContentOuterpadding: "px-[10px] mt-[15px]",
        subContentTextSize: "text-xs",
      },
      null: {
        imageSize: "",
        textSize: "",
        content: "",
        subTitle: "",
        subTitleEnglish: "",
        subContentOuterpadding: "",
        subContentTextSize: "",
      },
    })[deviceType];

  const {
    imageSize,
    textSize,
    content,
    subTitle,
    subTitleEnglish,
    subContentOuterpadding,
    subContentTextSize,
  } = getDeviceClasses(deviceCondition);

  return (
    <div>
      {/* 이미지 안 (Navbar 제외) */}
      <div className={`relative w-full ${imageSize}`}>
        {/* 백그라운드 이미지 */}
        <Image
          src={GetTabsValue("Image", pathname) as StaticImageData}
          alt="Banner Image"
          fill
          objectFit="cover"
          className="brightness-75"
        />

        {/* 이미지 한가운데 제목 */}
        <div
          className={`font-sansKR-Bold flex items-center justify-center absolute inset-0 text-white ${textSize}`}
        >
          {content}
        </div>

        {/* 이미지 안쪽 중 가장 아래에 있는 탭 바 */}
        {currentTab && (
          <div
            className={`bg-black bg-opacity-20 absolute inset-0 top-[441px] flex items-center justify-center ${deviceCondition <= DeviceType.Tablet ? "hidden" : ""}`}
          >
            {currentTab.submenu.map(
              (item: { href: string; label: string }, subIndex: number) => (
                <Link key={subIndex} href={item.href}>
                  <div
                    className={`px-[80px] py-[16px] text-xl font-sansKR-SemiBold transition-all duration-300
                    ${item.href === pathname ? "text-gray-700 bg-white" : "text-white hover:bg-gray-50 hover:bg-opacity-10"}`}
                  >
                    {item.label}
                  </div>
                </Link>
              ),
            )}
          </div>
        )}
      </div>

      {/* 이미지 밖 */}
      <div
        className={`font-sansKR-SemiBold text-center ${subContentOuterpadding}`}
      >
        {/* 영어 제목 */}
        <div className={`text-blue-500 ${subTitleEnglish}`}>
          {GetTabsValue("SubTitleEnglish", pathname) as string}
        </div>

        {/* 한글 제목 */}
        <div className={subTitle}>
          {GetTabsValue("SubTitle", pathname) as string}
        </div>

        {/* 탭 설명 */}
        <div
          className={`font-sansKR-Light whitespace-pre-line ${subContentTextSize}`}
        >
          {GetTabsValue("Description", pathname) as string}
        </div>
      </div>
    </div>
  );
};

export default SubNavbar;
