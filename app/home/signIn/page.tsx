import React from "react";
import BackgroundDot from "@/components/home/backgroundDot";
import LoginForm from "@/features/signIn/ui/LoginForm";

const LoginPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6 relative z-20 ">
      <BackgroundDot />

      <div className="w-full max-w-md relative font-sansKR-Regular">
        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="inline-block p-3 bg-indigo-100 rounded-full mb-4">
            <div className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center">
              🔐
            </div>
          </div>
          <h1 className="text-3xl text-gray-900 mb-2 font-sansKR-SemiBold">
            로그인
          </h1>
          <p className="text-gray-600 font-sansKR-SemiBold">
            계정에 로그인해주세요
          </p>
        </div>
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
