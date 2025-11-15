"use client";

import Image from "next/image";
import { SectionUp } from "@/src/shared/ui/designSystem";
import BackgroundGrayShape from "@/src/shared/ui/BackgroundGrayShelf";

import ebsBG from "@/public/homeCopy/sns/ebsBG.png";
import ebsIcon from "@/public/homeCopy/sns/ebsIcon.svg";
import etoosBG from "@/public/homeCopy/sns/etoosBG.png";
import etoosIcon from "@/public/homeCopy/sns/etoosIcon.png";
import youtubeBG from "@/public/homeCopy/sns/youtubeBG.jpg";
import youtubeIcon from "@/public/homeCopy/sns/youtubeIcon.png";
import instagramBG from "@/public/homeCopy/sns/instagramBG.png";
import instagramIcon from "@/public/homeCopy/sns/instagramIcon.png";

const TITLE = "함께해요";
const SUBTITLE = "주혜연 선생님과 더 가까워지는 공간";

const SNS_LIST = [
  {
    id: "ebs",
    title: "EBS",
    description: "EBS 온라인 강의",
    link: "https://www.ebsi.co.kr/ebs/lms/lmsx/retrieveSbjtDtl.ebs?courseId=S20240000877#intro",
    bg: ebsBG,
    icon: ebsIcon,
    color: "from-blue-500 to-blue-600",
    textColor: "text-blue-600",
    bgColor: "bg-blue-50",
  },
  {
    id: "etoos",
    title: "ETOOS",
    description: "이투스 온라인 강의",
    link: "https://www.etoos.com/teacher/main.asp?TEACHER_ID=200439",
    bg: etoosBG,
    icon: etoosIcon,
    color: "from-purple-500 to-purple-600",
    textColor: "text-purple-600",
    bgColor: "bg-purple-50",
  },
  {
    id: "youtube",
    title: "YouTube",
    description: "영어 학습 영상",
    link: "https://www.youtube.com/@jooT_eng",
    bg: youtubeBG,
    icon: youtubeIcon,
    color: "from-red-500 to-red-600",
    textColor: "text-red-600",
    bgColor: "bg-red-50",
  },
  {
    id: "instagram",
    title: "Instagram",
    description: "일상과 학습 팁 공유",
    link: "https://www.instagram.com/joossam_eng/",
    bg: instagramBG,
    icon: instagramIcon,
    color: "from-pink-500 to-rose-500",
    textColor: "text-pink-600",
    bgColor: "bg-pink-50",
  },
];

const STYLES = {
  titleSize: [
    "text-3xl",
    "smalltablet:text-4xl",
    "tablet:text-5xl",
  ].join(" "),
  subtitleSize: [
    "text-sm",
    "smalltablet:text-base",
    "tablet:text-lg",
  ].join(" "),
  padding: [
    "py-16 px-4",
    "smalltablet:py-20 smalltablet:px-6",
    "tablet:py-24 tablet:px-8",
  ].join(" "),
  grid: [
    "grid grid-cols-1 gap-6",
    "smalltablet:grid-cols-2 smalltablet:gap-6",
    "tablet:grid-cols-4 tablet:gap-6",
  ].join(" "),
  card: [
    "group relative overflow-hidden rounded-2xl bg-white border-2 border-gray-100 shadow-sm",
    "transition-all duration-300",
    "hover:shadow-lg hover:border-gray-200 hover:-translate-y-2",
  ].join(" "),
};

const LandingPageSNSLinks = () => {
  return (
    <SectionUp className={`bg-white relative ${STYLES.padding}`}>
      <BackgroundGrayShape />
      <main className="max-w-7xl mx-auto">
        <Header />
        <SNSGrid />
      </main>
    </SectionUp>
  );
};

const Header = () => (
  <header className="text-center mb-12 tablet:mb-16">
    <h1 className={`font-MaruBuri-Bold text-gray-900 mb-3 ${STYLES.titleSize}`}>
      {TITLE}
    </h1>
    <p className={`font-MaruBuri-Light text-gray-600 ${STYLES.subtitleSize}`}>
      {SUBTITLE}
    </p>
  </header>
);

const SNSGrid = () => (
  <div className={STYLES.grid}>
    {SNS_LIST.map((sns) => (
      <SNSCard key={sns.id} sns={sns} />
    ))}
  </div>
);

const SNSCard = ({ sns }: { sns: typeof SNS_LIST[number] }) => {
  return (
    <a
      href={sns.link}
      className={STYLES.card}
    >

      {/* 카드 상단 - 배경 영역 */}
      <div className={`relative h-40 ${sns.bgColor} flex items-center justify-center overflow-hidden`}>
        <div className="relative w-full h-full">
          <Image
            src={sns.bg}
            alt={`${sns.title} 배경`}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 990px) 50vw, 25vw"
            className="object-cover opacity-90 group-hover:scale-110 transition-transform duration-500"
          />
        </div>
      </div>

      {/* 카드 하단 - 텍스트 영역 */}
      <div className="p-6 space-y-3">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 relative flex-shrink-0">
            <Image
              src={sns.icon}
              alt={`${sns.title} 아이콘`}
              width={32}
              height={32}
              className="object-contain"
            />
          </div>
          <h2 className="text-xl font-MaruBuri-Bold text-gray-900">
            {sns.title}
          </h2>
        </div>

        <p className="text-sm font-MaruBuri-Light text-gray-600 leading-relaxed">
          {sns.description}
        </p>

        {/* 호버 시 표시되는 화살표 */}
        <div className="flex items-center gap-2 text-sm font-MaruBuri-SemiBold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <span className={sns.textColor}>바로가기</span>
          <span className={`${sns.textColor} group-hover:translate-x-1 transition-transform duration-300`}>→</span>
        </div>
      </div>
    </a>
  );
};

export default LandingPageSNSLinks; 