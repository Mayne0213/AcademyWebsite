"use client";

import { useRef } from "react";

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
  const curriculumRef = useRef<HTMLDivElement>(null);
  const textbookRef = useRef<HTMLDivElement>(null);
  const testPaperRef = useRef<HTMLDivElement>(null);
  const advertisingRef = useRef<HTMLDivElement>(null);

  return (
    <main className="relative flex flex-col w-full bg-gray-50 font-MaruBuri-Regular">

      <HomePageFloatingChatButton
        sectionRefs={{
          welcomeRef,
          curriculumRef,
          textbookRef,
          testPaperRef,
          advertisingRef,
        }}
      />

      <BackgroundDot />

        {/* 얘 모바일 버전 만들어야함 */}
      <HomePageWelcome ref={welcomeRef} />

      <HomePageAnnouncement />

      <HomePageCurriculumIntroduction ref={curriculumRef} />

        {/* 얘 리팩토링 해야함 */}
      <HomePageCurriculumDetails />

      <HomePageTextbookIntroduction ref={textbookRef} />

      <HomePageTextBookDetails />

      <HomePageBookOfflineShowcase />

      {/* 이 위까지 리팩토링 완료 (swiper는 안했으니 할 것.)*/}

      <HomePageTestPaperIntroduction ref={testPaperRef} />

      <HomePageTestPaperDetails />

      <HomePageActualAdvertising ref={advertisingRef} />

      <HomePageReviews />

      <HomePageAcademyDepartments />

      <HomePageSNSLinks />
    </main>
  );
};

export default Home;
