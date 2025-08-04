"use client";

import { useAuth } from "@/contexts/authContexts";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";

export default function Navbar() {
  const { logout } = useAuth();

  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen((prev) => !prev);

  return (
    <header className="bg-white shadow-sm border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href={"/dashboard"}>
            <div className="text-xl text-gray-900 font-MaruBuri-Bold">
              현강 알리미
            </div>
          </Link>

          {/* 데스크탑용 메뉴 */}
          <nav className="hidden sm:flex items-center space-x-8">
            <a
              href="/dashboard/announcement"
              className="text-gray-600 hover:text-gray-900 text-sm transition"
            >
              공지사항
            </a>
            <a
              href="/dashboard/assets"
              className="text-gray-600 hover:text-gray-900 text-sm transition"
            >
              자료실
            </a>
            <a
              href="/dashboard/qnaBoard"
              className="text-gray-600 hover:text-gray-900 text-sm transition"
            >
              질문 게시판
            </a>
          </nav>

          {/* 우측 로그아웃 / 모바일 메뉴 */}
          <div className="flex items-center gap-4">
            {/* 로그아웃 버튼 */}
            <button
              onClick={logout}
              className="hidden sm:block text-sm text-gray-600 hover:text-gray-900 px-4 py-2 rounded-lg hover:bg-gray-50 transition"
            >
              로그아웃
            </button>

            {/* 모바일 메뉴 토글 */}
            <button
              onClick={toggleMenu}
              className="sm:hidden p-2 text-gray-700 hover:bg-gray-100 rounded-md"
            >
              <div className="relative w-5 h-5">
                <Menu
                  className={`w-5 h-5 absolute transition-all duration-300 ${
                    menuOpen
                      ? "opacity-0 rotate-180 scale-75"
                      : "opacity-100 rotate-0 scale-100"
                  }`}
                />
                <X
                  className={`w-5 h-5 absolute transition-all duration-300 ${
                    menuOpen
                      ? "opacity-100 rotate-0 scale-100"
                      : "opacity-0 rotate-180 scale-75"
                  }`}
                />
              </div>
            </button>
          </div>
        </div>

        {/* 모바일 메뉴 - 애니메이션 적용 */}
        <div
          className={`sm:hidden overflow-hidden transition-all duration-300 ease-in-out ${menuOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0"}`}
        >
          <nav className="space-y-1 px-2 pb-4 pt-2">
            <a
              href="/dashboard/announcement"
              className="block text-gray-600 hover:text-gray-900 text-sm px-3 py-3 rounded-md hover:bg-gray-100 transition-all duration-200 transform hover:translate-x-1"
              onClick={() => setMenuOpen(false)}
            >
              공지사항
            </a>
            <a
              href="/dashboard/assets"
              className="block text-gray-600 hover:text-gray-900 text-sm px-3 py-3 rounded-md hover:bg-gray-100 transition-all duration-200 transform hover:translate-x-1"
              onClick={() => setMenuOpen(false)}
            >
              자료실
            </a>
            <a
              href="/dashboard/qnaBoard"
              className="block text-gray-600 hover:text-gray-900 text-sm px-3 py-3 rounded-md hover:bg-gray-100 transition-all duration-200 transform hover:translate-x-1"
              onClick={() => setMenuOpen(false)}
            >
              질문 게시판
            </a>
            <div className="border-t border-gray-200 my-2"></div>
            <button
              onClick={() => {
                logout();
                setMenuOpen(false);
              }}
              className="w-full text-left text-gray-600 hover:text-gray-900 text-sm px-3 py-3 rounded-md hover:bg-gray-100 transition-all duration-200 transform hover:translate-x-1"
            >
              로그아웃
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
}
