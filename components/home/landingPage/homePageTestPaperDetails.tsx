"use client";

import Image from "next/image";
import React from "react";
import { SectionScale, SectionUp } from "./designSystem";
import { useState, useMemo, useCallback } from "react";
import DeviceType, { useDeviceDetect } from "@/components/home/deviceType";
import Loading from "@/components/ui/loading";

import testPaper from "@/public/homeCopy/testPapers/testPaper1Edge.webp";
import environment from "@/public/homeCopy/lectures/online/lecture1.webp";
import omr from "@/public/homeCopy/OMR/OMR.webp";
import videoLecture from "@/public/homeCopy/lectures/online/lecture1.webp";
import analysis from "@/public/homeCopy/testPapers/textAnalysis1Edge.webp";

const features = [
  {
    buttonName: "모의고사",
    title: "연구소에서 직접 제작한 모의고사",
    description:
      "전문 연구진이 직접 출제한 문항으로, 실제 출제 경향을 반영한 고난도 문제를 제공합니다. 수능 및 모의고사 데이터를 기반으로 한 세밀한 분석을 통해, 학생들이 실력을 점검하고 약점을 파악할 수 있도록 구성했습니다. 모든 문항은 학습 효과를 극대화할 수 있도록 체계적으로 검토됩니다.",
    image: testPaper,
  },
  {
    buttonName: "실전 환경",
    title: "실전 환경과 유사한 고사장 분위기 조성",
    description:
      "학생들이 최고의 집중력과 실력을 발휘할 수 있도록 실제 시험과 유사한 환경을 제공합니다. 정해진 시간, 감독관의 배치, 조용한 시험실을 통해 실제 시험과 같은 분위기를 조성합니다. 이러한 환경은 학생들이 긴장을 관리하고, 시험 체력을 기르며, 실전 감각을 익히는 데 큰 도움이 됩니다.",
    image: environment,
  },
  {
    buttonName: "OMR훈련",
    title: "시간 제한과 마킹 훈련 포함",
    description:
      "실제 시험 시간에 맞춘 제한된 환경에서 문제를 풀며, 시간 관리 능력을 자연스럽게 길러냅니다. OMR 카드 사용을 통해 마킹 실수를 줄이고, 실전에서의 정확성과 속도를 동시에 훈련할 수 있습니다. 이러한 반복 훈련은 실전 감각을 높이고, 불안 요소를 사전에 제거하는 데 효과적입니다.",
    image: omr,
  },
  {
    buttonName: "해설 강의",
    title: "시험 직후 해설 강의 및 문제지 제공",
    description:
      "시험이 끝난 직후, 전문 강사가 출제 의도와 정답 전략을 짚어주는 해설 강의를 제공합니다. 학생들은 자신의 풀이 과정을 점검하며 이해 부족 부분을 즉시 보완할 수 있습니다. 함께 제공되는 문제지와 해설 자료를 통해 복습 효과를 극대화할 수 있습니다.",
    image: videoLecture,
  },
  {
    buttonName: "개인 분석지",
    title: "개인별 오답 분석 리포트 제공",
    description:
      "학생 한 명 한 명의 정답률과 오답 유형을 정밀하게 분석한 리포트를 제공합니다. 과목별 취약 문항, 실수 패턴 등을 시각화하여 학습 방향을 구체적으로 제시합니다. 데이터 기반의 분석을 통해 효율적인 보완 학습이 가능하도록 지원합니다.",
    image: analysis
  },
];

const STYLES = {
  container: [
    "pt-8 px-4",
    "smalltablet:pt-10 smalltablet:px-6",
    "tablet:pt-12 tablet:px-6",
    "desktop:pt-24 desktop:px-6",
  ].join(" "),
  mainContent: [
    "gap-2",
    "desktop:gap-12",
  ].join(" "),
  titleSection: [
    "gap-3",
    "smalltablet:gap-4",
  ].join(" "),
  titleSize: [
    "text-2xl",
    "smalltablet:text-3xl",
    "tablet:text-4xl",
    "desktop:text-5xl",
  ].join(" "),
  subtitleSize: [
    "text-sm",
    "smalltablet:text-base",
    "tablet:text-lg",
  ].join(" "),
  buttonContainer: [
    "gap-2",
    "smalltablet:gap-3",
    "w-full",
    "smalltablet:w-auto",
  ].join(" "),
  buttonPadding: [
    "px-3 text-xs",
    "smalltablet:px-4",
    "smalltablet:text-sm",
    "tablet:px-5",
    "text-sm",
  ].join(" "),
  contentSection: [
    "flex-col",
    "smalltablet:flex-col",
    "tablet:flex-row",
    "gap-4",
    "smalltablet:gap-6",
    "tablet:gap-6",
  ].join(" "),
  textSection: [
    "space-y-3",
    "smalltablet:space-y-4",
    "text-center",
    "tablet:text-left",
    "w-full",
    "tablet:w-1/2",
  ].join(" "),
  contentTitleSize: [
    "text-lg",
    "smalltablet:text-xl",
    "tablet:text-2xl",
  ].join(" "),
  contentDescriptionSize: [
    "text-sm",
    "smalltablet:text-base",
    "tablet:text-lg",
  ].join(" "),
  imageContainerSize: [
    "w-full",
    "smalltablet:w-full",
    "tablet:w-3/4",
  ].join(" "),
};

