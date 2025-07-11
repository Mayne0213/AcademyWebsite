"use client";

import useAnnouncement from "@/components/hooks/useAnnouncement";
import { motion } from "framer-motion";
import { useEffect } from "react";
import Image from "next/image";
import bnImg1 from "@/public/homeCopy/homePageBoard/bnImg1.jpg";
import DeviceType from "@/components/home/deviceType";
import useDeviceDetect from "@/components/hooks/useMobileDetect";
import { DESIGN_SYSTEM } from "./designSystem";

import "swiper/css";
import "swiper/css/autoplay";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

const getDeviceClasses = (deviceType: DeviceType | null) => {
  if (deviceType === null) {
    return {
      titleSize: "",
      titleMargin: "",
      subtitleSize: "",
      padding: "",
      itemTextSize: "",
    };
  }

  return {
    [DeviceType.Desktop]: {
      titleSize: "text-5xl",
      titleMargin: "mb-4",
      textAlign: "text-left",
      subtitleSize: "text-xl",
      padding: "py-20 px-6",
      itemTextSize: "text-lg",
    },
    [DeviceType.Tablet]: {
      titleSize: "text-4xl",
      titleMargin: "mb-6",
      textAlign: "text-left",
      subtitleSize: "text-lg",
      padding: "py-16 px-6",
      itemTextSize: "text-base",
    },
    [DeviceType.SmallTablet]: {
      titleSize: "text-4xl",
      titleMargin: "mb-2",
      textAlign: "text-center",
      subtitleSize: "text-base",
      padding: "py-12 px-5",
      itemTextSize: "text-sm",
    },
    [DeviceType.Mobile]: {
      titleSize: "text-3xl",
      titleMargin: "mb-2",
      textAlign: "text-center",
      subtitleSize: "text-sm",
      padding: "py-10 px-4",
      itemTextSize: "text-xs",
    },
  }[deviceType];
};

const HomePageAnnouncement = () => {
  const { announcements, loadInitialAnnouncement } = useAnnouncement();
  const deviceType = useDeviceDetect();
  const {
    titleSize,
    titleMargin,
    textAlign,
    subtitleSize,
    padding,
    itemTextSize,
  } = getDeviceClasses(deviceType);

  useEffect(() => {
    loadInitialAnnouncement();
  }, [loadInitialAnnouncement]);

  return (
    <motion.section
      {...DESIGN_SYSTEM.animations.fadeInUp}
      className={`bg-gray-50 relative ${padding}`}
    >
      <div className={`max-w-7xl mx-auto w-full ${textAlign}`}>
        <h2 className={`font-MaruBuri-Bold ${titleMargin} ${titleSize}`}>
          주혜연 영어 소식
        </h2>
        <div
          className={`flex flex-col space-y-8 md:flex-row md:space-y-0 md:space-x-8`}
        >
          {/* Left Section */}
          <div className={`${deviceType <= 1 ? "w-[100%]" : "w-[55%]"} pr-4`}>
            <h3 className={`font-MaruBuri-Regular mb-6 ${subtitleSize}`}>
              주혜연 학원의 최신 소식을 만나보세요
            </h3>

            {announcements.length > 0 ? (
              <ul>
                {announcements.slice(0, 8).map((item, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className={`${
                      index === 0 ? "border-y-2" : "border-b-2"
                      } ${itemTextSize} py-3 flex justify-between w-full font-MaruBuri-Light hover:font-MaruBuri-SemiBold hover:cursor-pointer`}
                  >
                    <div className="text-left">{item.title}</div>
                    <div className="text-right text-gray-500">2025-06-11</div>
                  </motion.li>
                ))}
              </ul>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col items-center justify-center py-12 text-center border-2 border-gray-200 rounded-lg"
              >
                <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mb-4">
                  <svg
                    className="w-8 h-8 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                </div>
                <h4 className={`font-MaruBuri-SemiBold text-gray-600 mb-2 ${itemTextSize}`}>
                  아직 공지사항이 없습니다
                </h4>
                <p className={`font-MaruBuri-Light text-gray-500 ${deviceType === DeviceType.Mobile ? "text-xs" : "text-sm"}`}>
                  새로운 소식이 업데이트되면 여기에 표시됩니다
                </p>
              </motion.div>
            )}
          </div>

          {/* Right Section */}
          <div
            className={`md:w-[50%] aspect-[16/10] rounded-xl overflow-hidden shadow-lg relative ${deviceType <= 1 ? "hidden" : ""}`}
          >
                  <Image
                    src={bnImg1}
                    alt="announcementImage"
                    fill
                    sizes="100vw"
                    className="object-cover"
                  />
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default HomePageAnnouncement;
