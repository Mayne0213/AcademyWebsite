import React, { useEffect, useState } from "react";
import useDeviceDetect from "../../hooks/useMobileDetect";
import DeviceType from "../deviceType";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const stats = [
  {
    label: "대학원",
    date: "2024년 4월 1일 기준",
    target: 20,
    unit: "대학원",
  },
  {
    label: "학과",
    date: "2024년 4월 1일 기준",
    target: 455,
    unit: "학과",
  },
  {
    label: "재학생",
    date: "2024년 4월 1일 기준",
    target: 40251,
    unit: "명",
  },
  {
    label: "교원",
    date: "2024년 4월 1일 기준",
    target: 6734,
    unit: "명",
  },
];

const CountUp = ({ target, unit, isMobile }: { target: number; unit: string; isMobile: boolean }) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let start = 0;
    const duration = 1000; // ms
    const steps = 40;
    const increment = Math.ceil(target / steps);
    const interval = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(interval);
      } else {
        setCount(start);
      }
    }, duration / steps);
    return () => clearInterval(interval);
  }, [target]);
  return (
    <span className="flex items-end justify-center">
      <span className={isMobile ? "text-4xl font-bold text-sky-400 leading-none" : "text-[2.8rem] md:text-[3.2rem] font-bold text-sky-400 leading-none"}>{count.toLocaleString()}</span>
      <span className={isMobile ? "text-2xl font-bold text-sky-400 ml-1 mb-1" : "text-[1.6rem] md:text-3xl font-bold text-sky-400 ml-1 mb-1"}>{unit}</span>
    </span>
  );
};

const HomePageTeacherIntroductionDetails = () => {
  const device = useDeviceDetect();
  const isMobile = device === DeviceType.Mobile;

  return (
    <div
      className="w-full min-h-[350px] flex flex-col justify-center items-center bg-gradient-to-r bg-[#deeff0] relative overflow-hidden py-12"
    >
      <div className="text-sky-300 text-lg mb-2 font-semibold">Numbers</div>
      <div className={isMobile ? "text-black text-2xl font-extrabold mb-6 text-center" : "text-black text-3xl md:text-4xl font-extrabold mb-10 text-center"}>
        숫자로 증명하는 글로벌 리더십
      </div>
      {isMobile ? (
        <div className="w-full max-w-xs">
          <Swiper spaceBetween={16} slidesPerView={1} pagination={{ clickable: true }}>
            {stats.map((stat, idx) => (
              <SwiperSlide key={stat.label}>
                <div className="flex flex-col items-center px-4 py-8 min-w-[180px]">
                  <div className="text-white text-shadow-black text-2xl font-extrabold mb-2 text-center" style={{color:'#fff', textShadow:'0 0 8px #222, 0 0 2px #222'}}>{stat.label}</div>
                  <div className="text-white text-shadow-black text-base mb-4 text-center opacity-80" style={{color:'#fff', textShadow:'0 0 8px #222, 0 0 2px #222'}}>{stat.date}</div>
                  <CountUp target={stat.target} unit={stat.unit} isMobile={true} />
                  <div className="w-full border-b border-[#b2c6d1] my-6" />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      ) : (
        <div className="flex flex-row justify-center items-stretch w-full max-w-6xl divide-x divide-[#b2c6d1]">
          {stats.map((stat, idx) => (
            <div
              key={stat.label}
              className={`flex flex-col items-center px-6 md:px-10 min-w-[180px]`}
            >
              <div className="text-white text-shadow-black text-2xl md:text-2xl font-extrabold mb-1 text-center" style={{color:'#fff', textShadow:'0 0 8px #222, 0 0 2px #222'}}> {stat.label} </div>
              <div className="text-white text-shadow-black text-sm mb-4 text-center opacity-80" style={{color:'#fff', textShadow:'0 0 8px #222, 0 0 2px #222'}}>{stat.date}</div>
              <CountUp target={stat.target} unit={stat.unit} isMobile={false} />
              <div className="w-full border-b border-[#b2c6d1] my-4" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HomePageTeacherIntroductionDetails;