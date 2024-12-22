"use client";

import useDeviceDetect from "@/components/hooks/useMobileDetect";
import { motion } from "framer-motion";

const Introduction = () => {
  const deviceCondition = useDeviceDetect();

  return (
    <div className="font-sansKR-Bold flex h-[900px] ">
      <div className="w-1/2 h-[800px] border-[1px] border-gray-300">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ once: true }}
          className="w-full h-1/4 flex flex-row items-center justify-end"
        >
          <div className="pl-[10px] items-end text-end justify-end">
            <div
              className={`${deviceCondition >= 2 ? "text-5xl" : "text-3xl"} pb-4`}
            >
              2024.07
            </div>
            <div
              className={`${deviceCondition === 3 ? "text-lg" : "text-sm"} font-sansKR-Regular`}
            >
              임호열 영어학원 9층 확장 이전
              {deviceCondition}
            </div>
          </div>
          <hr
            className={` ${deviceCondition >= 2 ? "w-28" : "w-12"} ml-4 border-t-1 border-gray-300`}
          />
        </motion.div>

        <div className="w-full h-1/4" />

        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ once: true }}
          className="w-full h-1/4 flex flex-row items-center justify-end"
        >
          <div className="pl-[10px] items-end text-end justify-end">
            <div
              className={`${deviceCondition >= 2 ? "text-5xl" : "text-3xl"} pb-4`}
            >
              2024.07
            </div>
            <div
              className={`${deviceCondition === 3 ? "text-lg" : "text-sm"} font-sansKR-Regular`}
            >
              임호열 영어학원 6층 확장 이전
            </div>
          </div>
          <hr
            className={` ${deviceCondition >= 2 ? "w-28" : "w-12"} ml-4 border-t-1 border-gray-300`}
          />
        </motion.div>

        <div className="w-full h-1/4" />
      </div>
      <div className="w-1/2 h-[800px] border-[1px] border-gray-300">
        <div className="w-full h-1/4" />

        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ once: true }}
          className="w-full h-1/4 flex flex-row items-center justify-start"
        >
          <hr
            className={` ${deviceCondition >= 2 ? "w-28" : "w-12"} mr-4 border-t-1 border-gray-300`}
          />
          <div className="pr-[10px] items-start text-start justify-end">
            <div
              className={`${deviceCondition >= 2 ? "text-5xl" : "text-3xl"} pb-4`}
            >
              2024.07
            </div>
            <div
              className={`${deviceCondition === 3 ? "text-lg" : "text-sm"} font-sansKR-Regular`}
            >
              임호열 영어학원 6층 추가 확장
            </div>
          </div>
        </motion.div>

        <div className="w-full h-1/4" />

        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ once: true }}
          className="w-full h-1/4 flex flex-row items-center justify-start"
        >
          <hr
            className={` ${deviceCondition >= 2 ? "w-28" : "w-12"} mr-4 border-t-1 border-gray-300`}
          />
          <div className="pr-[10px] items-start text-start justify-end">
            <div
              className={`${deviceCondition >= 2 ? "text-5xl" : "text-3xl"} pb-4`}
            >
              2024.07
            </div>
            <div
              className={`${deviceCondition === 3 ? "text-lg" : "text-sm"} font-sansKR-Regular`}
            >
              임호열 영어학원 센트럴 프라자 11층 개원
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Introduction;
