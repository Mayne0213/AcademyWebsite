"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

import book1 from "@/public/homeCopy/textbooks/book1.jpg";
import book2 from "@/public/homeCopy/textbooks/book2.jpg";
import book3 from "@/public/homeCopy/textbooks/book3.jpg";
import book4 from "@/public/homeCopy/textbooks/book4.jpg";
import book5 from "@/public/homeCopy/textbooks/book5.jpg";

import BackgroundGrayShape from "../backgroundGrayShelf";

import Image from "next/image";
import { motion } from "framer-motion";

import DeviceType from "@/components/home/deviceType";
import useDeviceDetect from "@/components/hooks/useMobileDetect";
import { DESIGN_SYSTEM } from "./designSystem";

const bookList = [book1, book2, book3, book4, book5];

const getDeviceClasses = (deviceType: DeviceType | null) => {
  if (deviceType === null) {
    return {
      slidesPerView: 0,
      spaceBetween: 0,
      paddingX: "",
      textBookPadding: "",
      titleSize: "",
      titleAlign: "",
    };
  }
  return {
    [DeviceType.Desktop]: {
      slidesPerView: 4,
      spaceBetween: 30,
      textBookPadding: "px-0",
      titleSize: "text-5xl",
      titleAlign: "text-left",
      subTitleSize: "text-xl",
      sectionPadding: "px-6 py-24",
    },
    [DeviceType.Tablet]: {
      slidesPerView: 3,
      spaceBetween: 20,
      textBookPadding: "px-4",
      titleSize: "text-4xl",
      titleAlign: "text-left",
      subTitleSize: "text-lg",
      sectionPadding: "px-6 py-24",
    },
    [DeviceType.SmallTablet]: {
      slidesPerView: 3,
      spaceBetween: 15,
      textBookPadding: "px-2",
      titleSize: "text-4xl",
      titleAlign: "text-center",
      subTitleSize: "text-base",
      sectionPadding: "px-6 py-12",
    },
    [DeviceType.Mobile]: {
      slidesPerView: 2,
      spaceBetween: 10,
      textBookPadding: "px-4",
      titleSize: "text-4xl",
      titleAlign: "text-center",
      subTitleSize: "text-xs",
      sectionPadding: "px-4 py-12",
    },
  }[deviceType];
};

const HomePageTextBookDetails = () => {
  const deviceType = useDeviceDetect();
  const {
    slidesPerView,
    spaceBetween,
    textBookPadding,
    titleSize,
    titleAlign,
    subTitleSize,
    sectionPadding,
  } = getDeviceClasses(deviceType);

  return (
    <motion.section
      {...DESIGN_SYSTEM.animations.fadeInUp}
      className={`relative ${sectionPadding}`}
    >
      <BackgroundGrayShape />

      <div className="relative m-auto space-y-12 max-w-7xl">
        {/* 기존 내용 */}
        <motion.div
          {...DESIGN_SYSTEM.animations.fadeInUp}
          className={`space-y-2 ${titleAlign}`}
        >
          <h2 className={`font-MaruBuri-Light text-gray-600 ${subTitleSize}`}>
            선생님과 연구소 직원들의 노하우로 만들어진,{" "}
            <span className={` ${deviceType === 0 ? "hidden" : ""}`}>
              그리고 만들어지는
            </span>
          </h2>
          <h3 className={`font-MaruBuri-Bold text-gray-900 ${titleSize}`}>
            주혜연 연구소{" "}
            <br className={`${deviceType === 0 ? "" : "hidden"}`} /> 자체 교재
          </h3>
        </motion.div>

        <Swiper
          modules={[Autoplay, Navigation]}
          spaceBetween={spaceBetween}
          slidesPerView={slidesPerView}
          loop={true}
          autoplay={{
            delay: 1800,
            disableOnInteraction: false,
          }}
          navigation={false}
          className="max-w-7xl mx-auto"
        >
          {bookList.map((book, index) => (
            <SwiperSlide key={index}>
              <motion.div
                {...DESIGN_SYSTEM.animations.scaleIn}
                className={`relative flex items-center justify-center aspect-[1/1.414] shadow-md rounded-3xl overflow-hidden ${textBookPadding}`}
              >
                <Image
                  src={book}
                  alt="교재"
                  fill
                  sizes="100vw"
                  className="object-cover"
                />
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </motion.section>
  );
};

export default HomePageTextBookDetails;
