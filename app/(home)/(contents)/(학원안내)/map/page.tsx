"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";

import DeviceType from "@/components/deviceType";
import useDeviceDetect from "@/components/hooks/useMobileDetect";
import academyInformation from "@/components/academyInformation";

import { MapPin, Phone, BusFront, Mail } from "lucide-react";

const getDeviceClasses = (deviceType: DeviceType) =>
  ({
    [DeviceType.Desktop]: {
      titleTextSize: "text-3xl",
      contentSize: "mt-16 px-4",
      lineMargin: "my-8",
    },
    [DeviceType.Tablet]: {
      titleTextSize: "text-2xl",
      contentSize: "mt-14 mb-7 px-4",
      lineMargin: "my-6",
    },
    [DeviceType.SmallTablet]: {
      titleTextSize: "text-xl",
      contentSize: "mt-10 mb-5 px-2 text-sm",
      lineMargin: "my-4",
    },
    [DeviceType.Mobile]: {
      titleTextSize: "text-lg",
      contentSize: "mt-8 mb-4 px-2 text-sm",
      lineMargin: "my-2",
    },
    null: {
      titleTextSize: "",
      contentSize: "",
      lineMargin: "",
    },
  })[deviceType];

const MapPage = () => {
  const deviceCondition = useDeviceDetect();
  const { titleTextSize, contentSize, lineMargin } =
    getDeviceClasses(useDeviceDetect());

  useEffect(() => {
    function initMap() {
      const location = new naver.maps.LatLng(37.517406535882, 126.865306840725);
      const mapOptions = {
        center: location,
        zoom: 15,
        zoomControl: true,
        zoomControlOptions: {
          position: naver.maps.Position.TOP_RIGHT,
        },
      };

      new naver.maps.Marker({
        position: new naver.maps.LatLng(37.517406535882, 126.865306840725),
        map: new naver.maps.Map("map", mapOptions),
        title: "임호열 영어학원",
      });
    }

    const mapScript = document.createElement("script");
    mapScript.onload = () => initMap();
    mapScript.src = `https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=bxfrkp6x1t`;
    document.head.appendChild(mapScript);
  }, [deviceCondition]);

  return (
    <div
      className={`flex w-full mb-[50px] 
                  ${deviceCondition === DeviceType.Desktop ? "flex-row" : "flex-col"}`}
    >
      <motion.div
        initial={{ opacity: 0, y: 80 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        viewport={{ once: true }}
        className={`mr-[50px] 
                    ${deviceCondition === DeviceType.Desktop ? "w-full" : "w-1/2"}`}
      >
        {/* Academy Name */}
        <div className={`font-sansKR-Bold ${titleTextSize}`}>
          {academyInformation.academyName}
        </div>

        {/* Decorative horizontal lines */}
        <div className={`relative ${lineMargin}`}>
          <hr
            className={`absolute top-0 left-0 border-t-2 border-gray-300 w-full ${deviceCondition === DeviceType.Mobile ? "hidden" : ""}`}
          />
          <hr
            className={`absolute top-0 left-0 border-t-2 border-blue-400 w-5/12`}
          />
        </div>

        {/* Informations */}
        <div className={contentSize}>
          <div className="flex items-center">
            <Phone className="mr-4" />
            {academyInformation.phoneNumber}
          </div>
          <div
            className={`flex items-center ${deviceCondition === DeviceType.Mobile ? "my-6" : "my-8"}`}
          >
            <Mail className="mr-4" />
            {academyInformation.email}
          </div>
          <div
            className={`my-8 flex items-center ${deviceCondition === DeviceType.Mobile ? "my-6" : "my-8"}`}
          >
            <MapPin className="mr-4" />
            {academyInformation.address}
          </div>
          <div
            className={`my-8 flex ${deviceCondition === DeviceType.Mobile ? "my-6" : "my-8"}`}
          >
            <BusFront className="mr-4" />
            <div>
              <div
                className={`font-sansKR-Bold ${deviceCondition === DeviceType.Desktop ? "hidden" : "pb-2"}`}
              >
                [하단 지도 참조]
              </div>
              · 2호선 강남역 1번 출구
              <br />
              · 2호선 강남역 2번 출구 우회전
              <br />
              · 신분당선 강남역 3번 출구
              <br />
              · 신분당선 강남역 4번 출구
              <br />
            </div>
          </div>
          <div
            className={`text-gray-500 mt-8 ${deviceCondition === DeviceType.Mobile ? "text-sm" : ""} hidden`}
          >
            건물 내 유료주차 가능합니다.{" "}
            {deviceCondition === DeviceType.Mobile ? <br /> : ""}
            상담 시 주차증 발급해 드립니다.
          </div>
        </div>
      </motion.div>

      {/* Rendering Map using API */}
      <div
        id="map"
        className={`h-[400px] rounded-xl
                    ${deviceCondition === 3 ? "w-1/2" : "w-full"}`}
      />
    </div>
  );
};

export default MapPage;
