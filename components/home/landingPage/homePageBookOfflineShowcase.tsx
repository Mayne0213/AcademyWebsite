"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

import test1 from "@/public/homeCopy/testPapers/test1.png";
import book6 from "@/public/homeCopy/textbooks/book6.png";
import book7 from "@/public/homeCopy/textbooks/book7.png";
import BackgroundGrayShape from "../backgroundGrayShelf";
import useDeviceDetect from "@/components/hooks/useMobileDetect";
import DeviceType from "@/components/home/deviceType";
import { DESIGN_SYSTEM } from "./designSystem";

const books = [
  {
    src: book7,
    title: "고3 필수 현강 단어장",
    desc: "현강생 독점 자료",
    content: ["EBS 1타 강사가 직접 제작하는", "수능특강 연계 모의고사"],
  },
  {
    src: book6,
    title: "개인 맞춤 내신 교재",
    desc: "현강생 독점 자료",
    content: ["개인의 수준과 학교에 맞춘", "맞춤형 내신 대비 교재"],
  },
  {
    src: test1,
    title: "주혜연 시즌 모의고사",
    desc: "현강생 독점 자료",
    content: [
      "EBS 1타 강사가 직접 제작하는",
      "수능특강 연계 모의고사",
      "실전 대비 완벽 구성",
    ],
  },
];

const getDeviceClasses = (deviceType: DeviceType | null) => {
  if (deviceType === null) {
    return {
      cardWidth: "",
      titleSize: "",
      subTitleSize: "",
      bookTitleSize: "",
      bookSubTitleSize: "",
      contentSize: "",
      gap: "",
      flexWrap: "",
      sectionPadding: "px- py-",
    };
  }

  return {
    [DeviceType.Desktop]: {
      cardWidth: "w-[340px]",
      titleSize: "text-5xl",
      subTitleSize: "text-xl",
      titleAlign: "text-right",
      bookTitleSize: "text-xl",
      bookSubTitleSize: "text-base",
      contentSize: "text-base",
      gap: "gap-12",
      flexWrap: "flex-nowrap",
      sectionPadding: "px-6 py-24",
    },
    [DeviceType.Tablet]: {
      cardWidth: "w-[280px]",
      titleSize: "text-4xl",
      subTitleSize: "text-lg",
      titleAlign: "text-right",
      bookTitleSize: "text-xl",
      bookSubTitleSize: "text-sm",
      contentSize: "text-sm",
      gap: "gap-8",
      flexWrap: "flex-wrap",
      sectionPadding: "px-6 py-24",
    },
    [DeviceType.SmallTablet]: {
      cardWidth: "w-[280px] mb-12",
      titleSize: "text-4xl",
      subTitleSize: "text-base",
      titleAlign: "text-center",
      bookTitleSize: "text-lg",
      bookSubTitleSize: "text-sm",
      contentSize: "text-sm",
      gap: "gap-6",
      flexWrap: "flex-wrap",
      sectionPadding: "px-6 py-12",
    },
    [DeviceType.Mobile]: {
      cardWidth: "w-[90%] mb-12",
      titleSize: "text-4xl",
      subTitleSize: "text-base",
      titleAlign: "text-center",
      bookTitleSize: "text-base",
      bookSubTitleSize: "text-base",
      contentSize: "text-base",
      gap: "gap-4",
      flexWrap: "flex-col",
      sectionPadding: "px-4 py-12",
    },
  }[deviceType];
};

const BookCard = ({
  src,
  title,
  desc,
  contents,
  deviceType,
}: {
  src: any;
  title: string;
  desc: string;
  contents: string[];
  deviceType: DeviceType | null;
}) => {
  const { cardWidth, bookTitleSize, bookSubTitleSize, contentSize } =
    getDeviceClasses(deviceType);

  return (
    <motion.div
      {...DESIGN_SYSTEM.animations.fadeInUp}
      className={`flex flex-col items-center bg-white rounded-2xl space-y-4 p-4 shadow-lg ${cardWidth}`}
    >
      {/* Book Cover */}
      <div className="relative w-[85%] aspect-[1/1.414]">
        <Image
          src={src}
          alt={title}
          fill
          sizes="100vw"
          className="rounded-xl border border-gray-200 shadow-md object-cover"
        />
      </div>

      {/* BookTitle and Description */}
      <div className="text-center space-y-1">
        <h4 className={`font-MaruBuri-Bold text-gray-900 ${bookTitleSize}`}>
          {title}
        </h4>
        <p className={`text-indigo-600 font-MaruBuri-SemiBold ${bookSubTitleSize}`}>{desc}</p>
      </div>

      {/* Book Contents */}
      <div className={`text-center text-gray-700 space-y-1 ${contentSize}`}>
        {contents.map((content, index) => (
          <p className="font-MaruBuri-Light" key={index}>
            {content}
          </p>
        ))}
      </div>
    </motion.div>
  );
};

const HomePageBookOfflineShowcase = () => {
  const deviceType = useDeviceDetect();
  const { titleSize, subTitleSize, titleAlign, gap, flexWrap, sectionPadding } =
    getDeviceClasses(deviceType);

  return (
    <motion.section
      {...DESIGN_SYSTEM.animations.fadeInUp}
      className={`relative ${sectionPadding}`}
    >
      <BackgroundGrayShape />

      <div className="relative mx-auto space-y-12 max-w-7xl">
        {/* Title */}
        <motion.div
          {...DESIGN_SYSTEM.animations.fadeInUp}
          className={`space-y-3 ${titleAlign}`}
        >
          <h2 className={`font-MaruBuri-Light text-gray-600 ${subTitleSize}`}>
            현강생들에게만 제공되는 특별한 교재
          </h2>
          <h3 className={`font-MaruBuri-Bold text-gray-900 ${titleSize}`}>
            현강생 맞춤 <br className={`${deviceType === 0 ? "" : "hidden"}`} />
            독점 자료
          </h3>
        </motion.div>

        {/* Book Cards (Swiper or Flex) */}
        {deviceType <= 1 ? (
          <div className="flex">
            <Swiper
              slidesPerView={deviceType === 0 ? 1 : 2}
              spaceBetween={12}
              loop={true}
              pagination={{ clickable: true }}
              modules={[Pagination]}
            >
              {books.map((book, index) => (
                <SwiperSlide key={index}>
                  <div className="flex justify-center">
                    <BookCard
                      src={book.src}
                      title={book.title}
                      desc={book.desc}
                      contents={book.content}
                      deviceType={deviceType}
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        ) : (
          // Tablet Or Desktop
          <div className={`w-full flex justify-center ${gap} ${flexWrap}`}>
            {books.map((book, index) => (
              <BookCard
                key={index}
                src={book.src}
                title={book.title}
                desc={book.desc}
                contents={book.content}
                deviceType={deviceType}
              />
            ))}
          </div>
        )}
      </div>
    </motion.section>
  );
};

export default HomePageBookOfflineShowcase;
