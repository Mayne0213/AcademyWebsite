"use client";

import React, { useState } from "react";
import { useAuth } from "@/contexts/authContexts";
import Link from "next/link";
import BackgroundDot from "@/components/home/backgroundDot";
import { UserInfo } from "@/components/type/userInfoType";

const LoginPage = () => {
  const [userId, setUserId] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true); // 로딩 시작

    try {
      const res = await fetch("/api/member/signIn", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, userPassword }),
        credentials: "include",
      });

      const result = await res.json();

      if (result.success) {
        login(result.user as UserInfo);
      } else {
        setIsLoading(false); // 실패 시 로딩 종료
        alert(result.message || "로그인 실패");
      }
    } catch (err) {
      setIsLoading(false); // 에러 시 로딩 종료
      alert("로그인 도중 오류가 발생했습니다.");
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6 relative">
      <BackgroundDot />

      <div className="w-full max-w-md relative">
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

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm text-gray-700 mb-2">아이디</label>
              <input
                type="text"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                required
                disabled={isLoading} // 로딩 중 비활성화
                placeholder="아이디를 입력해주세요"
                className="font-sansKR-Light w-full h-12 px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-500 disabled:opacity-50"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-700 mb-2">
                비밀번호
              </label>
              <input
                type="password"
                value={userPassword}
                onChange={(e) => setUserPassword(e.target.value)}
                required
                disabled={isLoading} // 로딩 중 비활성화
                placeholder="비밀번호를 입력해주세요"
                className="font-sansKR-Light w-full h-12 px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-500 disabled:opacity-50"
              />
            </div>

            <div className="flex items-center justify-between text-sm">
              <Link
                href={"/home/signUp"}
                className="text-gray-600 hover:text-gray-700 hover:underline"
              >
                회원가입
              </Link>
              <div className="flex items-center space-x-2 text-gray-600">
                <Link
                  href={"/signIn/idFind"}
                  className="hover:underline hover:text-gray-700"
                >
                  아이디 찾기
                </Link>
                <span className="text-gray-300">|</span>
                <Link
                  href={"/signIn/pwFind"}
                  className="hover:underline hover:text-gray-700"
                >
                  비밀번호 찾기
                </Link>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading} // 로딩 중 비활성화
              className="w-full h-12 bg-gradient-to-br from-gray-700 to-gray-900 text-white rounded-xl shadow-lg hover:scale-[1.02] transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  로그인 중...
                </>
              ) : (
                "로그인"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
