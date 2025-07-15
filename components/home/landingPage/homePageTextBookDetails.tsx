"use client";

import "swiper/css";
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";

import BackgroundGrayShape from "../backgroundGrayShelf";
import { SectionUp } from "./designSystem";
import Loading from "@/components/ui/loading";

import Image from "next/image";
import { useState } from "react";

const BOOK_IMAGE_URL_1 = "/homeCopy/textbooks/book1.jpg";
const BOOK_IMAGE_URL_2 = "/homeCopy/textbooks/book2.jpg";
const BOOK_IMAGE_URL_3 = "/homeCopy/textbooks/book3.jpg";
const BOOK_IMAGE_URL_4 = "/homeCopy/textbooks/book4.jpg";
const BOOK_IMAGE_URL_5 = "/homeCopy/textbooks/book5.jpg";

const bookList = [BOOK_IMAGE_URL_1, BOOK_IMAGE_URL_2, BOOK_IMAGE_URL_3, BOOK_IMAGE_URL_4, BOOK_IMAGE_URL_5];

const STYLES = {
  textBookPadding: [
    "px-2",
    "smalltablet:px-4",
    "tablet:px-0",
  ].join(" "),
  titleSize: [
    "text-4xl",
    "desktop:text-5xl",
  ].join(" "),
  titleAlign: [
    "text-center",
    "smalltablet:text-center",
    "tablet:text-left",
  ].join(" "),
  subTitleSize: [
    "text-xs",
    "smalltablet:text-base",
    "tablet:text-xl",
  ].join(" "),
  sectionPadding: [
    "px-4 py-12",
    "smalltablet:px-0 smalltablet:py-8",
    "tablet:px-6 tablet:py-24 tablet:bg-transparent",
  ].join(" "),
};

const Header = () => (
  <SectionUp className={`space-y-2 ${STYLES.titleAlign}`}>
    <h1 className={`font-MaruBuri-Light text-gray-600 ${STYLES.subTitleSize}`}>
      선생님과 직원들의 노하우로 만들어진,
    </h1>
    <h2 className={`font-MaruBuri-Bold text-gray-900 ${STYLES.titleSize}`}>
      꽃필날 연구소 <br className="smalltablet:hidden" /> 자체 교재
    </h2>
  </SectionUp>
);

const BookSwiper = () => (
  <article className="max-w-7xl mx-auto px-[5vw] desktop:px-0">
    <Swiper
      modules={[Autoplay, Navigation]}
      spaceBetween={10}
      slidesPerView={2}
      breakpoints={{
        601: { slidesPerView: 3 },
        991: { slidesPerView: 3 },
        1201: { slidesPerView: 4 },
      }}
      loop={true}
      navigation={false}
      autoplay={{
        delay: 1800,
        disableOnInteraction: false,
      }}
    >
      {bookList.map((book, index) => (
        <SwiperSlide key={index}>
          <BookCard book={book} />
        </SwiperSlide>
      ))}
    </Swiper>
  </article>
);

const BookCard = ({ book }: { book: string }) => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <figure className={`relative aspect-[1/1.4] border border-gray-200 rounded-lg overflow-hidden ${STYLES.textBookPadding}`}>
      {isLoading && (
        <Loading type="hash" size={30} color="#3B82F6" />
      )}
      <Image
        src={book}
        alt="주혜연 연구소 제작 교재"
        fill
        sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
        className={`object-cover transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
        onLoad={() => setIsLoading(false)}
      />
    </figure>
  );
};

const HomePageTextBookDetails = () => (
  <SectionUp className={`relative ${STYLES.sectionPadding}`}>
    <BackgroundGrayShape />
    <main className="relative max-w-7xl mx-auto space-y-8">
      <Header />
      <BookSwiper />
    </main>
  </SectionUp>
);

export default HomePageTextBookDetails;
