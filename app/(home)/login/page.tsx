"use client";

import React, { useState } from "react";
import Link from "next/link";

const LoginPage = () => {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // 로그인 처리 로직을 여기에 추가하세요
  };

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center">
      <h1 className="text-4xl font-sansKR-Bold mb-6 text-gray-800">로그인</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="id"
            id="id"
            value={userId}
            onChange={(e) => setUserId(e.target.value)} 
            required
            className="w-[400px] h-[50px] px-3 py-2 border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <div>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-[400px] h-[50px] px-3 py-2 border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <div className="text-sm text-end flex items-end justify-end">
          <Link
            href={"/login/idFind"}
            className="hover:cursor-pointer hover:text-gray-400 transition-all duration-200"
          >
            아이디 찾기
          </Link>
          <div className="px-1">|</div>
          <Link
            href={"/login/pwFind"}
            className="hover:cursor-pointer hover:text-gray-400 transition-all duration-200"
          >
            비밀번호 찾기
          </Link>
        </div>
        <button
          type="submit"
          className="w-[400px] h-[50px] bg-indigo-600 text-white py-2 px-4 shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          로그인
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
