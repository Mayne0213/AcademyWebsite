"use client";

import { forwardRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import JooMain from "@/public/homeCopy/jooMain.png";
import useDeviceDetect from "@/components/hooks/useMobileDetect";
import { DESIGN_SYSTEM } from "./designSystem";

const HomePageWelcome = forwardRef<HTMLDivElement>((_, ref) => {
  const deviceType = useDeviceDetect();

  const renderMobileLayout = () => (
    <motion.section
      {...DESIGN_SYSTEM.animations.fadeInUp}
      ref={ref}
      className="min-h-[850px] relative bg-gradient-to-b from-[#cce6ff] to-[#a3d0ff] flex flex-col items-center justify-center pb-[clamp(600px,40vw,00px)] px-6"
    >
      {/* 텍스트 영역 */}
      <motion.div
        {...DESIGN_SYSTEM.animations.fadeInUp}
        transition={{
          ...DESIGN_SYSTEM.animations.fadeInUp.transition,
          delay: 0.2,
        }}
        className="text-center z-[2] mt-[70px]"
      >
        <h1 className="text-[clamp(3rem,6vw,5rem)] leading-tight text-white drop-shadow-lg font-GangwonEdu">
          <span className="block text-white font-GangwonEdu">확신의</span>
          <span className="text-[#092C4C] font-GangwonEdu">영어</span>{" "}
          <span className="inline-block bg-yellow-300 text-[#092C4C] px-3 py-1 rounded-2xl rotate-[-5deg] shadow-md mt-1 font-GangwonEdu">
            1등급
          </span>
        </h1>
      </motion.div>

      {/* 인물 이미지 - 배너 하단 고정, 가운데 정렬, 반응형 크기 */}
      <motion.div
        {...DESIGN_SYSTEM.animations.scaleIn}
        transition={{
          ...DESIGN_SYSTEM.animations.scaleIn.transition,
          delay: 0.5,
        }}
        className="absolute bottom-0 w-[clamp(360px,40vw,640px)] h-[clamp(600px,60vw,1000px)]"
      >
        <Image
          src={JooMain}
          alt="주혜연"
          fill
          priority
          sizes="100vw"
          className="object-contain"
        />
      </motion.div>
    </motion.section>
  );

  const renderDefaultLayout = () => (
    // 기존 PC용 레이아웃 그대로 사용
    <motion.section
      {...DESIGN_SYSTEM.animations.fadeInUp}
      ref={ref}
      className="relative bg-gradient-to-b from-[#cce6ff] to-[#a3d0ff] flex items-end justify-center"
    >
      <div className="flex w-full items-center justify-center font-GangwonEdu">
        {/* 텍스트 영역 */}
        <motion.div {...DESIGN_SYSTEM.animations.fadeInLeft}>
          <h1 className="text-[clamp(2rem,7vw,10rem)] w-full leading-tight text-white drop-shadow-lg text-end">
            <span className=" text-white block text-left font-GangwonEdu">확신의 </span>
            <span className=" text-[#092C4C] font-GangwonEdu">영어 </span>
            <span className=" inline-block bg-yellow-300 text-[#092C4C] px-4 py-1 rounded-3xl rotate-[-5deg] shadow-md font-GangwonEdu">
              1등급
            </span>
            <p className="text-[#092C4C] text-[clamp(2rem,5vw,4rem)] mt-8 text-end">
              주혜연 T
            </p>
          </h1>
        </motion.div>

        <div className="w-[clamp(1%,5vw,100%)] bg-black"></div>

        {/* 하단 정보 영역 */}
        <motion.div
          {...DESIGN_SYSTEM.animations.fadeInUp}
          transition={{
            ...DESIGN_SYSTEM.animations.fadeInUp.transition,
            delay: 0.5,
          }}
          className="absolute bottom-10 px-20 flex justify-center gap-6"
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
            <motion.div
              key={index}
              {...DESIGN_SYSTEM.animations.scaleIn}
              transition={{
                ...DESIGN_SYSTEM.animations.scaleIn.transition,
                delay: 0.7 + index * 0.1,
              }}
              className="w-[300px] bg-white/20 border border-white/30 rounded-2xl backdrop-blur-xl shadow-[0_8px_30px_rgba(0,0,0,0.2)] p-4 text-[#092C4C] text-center"
            >
              <div className="text-3xl mb-2">{item.emoji}</div>
              <p className="text-xl font-GangwonEdu">{item.title}</p>
              <p className="text-sm mt-1 font-sansKR-Regular">{item.desc}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div {...DESIGN_SYSTEM.animations.scaleIn} className="ml-[%]">
          <div className="w-full h-[100px]"></div>
          <Image
            src={JooMain}
            alt="주혜연"
            width={503}
            height={900}
            className="object-contain"
          />
        </motion.div>
      </div>
    </motion.section>
  );

  return deviceType <= 1 ? renderMobileLayout() : renderDefaultLayout();
});

HomePageWelcome.displayName = "HomePageWelcome";

export default HomePageWelcome;
