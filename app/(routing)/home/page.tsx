import {
  LandingPageWelcome,
  LandingPageAnnouncement,
  LandingPageTeacherIntroductionDetails,
  LandingPageCurriculumIntroduction,
  LandingPageCurriculumDetails,
  LandingPageTextbookIntroduction,
  LandingPageTextBookDetails,
  LandingPageBookOfflineShowcase,
  LandingPageTestPaperIntroduction,
  LandingPageTestPaperDetails,
  LandingPageActualAdvertising,
  LandingPageReviews,
  LandingPageAcademyDepartments,
  LandingPageSNSLinks,
  LandingPageFloatingChatButton,
} from "@/src/widgets/landingPage/ui/index";
import BackgroundDot from "@/src/shared/ui/BackgroundDot";
import Loading from "@/src/shared/ui/Loading";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "주혜연T | 확신의 1등급",
  description: "주혜연 선생님의 현강생 전용 홈페이지. 체계적인 학습 관리와 맞춤형 교육으로 학생들의 성적 향상을 돕습니다. 입시, 수능, 내신 전문 교육.",
  keywords: ["주혜연", "주혜연 학원", "확신의 1등급", "입시", "수능", "내신", "학습 관리","이투스","1타","영어 1타","EBS","EBS영어"],
  openGraph: {
    title: "주혜연T | 확신의 1등급",
    description: "주혜연 선생님의 현강생 전용 홈페이지.",
    type: "website",
  },
};

const Home = () => {

  return (
    <main className="relative flex flex-col w-full bg-gray-50 font-MaruBuri-Regular">

      <Loading />

      <LandingPageFloatingChatButton />

      <BackgroundDot />

      <LandingPageWelcome id="welcome-section"/>

      <LandingPageAnnouncement />

      <LandingPageCurriculumIntroduction id="curriculum-section"/>

      <LandingPageCurriculumDetails /> {/* 리팩토링 필요 */}

      <LandingPageTextbookIntroduction id="textbook-section"/>

      <LandingPageTextBookDetails />

      <LandingPageBookOfflineShowcase />

      <LandingPageTestPaperIntroduction id="testpaper-section"/>

      <LandingPageTestPaperDetails />

      <LandingPageActualAdvertising id="advertising-section"/>

      <LandingPageReviews />

      <LandingPageAcademyDepartments />

      <LandingPageSNSLinks /> {/* 리팩토링 필요 */}
    </main>
  );
};

export default Home;
