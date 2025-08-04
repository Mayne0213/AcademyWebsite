import {
  NotepadText,
  BookOpen,
  Star,
  ArrowBigUpDash,
  Notebook,
} from "lucide-react";


const BUTTON_CONFIG = [
  {
    key: "curriculum",
    icon: <Notebook className="w-6 h-6 transition-transform" />,
    label: "커리큘럼",
    sectionId: "curriculum-section",
  },
  {
    key: "textbook",
    icon: <BookOpen className="w-6 h-6 transition-transform" />,
    label: "자체 교재",
    sectionId: "textbook-section",
  },
  {
    key: "testPaper",
    icon: <NotepadText className="w-6 h-6 transition-transform" />,
    label: "모의고사",
    sectionId: "testpaper-section",
  },
  {
    key: "reviews",
    icon: <Star className="w-6 h-6 transition-transform" />,
    label: "후기",
    sectionId: "advertising-section",
  },
  {
    key: "top",
    icon: <ArrowBigUpDash className="w-6 h-6 transition-transform" />,
    label: "맨 위로",
    sectionId: "welcome-section",
  },
] as const;

const LandingPageFloatingMainButtons = () => {
  return (
    <nav className="fixed right-8 bottom-8 z-50 flex flex-col items-end gap-4">
      {BUTTON_CONFIG.map((btn, i) => (
        <a
          key={btn.key}
          href={`#${btn.sectionId}`}
          className="hidden tablet:flex group w-14 h-14 bg-yellow-300 rounded-full transition-all duration-300 hover:w-32 px-4 shadow-md items-center justify-start space-x-2"
        >
          <div className="flex-shrink-0">
            {btn.icon}
          </div>
          <span className="font-sansKR-Regular whitespace-nowrap overflow-hidden opacity-0  group-hover:opacity-100 active:scale-95 transition-all duration-200">
            {btn.label}
          </span>
        </a>
      ))}
    </nav>
  );
};

export default LandingPageFloatingMainButtons; 