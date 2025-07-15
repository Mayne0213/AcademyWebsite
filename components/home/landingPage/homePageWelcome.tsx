"use client";

import { forwardRef, useEffect, useState } from "react";
import Image from "next/image";
import JooMain from "@/public/homeCopy/jooMain.png";

const HomePageWelcome = forwardRef<HTMLDivElement>((_, ref) => {
  const [viewportHeight, setViewportHeight] = useState<number>(0);
  const [viewportWidth, setViewportWidth] = useState<number>(0);

  useEffect(() => {
    // 최초 한 번만 뷰포트 크기를 저장
    if (viewportHeight === 0) {
      setViewportHeight(window.innerHeight);
      setViewportWidth(window.innerWidth);
    }

    // 브라우저 최대화/복원 감지
    const handleResize = () => {
      setViewportHeight(window.innerHeight);
      setViewportWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, [viewportHeight, viewportWidth]);

  return (
    <section
      ref={ref}
      className="relative bg-gradient-to-b from-[#cce6ff] to-[#a3d0ff] min-h-[700px] h-screen flex items-center justify-center"
    >
      <main className="max-w-7xl w-full h-full flex flex-row items-center justify-center mt-[110px]">
        <div className="flex-1 flex flex-col items-center justify-center" >
          <h1 className="leading-tight text-white drop-shadow-lg text-end font-GangwonEdu-Bold" style={{ fontSize: `${Math.max(Math.min(viewportWidth * 0.07), 80)}px` }}>
            <span className="text-white block text-left">확신의</span>
            <span className="text-[#092C4C]">영어 </span>
            <span className="inline-block bg-yellow-300 text-[#092C4C] px-4 py-1 rounded-3xl rotate-[-5deg] shadow-md">
              1등급
            </span>
            <p className="text-[#092C4C] mt-8 text-end text-[clamp(30px,2vw,48px)]">
              주혜연 T
            </p>
          </h1>
        </div>
        <div className="flex-1 flex items-end justify-center h-full "style={{ height: `${Math.max(viewportHeight * 0.9, 600)}px` }}>
          <Image
            src={JooMain}
            alt="주혜연"
            priority
            width={1000}
            height={600}
            sizes="(max-width: 1024px) 400px, 600px"
            className="h-full w-auto object-contain"
          />
        </div>
      </main>
      <div className="absolute bottom-0 left-0 w-full flex justify-center items-center gap-6 px-[20px] mb-[30px]">
        {[
          { title: "1위", desc: "EBSi 10년 연속 수강생 수", emoji: "🏆" },
          { title: "1위", desc: "입성 1년 만에 이투스 영어", emoji: "🚀" },
          {
            title: "다수 집필",
            desc: "능률, 동아, 미래엔 교과서",
            emoji: "📚",
          },
          { title: "235% 성장", desc: "3년 연속 교재+강좌", emoji: "📈" },
        ].map((item, index) => (
          <div
            key={index}
            className="w-[300px] bg-white/20 border border-white/30 rounded-2xl backdrop-blur-xl shadow-[0_8px_30px_rgba(0,0,0,0.2)] p-4 text-[#092C4C] text-center"
          >
            <div className="text-3xl mb-2">{item.emoji}</div>
            <p className="text-xl font-sansKR-SemiBold text-[#092C4C]">{item.title}</p>
            <p className="text-sm mt-1 font-sansKR-Regular text-[#092C4C]">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
});

HomePageWelcome.displayName = "HomePageWelcome";

export default HomePageWelcome;