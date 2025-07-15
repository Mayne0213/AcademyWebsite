"use client";

import { SectionUp } from "./designSystem";
import BackgroundDot from "../backgroundDot";
import Loading from "@/components/ui/loading";
import { useState } from "react";
import { forwardRef } from "react";
import Image from "next/image";

const TEXTBOOK_IMAGE_URL = "/homeCopy/homePageBoard/bnImg2.jpg";
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
  textSize: [
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

const HomePageTextbookIntroduction = forwardRef<HTMLElement>((_,ref) => (
  <SectionUp ref={ref} className={`relative ${STYLES.padding}`}>
    <BackgroundDot />
    <main className={`relative w-full max-w-7xl m-auto flex items-stretch ${STYLES.gap} ${STYLES.layoutDirection}`}>
      <TextbookTextSection />
      <TextbookImageSection />
    </main>
  </SectionUp>
));

const TextbookImageSection = () => {
  const [isLoading, setIsLoading] = useState(true);

  return (
  <figure className={`relative overflow-hidden shadow-xl max-h-[500px] ${STYLES.imageClasses}`}>
    {isLoading && (
      <Loading type="hash" size={30} color="#3B82F6" />
    )}
    <Image
      src={TEXTBOOK_IMAGE_URL}
      alt="주혜연 선생님 교재 제작 과정"
      fill
      className={`object-cover transition-opacity duration-300`}
      onLoad={() => setIsLoading(false)}
    />
  </figure>
  );
};

const TextbookTextSection = () => (
  <SectionUp className={`${STYLES.textWidth} ${STYLES.textAlign}`}>
    <section className={`h-full flex flex-col justify-center space-y-4 ${STYLES.textColor}`}>
      <h1 className={`font-MaruBuri-Bold whitespace-pre-line ${STYLES.titleSize}`}>{TITLE}</h1>
      <p className={`leading-relaxed font-MaruBuri-Light ${STYLES.textSize}`}>{DESCRIPTION}</p>
    </section>
  </SectionUp>
);


HomePageTextbookIntroduction.displayName = "HomePageTextbookIntroduction";
export default HomePageTextbookIntroduction;