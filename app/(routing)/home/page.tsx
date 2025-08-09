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
