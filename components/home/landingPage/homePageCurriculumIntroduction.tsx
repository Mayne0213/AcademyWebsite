"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { forwardRef } from "react";
import audience from "@/public/homeCopy/lectures/offline/lecture1.jpg";
import BackgroundDot from "../backgroundDot";
import DeviceType from "@/components/home/deviceType";
import useDeviceDetect from "@/components/hooks/useMobileDetect";
import { DESIGN_SYSTEM } from "./designSystem";

const getDeviceClasses = (deviceType: DeviceType | null) => {
  if (deviceType === null) {
    return {
      layoutDirection: "",
      textWidth: "",
      textAlign: "",
      textColor: "",
      showLineBreak: false,
      padding: "",
      titleSize: "",
      textSize: "",
      gap: "",
    };
  }

  return {
    [DeviceType.Desktop]: {
      padding: "py-20 px-6 bg-[#fdf1da]",
      titleSize: "text-4xl",
      layoutDirection: "flex-row",
      gap: "gap-10",
      textSize: "text-xl",
      textWidth: "w-[55%]",
      textAlign: "text-left",
      textColor: "text-black",
    },
    [DeviceType.Tablet]: {
      padding: "py-16 px-6 bg-[#fdf1da]",
      titleSize: "text-3xl",
      layoutDirection: "flex-row",
      gap: "gap-8",
      textSize: "text-lg",
      textWidth: "w-[55%]",
      textAlign: "text-left",
      textColor: "text-black",
    },
    [DeviceType.SmallTablet]: {
      padding: "bg-black",
      titleSize: "text-2xl",
      gap: "",
      layoutDirection: "flex-col",
      textSize: "text-base",
      textWidth: "w-full",
      textAlign: "text-center",
      textColor: "text-white",
    },
    [DeviceType.Mobile]: {
      padding: "py-10 px-4 bg-[#fdf1da]",
      titleSize: "text-xl",
      gap: "gap-4",
      layoutDirection: "flex-col",
      textSize: "text-sm",
      textWidth: "w-full",
      textAlign: "text-center",
      textColor: "text-black",
    },
  }[deviceType];
};

const HomePageCurriculumIntroduction = forwardRef<HTMLDivElement>(
  (props, ref) => {
    const deviceType = useDeviceDetect();
    const {
      padding,
      titleSize,
      layoutDirection,
      gap,
      textSize,
      textColor,
      textWidth,
      textAlign,
    } = getDeviceClasses(deviceType);

    const isSmallTablet = deviceType === DeviceType.SmallTablet;

    return (
      <motion.section
        {...DESIGN_SYSTEM.animations.fadeInUp}
        ref={ref}
        className={`relative ${padding}`}
      >
        <BackgroundDot />

        <div
          className={`relative w-full h-full m-auto flex items-stretch max-w-7xl ${gap} ${layoutDirection}`}
        >
          {/* Youtube Video */}
          <div
            className={`${
              deviceType === 0
                ? "w-full"
                : deviceType === 1
                  ? "hidden"
                  : "w-[50%]"
            } rounded-2xl overflow-hidden shadow-xl`}
          >
            <iframe
              src="https://www.youtube.com/embed/h4fybVXAZ0c?autoplay=0&rel=0"
              title="YouTube video"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full aspect-video"
            />{" "}
          </div>

          {/* Audience Image */}
          <div
            className={`relative w-full h-full flex items-center ${deviceType !== 1 ? "hidden" : ""}`}
          >
            <Image
              src={audience}
              alt="Background Image"
              className={`object-cover opacity-60 w-full h-full `}
            />
          </div>

          {/* 텍스트 영역 */}
          <motion.div
            {...DESIGN_SYSTEM.animations.fadeInRight}
            className={`${
              isSmallTablet
                ? "absolute inset-0 flex flex-col justify-center items-center px-32 text-center"
                : `${textAlign} ${textWidth} relative`
            }`}
          >
            <div className={`${textColor} h-full flex flex-col justify-center`}>
              <h2 className={`${titleSize} mb-4 font-MaruBuri-Bold`}>
                예비 고3에서 수능까지,
                <br />
                함께 달려나가겠습니다.
              </h2>
              <p className={`${textSize} leading-relaxed font-MaruBuri-Light`}>
                단순 한 철 강의가 아닙니다. 2026년 1년을 아우르는
                체계적이고 전문적인 교육 커리를 확인하실 수 있습니다. 
                수많은 학생을 가르친 경험과 체계적인 커리큘럼으로 
                학생들의 옆에서 함께 걸어 나가겠습니다.
              </p>
            </div>
          </motion.div>
        </div>
      </motion.section>
    );
  },
);

export default HomePageCurriculumIntroduction;
