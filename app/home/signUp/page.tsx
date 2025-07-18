"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import BackgroundDot from "@/components/home/backgroundDot";
import { useRouter } from "next/navigation";
import useAcademy from "@/components/hooks/useAcademy";
import { Academy } from "@/components/type/academyType";

const SignUpPage = () => {
  const router = useRouter();
  const [userId, setUserId] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userCheckPassword, setUserCheckPassword] = useState("");
  const [step, setStep] = useState(1);
  const { academys, loadInitialAcademy } = useAcademy();
  const [isLoading, setIsLoading] = useState(false);

  // 학생 정보 state
  const [academyId, setAcademyId] = useState<number>();
  const [studentName, setStudentName] = useState<string>("");
  const [studentPhone, setStudentPhone] = useState<string>("");
  const [studentHighschool, setStudentHighschool] = useState<string>("");
  const [studentBirthYear, setStudentBirthYear] = useState<string>("");

  // 아이디 검증 (영어 대소문자, 숫자, 특수문자만 허용)
  const userIdRegex = /^[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+$/;
  const isUserIdValid = userId === "" || userIdRegex.test(userId);

  // 전화번호 형식 검증
  const phoneRegex = /^010\d{3,4}\d{4}$/;
  const isPhoneValid = studentPhone === "" || phoneRegex.test(studentPhone);

  // 비밀번호 일치 검증
  const isPasswordMatch = userPassword === userCheckPassword;
  const isStep1Valid = userId && userPassword && userCheckPassword && isPasswordMatch && isUserIdValid;

  // 출생년도 검증
  const currentYear = new Date().getFullYear();
  const birthYearNum = parseInt(studentBirthYear);
  const isBirthYearValid = studentBirthYear === "" || (
    !isNaN(birthYearNum) && 
    birthYearNum >= 1900 && 
    birthYearNum <= currentYear &&
    birthYearNum.toString().length === 4
  );

  // 학원 목록 불러오기
  useEffect(() => {
    loadInitialAcademy();
  }, [loadInitialAcademy]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true); // 로딩 시작

    // 아이디 형식 검증
    if (!isUserIdValid) {
      alert("아이디는 영문자와 특수문자만 사용 가능합니다.");
      setIsLoading(false); // 로딩 종료
      return;
    }

    // 전화번호 형식 검증
    if (!isPhoneValid) {
      alert("올바른 전화번호 형식을 입력해주세요.");
      setIsLoading(false); // 로딩 종료
      return;
    }

    // 비밀번호 일치 검증
    if (!isPasswordMatch) {
      alert("비밀번호가 일치하지 않습니다.");
      setIsLoading(false); // 로딩 종료
      return;
    }

    // 출생년도 검증
    if (!isBirthYearValid) {
      alert("올바른 출생년도를 입력해주세요.");
      setIsLoading(false); // 로딩 종료
      return;
    }

    const signUpData = {
      userId,
      userPassword,
      userCheckPassword,
      studentName,
      studentPhone,
      studentHighschool,
      studentBirthYear,
      academyId,
    };

    try {
      const res = await fetch("/api/member/signUpCombined", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(signUpData),
      });

      const result = await res.json();

      if (result.success) {
        alert("회원가입이 완료되었습니다. 로그인 페이지로 이동합니다.");
        router.push("/home/signIn");
      } else {
        alert("회원가입 실패: " + (result.message || "알 수 없는 오류"));
      }
    } catch (err: any) {
      alert("회원가입 중 오류가 발생했습니다: " + (err.message || ""));
    } finally {
      setIsLoading(false); // 로딩 종료
    }
  };

  if (step === 1) {
    return (
      <div className="min-h-screen bg-gray-50 to-purple-50 flex items-center justify-center p-6 relative">
        <BackgroundDot />
        <div className="w-full max-w-md relative">
          {/* Header Section */}
          <div className="text-center mb-8">
            <div className="inline-block p-3 bg-indigo-100 rounded-full mb-4">
              <div className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center">
                <span className="text-white text-lg">✨</span>
              </div>
            </div>
            <h1 className="text-3xl text-gray-900 mb-2 font-sansKR-SemiBold">
              환영합니다
            </h1>
            <p className="text-gray-600 font-sansKR-SemiBold">
              새로운 계정을 만들어보세요
            </p>
            {/* Step Indicator */}
            <div className="flex items-center justify-center mt-4 space-x-2">
              <div className="w-3 h-3 bg-indigo-600 rounded-full"></div>
              <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
            </div>
          </div>

          {/* Form Card */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
            <div className="space-y-6">
              {/* Member ID Field */}
              <div>
                <label className="block text-sm text-gray-700 mb-2">
                  아이디
                </label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="영문자와 특수문자만 사용 가능"
                    value={userId}
                    onChange={(e) => {
                      const value = e.target.value;
                      // 영어 대소문자, 숫자와 특수문자만 허용
                      if (value === "" || /^[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/.test(value)) {
                        setUserId(value);
                      }
                    }}
                    required
                    className={`font-sansKR-Light w-full h-12 px-4 py-3 bg-gray-50 border rounded-xl focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200 placeholder-gray-400 ${
                      userId && !isUserIdValid 
                        ? "border-red-300 focus:ring-red-500" 
                        : "border-gray-200 focus:ring-gray-500"
                    }`}
                  />
                </div>
                {userId && !isUserIdValid && (
                  <p className="text-red-500 text-sm mt-1">
                    아이디는 영문자와 특수문자만 사용 가능합니다.
                  </p>
                )}
              </div>

              {/* Password Field */}
              <div>
                <label className="block text-sm text-gray-700 mb-2">
                  비밀번호
                </label>
                <div className="relative">
                  <input
                    type="password"
                    placeholder="안전한 비밀번호를 입력해주세요"
                    value={userPassword}
                    onChange={(e) => setUserPassword(e.target.value)}
                    required
                    className="font-sansKR-Light w-full h-12 px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all duration-200 placeholder-gray-400"
                  />
                </div>
              </div>

              {/* Password Confirm Field */}
              <div>
                <label className="block text-sm text-gray-700 mb-2">
                  비밀번호 확인
                </label>
                <div className="relative">
                  <input
                    type="password"
                    placeholder="입력하신 비밀번호를 다시 입력해주세요"
                    value={userCheckPassword}
                    onChange={(e) => setUserCheckPassword(e.target.value)}
                    required
                    className={`font-sansKR-Light w-full h-12 px-4 py-3 bg-gray-50 border rounded-xl focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200 placeholder-gray-400 ${
                      userCheckPassword && !isPasswordMatch 
                        ? "border-red-300 focus:ring-red-500" 
                        : "border-gray-200 focus:ring-gray-500"
                    }`}
                  />
                </div>
                {userCheckPassword && !isPasswordMatch && (
                  <p className="text-red-500 text-sm mt-1">비밀번호가 일치하지 않습니다.</p>
                )}
              </div>

              {/* Submit Button */}
              <button
                onClick={() => {
                  if (isStep1Valid) {
                    setStep(2);
                  } else {
                    alert("모든 필드를 올바르게 입력해주세요.");
                  }
                }}
                disabled={!isStep1Valid}
                className={`w-full h-12 rounded-xl shadow-lg focus:outline-none transition-all duration-200 ${
                  isStep1Valid
                    ? "bg-gradient-to-br from-gray-700 to-gray-900 text-white hover:scale-[1.02]"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
              >
                다음 단계
              </button>
            </div>

            {/* Footer */}
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-500">
                이미 계정이 있으신가요?{" "}
                <Link
                  href={"/home/signIn"}
                  className="font-sansKR-SemiBold text-gray-800 hover:text-gray-900 hover:font-sansKR-Bold"
                >
                  로그인하기
                </Link>
              </p>
            </div>
          </div>

          {/* Bottom Text */}
          <div className="text-center mt-6">
            <p className="text-xs text-gray-500">
              회원가입을 진행하시면{" "}
              <button className="text-indigo-600 hover:underline">
                이용약관
              </button>
              과{" "}
              <button className="text-indigo-600 hover:underline">
                개인정보처리방침
              </button>
              에 동의하는 것으로 간주됩니다.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Step 2: 학생 정보 입력
  return (
    <div className="min-h-screen bg-gray-50 to-purple-50 flex items-center justify-center p-6 relative">
      <BackgroundDot />
      <div className="w-full max-w-md relative">
        {/* Header Section */}
        <div className="text-center mb-8 mt-[90px]">
          <div className="inline-block p-3 bg-indigo-100 rounded-full mb-4">
            <div className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center">
              <span className="text-white text-lg">📚</span>
            </div>
          </div>
          <h1 className="text-3xl text-gray-900 mb-2 font-sansKR-SemiBold">
            거의 다 왔습니다!!
          </h1>
          <p className="text-gray-600 font-sansKR-SemiBold">
            추가 정보를 입력해주세요
          </p>
          {/* Step Indicator */}
          <div className="flex items-center justify-center mt-4 space-x-2">
            <div className="w-3 h-3 bg-indigo-600 rounded-full"></div>
            <div className="w-3 h-3 bg-indigo-600 rounded-full"></div>
          </div>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
          <div className="space-y-6">
            {/* Academy Select */}
            <div>
              <label className="block text-sm text-gray-700 mb-2">
                학원 선택
              </label>
              <div className="relative">
                <select
                  value={academyId}
                  onChange={(e) => setAcademyId(Number(e.target.value))}
                  required
                  className="font-sansKR-Light w-full h-12 px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all duration-200 appearance-none"
                >
                  <option value="">학원을 선택해주세요</option>
                  {academys.map((academy: Academy) => (
                    <option
                      key={academy.academyId}
                      value={academy.academyId}
                      disabled={isLoading}
                    >
                      {academy.academyName}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Student Name */}
            <div>
              <label className="block text-sm text-gray-700 mb-2">이름</label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="이름을 입력해주세요"
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  disabled={isLoading}
                  required
                  className="font-sansKR-Light w-full h-12 px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all duration-200 placeholder-gray-400"
                />
              </div>
            </div>

            {/* Student Phone */}
            <div>
              <label className="block text-sm text-gray-700 mb-2">
                전화번호
              </label>
              <div className="relative">
                <input
                  type="tel"
                  placeholder="하이픈 없이 입력해주세요."
                  value={studentPhone}
                  onChange={(e) => {
                    // 숫자만 입력 가능하도록
                    const value = e.target.value.replace(/[^0-9]/g, '');
                    setStudentPhone(value);
                  }}
                  disabled={isLoading}
                  required
                  className={`font-sansKR-Light w-full h-12 px-4 py-3 bg-gray-50 border rounded-xl focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200 placeholder-gray-400 ${
                    studentPhone && !isPhoneValid 
                      ? "border-red-300 focus:ring-red-500" 
                      : "border-gray-200 focus:ring-gray-500"
                  }`}
                />
              </div>
              {studentPhone && !isPhoneValid && (
                <p className="text-red-500 text-sm mt-1">
                  올바른 전화번호 형식이 아닙니다. (예: 01012345678)
                </p>
              )}
            </div>

            {/* Birth Year */}
            <div>
              <label className="block text-sm text-gray-700 mb-2">
                출생년도
              </label>
              <div className="relative">
                <input
                  type="number"
                  placeholder="출생년도를 입력해주세요"
                  value={studentBirthYear}
                  onChange={(e) => {
                    const value = e.target.value;
                    // 4자리 숫자만 입력 가능하도록
                    if (value === "" || (value.length <= 4 && /^\d+$/.test(value))) {
                      setStudentBirthYear(value);
                    }
                  }}
                  disabled={isLoading}
                  required
                  min="1900"
                  max={currentYear}
                  className={`font-sansKR-Light w-full h-12 px-4 py-3 bg-gray-50 border rounded-xl focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200 placeholder-gray-400 ${
                    studentBirthYear && !isBirthYearValid 
                      ? "border-red-300 focus:ring-red-500" 
                      : "border-gray-200 focus:ring-gray-500"
                  }`}
                />
              </div>
              {studentBirthYear && !isBirthYearValid && (
                <p className="text-red-500 text-sm mt-1">
                  {birthYearNum < 1900 
                    ? "출생년도는 1900년 이후여야 합니다." 
                    : birthYearNum > currentYear 
                    ? `출생년도는 ${currentYear}년 이하여야 합니다.`
                    : "올바른 출생년도를 입력해주세요. (예: 2005)"
                  }
                </p>
              )}
            </div>

            {/* High School (Optional) */}
            <div>
              <label className="block text-sm text-gray-700 mb-2">
                고등학교
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="줄임말X (양천고X , 양천고등학교O)"
                  value={studentHighschool}
                  onChange={(e) => setStudentHighschool(e.target.value)}
                  disabled={isLoading}
                  required
                  className="font-sansKR-Light w-full h-12 px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all duration-200 placeholder-gray-400"
                />
              </div>
            </div>
            {/* Buttons */}
            <div className="space-y-3">
              {/* Previous Button */}
              <button
                type="button"
                onClick={() => setStep(1)}
                className="w-full h-12 bg-gray-100 text-gray-700 rounded-xl border border-gray-200 focus:outline-none hover:bg-gray-200 transition-all duration-200"
              >
                이전 단계
              </button>
              
              {/* Submit Button */}
              <button
                onClick={handleSubmit}
                disabled={isLoading || !isPhoneValid || !isBirthYearValid}
                className={`w-full h-12 rounded-xl shadow-lg focus:outline-none transition-all duration-200 flex items-center justify-center ${
                  isLoading || !isPhoneValid || !isBirthYearValid
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-gradient-to-br from-gray-700 to-gray-900 text-white hover:scale-[1.02]"
                }`}
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2">
                    </div>
                    회원가입 중...
                  </>
                ) : (
                  "회원가입 완료"
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Text */}
        <div className="text-center mt-6">
          <p className="text-xs text-gray-500">
            회원가입을 진행하시면{" "}
            <button className="text-indigo-600 hover:underline">
              이용약관
            </button>
            과{" "}
            <button className="text-indigo-600 hover:underline">
              개인정보처리방침
            </button>
            에 동의하는 것으로 간주됩니다.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
