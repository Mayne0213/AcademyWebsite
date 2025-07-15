"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useDeviceDetect } from "@/components/home/deviceType";
import DeviceType from "@/components/home/deviceType";
import BackgroundDot from "../backgroundDot";
import { DESIGN_SYSTEM } from "./designSystem";

import ebsBG from "@/public/homeCopy/sns/ebsBG.png";
import ebsIcon from "@/public/homeCopy/sns/ebsIcon.svg";
import etoosBG from "@/public/homeCopy/sns/etoosBG.png";
import etoosIcon from "@/public/homeCopy/sns/etoosIcon.png";
import instagramBG from "@/public/homeCopy/sns/instagramBG.png";
import instagramIcon from "@/public/homeCopy/sns/instagramIcon.png";

const snsList = [
  {
    title: "EBS",
    footer: "EBS 홈페이지",
    link: "https://www.ebsi.co.kr/ebs/lms/lmsx/retrieveSbjtDtl.ebs?courseId=S20240000877#intro",
    bg: ebsBG,
    icon: ebsIcon,
  },
  {
    title: "ETOOS",
    footer: "이투스 홈페이지",
    link: "https://www.etoos.com/teacher/main.asp?TEACHER_ID=200439",
    bg: etoosBG,
    icon: etoosIcon,
  },
  {
    title: "Instagram",
    footer: "인스타그램",
    link: "https://www.instagram.com/joossam_eng/",
    bg: instagramBG,
    icon: instagramIcon,
  },
];

const HomePageSNSLinks = () => {
  const deviceType = useDeviceDetect();
  const isMobile = deviceType === DeviceType.MOBILE;

  return (
    <section className="py-16 px-4 bg-white relative">
      <BackgroundDot />
      <h2
        className={`text-center font-MaruBuri-Bold mb-10 text-gray-800 ${deviceType && deviceType <= DeviceType.SMALLTABLET ? "text-4xl" : "text-5xl"}`}
      >
        SNS 바로가기
      </h2>

      {isMobile ? (
        <div className="flex flex-col gap-6 relative">
          {snsList.map((sns, index) => (
            <motion.a
              key={index}
              href={sns.link}
              {...DESIGN_SYSTEM.animations.fadeInUp}
              whileHover={{ scale: 1.02 }}
              transition={{
                ...DESIGN_SYSTEM.animations.fadeInUp.transition,
                delay: index * 0.1,
              }}
              className="flex items-center gap-4 p-4 rounded-xl border border-gray-200 shadow-md bg-gray-50"
            >
              <div className="w-20 h-20 relative flex-shrink-0 rounded-lg overflow-hidden">
                <Image
                  src={sns.icon}
                  alt="preview"
                  fill
                  sizes="100vw"
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col justify-between text-sm">
                <div className="text-lg font-MaruBuri-Bold text-gray-900">
                  {sns.title}
                </div>
                <div className="flex items-center gap-2 text-gray-600 mt-1">
                  {sns.footer}
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      ) : (
        <div className="flex justify-center gap-6 max-w-7xl mx-auto relative">
          {snsList.map((sns, index) => (
            <motion.a
              key={index}
              href={sns.link}
              target="_blank"
              rel="noopener noreferrer"
              {...DESIGN_SYSTEM.animations.fadeInUp}
              whileHover={{ scale: 1.03 }}
              transition={{
                ...DESIGN_SYSTEM.animations.fadeInUp.transition,
                delay: index * 0.1,
              }}
              className="bg-white border-2 rounded-2xl shadow-lg flex flex-col justify-between w-[30%]"
            >
              <div className="pt-4 text-2xl text-center font-MaruBuri-SemiBold mb-4">
                {sns.title}
              </div>
              <div className="w-full aspect-video relative">
                <Image src={sns.bg} alt="background" fill sizes="100vw" />
              </div>
              <div className="flex items-center justify-between px-6 py-4">
                <div className="flex items-center gap-2 text-sm font-MaruBuri-Light">
                  <Image src={sns.icon} alt="icon" width={20} height={20} />
                  {sns.footer}
                </div>
                <span className="text-xl">→</span>
              </div>
            </motion.a>
          ))}
        </div>
      )}
    </section>
  );
};

export default HomePageSNSLinks;
