"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { forwardRef } from "react";
import textbookCrafting from "@/public/homeCopy/homePageBoard/bnImg2.jpg";
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
      sectionPadding: "",
      headingSize: "",
      textSize: "",
      gap: "",
    };
  }

  return {
    [DeviceType.Desktop]: {
      sectionPadding: "py-20 px-6 bg-[#e3e9e0]",
      headingSize: "text-4xl",
      layoutDirection: "flex-row",
      gap: "gap-10",
      textSize: "text-xl",
      textWidth: "w-[55%]",
      textAlign: "text-left",
      textColor: "text-black",
    },
    [DeviceType.Tablet]: {
      sectionPadding: "py-16 px-6 bg-[#e3e9e0]",
      headingSize: "text-3xl",
      layoutDirection: "flex-row",
      gap: "gap-8",
      textSize: "text-lg",
      textWidth: "w-[55%]",
      textAlign: "text-left",
      textColor: "text-black",
    },
    [DeviceType.SmallTablet]: {
      sectionPadding: "bg-black",
      headingSize: "text-2xl",
      gap: "gap-6",
      layoutDirection: "flex-col",
      textSize: "text-base",
      textWidth: "w-full",
      textAlign: "text-center",
      textColor: "text-white",
    },
    [DeviceType.Mobile]: {
      sectionPadding: "py-10 px-4 bg-[#e3e9e0]",
      headingSize: "text-xl",
      gap: "gap-4",
      layoutDirection: "flex-col",
      textSize: "text-sm",
      textWidth: "w-full",
      textAlign: "text-center",
      textColor: "text-black",
    },
  }[deviceType];
};

const HomePageTextbookIntroduction = forwardRef<HTMLDivElement>(
  (props, ref) => {
    const deviceType = useDeviceDetect();
    const {
      sectionPadding,
      headingSize,
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
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        ref={ref}
        className={`relative ${sectionPadding}`}
      >
        <BackgroundDot />

        <div
          className={`relative w-full m-auto flex items-center max-w-7xl ${gap} ${layoutDirection}`}
        >
          <motion.div
            {...DESIGN_SYSTEM.animations.fadeInUp}
            className={`z-[1] ${
              isSmallTablet
                ? "absolute inset-0 flex flex-col justify-center items-center px-32 text-center"
                : `relative ${textAlign} ${textWidth}`
            }`}
          >
            <div className={`space-y-4 ${textColor}`}>
              <h2 className={`${headingSize} font-MaruBuri-Bold`}>
                혜연쌤의 영혼을 탈탈 털어넣은
                <br />
                1등급 노하우의 집약체.
              </h2>
              <p className={`leading-relaxed font-MaruBuri-Light ${textSize}`}>
                EBS 1타 강사로 10년 넘게 활약한 주혜연 선생님의 노하우가 가득
                담긴 교재로, 교재 개발 경험까지 더해 출제자의 핵심을
                정확히 짚어내는 문제로 엄선합니다. 최고의 연구진과 함께 꾸준히
                업데이트되며, 시험장에서도 든든한 친구가 되어줄 학습
                파트너입니다.
              </p>
            </div>
          </motion.div>

          <Image
            src={textbookCrafting}
            alt="Background Image"
            className={`rounded-2xl shadow-xl
                        ${
                          deviceType === 0
                            ? "w-full"
                            : deviceType === 1
                              ? "opacity-60 w-full"
                              : "object-cover relative w-[50%]"
                        }
                      `}
          />
        </div>
      </motion.section>
    );
  },
);

HomePageTextbookIntroduction.displayName = "HomePageTextbookIntroduction";

export default HomePageTextbookIntroduction;
