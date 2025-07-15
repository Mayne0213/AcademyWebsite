"use client";

import { motion } from "framer-motion";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from "recharts";
import BackgroundDot from "../backgroundDot";
import { forwardRef } from "react";
import { useDeviceDetect } from "@/components/home/deviceType";
import DeviceType from "@/components/home/deviceType";
import { DESIGN_SYSTEM } from "./designSystem";

const mockData = [
  { name: "3월", score: 78 },
  { name: "4월", score: 82 },
  { name: "5월", score: 76 },
  { name: "6월", score: 88 },
  { name: "7월", score: 92 },
];

const getDeviceClasses = (deviceType: DeviceType | null) => {
  if (deviceType === null) {
    return {
      padding: "",
      layout: "",
      gap: "",
      textWidth: "",
      chartWidth: "",
      chartHeight: "",
      titleSize: "",
      paragraphSize: "",
      chartContainer: "",
      chartPadding: "",
      textAlign: "",
      textSpacing: "",
    };
  }

  return {
    [DeviceType.DESKTOP]: {
      padding: "py-24 px-6",
      layout: "flex-row",
      gap: "gap-16",
      textWidth: "flex-1",
      chartWidth: "flex-1",
      chartHeight: "h-96",
      titleSize: "text-5xl",
      paragraphSize: "text-xl",
      chartContainer: "min-w-[500px]",
      chartPadding: "p-8",
      textAlign: "text-left",
      textSpacing: "space-y-6",
    },
    [DeviceType.TABLET]: {
      padding: "py-20 px-6",
      layout: "flex-row",
      gap: "gap-12",
      textWidth: "flex-1",
      chartWidth: "flex-1",
      chartHeight: "h-80",
      titleSize: "text-4xl",
      paragraphSize: "text-lg",
      chartContainer: "min-w-[400px]",
      chartPadding: "p-6",
      textAlign: "text-left",
      textSpacing: "space-y-5",
    },
    [DeviceType.SMALLTABLET]: {
      padding: "py-16 px-4",
      layout: "flex-col",
      gap: "gap-8",
      textWidth: "w-full",
      chartWidth: "w-full",
      chartHeight: "h-72",
      titleSize: "text-3xl",
      paragraphSize: "text-base",
      chartContainer: "max-w-full",
      chartPadding: "p-4",
      textAlign: "text-center",
      textSpacing: "space-y-4",
    },
    [DeviceType.MOBILE]: {
      padding: "py-12 px-4",
      layout: "flex-col",
      gap: "gap-6",
      textWidth: "w-full",
      chartWidth: "w-full",
      chartHeight: "h-60",
      titleSize: "text-2xl",
      paragraphSize: "text-sm",
      chartContainer: "max-w-full",
      chartPadding: "p-4",
      textAlign: "text-center",
      textSpacing: "space-y-3",
    },
  }[deviceType];
};

const TestPaperIntroduction = forwardRef<HTMLDivElement>((_props, ref) => {
  const deviceType = useDeviceDetect();
  const {
    padding,
    layout,
    gap,
    textWidth,
    chartWidth,
    chartHeight,
    titleSize,
    paragraphSize,
    chartContainer,
    chartPadding,
    textAlign,
    textSpacing,
  } = getDeviceClasses(deviceType);

  const isDesktopOrTablet =
    deviceType === DeviceType.DESKTOP || deviceType === DeviceType.TABLET;

  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      viewport={{ once: true }}
      ref={ref}
      className={`relative ${padding} bg-[#deeff0] text-black overflow-hidden`}
    >
      <BackgroundDot />
      <div
        className={`max-w-7xl mx-auto relative flex ${layout} items-center justify-between ${gap}`}
      >
        {/* Text Content */}
        <div className={`${textWidth} ${textSpacing} ${textAlign}`}>
          <motion.h2
            {...DESIGN_SYSTEM.animations.fadeInLeft}
            transition={{
              ...DESIGN_SYSTEM.animations.fadeInLeft.transition,
              delay: 0.2,
            }}
            className={`${titleSize} font-MaruBuri-Bold leading-tight`}
          >
            연습도 실전처럼.
            {isDesktopOrTablet && <br />}
            주혜연 실전 모의고사
          </motion.h2>
          <motion.p
            {...DESIGN_SYSTEM.animations.fadeInLeft}
            transition={{
              ...DESIGN_SYSTEM.animations.fadeInLeft.transition,
              delay: 0.4,
            }}
            className={`${paragraphSize} font-MaruBuri-Light leading-relaxed`}
          >
            실전 분위기 속 모의고사 시행 후, 틀린 문항 수, 총점, 점수 변화를
            {isDesktopOrTablet && <br />}한 눈에 확인할 수 있는 그래프로
            제공해드립니다.
          </motion.p>
        </div>

        {/* Chart */}
        <motion.div
          {...DESIGN_SYSTEM.animations.scaleIn}
          transition={{
            ...DESIGN_SYSTEM.animations.scaleIn.transition,
            delay: 0.6,
          }}
          className={`${chartWidth} ${chartContainer}`}
        >
          <div
            className={`${chartHeight} bg-white rounded-2xl shadow-2xl ${chartPadding}`}
          >
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={mockData}
                margin={{
                  top: deviceType === DeviceType.MOBILE ? 5 : 10,
                  right: deviceType === DeviceType.MOBILE ? 5 : 10,
                  left: deviceType === DeviceType.MOBILE ? 0 : 10,
                  bottom: deviceType === DeviceType.MOBILE ? 5 : 10,
                }}
              >
                <XAxis
                  dataKey="name"
                  tick={{
                    fill: "#555",
                    fontSize: deviceType === DeviceType.MOBILE ? 12 : 14,
                    fontFamily: "MaruBuri-Regular",
                  }}
                  axisLine={{ stroke: "#e5e5e5" }}
                  tickLine={{ stroke: "#e5e5e5" }}
                  tickMargin={deviceType === DeviceType.MOBILE ? 2 : 5}
                />
                <YAxis
                  tick={{
                    fill: "#555",
                    fontSize: deviceType === DeviceType.MOBILE ? 12 : 14,
                    fontFamily: "MaruBuri-Regular",
                  }}
                  domain={[60, 100]}
                  axisLine={{ stroke: "#e5e5e5" }}
                  tickLine={{ stroke: "#e5e5e5" }}
                  width={deviceType === DeviceType.MOBILE ? 30 : 40}
                  tickMargin={deviceType === DeviceType.MOBILE ? 2 : 5}
                />
                <Line
                  type="monotone"
                  dataKey="score"
                  stroke="#7b3fe4"
                  strokeWidth={deviceType === DeviceType.MOBILE ? 3 : 4}
                  dot={{
                    r: deviceType === DeviceType.MOBILE ? 4 : 6,
                    fill: "#7b3fe4",
                    strokeWidth: 2,
                    stroke: "#fff",
                  }}
                  activeDot={{
                    r: deviceType === DeviceType.MOBILE ? 6 : 8,
                    fill: "#7b3fe4",
                    stroke: "#fff",
                    strokeWidth: 2,
                  }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
});

TestPaperIntroduction.displayName = "TestPaperIntroduction";

export default TestPaperIntroduction;
