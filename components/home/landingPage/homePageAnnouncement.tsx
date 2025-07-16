"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

import { SectionUp } from "./designSystem";
import IconWithCircle from "@/components/ui/icon-with-circle";
import Loading from "@/components/ui/loading";
import useAnnouncement from "@/components/hooks/useAnnouncement";

const IMAGE_SRC = "/homeCopy/homePageBoard/bnImg1.jpg";
const ANNOUNCEMENT_LIMIT = 8;
const HEADER_TITLE = "주혜연 영어 소식";
const HEADER_SUBTITLE = "주혜연 학원의 최신 소식을 만나보세요";
const EMPTY_STATE_TEXT = "아직 공지사항이 없습니다";

const STYLES = {
  titleSize: [
    "text-2xl",
    "smalltablet:text-3xl",
    "tablet:text-4xl",
    "desktop:text-5xl",
  ].join(" "),
  titleMargin: [
    "mb-2",
    "desktop:mb-4",
  ].join(" "),
  textAlign: [
    "text-center",
    "smalltablet:text-center",
    "tablet:text-left",
  ].join(" "),
  subtitleSize: [
    "text-base",
    "smalltablet:text-base",
    "tablet:text-lg",
    "desktop:text-xl",
  ].join(" "),
  padding: [
    "py-8 px-4",
    "smalltablet:py-10 smalltablet:px-4",
    "tablet:py-16 tablet:px-6",
    "desktop:py-20 desktop:px-6",
  ].join(" "),
  itemTextSize: [
    "text-sm",
    "smalltablet:text-xs",
    "tablet:text-base",
    "desktop:text-lg",
  ].join(" "),
};

const HomePageAnnouncement = () => {
  const { isLoading, announcements, loadInitialAnnouncement } = useAnnouncement();

  useEffect(() => {
    loadInitialAnnouncement();
  }, [loadInitialAnnouncement]);

  const renderContent = () => {
    if (isLoading) return <AnnouncementSkeleton />;
    if (announcements.length > 0) return <AnnouncementList announcements={announcements} />;
    return <EmptyState />;
  };

  return (
    <section className={` w-full max-w-7xl mx-auto space-y-4 ${STYLES.padding} ${STYLES.textAlign}`}>
      <AnnouncementHeader />
      <div className="flex flex-col space-y-8 smalltablet:flex-row smalltablet:space-x-8 smalltablet:space-y-0">
        <main className={`w-full tablet:w-[55%]`}>
          {renderContent()}
        </main>
        <ImageSection />
      </div>
    </section>
  );
};

const AnnouncementHeader = () => (
  <header>
    <h1 className={`font-MaruBuri-Bold ${STYLES.titleMargin} ${STYLES.titleSize}`}>
      {HEADER_TITLE}
    </h1>
    <p className={`font-MaruBuri-Regular ${STYLES.subtitleSize}`}>
      {HEADER_SUBTITLE}
    </p>
  </header>
);

const AnnouncementSkeleton = () => (
  <ul>
    {Array.from({ length: ANNOUNCEMENT_LIMIT }).map((_, index) => (
      <li key={index} className={`${STYLES.itemTextSize} py-3 flex justify-between w-full border-y-2 bg-gray-50`}>
        <div
          className="bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%] animate-[shimmer_1.5s_ease-in-out_infinite] rounded-full h-4"
          style={{ width: `${Math.random() * 30 + 50}%` }}
        />
        <div className="h-4 w-20 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%] animate-[shimmer_1.5s_ease-in-out_infinite] rounded-2xl" />
      </li>
    ))}
  </ul>
);

const EmptyState = () => (
  <article className="flex flex-col items-center justify-center text-center py-12 border-2 border-gray-200 rounded-lg space-y-4 aspect-[16/10] bg-gray-50">
    <IconWithCircle />
    <h2 className={`font-MaruBuri-SemiBold text-gray-600 ${STYLES.itemTextSize}`}>
      {EMPTY_STATE_TEXT}
    </h2>
  </article>
);

const AnnouncementList = ({ announcements }: { announcements: { title: string; updatedAt: string }[] }) => (
  <ul>
    {announcements.slice(0, ANNOUNCEMENT_LIMIT).map((item, index) => (
      <li key={index} className={`w-full flex justify-between py-3 font-MaruBuri-Light hover:font-MaruBuri-SemiBold hover:cursor-pointer ${STYLES.itemTextSize} ${index === 0 ? "border-y-2" : "border-b-2"}`}>
        <article className="flex justify-between items-center w-full">
          <h3 className="font-inherit">{item.title}</h3>
          <time dateTime={item.updatedAt} className="text-gray-500">
            {new Date(item.updatedAt).toLocaleDateString("ko-KR")}
          </time>
        </article>
      </li>
    ))}
  </ul>
);

const ImageSection = () => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <aside className="relative w-[40%] aspect-[16/10] rounded-lg overflow-hidden shadow-lg hidden tablet:block">
      {isLoading && (
        <Loading
          type="hash"
          size={30}
          color="#3B82F6"
        />
      )}
      <Image
        src={IMAGE_SRC}
        alt="주혜연 영어 학원 공지사항 배너 이미지"
        fill
        sizes="(max-width: 768px) 100vw, 50vw"
        className="object-cover"
        onLoad={() => setIsLoading(false)}
        onError={() => setIsLoading(false)}
      />
    </aside>
  );
};

export default HomePageAnnouncement;