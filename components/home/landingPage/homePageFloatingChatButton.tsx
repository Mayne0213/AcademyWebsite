"use client";

import { motion } from "framer-motion";
import {
  NotepadText,
  BookOpen,
  Star,
  ArrowBigUpDash,
  Notebook,
} from "lucide-react";
import DeviceType, { useDeviceDetect } from "@/components/home/deviceType";

type SectionRefs = {
  welcomeRef: React.RefObject<HTMLDivElement>;
  curriculumRef: React.RefObject<HTMLDivElement>;
  textbookRef: React.RefObject<HTMLDivElement>;
  testPaperRef: React.RefObject<HTMLDivElement>;
  advertisingRef: React.RefObject<HTMLDivElement>;
};

type Props = {
  sectionRefs: SectionRefs;
};

const NAVBAR_OFFSETS = {
  [DeviceType.SMALLTABLET]: 70,
  [DeviceType.TABLET]: 70,
  [DeviceType.DESKTOP]: 90,
  [DeviceType.MOBILE]: 0, // hidden in Mobile
} as const;

const BUTTON_CONFIG = [
  {
    key: "curriculum",
    icon: <Notebook className="w-6 h-6 transition-transform" />,
    label: "커리큘럼",
    sectionKey: "curriculumRef" as keyof SectionRefs,
    useNavbarOffset: true,
  },
  {
    key: "textbook",
    icon: <BookOpen className="w-6 h-6 transition-transform" />,
    label: "자체 교재",
    sectionKey: "textbookRef" as keyof SectionRefs,
    useNavbarOffset: true,
  },
  {
    key: "testPaper",
    icon: <NotepadText className="w-6 h-6 transition-transform" />,
    label: "모의고사",
    sectionKey: "testPaperRef" as keyof SectionRefs,
    useNavbarOffset: true,
  },
  {
    key: "reviews",
    icon: <Star className="w-6 h-6 transition-transform" />,
    label: "후기",
    sectionKey: "advertisingRef" as keyof SectionRefs,
    useNavbarOffset: true,
  },
  {
    key: "top",
    icon: <ArrowBigUpDash className="w-6 h-6 transition-transform" />,
    label: "맨 위로",
    sectionKey: "welcomeRef" as keyof SectionRefs,
    useNavbarOffset: false,
  },
] as const;

const HomePageFloatingMainButtons = ({ sectionRefs }: Props) => {
  const deviceType = useDeviceDetect();

  if (!deviceType || deviceType === DeviceType.MOBILE) {
    return null;
  }

  const navbarOffset = NAVBAR_OFFSETS[deviceType];

  const handleScrollToSection = (sectionKey: keyof SectionRefs, useNavbarOffset: boolean) => {
    const sectionRef = sectionRefs[sectionKey];
    const offset = sectionRef.current?.offsetTop;

    if (offset !== undefined) {
      const scrollTop = useNavbarOffset ? offset - navbarOffset : offset;
      window.scrollTo({ top: scrollTop, behavior: "smooth" });
    }
  };

  return (
    <div
      className="fixed right-8 bottom-8 z-50 flex flex-col items-end gap-4"
      role="navigation"
      aria-label="페이지 섹션 네비게이션"
    >
      {BUTTON_CONFIG.map((btn, i) => (
        <motion.button
          key={btn.key}
          onClick={() => handleScrollToSection(btn.sectionKey, btn.useNavbarOffset)}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: i * 0.1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="group flex items-center w-14 h-14 bg-yellow-300 rounded-full transition-all duration-300 hover:w-32 px-4 shadow-md"
          aria-label={`${btn.label} 섹션으로 이동`}
          title={btn.label}
        >
          <div className="flex-shrink-0" aria-hidden="true">
            {btn.icon}
          </div>
          <span className="ml-2 font-sansKR-Regular text-black opacity-0 max-w-0 group-hover:opacity-100 group-hover:max-w-[500px] transition-all duration-300 whitespace-nowrap overflow-hidden">
            {btn.label}
          </span>
        </motion.button>
      ))}
    </div>
  );
};

export default HomePageFloatingMainButtons;