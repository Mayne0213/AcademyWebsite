import { useState, useEffect } from "react";
import DeviceType from "../deviceType";

const mobileMaxWidth = 480;
const smallTabletMaxWidth = 768;
const tabletMaxWidth = 1024;

const useDeviceDetect = () => {
  const [deviceCondition, setDeviceCondition] = useState<any>(null);

  const handleResize = () => {
    const currentWindowWidth = window.innerWidth;
    if (currentWindowWidth <= mobileMaxWidth) {
      setDeviceCondition(DeviceType.Mobile);
    } else if (
      mobileMaxWidth < currentWindowWidth &&
      currentWindowWidth <= smallTabletMaxWidth
    ) {
      setDeviceCondition(DeviceType.SmallTablet);
    } else if (
      smallTabletMaxWidth < currentWindowWidth &&
      currentWindowWidth <= tabletMaxWidth
    ) {
      setDeviceCondition(DeviceType.Tablet);
    } else {
      setDeviceCondition(DeviceType.Desktop);
    }
  };

  useEffect(() => {
    handleResize(); // 초기 값 설정
    const resizeListener = () => handleResize();
    window.addEventListener("resize", resizeListener);
    return () => window.removeEventListener("resize", resizeListener); // cleanup
  }, []);

  return deviceCondition;
};

export default useDeviceDetect;
