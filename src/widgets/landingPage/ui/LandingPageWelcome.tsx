"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import JooMain from "@/public/homeCopy/jooMain.png";
import DeviceType, { useDeviceDetect } from "@/src/shared/lib/deviceType";

const DEFAULT_VIEWPORT_HEIGHT = 900;
const DEFAULT_VIEWPORT_WIDTH = 1600;

const LandingPageWelcome = (props: React.HTMLAttributes<HTMLDivElement>) => {
  const [isMounted, setIsMounted] = useState(false);
  const [viewportHeight, setViewportHeight] = useState<number>(DEFAULT_VIEWPORT_HEIGHT);
  const [viewportWidth, setViewportWidth] = useState<number>(DEFAULT_VIEWPORT_WIDTH);
  const deviceCondition = useDeviceDetect();

  useEffect(() => {
    if (!isMounted) {
      setViewportHeight(window.innerHeight);
      setViewportWidth(window.innerWidth);
      setIsMounted(true);
    }

    const handleResize = () => {
      setViewportHeight(window.innerHeight);
      setViewportWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, [viewportHeight, viewportWidth, isMounted]);

  const renderDefaultLayout = () => (
    <section
      className="relative bg-gradient-to-b from-[#cce6ff] to-[#a3d0ff] min-h-[700px] h-screen max-h-[???] flex items-center justify-center"
      {...props}
    >
      <main className="max-w-7xl w-full h-full flex flex-col items-center justify-center ">
        <section
          className={`absolute bottom-0 w-full flex items-center justify-center space-x-[5vw]`}
          style={{ height: `${Math.max(viewportHeight * 0.9, 600)}px` }}
        >
          <section>
            <h1 className="leading-tight text-white drop-shadow-lg text-end font-GangwonEdu-Bold"
                style={{ fontSize: `${Math.max(Math.min(viewportWidth * 0.07), 80)}px` }}>
              <span className=" text-white block text-left">확신의</span>
              <span className=" text-[#092C4C]">영어 </span>
              <span className=" inline-block bg-yellow-300 text-[#092C4C] px-4 py-1 rounded-3xl rotate-[-5deg] shadow-md">
                1등급
              </span>
              <p className="text-[#092C4C] mt-8 text-end"
                style={{ fontSize: `${Math.max(Math.min(viewportWidth * 0.02), 30)}px` }}>
                주혜연 T
              </p>
            </h1>
          </section>
          <div className="h-full aspect-[800/1435] min-h-[600px] flex items-end">
            <Image
              src={JooMain}
              alt="주혜연"
              height={1435}
              width={800}
              sizes="(max-width: 600px) 100vw, (max-width: 990px) 50vw, (max-width: 1200px) 33vw, 25vw"
              className="h-full w-auto object-contain"
              priority
            />
          </div>
        </section>

        <section
            className="flex h-full justify-end items-end gap-6 w-full  px-[20px] mb-[30px]"
          >
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
              <section
                key={index}
                className="w-[300px] bg-white/20 border border-white/30 rounded-2xl backdrop-blur-xl shadow-[0_8px_30px_rgba(0,0,0,0.2)] p-4 text-[#092C4C] text-center"
              >
                <div className="text-3xl mb-2">{item.emoji}</div>
                <p className="text-xl font-sansKR-SemiBold text-[#092C4C]">{item.title}</p>
                <p className="text-sm mt-1 font-sansKR-Regular text-[#092C4C]">{item.desc}</p>
              </section>
            ))}
        </section>
      </main>
    </section>
  );

  const renderMobileLayout = () => (
    <section
      className="relative bg-gradient-to-b from-[#cce6ff] to-[#a3d0ff] min-h-[700px] h-screen flex flex-col justify-end items-center"
      suppressHydrationWarning
    >
      <div className="w-full h-[110px]" />
      <div className="w-full flex flex-col items-center mb-2 z-10">
        <h1 className="text-white drop-shadow-lg text-center font-GangwonEdu-Bold text-[clamp(3rem,7vh,3rem)] leading-tight">
          <span className="block">확신의 </span>
          <span className="text-[#092C4C]">영어
            <span className="inline-block bg-yellow-300 text-[#092C4C] px-4 py-1 rounded-3xl rotate-[-5deg] shadow-md ml-2">
              1등급
            </span>
          </span>
        </h1>
      </div>
      <div className="w-full flex justify-center min-h-[200px] aspect-[800/1435]" suppressHydrationWarning>
        <Image
          src={JooMain}
          alt="주혜연"
          width={800}
          height={1435}
          className="object-contain w-full min-h-[200px]"
          loading="eager"
          sizes="(max-width: 600px) 100vw, (max-width: 990px) 50vw, (max-width: 1200px) 33vw, 25vw"
          priority
        />
      </div>
    </section>
  );

  return deviceCondition === DeviceType.MOBILE || deviceCondition === DeviceType.SMALLTABLET ? renderMobileLayout() : renderDefaultLayout();
};

export default LandingPageWelcome; 