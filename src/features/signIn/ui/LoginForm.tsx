"use client";

import React, { useState } from "react";
import { useAuth } from "@/src/app/providers";
import Link from "next/link";
import { Button } from "@/src/shared/ui/button";


const LoginForm = () => {
  const [userId, setUserId] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const { login, isLoading, error } = useAuth();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    await login(userId, userPassword);
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm text-gray-700 mb-2">아이디</label>
          <input
            type="text"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            required
            disabled={isLoading}
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
            disabled={isLoading}
            placeholder="비밀번호를 입력해주세요"
            className="font-sansKR-Light w-full h-12 px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-500 disabled:opacity-50"
          />
        </div>

        {/* 에러 메시지 인라인 표시 */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-3">
            <p className="text-red-600 text-sm font-sansKR-Regular">
              {error}
            </p>
          </div>
        )}

        <div className="flex items-center justify-between text-sm">
          <Link
            href={"/home/signUp"}
            className="text-gray-600 hover:text-gray-700 hover:underline"
          >
            회원가입
          </Link>
        </div>

        <Button
          type="submit"
          disabled={isLoading}
          className="w-full h-12 bg-gradient-to-br from-gray-700 to-gray-900 text-white rounded-xl shadow-lg hover:scale-[1.02] transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center"
        >
          {isLoading ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
              로그인 중...
            </>
          ) : (
            "로그인"
          )}
        </Button>
      </form>
    </div>
  );
};

export default LoginForm;