const TestPaperHeader = React.memo(() => (
  <header className={`text-center flex flex-col mb-4 ${STYLES.titleSection}`}>
    <h2 className={`font-MaruBuri-Bold text-gray-900 ${STYLES.titleSize}`}>
      모의고사, 그 이상의 정밀함.
    </h2>
    <p className={`font-MaruBuri-SemiBold text-gray-600 ${STYLES.subtitleSize}`}>
      모의고사의 품질을 결정하는 건 결국 실행과 분석입니다.
    </p>
  </header>
));

const TestPaperTab = React.memo(({ currentTab, setCurrentTab }: {
  currentTab: number;
  setCurrentTab: (index: number) => void
}) => (
  <nav className={`flex flex-wrap items-center justify-center font-MaruBuri-SemiBold rounded-md smalltablet:rounded-full bg-gray-200 px-2 py-2 ${STYLES.buttonContainer}`}>
    {features.map((item, index) => (
      <button
        key={item.buttonName}
        className={`rounded-full py-2 transition-all duration-300 cursor-pointer hover:bg-white ${STYLES.buttonPadding} ${
          currentTab === index ? "bg-white shadow-md" : ""
        }`}
        onClick={() => setCurrentTab(index)}
      >
        {item.buttonName}
      </button>
    ))}
  </nav>
));

const TestPaperContent = React.memo(({ active }: { active: typeof features[0] }) => (
  <article className={`text-gray-600 leading-relaxed font-MaruBuri-Light ${STYLES.textSection}`}>
    <h3 className={`text-gray-900 hidden tablet:block font-MaruBuri-Bold ${STYLES.contentTitleSize}`}>
      {active.title}
    </h3>
    <p className={STYLES.contentDescriptionSize}>
      {active.description}
    </p>
  </article>
));

const TestPaperImage = React.memo(({ active }: { active: typeof features[0] }) => {
  const deviceCondition = useDeviceDetect();

  return (
    <>
      <SectionScale
        key={active.buttonName}
        className={`aspect-[16/9] overflow-hidden shadow-xl border relative transform-gpu rounded-t-2xl tablet:rounded-tl-3xl tablet:rounded-tr-none ${deviceCondition === DeviceType.TABLET ? STYLES.imageContainerSize : "w-full"}`}
        >
        <Image
          src={active.image}
          alt="모의고사 이미지"
          width={1000}
          height={450}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px"
          className="object-left-top object-cover"
          loading="lazy"
          placeholder="blur"
        />
      </SectionScale>
  </>
  );
});

TestPaperHeader.displayName = 'TestPaperHeader';
TestPaperTab.displayName = 'TestPaperTab';
TestPaperContent.displayName = 'TestPaperContent';
TestPaperImage.displayName = 'TestPaperImage';

const HomePageTestPaperDetails = () => {
  const [currentTab, setCurrentTab] = useState<number>(0);

  const active = useMemo(() => features[currentTab], [currentTab]);

  const handleTabChange = useCallback((index: number) => {
    setCurrentTab(index);
  }, []);

  return (
    <SectionUp className={`bg-white overflow-hidden ${STYLES.container}`}>
      <main className={`max-w-7xl mx-auto flex flex-col items-center justify-between relative ${STYLES.mainContent}`}>
        <TestPaperHeader />
        <TestPaperTab currentTab={currentTab} setCurrentTab={handleTabChange} />
        <section className={`flex items-center w-full max-w-2xl tablet:max-w-full ${STYLES.contentSection}`}>
          <TestPaperContent active={active} />
          <TestPaperImage active={active} />
        </section>
      </main>
    </SectionUp>
  );
};

HomePageTestPaperDetails.displayName = 'HomePageTestPaperDetails';

export default HomePageTestPaperDetails;
