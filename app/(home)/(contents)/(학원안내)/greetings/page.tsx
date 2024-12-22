"use client";

import Image from "next/image";
import SuitImage from "./image/suit.jpg";
import SignatureImage from "./image/signature.png";

import DeviceType from "@/components/deviceType";
import useDeviceDetect from "@/components/hooks/useMobileDetect";
import academyInformation from "@/components/academyInformation";

const getDeviceClasses = (deviceType: DeviceType) =>
  ({
    [DeviceType.Desktop]: {
      titleTextSize: "text-3xl",
      contentTextSize: "text-lg",
    },
    [DeviceType.Tablet]: {
      titleTextSize: "text-2xl",
      contentTextSize: "text-base",
    },
    [DeviceType.SmallTablet]: {
      titleTextSize: "text-xl",
      contentTextSize: "text-base",
    },
    [DeviceType.Mobile]: {
      titleTextSize: "text-lg",
      contentTextSize: "text-sm",
    },
    null: {
      titleTextSize: "",
      contentTextSize: "",
    },
  })[deviceType];

const Greetings = () => {
  const deviceCondition = useDeviceDetect();
  const { titleTextSize, contentTextSize } =
    getDeviceClasses(useDeviceDetect());

  return (
    <div
      className={`flex ${deviceCondition <= DeviceType.Tablet ? "text-center item-center justify-center" : "justify-between"}`}
    >
      {/* Greetings */}
      <div
        className={`${deviceCondition === DeviceType.Desktop ? "w-[70%]" : ""}`}
      >
        {/* Greeting Title */}
        <div className={`font-sansKR-SemiBold pb-[20px] ${titleTextSize}`}>
          안녕하세요, <br />
          <span className="text-blue-500">
            {academyInformation.academyName} 원장 {""}
          </span>
          {academyInformation.chairman}입니다.
        </div>

        {/* Greeting contents */}
        <div className={`font-sansKR-Light ${contentTextSize}`}>
          <div>
            희귀질환은 국내에서 2만명 이하의 환자들이 이환된 드문 질환을
            의미합니다. 희귀 질환은 수가 적고, 각각의 특이한 특성으로 정확한
            진단과 치료가 어려운 경우가 많습니다.
          </div>
          <br />
          <div>
            세종충남대학교병원은 세종특별시의 유일한 대학병원으로서, 2020년 7월
            개원한 이래로 세종특별시와 그 주변 지역 거주자들에게 희귀질환 및
            극희귀질환에 대한 진단, 치료, 그리고 후속 관리를 전문적으로 수행하고
            있습니다.
          </div>
          <br />
          <div>
            2024년 세종권역희귀질환전문센터 개소를 맞이하여,
            세종충남대학교병원을 찾아주시는 희귀질환 환자들의 건강을 위해
            전문적이고 신뢰할 수 있는 동반자로 함께 하겠습니다. 많은 관심과
            성원을 부탁드립니다.
          </div>
          <br />
          <div>감사합니다.</div>
        </div>

        {/* Ending and Signature */}
        <div
          className={`flex py-[40px] ${deviceCondition <= DeviceType.Tablet ? "items-center justify-center" : ""}`}
        >
          {academyInformation.academyName}
          <Image
            priority
            src={SignatureImage}
            alt="signature"
            width={70}
            height={0}
            className="ml-[30px]"
          />
        </div>
      </div>

      {/* Human full body picture */}
      <div
        className={`${deviceCondition === DeviceType.Desktop ? "relative w-[300px] max-h-full scale-x-[-1]" : "hidden"}`}
      >
        <Image priority src={SuitImage} alt="suit" fill />
      </div>
    </div>
  );
};

export default Greetings;
