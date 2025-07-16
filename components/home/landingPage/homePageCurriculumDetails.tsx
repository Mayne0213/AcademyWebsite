"use client";

import React, { useState } from "react";
import {
  BarChart3,
  Lightbulb,
  Search,
  Monitor,
  RefreshCw,
  Rocket,
  ArrowRight,
  ChevronDown,
} from "lucide-react";
import DeviceType, { useDeviceDetect } from "../deviceType";

const roadmapSteps = [
  {
    step: "기초 개념",
    title: "다정한 기초 영어",
    description: "문법과 어휘의 기초를 체계적으로 학습합니다.",
    icon: BarChart3,
    bg: "bg-[#f2d39e]",
  },
  {
    step: "기본 개념",
    title: "New 한줄독해",
    description: "문장 구조를 파악하고 독해 능력의 기본기를 쌓는 단계입니다.",
    icon: Lightbulb,
    bg: "bg-[#c1d0b3]",
  },
  {
    step: "독해 기초",
    title: "코드독해 [기본]",
    description:
      "체계적인 독해 방법론을 통해 글의 핵심을 파악하는 능력을 기릅니다.",
    icon: Search,
    bg: "bg-[#add9db]",
  },
  {
    step: "독해 기본",
    title: "코드독해 [심화]",
    description:
      "복잡한 지문도 빠르고 정확하게 분석할 수 있는 고급 독해력을 완성합니다.",
    icon: Monitor,
    bg: "bg-[#f2d39e]",
  },
  {
    step: "독해 심화",
    title: "빈칸, 순삽, 어법 2주 완성",
    description: "수능 핵심 유형을 집중 공략하여 실전 감각을 완성합니다.",
    icon: RefreshCw,
    bg: "bg-[#c1d0b3]",
  },
  {
    step: "실전 모의고사",
    title: "꽃필 날 모의고사",
    description:
      "실제 수능과 동일한 환경에서 최종 점검하고 만점을 향해 도약합니다.",
    icon: Rocket,
    bg: "bg-[#add9db]",
  },
];

