"use client";

import { motion } from "framer-motion";
import useDeviceDetect from "./hooks/useMobileDetect";

const getDeviceClasses = (deviceType: number) => {
  switch (deviceType) {
    case 3: // Desktop
      return {
        titleIconSize: 32,
        titleTextSize: "text-2xl",
        contentTextSize: "text-base",
        backgroundPadding: "p-[30px]",
      };
    case 2: // Tablet
      return {
        titleIconSize: 28,
        titleTextSize: "text-xl",
        contentTextSize: "text-base",
        backgroundPadding: "p-[30px]",
      };
    case 1: // SmallTablet
      return {
        titleIconSize: 27,
        titleTextSize: "text-lg",
        contentTextSize: "text-sm",
        backgroundPadding: "p-[20px]",
      };
    default: // Mobile
      return {
        titleIconSize: 25,
        titleTextSize: "text-base",
        contentTextSize: "text-sm",
        backgroundPadding: "p-[10px]",
      };
  }
};

const BackgroundSquare = () => {
  const deviceCondition = useDeviceDetect();
  const { titleIconSize, titleTextSize, contentTextSize, backgroundPadding } =
    getDeviceClasses(deviceCondition);

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      viewport={{ once: true }}
      className={`${backgroundPadding} font-sansKR-Light flex flex-col rounded-3xl bg-gray-50 justify-center`}
    ></motion.div>
  );
};

export default BackgroundSquare;
