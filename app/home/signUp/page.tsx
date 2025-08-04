"use client";

import React from "react";
import BackgroundDot from "@/src/shared/ui/BackgroundDot";
import SignUpForm from "@/src/features/signUp/ui/SignUpForm";

const SignUpPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 to-purple-50 flex items-center justify-center p-6 relative ">
      <BackgroundDot />
      <div className="w-full max-w-md relative font-sansKR-Regular">
        {/* Header Section */}
        <div className="text-center mt-[120px] mb-8">
          <div className="inline-block p-3 bg-indigo-100 rounded-full mb-4">
            <div className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center">
              🔐
            </div>
          </div>
          <h1 className="text-3xl text-gray-900 mb-2 font-sansKR-SemiBold">
            환영합니다
          </h1>
          <p className="text-gray-600 font-sansKR-SemiBold">
            새로운 계정을 만들어보세요.
          </p>
        </div>
        <SignUpForm />

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
