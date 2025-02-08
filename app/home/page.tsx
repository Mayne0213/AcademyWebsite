"use client";

import { motion } from "framer-motion";

import "swiper/swiper-bundle.css";
import { SwiperSlide, Swiper } from "swiper/react";
import { Autoplay } from "swiper/modules";

import Image from "next/image";
import logo from "@/public/title.png";

import useDeviceDetect from "@/components/hooks/useMobileDetect";

export default function Home() {
  const deviceCondition = useDeviceDetect();

  return (
    <div>
      {/* Background Image Rotation */}
      <Swiper
        modules={[Autoplay]}
        loop={true}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        className="h-screen"
      >
        <SwiperSlide>
          <Image
            src="/home/content/view/desk.jpg"
            alt="Slide 1"
            fill
            className="brightness-75 object-cover"
          />
        </SwiperSlide>
        <SwiperSlide>
          <Image
            src="/home/home.webp"
            alt="Slide 2"
            fill
            className="brightness-75 object-cover"
          />
        </SwiperSlide>
        <SwiperSlide>
          <Image
            src="/home/home.webp"
            alt="Slide 3"
            fill
            className="brightness-75 object-cover"
          />
        </SwiperSlide>
      </Swiper>

      <div className="z-[1] absolute inset-0 flex flex-col items-center justify-center">
        {/* Center Logo Image */}
        <motion.span
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Image
            priority
            src={logo}
            alt="Logo"
            width={`${deviceCondition === 0 ? 300 : 400}`}
            height={`${deviceCondition === 0 ? 150 : 200}`}
          />
        </motion.span>

        {/* Explanation below Logo */}
        <motion.span
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className={`text-white text-center px-[40px]
                        ${deviceCondition !== 0 ? "text-lg" : ""}`}
        >
          알디에스는 다양한 IT서비스를 제공하고,
          <br /> 기술과 노하우를 축적하여 보다 향상된 새로운 가치를 제공하기
          위한 회사입니다.
        </motion.span>
      </div>
    </div>
  );
}
