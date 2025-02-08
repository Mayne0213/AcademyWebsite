"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { CircleCheckBig } from "lucide-react";
import DeviceType from "@/components/deviceType";
import useDeviceDetect from "@/components/hooks/useMobileDetect";
import academyInformation from "@/components/academyInformation";

const getDeviceClasses = (deviceType: DeviceType) =>
  ({
    [DeviceType.Desktop]: {
      titleIconSize: 40,
      titleTextSize: "text-2xl",
      contentTextSize: "text-base",
    },
    [DeviceType.Tablet]: {
      titleIconSize: 35,
      titleTextSize: "text-xl",
      contentTextSize: "text-base",
    },
    [DeviceType.SmallTablet]: {
      titleIconSize: 35,
      titleTextSize: "text-xl",
      contentTextSize: "text-base",
    },
    [DeviceType.Mobile]: {
      titleIconSize: 30,
      titleTextSize: "text-lg",
      contentTextSize: "text-sm",
    },
    null: {
      titleIconSize: -1,
      titleTextSize: "",
      contentTextSize: "",
    },
  })[deviceType];

const BookingForm = () => {
  const formDesign = "font-sansKR-Light w-full border rounded-md p-2";
  const deviceCondition = useDeviceDetect();
  const { titleIconSize, titleTextSize, contentTextSize } =
    getDeviceClasses(useDeviceDetect());
  const availableTimes = academyInformation.availableTimes;
  const availableSchools = academyInformation.supportedSchools;

  const [formState, setFormState] = useState({
    date: undefined as Date | undefined,
    time: availableTimes[0],
    name: "",
    phoneNumber: "",
    school: availableSchools[0],
    grade: "1학년",
    modalState: false,
  });

  const reservedFormFullfilled =
    formState.modalState &&
    formState.name &&
    formState.date &&
    formState.phoneNumber;
  const [reservedCompleted, setreservedCompleted] = useState<boolean>(false);
  const [dateNotSelectedWarning, setDateNotSelectedWarning] =
    useState<String>("hidden");

  const toggleModal = (open: boolean) =>
    setFormState((prev) => ({ ...prev, modalState: open }));

  const handleChange =
    (field: keyof typeof formState) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
      setFormState((prev) => ({ ...prev, [field]: e.target.value }));

  const renderModal = () =>
    reservedFormFullfilled && (
      <div
        onClick={() => {
          !reservedCompleted &&
            (toggleModal(false), setreservedCompleted(false));
        }}
        className={`fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50`}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className={`w-11/12 bg-white rounded-lg max-w-lg mx-4`}
        >
          {!reservedCompleted && (
            <div className="p-6">
              <h2 className="font-sansKR-SemiBold text-xl mb-4">상담 예약</h2>
              <p className="font-sansKR-SemiBold text-lg mb-2">
                이 정보로 예약하시겠어요?
              </p>
              <p className="">{formState.phoneNumber}</p>
              <p className="">{`${formState.school} ${formState.grade} ${formState.name} 학생`}</p>
              <div>
                {formState.date!.toLocaleDateString(["ko-KR"], {
                  month: "long",
                  day: "numeric",
                })}
                " 오후 {formState.time}시
              </div>

              <div className="flex justify-end mt-6">
                <Button
                  onClick={() => setreservedCompleted(true)}
                  className="bg-blue-500 hover:bg-blue-700 mr-4"
                >
                  신청
                </Button>
                <Button
                  onClick={() => toggleModal(false)}
                  className="bg-gray-400 hover:bg-gray-500"
                >
                  취소
                </Button>
              </div>
            </div>
          )}
          {reservedCompleted && (
            <div>
              <div className="flex flex-col text-center items-center justify-center px-6 pt-6">
                <CircleCheckBig size={titleIconSize} className="mb-4" />
                <div className={`font-sansKR-SemiBold pb-2 ${titleTextSize}`}>
                  상담 예약이 확정되었습니다.
                </div>
                <div className={`pb-6 ${contentTextSize}`}>
                  잊지 않고 방문하시도록 상담 2시간 전에 카카오톡 알림으로 알려
                  드리겠습니다.
                </div>
              </div>
              <div
                onClick={() => {
                  toggleModal(false), setreservedCompleted(false);
                }}
                className={`font-sansKR-SemiBold w-full text-white text-center rounded-b-lg transition-all duration-200 bg-blue-500 hover:bg-blue-700 ${deviceCondition === 3 ? "p-[15px] text-lg" : "p-[10px]"}`}
              >
                확인
              </div>
            </div>
          )}
        </div>
      </div>
    );

  useEffect(() => {
    if (!formState.name || !formState.phoneNumber) {
      toggleModal(false);
    } else if (formState.date === undefined) {
      setDateNotSelectedWarning("text-red-600 border-red-600");
      toggleModal(false);
    } else {
      setDateNotSelectedWarning("hidden");
    }
  }, [formState.modalState]);

  return (
    <div
      className={`w-full flex justify-center items-center p-[20px] ${deviceCondition >= 2 ? "flex-row" : "flex-col"}`}
    >
      <div className="w-full">
        <Calendar
          mode="single"
          selected={formState.date}
          onSelect={(date) => setFormState((prev) => ({ ...prev, date }))}
          className={`rounded-md ${formState.date === undefined} ${deviceCondition >= 2 ? "border" : ""}`}
        />
        <p className={`${dateNotSelectedWarning}`}>
          *상담 날짜를 선택해 주세요.
        </p>
      </div>

      <form
        onSubmit={(e) => e.preventDefault()}
        className={`w-full flex flex-col justify-center ${deviceCondition >= 2 ? "pl-4" : "my-[20px]"}`}
      >
        <div className="mb-6">
          <h3 className="mb-4 text-xl">예약 가능 시간</h3>
          <select
            value={formState.time}
            onChange={handleChange("time")}
            className={formDesign}
          >
            {availableTimes.map((timeOption) => (
              <option key={timeOption} value={timeOption}>
                {timeOption}
              </option>
            ))}
          </select>
        </div>

        <div className="flex w-full mb-6">
          <div className="w-1/2 mr-2">
            <h3 className="mb-4 text-xl">이름</h3>
            <input
              value={formState.name}
              onChange={handleChange("name")}
              className={formDesign}
              required
            />
          </div>
          <div className="w-full">
            <h3 className="mb-4 text-xl">전화번호</h3>
            <input
              value={formState.phoneNumber}
              onChange={handleChange("phoneNumber")}
              className={formDesign}
              required
            />
          </div>
        </div>

        <div className="flex w-full mb-6">
          <div className="w-1/2 mr-2">
            <h3 className="mb-4 text-xl">학교</h3>
            <select
              value={formState.school}
              onChange={handleChange("school")}
              className={formDesign}
            >
              {availableSchools.map((schoolOption) => (
                <option key={schoolOption} value={schoolOption}>
                  {schoolOption}
                </option>
              ))}
            </select>
          </div>

          <div className="w-full">
            <h3 className="mb-4 text-xl">학년</h3>
            <select
              value={formState.grade}
              onChange={handleChange("grade")}
              className={formDesign}
            >
              <option value="1">1학년</option>
              <option value="2">2학년</option>
              <option value="3">3학년</option>
            </select>
          </div>
        </div>

        <div className="items-end">
          <Button
            onClick={() => toggleModal(true)}
            className="bg-blue-500 hover:bg-blue-700 mb-6"
          >
            상담 신청
          </Button>
        </div>
      </form>

      {renderModal()}
    </div>
  );
};

export default BookingForm;
