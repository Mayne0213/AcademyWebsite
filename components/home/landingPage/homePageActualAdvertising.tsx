import { forwardRef } from "react";
import { SectionScale, SectionUp } from "./designSystem";
import DeviceType, { useDeviceDetect } from "@/components/home/deviceType";

const HomePageActualAdvertising = forwardRef<HTMLDivElement>((_, ref) => {
  const deviceType = useDeviceDetect();

  return (
    <SectionScale ref={ref} className="py-20 px-6 bg-[#fdf1da]">
      <div className="max-w-7xl mx-auto text-center space-y-6 relative">
        <SectionUp
          className={`${deviceType === DeviceType.MOBILE ? "text-2xl" : deviceType === DeviceType.SMALLTABLET ? "text-3xl" : "text-4xl"} font-MaruBuri-Bold`}
        >
          선생님, 커리큘럼, 교재까지. <br />모든게 준비되었습니다.
        </SectionUp>
        <SectionUp className="text-lg font-MaruBuri-Light">
          이제는 여러분 차례입니다.
        </SectionUp>
      </div>
    </SectionScale>
  );
});
HomePageActualAdvertising.displayName = "HomePageActualAdvertising";

export default HomePageActualAdvertising;
