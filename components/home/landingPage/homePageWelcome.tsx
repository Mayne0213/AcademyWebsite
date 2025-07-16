"use client";

import { forwardRef, useState, useEffect } from "react";
import Image from "next/image";
import JooMain from "@/public/homeCopy/jooMain.png";

const HomePageWelcome = forwardRef<HTMLDivElement>((_, ref) => {
  const [viewportHeight, setViewportHeight] = useState<number>(0);
  const [viewportWidth, setViewportWidth] = useState<number>(0);

  useEffect(() => {
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
  //   <motion.section
  //     {...DESIGN_SYSTEM.animations.fadeInUp}
  //     ref={ref}
  //     className="h-screen relative bg-gradient-to-b from-[#cce6ff] to-[#a3d0ff] flex flex-col items-center justify-center pb-[clamp(37.5rem,40vw,62.5rem)] px-6"
  //   >
  //     {/* 텍스트 영역 */}
  //     <motion.div
  //       {...DESIGN_SYSTEM.animations.fadeInUp}
  //       transition={{
  //         ...DESIGN_SYSTEM.animations.fadeInUp.transition,
  //         delay: 0.2,
  //       }}
  //       className="text-center z-[2] mt-[70px]"
  //     >
  //       <h1 className="text-[48px] leading-tight text-white drop-shadow-lg font-GangwonEdu-Bold">
  //         <span className="block text-white font-GangwonEdu">확신의</span>
  //         <span className="text-[#092C4C] font-GangwonEdu">영어</span>{" "}
  //         <span className="inline-block bg-yellow-300 text-[#092C4C] px-3 py-1 rounded-2xl rotate-[-5deg] shadow-md mt-1 font-GangwonEdu-Bold">
  //           1등급
  //         </span>
  //       </h1>
  //     </motion.div>

  //     {/* 인물 이미지 - 배너 하단 고정, 가운데 정렬, 반응형 크기 */}
  //     <motion.div
  //       {...DESIGN_SYSTEM.animations.scaleIn}
  //       transition={{
  //         ...DESIGN_SYSTEM.animations.scaleIn.transition,
  //         delay: 0.5,
  //       }}
  //       className="absolute bottom-0 w-[400px] h-[600px]"
  //     >
  //       <Image
  //         src={JooMain}
  //         alt="주혜연"
  //         fill
  //         priority
  //         sizes="(max-width: 768px) 400px, (max-width: 1200px) 600px, 800px"
  //         className="object-contain"
  //       />
  //     </motion.div>
  //   </motion.section>
  // );

  const renderDefaultLayout = () => (
    <section
      className="relative bg-gradient-to-b from-[#cce6ff] to-[#a3d0ff] min-h-[700px] h-screen max-h-[???] flex items-center justify-center"
      ref={ref}
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
          <Image
            src={JooMain}
            alt="주혜연"
            sizes="(max-width: 768px) 400px, (max-width: 1200px) 600px, 800px"
            className="h-full w-auto object-contain"
            loading="eager"
          />
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

  return renderDefaultLayout();
});

HomePageWelcome.displayName = "HomePageWelcome";

export default HomePageWelcome;