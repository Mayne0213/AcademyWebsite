"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import { DESIGN_SYSTEM } from "./designSystem";

import testPaper from "@/public/homeCopy/testPapers/testPaper1Edge.webp";
import environment from "@/public/homeCopy/lectures/online/lecture1.webp";
import omr from "@/public/homeCopy/omr/omr.webp";
import videoLecture from "@/public/homeCopy/lectures/online/lecture1.webp";
import analysis from "@/public/homeCopy/testPapers/textAnalysis1Edge.webp";
import DeviceType, { useDeviceDetect } from "@/components/home/deviceType";
import { SectionUp } from "./designSystem";

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
    image: analysis,
  },
];

const HomePageTestPaperDetails = () => {
  const [currentTab, setCurrentTab] = useState<number>(0);
  const active = features[currentTab];
  const deviceType = useDeviceDetect();
  
  return (
    <SectionUp className={`relative bg-white pt-24 px-6 overflow-hidden ${deviceType && deviceType === DeviceType.SMALLTABLET ? "hidden" : ""}`}>
      <div className="max-w-7xl mx-auto flex flex-col items-center justify-between gap-12 relative">
        {/* title */}
        <div
          className="text-center gap-4 flex flex-col mb-4"
        >
          <div className="text-5xl font-MaruBuri-Bold text-gray-900"> 
            모의고사, 그 이상의 정밀함.
          </div>
          <div className="font-MaruBuri-SemiBold text-gray-600">
            모의고사의 품질을 결정하는 건 결국 실행과 분석입니다.
          </div>
        </div>

        {/* buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 font-MaruBuri-SemiBold rounded-full bg-gray-200 px-2 py-2">
          {features.map((item, index) => (
            <div
              key={index}
              className={`rounded-full px-5 py-2 transition-all duration-300 cursor-pointer hover:bg-white ${
                currentTab === index ? "bg-white shadow-md" : ""
              }`}
              onClick={() => setCurrentTab(index)}
            >
              {item.buttonName}
            </div>
          ))}
        </div>

        {/* content */}
        <div className="flex items-center gap-6 w-full">
          <div className="space-y-4 text-left w-1/2">
            <h3
              className="text-2xl text-gray-900 font-MaruBuri-Bold"
            >
              {active.title}
            </h3>
            <p
              className="text-gray-600 leading-relaxed text-lg font-MaruBuri-Light"
            >
              {active.description}
            </p>
          </div>

          <motion.div
            key={active.image.src}
            {...DESIGN_SYSTEM.animations.scaleIn}
            transition={{ duration: 0.4 }}
            className="w-3/4 aspect-[16/9] rounded-tl-3xl overflow-hidden shadow-xl border relative"
          >
            <Image
              src={active.image}
              alt="모의고사 이미지"
              fill
              sizes="100vw"
              className="object-left-top object-cover"
            />
          </motion.div>
        </div>
      </div>
    </SectionUp>
  );
};

export default HomePageTestPaperDetails;
