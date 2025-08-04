import { useState, useEffect } from "react";

enum DeviceType {
  MOBILE = "MOBILE",
  SMALLTABLET = "SMALLTABLET",
  TABLET = "TABLET",
  DESKTOP = "DESKTOP",
}

const mobileMaxWidth = 600;
const smallTabletMaxWidth = 990;
const tabletMaxWidth = 1200;

const useDeviceDetect = () => {
  const [deviceCondition, setDeviceCondition] = useState<DeviceType | null>(null);

  const handleResize = () => {
    const currentWindowWidth = window.innerWidth;
    if (currentWindowWidth <= mobileMaxWidth) {
      setDeviceCondition(DeviceType.MOBILE);
    } else if (
      mobileMaxWidth < currentWindowWidth &&
      currentWindowWidth <= smallTabletMaxWidth
    ) {
      setDeviceCondition(DeviceType.SMALLTABLET);
    } else if (
      smallTabletMaxWidth < currentWindowWidth &&
      currentWindowWidth <= tabletMaxWidth
    ) {
      setDeviceCondition(DeviceType.TABLET);
    } else {
      setDeviceCondition(DeviceType.DESKTOP);
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

export default DeviceType;
export { useDeviceDetect };
