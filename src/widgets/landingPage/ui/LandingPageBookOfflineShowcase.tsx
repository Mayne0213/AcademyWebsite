"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

import BackgroundGrayShape from "@/src/shared/ui/BackgroundGrayShelf";
import { SectionUp } from "@/src/shared/ui/designSystem";
import book7 from "@/public/homeCopy/textbooks/book7.png";
import book6 from "@/public/homeCopy/textbooks/book6.png";
import test1 from "@/public/homeCopy/testPapers/test1.png";

const BOOKS_DATA = [
  {
    src: book7,
    title: "고3 필수 현강 단어장",
    desc: "현강생 독점 자료",
    content: ["EBS 1타 강사가 직접 제작하는", "고교과정 필수 단어장"],
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
] as const;

const STYLES = {
  cardWidth: [
    "max-w-[280px] w-[90%] mb-12",
    "smalltablet:w-[280px] smalltablet:mb-12",
    "tablet:w-[280px] tablet:mb-0",
    "desktop:w-[480px] desktop:max-w-[480px]",
  ].join(" "),
  titleSize: [
    "text-4xl",
    "tablet:text-4xl",
    "desktop:text-5xl",
  ].join(" "),
  subTitleSize: [
    "text-base",
    "tablet:text-lg",
    "desktop:text-xl",
  ].join(" "),
  titleAlign: [
    "text-center",
    "tablet:text-right",
  ].join(" "),
  bookTitleSize: [
    "text-base",
    "smalltablet:text-lg",
    "tablet:text-xl",
  ].join(" "),
  bookSubTitleSize: [
    "text-base",
    "smalltablet:text-sm",
    "tablet:text-sm",
    "desktop:text-base",
  ].join(" "),
  contentSize: [
    "text-base",
    "smalltablet:text-sm",
    "tablet:text-sm",
    "desktop:text-base",
  ].join(" "),
  gap: [
    "gap-4",
    "smalltablet:gap-6",
    "tablet:gap-8",
    "desktop:gap-12",
  ].join(" "),
  sectionPadding: [
    "px-4 py-12",
    "smalltablet:px-6 smalltablet:py-12",
    "tablet:px-6 tablet:py-24",
    "desktop:px-6 desktop:py-24",
  ].join(" "),
};

const LandingPageBookOfflineShowcase = () => (
  <SectionUp className={`relative ${STYLES.sectionPadding}`}>
    <BackgroundGrayShape />
    <main className="relative mx-auto space-y-12 max-w-7xl">
      <Header />
      <BookSwiper />
      <BookCardList />
    </main>
  </SectionUp>
);

const Header = () => (
  <section className={`space-y-3 ${STYLES.titleAlign}`}>
    <h1 className={`font-MaruBuri-Light text-gray-600 ${STYLES.subTitleSize}`}>
      현강생들에게만 제공되는 특별한 교재
    </h1>
    <h2 className={`font-MaruBuri-Bold text-gray-900 ${STYLES.titleSize}`}>
      현강생 맞춤 <br className="smalltablet:hidden" />
      독점 자료
    </h2>
  </section>
);

const BookCard = ({ book }: { book: typeof BOOKS_DATA[number] }) => {
  const { src, title, desc, content } = book;

  return (
    <section className={`flex flex-col items-center bg-white rounded-2xl space-y-4 p-4 shadow-lg ${STYLES.cardWidth}`}>
      <figure className="relative w-[85%] aspect-[1/1.414]">
        <Image
          src={src}
          alt={title}
          fill
          sizes="(max-width: 600px) 100vw, (max-width: 990px) 50vw, (max-width: 1200px) 33vw, 25vw"
          placeholder="blur"
          className={`rounded-xl border border-gray-200 shadow-md object-cover transition-opacity duration-300`}
        />
      </figure>

      <header className="text-center space-y-1">
        <h1 className={`font-MaruBuri-Bold text-gray-900 ${STYLES.bookTitleSize}`}>{title}</h1>
        <p className={`text-indigo-600 font-MaruBuri-SemiBold ${STYLES.bookSubTitleSize}`}>{desc}</p>
      </header>

      <section className={`text-center text-gray-700 space-y-1 ${STYLES.contentSize}`}>
        {content.map((content, index) => (
          <p className="font-MaruBuri-Light" key={index}>
            {content}
          </p>
        ))}
      </section>
    </section>
  );
};

const BookSwiper = () => {
  return (
    <div className="block tablet:hidden">
      <Swiper
        spaceBetween={12}
        breakpoints={{ 601: { slidesPerView: 2 } }}
        pagination={{ clickable: true }}
        modules={[Pagination]}
      >
        {BOOKS_DATA.map((book, index) => (
          <SwiperSlide key={index}>
            <div className="flex justify-center">
              <BookCard key={index} book={book} />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

const BookCardList = () => (
  <main className={`w-full hidden tablet:flex justify-center ${STYLES.gap}`}>
    {BOOKS_DATA.map((book, index) => (
      <BookCard key={index} book={book} />
    ))}
  </main>
);

export default LandingPageBookOfflineShowcase; 