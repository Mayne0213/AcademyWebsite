"use client";

import Image from "next/image";
import AUDIENCE_IMAGE_URL from "@/public/homeCopy/lectures/offline/lecture1.jpg";

import { SectionUp } from "./designSystem";

const YOUTUBE_VIDEO_URL = "https://www.youtube-nocookie.com/embed/h4fybVXAZ0c?autoplay=0&rel=0";
const TITLE = `예비 고3에서 수능까지,\n 함께 달려나가겠습니다.`;
const DESCRIPTION = `단순 한 철 강의가 아닙니다. 2026년 1년을 아우르는 체계적이고 전문적인 교육 커리를 확인하실 수 있습니다. 수많은 학생을 가르친 경험과 체계적인 커리큘럼으로 학생들의 옆에서 함께 걸어 나가겠습니다.`;

const STYLES = {
  padding: [
    "py-10 px-4 bg-[#fdf1da]",
    "smalltablet:py-0 smalltablet:px-0 smalltablet:bg-black",
    "tablet:py-16 tablet:px-6 tablet:bg-[#fdf1da]",
    "desktop:py-20",
  ].join(" "),
  titleSize: [
    "text-xl",
    "smalltablet:text-2xl",
    "tablet:text-3xl",
    "desktop:text-4xl",
  ].join(" "),
  layoutDirection: [
    "flex-col",
    "tablet:flex-row",
  ].join(" "),
  gap: [
    "gap-4",
    "tablet:gap-8",
    "desktop:gap-10",
  ].join(" "),
  textSize: [
    "text-sm",
    "smalltablet:text-base smalltablet:px-[80px]",
    "tablet:text-lg tablet:px-0",
    "desktop:text-xl",
  ].join(" "),
  textWidth: [
    "w-full",
    "tablet:w-[55%]",
  ].join(" "),
  textAlign: [
    "text-center",
    "smalltablet:text-center smalltablet:flex smalltablet:justify-center smalltablet:items-center smalltablet:absolute smalltablet:inset-0",
    "tablet:text-left tablet:static tablet:block",
  ].join(" "),
  textColor: [
    "text-black",
    "smalltablet:text-white",
    "tablet:text-black",
  ].join(" "),
  videoClasses: [
    "w-full",
    "smalltablet:hidden",
    "tablet:w-[50%] tablet:block",
  ].join(" "),
  backgroundImage: [
    "hidden relative aspect-video max-h-[400px]",
    "smalltablet:block",
    "tablet:hidden",
  ].join(" "),
};

const HomePageCurriculumIntroduction = (props: React.HTMLAttributes<HTMLDivElement>) => (
    <SectionUp {...props} className={`relative tablet:scroll-mt-[70px] desktop:scroll-mt-[90px] ${STYLES.padding}`}>
      <main className={`relative w-full h-full max-w-7xl m-auto flex items-stretch ${STYLES.gap} ${STYLES.layoutDirection}`}>
        <YouTubeVideo />
        <BackgroundImage />
        <ContentText />
      </main>
    </SectionUp>
);

const YouTubeVideo = () => {

  return (
  <article className={`relative rounded-2xl overflow-hidden shadow-xl aspect-video ${STYLES.videoClasses}`}>
    <iframe
      src={YOUTUBE_VIDEO_URL}
      title="주혜연 영어 학원 커리큘럼 소개 영상"
      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      className="relative w-full h-full aspect-video"
    />
  </article>
  );
};

const BackgroundImage = () => (
  <figure className={STYLES.backgroundImage}>
    <Image
      src={AUDIENCE_IMAGE_URL}
      alt="주혜연 선생님 제주도 현장 강의"
      fill
      className="object-cover opacity-60"
      placeholder="blur"
    />
  </figure>
);

const ContentText = () => (
  <section className={`${STYLES.textAlign} ${STYLES.textWidth}`}>
    <section className={`h-full flex flex-col justify-center space-y-4 ${STYLES.textColor}`}>
      <h2 className={`font-MaruBuri-Bold whitespace-pre-line ${STYLES.titleSize}`}>
        {TITLE}
      </h2>
      <p className={`leading-relaxed font-MaruBuri-Light ${STYLES.textSize}`}>
        {DESCRIPTION}
      </p>
    </section>
  </section>
);

export default HomePageCurriculumIntroduction;