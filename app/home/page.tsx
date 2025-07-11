"use client";

import { useRef } from "react";

// 개별 컴포넌트 import
import HomePageWelcome from "@/components/home/landingPage/homePageWelcome";
import HomePageAnnouncement from "@/components/home/landingPage/homePageAnnouncement";
import HomePageTeacherIntroductionDetails from "@/components/home/landingPage/homepageTeacherIntroductionDetails";
import HomePageCurriculumIntroduction from "@/components/home/landingPage/homePageCurriculumIntroduction";
import HomePageCurriculumDetails from "@/components/home/landingPage/homePageCurriculumDetails";
import HomePageTextbookIntroduction from "@/components/home/landingPage/homePageTextbookIntroduction";
import HomePageTextBookDetails from "@/components/home/landingPage/homePageTextBookDetails";
import HomePageBookOfflineShowcase from "@/components/home/landingPage/homePageBookOfflineShowcase";
import HomePageTestPaperIntroduction from "@/components/home/landingPage/homePageTestPaperIntroduction";
import HomePageTestPaperDetails from "@/components/home/landingPage/homePageTestPaperDetails";
import HomePageActualAdvertising from "@/components/home/landingPage/homePageActualAdvertising";
import HomePageReviews from "@/components/home/landingPage/homePageReviews";
import HomePageAcademyDepartments from "@/components/home/landingPage/homePageAcademyDepartments";
import HomePageSNSLinks from "@/components/home/landingPage/homePageSNSLinks";
import HomePageFloatingChatButton from "@/components/home/landingPage/homePageFloatingChatButton";

import BackgroundDot from "@/components/home/backgroundDot";

const Home = () => {
  const welcomeRef = useRef<HTMLDivElement>(null);
  const teacherRef = useRef<HTMLDivElement>(null);
  const textbookRef = useRef<HTMLDivElement>(null);
  const testPaperRef = useRef<HTMLDivElement>(null);
  const advertisingRef = useRef<HTMLDivElement>(null);

  return (
    <main className="relative flex flex-col w-full bg-gray-50 font-MaruBuri-Regular">
      {/* 배경에 땡떙이 */}
      <BackgroundDot />

      {/* 플로팅 네비게이션 버튼 */}
      <HomePageFloatingChatButton
        sectionRefs={{
          welcomeRef,
          teacherRef,
          textbookRef,
          testPaperRef,
          advertisingRef,
        }}
      />

      {/* 히어로 섹션 */}
      <HomePageWelcome ref={welcomeRef} />

      {/* 공지사항 섹션 */}
      <HomePageAnnouncement />

      {/* 선생님 경력 */}
      {/* <HomePageTeacherIntroductionDetails /> */}

      {/* 커리큘럼 소개 섹션 */}
      <HomePageCurriculumIntroduction ref={teacherRef} />

      {/* 커리큘럼 세부사항 섹션 */}
      <HomePageCurriculumDetails />

      {/* 현강생 전용 커리큘럼 */}
      {/* <HomePageTeacherIntroductionDetails /> */}

      {/* 교재 소개 섹션 */}
      <HomePageTextbookIntroduction ref={textbookRef} />

      {/* 온라인 교재 쇼케이스 섹션 */}
      <HomePageTextBookDetails />

      {/* 현강생 교재 쇼케이스 섹션 */}
      <HomePageBookOfflineShowcase />

      {/* 모의고사 소개 섹션 */}
      <HomePageTestPaperIntroduction ref={testPaperRef} />

      {/* 모의고사 세부사항 섹션 */}
      <HomePageTestPaperDetails />

      {/* CTA 섹션 */}
      <HomePageActualAdvertising ref={advertisingRef} />

      {/* 학생 후기 섹션 */}
      <HomePageReviews />

      {/* 학원 소개 섹션 */}
      <HomePageAcademyDepartments />

      {/* SNS 링크 섹션 */}
      <HomePageSNSLinks />
    </main>
  );
};

export default Home;
