"use client";

import Image from "next/image";
import { SectionUp } from "./designSystem";
import type { HTMLAttributes } from "react";
import TEST_PAPER_IMAGE_URL from "@/public/homeCopy/homePageBoard/bnImg2.jpg";
import GRAPH_IMAGE_URL from "@/public/homeCopy/testPapers/graph.png";

const STYLES = {
  padding: [
    "py-12 px-4",
    "smalltablet:py-16 smalltablet:px-4",
    "tablet:py-20 tablet:px-6",
    "desktop:py-24 desktop:px-6",
  ].join(" "),
  layoutDirection: [
    "flex-col",
    "smalltablet:flex-row",
    "tablet:flex-row",
  ].join(" "),
  textWidth: [
    "w-full",
    "smalltablet:w-full",
    "tablet:flex-1",
  ].join(" "),
  chartWidth: [
    "w-full",
    "smalltablet:w-full",
    "tablet:flex-1",
  ].join(" "),
  chartHeight: [
    "h-60",
    "tablet:h-80",
    "desktop:h-96",
  ].join(" "),
  titleSize: [
    "text-2xl leading-tight",
    "smalltablet:text-3xl smalltablet:leading-tight",
    "tablet:text-4xl tablet:leading-tight",
    "desktop:text-5xl desktop:leading-tight",
  ].join(" "),
  descSize: [
    "text-sm leading-relaxed",
    "smalltablet:text-base smalltablet:leading-relaxed",
    "tablet:text-lg tablet:leading-relaxed",
    "desktop:text-xl desktop:leading-relaxed",
  ].join(" "),
  chartContainer: [
    "min-w-[300px] min-h-[200px] max-w-md",
    "tablet:max-w-full",
  ].join(" "),
  textAlign: [
    "text-center flex flex-col",
    "tablet:text-left tablet:items-start",
  ].join(" "),
  textSpacing: [
    "flex space-y-3",
    "smalltablet:space-y-4",
    "tablet:space-y-5",
    "desktop:space-y-6",
  ].join(" "),
  imageClasses: [
    "hidden",
    "smalltablet:block smalltablet:absolute smalltablet:inset-0 smalltablet:z-0 smalltablet:w-full smalltablet:h-full smalltablet:opacity-60",
    "tablet:hidden",
  ].join(" "),
};

const TestPaperIntroduction = (props: React.HTMLAttributes<HTMLDivElement>) => (
    <SectionUp {...props} className={`relative tablet:scroll-mt-[70px] desktop:scroll-mt-[90px] bg-[#deeff0] smalltablet:bg-black tablet:bg-[#deeff0] text-black ${STYLES.padding}`}>
      <section className={`w-full max-w-7xl mx-auto flex items-center gap-6 ${STYLES.layoutDirection}`}>
        <TestPaperText />
        <TestPaperChart />
        <TestPaperImageSection />
      </section>
    </SectionUp>
);

const TestPaperText = () => (
  <section className={`z-10 smalltablet:text-white tablet:text-black ${STYLES.textSpacing} ${STYLES.textAlign} ${STYLES.textWidth}`}>
      <h2 className={`font-MaruBuri-Bold flex-1 ${STYLES.titleSize}`}>
        연습도 실전처럼.{" "}
        <br className="hidden smalltablet:block" />
        주혜연 실전 모의고사
      </h2>
      <p className={`font-MaruBuri-Light ${STYLES.descSize}`}>
        실전 분위기 속 모의고사 시행 후, 틀린 문항 수, 총점, 점수 변화를{" "}
        <br className="hidden smalltablet:block" />
        한 눈에 확인할 수 있는 그래프로 제공해드립니다.
      </p>
  </section>
);

const TestPaperChart = () => (
    <section
      className={`bg-white rounded-xl shadow-2xl smalltablet:hidden tablet:block flex items-center justify-center p-4 ${STYLES.chartWidth} ${STYLES.chartHeight} ${STYLES.chartContainer} `}
    >
      <Image
        src={GRAPH_IMAGE_URL}
        alt="주혜연 실전 모의고사 그래프"
        width={480}
        height={240}
        className="object-contain w-full h-full"
        placeholder="blur"
      />
    </section>
);

const TestPaperImageSection = () => (
  <figure className={`overflow-hidden ${STYLES.imageClasses}`}>
    <Image
      src={TEST_PAPER_IMAGE_URL}
      alt="주혜연 선생님 교재 제작 과정"
      fill
      placeholder="blur"
      className="object-cover w-full h-full"
    />
  </figure>
);

export default TestPaperIntroduction;