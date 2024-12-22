"use client";

import { motion } from "framer-motion";
import DeviceType from "@/components/deviceType";
import useDeviceDetect from "@/components/hooks/useMobileDetect";

import { Calendar1, FileInput, CreditCard } from "lucide-react";

const getDeviceClasses = (devicetype: DeviceType) =>
  ({
    [DeviceType.Desktop]: {
      titleIconSize: 32,
      titleTextSize: "text-2xl",
      contentTextSize: "text-base",
      backgroundPadding: "p-[40px]",
    },
    [DeviceType.Tablet]: {
      titleIconSize: 28,
      titleTextSize: "text-xl",
      contentTextSize: "text-base",
      backgroundPadding: "p-[30px]",
    },
    [DeviceType.SmallTablet]: {
      titleIconSize: 27,
      titleTextSize: "text-lg",
      contentTextSize: "text-sm",
      backgroundPadding: "p-[25px]",
    },
    [DeviceType.Mobile]: {
      titleIconSize: 25,
      titleTextSize: "text-base",
      contentTextSize: "text-sm",
      backgroundPadding: "p-[20px]",
    },
    null: {
      titleIconSize: "",
      titleTextSize: "",
      contentTextSize: "",
      backgroundPadding: "",
    }
  })[devicetype];

const Admission = () => {
  const { titleIconSize, titleTextSize, contentTextSize, backgroundPadding } =
    getDeviceClasses(useDeviceDetect());

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      viewport={{ once: true }}
      className={`font-sansKR-Light flex flex-col rounded-3xl bg-gray-100 justify-center ${backgroundPadding}`}
    >
      <div>
        <div className={`flex font-sansKR-Bold mb-[10px] ${titleTextSize}`}>
          <Calendar1 size={titleIconSize} className="mr-3" /> 등록 일정
        </div>
        <div className={contentTextSize}>
          등록 및 수강료는 매월 1일 전까지 보내 주시면 됩니다.
        </div>
      </div>

      <br />

      <div>
        <div className={`flex font-sansKR-Bold mb-[10px] ${titleTextSize}`}>
          <FileInput size={titleIconSize} className="mr-3" /> 수강료 납부 방법
        </div>
        <div className={contentTextSize}>
          결제 선생 앱 청구서 발송(비대면결제)-희망자에 한함. <br />
          제로페이, 계좌이체. 방문 결제 등
        </div>
      </div>

      <br />

      <div>
        <div className={`flex font-sansKR-Bold mb-[10px] ${titleTextSize}`}>
          <CreditCard size={titleIconSize} className="mr-3" /> 납부 수단
        </div>
        <div className={contentTextSize}>
          계좌이체 이용시 (학생이름,학교,학년)으로 입금 부탁드리며,
          <br />
          현금 영수증 발행 요청을 하지 않으시면 학부모 번호로 현금영수증을
          발행합니다. <br />
          <div className="font-sansKR-Regular mt-2">
            - 강원희국어학원 : 신한 140-014-410000 주식회사 강원희국어학원
          </div>
          <div className="font-sansKR-Regular">
            - 파피루스문해원 : 신한 140-014-410030 주식회사 강원희국어학원
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Admission;