const HomePageCurriculumDetails = () => {
  const deviceType = useDeviceDetect();
  const isMobile = deviceType === DeviceType.MOBILE;
  const isSmallTablet = deviceType === DeviceType.SMALLTABLET;
  const [isExpanded, setIsExpanded] = useState(false);

  const columns = isMobile ? 1 : isSmallTablet ? 2 : 3;

  // 동적 그리드 클래스 생성 방법 개선
  const getGridClass = () => {
    switch (columns) {
      case 1:
        return "grid-cols-1";
      case 2:
        return "grid-cols-2";
      case 3:
        return "grid-cols-3";
      default:
        return "grid-cols-1";
    }
  };

  const styles = {
    titleSize: isMobile ? "text-2xl" : isSmallTablet ? "text-3xl" : "text-5xl",
    descSize: isMobile ? "text-xs" : isSmallTablet ? "text-sm" : "text-base",
    iconSize: isMobile ? "w-8 h-8" : "w-10 h-10",
    textSize: isMobile ? "text-sm" : "text-base",
    cardPadding: isMobile ? "p-4 sm:p-6" : "p-8",
  };

  const handleCardClick = () => {
    if (isMobile) {
      setIsExpanded(!isExpanded);
    }
  };

  return (
    <div className="bg-gray-50 px-4 md:px-8 w-full flex justify-center py-12 md:py-20">
      <div className="w-full max-w-7xl flex flex-col items-center">
        {/* Header */}
        <section
          className="text-center mb-12"
        >
          <h1 className={`text-gray-800 font-MaruBuri-Bold mb-4 ${styles.titleSize}`}>
            기적의 만점 전략 커리큘럼
          </h1>
          <p className={`text-gray-600 max-w-2xl font-MaruBuri-SemiBold mx-auto ${styles.descSize}`}>
            체계적이고 순차적인 학습 과정을 통해 영어 실력을 단계별로
            향상시키고, 최종적으로 수능 만점을 달성할 수 있도록 설계된 완벽한
            커리큘럼입니다.
          </p>
        </section>

        {/* Mobile: 겹쳐진 카드 형태 */}
        {isMobile && (
          <div
            className={`w-full max-w-md mx-auto transition-all duration-300 ${!isExpanded ? "min-h-[240px]" : ""}`}
          >
            {/* 겹쳐진 카드: 펼쳐졌을 때도 첫 번째 카드만 항상 보임 */}
            <div className="relative z-0">
              {!isExpanded && roadmapSteps.map((step, index) => {
                const Icon = step.icon;
                const isTopCard = index === 0;
                return (
                  <div
                    key={index}
                    className={`absolute inset-0 ${!isExpanded ? 'cursor-pointer' : ''} z-0`}
                    style={{
                      zIndex: roadmapSteps.length - index,
                      transform: !isExpanded 
                        ? `translateY(${index * 2}px) scale(${1 - index * 0.02})` 
                        : 'none',
                    }}
                    onClick={isTopCard ? handleCardClick : undefined}
                  >
                    {/* 카드 내용 */}
                    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
                      {/* Header */}
                      <div className={`w-full h-12 flex items-center justify-center text-white ${step.bg} relative`}>
                        <span className="text-sm font-MaruBuri-Bold">{step.step}</span>
                        {isTopCard && !isExpanded && (
                          <div
                            className="absolute right-3"
                          >
                            <ChevronDown className="w-5 h-5 text-white" />
                          </div>
                        )}
                      </div>

                      {/* Content */}
                      <div className="p-4 flex flex-col items-center">
                        <div className="flex flex-col items-center mb-4">
                          <div className="bg-gray-100 rounded-full flex items-center justify-center w-16 h-16 mb-2">
                            <Icon className="w-8 h-8 text-gray-600" />
                          </div>
                          <div className="text-xs text-gray-500 font-medium">
                            STEP {index + 1}
                          </div>
                        </div>
                        <div className="text-center">
                          <h4 className="text-gray-800 font-MaruBuri-SemiBold mb-2 text-sm">
                            {step.title}
                          </h4>
                          <p className="text-gray-600 leading-relaxed text-sm">
                            {step.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
              {/* 펼쳐졌을 때는 첫 번째 카드만 항상 보임 */}
              {isExpanded && (
                <div
                  key="top-card"
                  className="relative z-0"
                >
                  {/* 첫 번째 카드 내용 (roadmapSteps[0]) */}
                  <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
                    {/* Header */}
                    <div className={`w-full h-12 flex items-center justify-center text-white ${roadmapSteps[0].bg}`}>
                      <span className="text-sm font-MaruBuri-Bold">{roadmapSteps[0].step}</span>
                    </div>

                    {/* Content */}
                    <div className="p-4 flex flex-col items-center">
                      <div className="flex flex-col items-center mb-4">
                        <div className="bg-gray-100 rounded-full flex items-center justify-center w-16 h-16 mb-2">
                          <BarChart3 className="w-8 h-8 text-gray-600" />
                        </div>
                        <div className="text-xs text-gray-500 font-medium">
                          STEP 1
                        </div>
                      </div>
                      <div className="text-center">
                        <h4 className="text-gray-800 font-MaruBuri-SemiBold mb-2 text-sm">
                          {roadmapSteps[0].title}
                        </h4>
                        <p className="text-gray-600 leading-relaxed text-sm">
                          {roadmapSteps[0].description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* 펼쳐진 카드: 2~6번만 보임 */}
              {isExpanded && (
                <div
                  className="mt-8 space-y-4"
                >
                  {roadmapSteps.slice(1).map((step, index) => {
                    const Icon = step.icon;
                    // 모바일에서는 화살표 없음
                    return (
                      <div
                        key={`expanded-${index + 1}`}
                        className="relative"
                      >
                        {/* 카드 내용 */}
                        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
                          {/* Header */}
                          <div className={`w-full h-12 flex items-center justify-center text-white ${step.bg}`}>
                            <span className="text-sm font-MaruBuri-Bold">{step.step}</span>
                          </div>

                          {/* Content */}
                          <div className="p-4 flex flex-col items-center">
                            <div className="flex flex-col items-center mb-4">
                              <div className="bg-gray-100 rounded-full flex items-center justify-center w-16 h-16 mb-2">
                                <Icon className="w-8 h-8 text-gray-600" />
                              </div>
                              <div className="text-xs text-gray-500 font-medium">
                                STEP {index + 2}
                              </div>
                            </div>
                            <div className="text-center">
                              <h4 className="text-gray-800 font-MaruBuri-SemiBold mb-2 text-sm">
                                {step.title}
                              </h4>
                              <p className="text-gray-600 leading-relaxed text-sm">
                                {step.description}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
          </div>
        )}

        {/* Desktop/Tablet: 기존 그리드 형태 */}
        {!isMobile && (
          <div
            className={`grid ${getGridClass()} gap-6 w-full relative`}
            style={{
              gridTemplateRows:
                columns === 2
                  ? "repeat(3, 1fr)"
                  : "repeat(2, 1fr)",
              minHeight: "600px",
            }}
          >
            {roadmapSteps.map((step, index) => {
              const Icon = step.icon;
              let arrow = null;

              if (true) {
                // SmallTablet (deviceType = 2) - 모든 화살표가 오른쪽으로
                if (columns === 2) {
                  // Step1 → Step2, Step2 → Step3, Step4 → Step5, Step5 → Step6: 모두 오른쪽 화살표
                  if (index === 0 || index === 2 || index === 3 || index === 4) {
                    arrow = (
                      <div className="absolute right-[-1.25rem] top-1/2 transform -translate-y-1/2 z-0">
                        <div className="w-8 h-8 bg-white border border-gray-300 rounded-full flex items-center justify-center shadow-sm">
                          <ArrowRight className="w-4 h-4 text-gray-500" />
                        </div>
                      </div>
                    );
                  }
                }

                // Desktop (deviceType = 3) - 모든 화살표가 오른쪽으로
                else {
                  // Step1 → Step2, Step2 → Step3, Step4 → Step5, Step5 → Step6: 모두 오른쪽 화살표
                  if (index === 0 || index === 1 || index === 3 || index === 4) {
                    arrow = (
                      <div className="absolute right-[-1.25rem] top-1/2 transform -translate-y-1/2 z-0">
                        <div className="w-8 h-8 bg-white border border-gray-300 rounded-full flex items-center justify-center shadow-sm">
                          <ArrowRight className="w-4 h-4 text-gray-500" />
                        </div>
                      </div>
                    );
                  }
                }
              }

              return (
                <div key={index} className="relative flex flex-col">
                  <section
                    className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 flex-1 flex flex-col"
                  >
                    {/* Header */}
                    <div className={`w-full h-12 flex items-center justify-center text-white ${step.bg} flex-shrink-0`}>
                      <span className="text-sm font-MaruBuri-Bold">{step.step}</span>
                    </div>

                    {/* Content */}
                    <div className={`flex flex-1 flex-col items-center ${styles.cardPadding}`}>
                      <div className="flex flex-col flex-shrink-0 items-center mb-4">
                        <div className="bg-gray-100 rounded-full flex items-center justify-center w-16 h-16 mb-2 transition-transform duration-300 hover:scale-110">
                          <Icon className={`${styles.iconSize} text-gray-600`} />
                        </div>
                        <div className="text-xs text-gray-500 font-medium">
                          STEP {index + 1}
                        </div>
                      </div>
                      <div className="text-center flex-1">
                        <h4 className={`text-gray-800 font-MaruBuri-SemiBold mb-2 ${styles.textSize}`}>
                          {step.title}
                        </h4>
                        <p className={`text-gray-600 leading-relaxed ${styles.textSize}`}>
                          {step.description}
                        </p>
                      </div>
                    </div>
                    {arrow}
                  </section>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePageCurriculumDetails;