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
import Loading from "../loading";

const Home = () => {

  return (
    <main className="relative flex flex-col w-full bg-gray-50 font-MaruBuri-Regular">

      <Loading />

      <HomePageFloatingChatButton />

      <BackgroundDot />

      <HomePageWelcome id="welcome-section"/>

      <HomePageAnnouncement />

      <HomePageCurriculumIntroduction id="curriculum-section"/>

      <HomePageCurriculumDetails /> {/* 리팩토링 필요 */}

      <HomePageTextbookIntroduction id="textbook-section"/>

      <HomePageTextBookDetails />

      <HomePageBookOfflineShowcase />

      <HomePageTestPaperIntroduction id="testpaper-section"/>

      <HomePageTestPaperDetails />

      <HomePageActualAdvertising id="advertising-section"/>

      <HomePageReviews />

      <HomePageAcademyDepartments />

      <HomePageSNSLinks /> {/* 리팩토링 필요 */}
    </main>
  );
};

export default Home;
