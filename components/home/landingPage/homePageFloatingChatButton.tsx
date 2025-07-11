"use client";

import { motion } from "framer-motion";
import {
  User,
  NotepadText,
  BookOpen,
  Star,
  ArrowBigUpDash,
  Notebook,
} from "lucide-react";
import useDeviceDetect from "@/components/hooks/useMobileDetect";

type Props = {
  sectionRefs: {
    welcomeRef: React.RefObject<HTMLDivElement>;
    teacherRef: React.RefObject<HTMLDivElement>;
    textbookRef: React.RefObject<HTMLDivElement>;
    testPaperRef: React.RefObject<HTMLDivElement>;
    advertisingRef: React.RefObject<HTMLDivElement>;
  };
};

const HomePageFloatingMainButtons = ({ sectionRefs }: Props) => {
  const deviceType = useDeviceDetect();

  const getNavbarOffset = () => {
    if (deviceType === 1 || deviceType === 2) return 70;
    return 90;
  };
  const navbarOffset = getNavbarOffset();

  const buttons = [
    {
      icon: <Notebook className="w-6 h-6 transition-transform" />,
      label: "커리큘럼",
      onClick: () => {
        const offset = sectionRefs.teacherRef.current?.offsetTop;
        if (offset !== undefined) {
          window.scrollTo({ top: offset - navbarOffset, behavior: "smooth" });
        }
      },
    },
    {
      icon: <BookOpen className="w-6 h-6 transition-transform" />,
      label: "자체 교재",
      onClick: () => {
        const offset = sectionRefs.textbookRef.current?.offsetTop;
        if (offset !== undefined) {
          window.scrollTo({ top: offset - navbarOffset, behavior: "smooth" });
        }
      },
    },
    {
      icon: <NotepadText className="w-6 h-6 transition-transform" />,
      label: "모의고사",
      onClick: () => {
        const offset = sectionRefs.testPaperRef.current?.offsetTop;
        if (offset !== undefined) {
          window.scrollTo({ top: offset - navbarOffset, behavior: "smooth" });
        }
      },
    },
    {
      icon: <Star className="w-6 h-6 transition-transform" />,
      label: "후기",
      onClick: () => {
        const offset = sectionRefs.advertisingRef.current?.offsetTop;
        if (offset !== undefined) {
          window.scrollTo({ top: offset - navbarOffset, behavior: "smooth" });
        }
      },
    },
    {
      icon: <ArrowBigUpDash className="w-6 h-6 transition-transform" />,
      label: "맨 위로",
      onClick: () => {
        const offset = sectionRefs.welcomeRef.current?.offsetTop;
        if (offset !== undefined) {
          window.scrollTo({ top: offset, behavior: "smooth" });
        }
      },
    },
  ];

  return (
    <div className={`fixed right-8 bottom-8 z-50 flex flex-col items-end gap-4 ${deviceType === 0 ? "hidden" : ""}`}>
      {buttons.map((btn, i) => (
        <motion.button
          key={i}
          onClick={btn.onClick}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: i * 0.1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="group flex items-center w-14 h-14 bg-yellow-300 rounded-full transition-all duration-300 hover:w-32 px-4 shadow-md"
        >
          <div className="flex-shrink-0">{btn.icon}</div>
          <span className="ml-2 font-sansKR-Regular text-black opacity-0 max-w-0 group-hover:opacity-100 group-hover:max-w-[500px] transition-all duration-300 whitespace-nowrap overflow-hidden">
            {btn.label}
          </span>
        </motion.button>
      ))}
    </div>
  );
};

export default HomePageFloatingMainButtons;