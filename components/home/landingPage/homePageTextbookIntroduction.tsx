"use client";

import { SectionUp } from "./designSystem";
import Image from "next/image";

import TEXTBOOK_IMAGE_URL from "@/public/homeCopy/homePageBoard/bnImg2.jpg";

const TITLE = `혜연쌤의 영혼을 탈탈 털어넣은\n1등급 노하우의 집약체.`;
const DESCRIPTION = `EBS 1타 강사로 10년 넘게 활약한 주혜연 선생님의 노하우가 가득 담긴 교재로, 교재 개발 경험까지 더해 출제자의 핵심을 정확히 짚어내는 문제로 엄선합니다. 최고의 연구진과 함께 꾸준히 업데이트되며, 시험장에서도 든든한 친구가 되어줄 학습 파트너입니다.`;

const STYLES = {
  layoutDirection: [
    "flex-col",
    "tablet:flex-row",
  ].join(" "),
  textWidth: [
    "w-full",
    "tablet:w-[55%]",
  ].join(" "),
  textAlign: [
    "text-center",
    "smalltablet:absolute smalltablet:inset-0 smalltablet:text-center smalltablet:z-10",
    "tablet:text-left tablet:static tablet:block",
  ].join(" "),
  textColor: [
    "text-black",
    "smalltablet:text-white",
    "tablet:text-black",
  ].join(" "),
  padding: [
    "py-10 px-4 bg-[#e3e9e0]",
    "smalltablet:py-0 smalltablet:px-0 smalltablet:bg-black",
    "tablet:py-16 tablet:px-6 tablet:bg-[#e3e9e0]",
    "desktop:py-20",
  ].join(" "),
  titleSize: [
    "text-xl",
    "smalltablet:text-2xl",
    "tablet:text-3xl",
    "desktop:text-4xl",
  ].join(" "),
  descriptionSize: [
    "text-sm",
    "smalltablet:text-base smalltablet:px-[80px]",
    "tablet:text-lg tablet:px-0",
    "desktop:text-xl",
  ].join(" "),
  gap: [
    "gap-4",
    "tablet:gap-8",
    "desktop:gap-10",
  ].join(" "),
  imageClasses: [
    "w-full rounded-2xl aspect-video",
    "smalltablet:opacity-60 smalltablet:max-h-[300px] smalltablet:rounded-none",
    "tablet:opacity-100 tablet:w-[50%] tablet:rounded-2xl",
  ].join(" "),
};

const HomePageTextbookIntroduction = (props: React.HTMLAttributes<HTMLDivElement>) => (
  <SectionUp {...props} className={`relative tablet:scroll-mt-[70px] desktop:scroll-mt-[90px] ${STYLES.padding}`}>
    <main className={`relative w-full max-w-7xl m-auto flex items-stretch ${STYLES.gap} ${STYLES.layoutDirection}`}>
      <TextbookTextSection />
      <TextbookImageSection />
    </main>
  </SectionUp>
);

const TextbookImageSection = () => (
  <figure className={`relative overflow-hidden shadow-xl max-h-[500px] ${STYLES.imageClasses}`}>
    <Image
      src={TEXTBOOK_IMAGE_URL}
      alt="주혜연 선생님 교재 제작 과정"
      fill
      placeholder="blur"
      className="object-cover"
      sizes="(max-width: 600px) 100vw, (max-width: 990px) 50vw, (max-width: 1200px) 33vw, 25vw"
    />
  </figure>
);

const TextbookTextSection = () => (
  <section className={`${STYLES.textWidth} ${STYLES.textAlign}`}>
    <section className={`h-full flex flex-col justify-center space-y-4 ${STYLES.textColor}`}>
      <h1 className={`font-MaruBuri-Bold whitespace-pre-line ${STYLES.titleSize}`}>{TITLE}</h1>
      <p className={`leading-relaxed font-MaruBuri-Light ${STYLES.descriptionSize}`}>{DESCRIPTION}</p>
    </section>
  </section>
);

export default HomePageTextbookIntroduction;