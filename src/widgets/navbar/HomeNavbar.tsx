"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/src/shared/ui/button";
import Link from "next/link";
import tabs from "@/src/widgets/navbar/model/HomeNavbarTabs";

import { MenuIcon, X, ChevronDown, ChevronUp } from "lucide-react";


const Logo = ({ onClick }: { onClick: () => void }) => (
  <Link href={"/home"} onClick={onClick}>
    <div
      className={`font-GangwonEdu-Bold
        pl-4 text-3xl smalltablet:pl-8 smalltablet:text-4xl desktop:pl-8 desktop:text-5xl text-[#092C4C]
        cursor-pointer`}
    >
      주혜연T
    </div>
  </Link>
);

const HamburgerDesktopMenu = ({
  isMenuOpen,
  setIsMenuOpen,
}: {
  isMenuOpen: boolean;
  setIsMenuOpen: (value: boolean) => void;
}) => {

  return (
    <div
      className={`hidden tablet:block fixed min-w-full h-[300px] border-b-2 border-gray-200 border-opacity-50 bg-white transition duration-500 p-[30px]
                  ${isMenuOpen ? "tablet:translate-y-[70px] desktop:translate-y-[90px]" : "translate-y-[-300px]"}
                  overflow-x-uto`}
    >
      <div className="flex">
        {tabs.map((tab: any, index: number) => (
          <div key={index} className="w-1/4 flex flex-col px-[20px]">
            <Link
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              href={tab.href}
              className={`text-lg text-gray-600 w-full text-center pb-[10px]
                          border-b-2 border-blue-200`}
            >
              {tab.label}
            </Link>
            {tab.submenu.length > 0 && (
              <div className="mt-4">
                {tab.submenu.map((item: any, subIndex: number) => (
                  <Link
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    key={subIndex}
                    href={item.href}
                    className="block text-gray-600 hover:text-blue-700 text-base pl-4 py-1 font-MaruBuri-SemiBold"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

const HamburgerMobileMenu = ({
  isMenuOpen,
  setIsMenuOpen,
  openSubMenuTab,
  setOpenSubMenuTab,
  handleSubmenuTab,
}: {
  isMenuOpen: boolean;
  setIsMenuOpen: (value: boolean) => void;
  openSubMenuTab: number;
  setOpenSubMenuTab: (value: number) => void;
  handleSubmenuTab: (index: number) => void;
}) => {
  return (
    <div className="block tablet:hidden">
      <div
        className={`fixed w-full h-full z-[3] bg-black transition-opacity duration-300
                       ${isMenuOpen ? "opacity-50" : "opacity-0 pointer-events-none"}`}
        onClick={() => (setIsMenuOpen(!isMenuOpen), setOpenSubMenuTab(-1))}
      />

      <div
        className={`fixed w-[300px]  h-full z-[3] right-[0] bg-gray-50 shadow-lg transition-transform duration-300
          ${isMenuOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex text-sm h-[70px] items-center justify-between px-[20px] bg-gray-200">
          <Link
            href={"/home/signIn"}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            로그인
          </Link>
          <X
            width={30}
            height={30}
            onClick={() => (
              setIsMenuOpen(!isMenuOpen), setOpenSubMenuTab(-1)
            )}
            className="cursor-pointer"
          />
        </div>
        <div className="p-[20px]">
          <div>
            {tabs.map((tab: any, index: number) => (
              <div key={index}>
                <hr className="border-gray-200" />
                <div key={index} className="my-[17px]">
                  <div className="px-[10px] flex items-center justify-between text-lg">
                    <Link
                      className="cursor-pointer"
                      href={tab.href}
                      onClick={() => {
                        setIsMenuOpen(!isMenuOpen);
                        setOpenSubMenuTab(-1);
                      }}
                    >
                      {tab.label}
                    </Link>
                    {openSubMenuTab === index ? (
                      <ChevronUp
                        className="cursor-pointer"
                        onClick={() => handleSubmenuTab(-1)}
                      />
                    ) : (
                      <ChevronDown
                        className="cursor-pointer"
                        onClick={() => handleSubmenuTab(index)}
                      />
                    )}
                  </div>
                  <div
                    className={`transition-all duration-500 overflow-hidden
                                  ${openSubMenuTab === index ? "max-h-[150px]" : "max-h-0"}`}
                  >
                    <div className="h-[10px] pointer-events-none transition-none" />
                    {tab.submenu.map((item: any, subIndex: number) => (
                      <div key={subIndex}>
                        <Link
                          key={subIndex}
                          href={item.href}
                          onClick={() => {
                            setIsMenuOpen(!isMenuOpen);
                            setOpenSubMenuTab(-1);
                          }}
                          className={`px-[20px] block text-gray-600 text-left py-[2px] font-MaruBuri-Light`}
                        >
                          {item.label}
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const SubMenu = ({
  tab,
  index,
  openSubMenuTab,
  isMenuOpen
}: {
  tab: any;
  index: number;
  openSubMenuTab: number;
  isMenuOpen: boolean;
}) => {
  if (isMenuOpen) return null;

  return (
    <div
      className={`overflow-hidden absolute top-[58px] left-0 w-[130px] bg-white shadow-lg transition-all duration-300
                  ${openSubMenuTab === index ? "opacity-100" : "opacity-0 pointer-events-none"}
                `}
    >
      {tab.submenu.map((item: any, subIndex: number) => (
        <div
          key={subIndex}
          className={`hover:bg-gray-400 hover:bg-opacity-10 m-[5px]`}
        >
          <Link
            href={item.href}
            className={`block text-gray-800 text-xs p-2 duration-300 hover:translate-x-1.5`}
          >
            {item.label}
          </Link>
        </div>
      ))}
    </div>
  );
};

const MainMenu = ({
  handleSubmenuTab,
  openSubMenuTab,
  backgroundShouldBeWhite,
  setIsMenuOpen
}: {
  handleSubmenuTab: (index: number) => void;
  openSubMenuTab: number;
  backgroundShouldBeWhite: boolean;
  setIsMenuOpen: (value: boolean) => void;
}) => {
  return (
    <div className="hidden tablet:flex text-md pt-[35px] items-center justify-center">
      <div className={`flex`}>
        {tabs.map((tab, index) => (
          <div className={`cursor-pointer`} key={index}>
            <div
              onMouseEnter={() => handleSubmenuTab(index)}
              onMouseLeave={() => handleSubmenuTab(-1)}
              onClick={() => setIsMenuOpen(false)}
              className={`pr-12
                        ${backgroundShouldBeWhite ? "text-black" : "text-black"}

                        items-center justify-center
                        relative pb-[35px] cursor-pointer hover:text-blue-700 transition-all duration-300
                        before:absolute before:block before:h-[1.5px] before:bg-blue-700 before:left-0 before:bottom-0 before:top-[56.5px] before:w-0 hover:before:w-1/2 before:transition-all before:duration-300`}
            >
              {tab.label}

              <SubMenu
                tab={tab}
                index={index}
                openSubMenuTab={openSubMenuTab}
                isMenuOpen={false}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const useScrollEffect = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const newIsScrolled = scrollTop > 50;
      setIsScrolled(newIsScrolled);
      sessionStorage.setItem("isScrolled", newIsScrolled.toString());
    };

    setIsScrolled(sessionStorage.getItem("isScrolled") === "true");
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return isScrolled;
};

const Navbar: React.FC = () => {
  const isScrolled = useScrollEffect();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openSubMenuTab, setOpenSubMenuTab] = useState<number>(-1);
  const Hamburger = isMenuOpen ? X : MenuIcon;
  const backgroundShouldBeWhite = isScrolled || isMenuOpen

  const handleSubmenuTab = (index: number) => {
    setOpenSubMenuTab(index);
  };

  return (
    <div className="relative font-MaruBuri-Bold z-50">
      <nav
        className={`${backgroundShouldBeWhite ? " bg-white border-gray-200 border-opacity-50" : "bg-transparent border-white border-opacity-5"}
                    h-[50px] smalltablet:h-[70px] desktop:h-[90px]
                    fixed z-[3] w-full flex items-center justify-between transition duration-300 border-b-2 hover:bg-white`}
      >
        <Logo onClick={() => { setIsMenuOpen(false); }} />

        <div className={`flex items-center justify-between`}>

          <div className="hidden">
          <MainMenu
            handleSubmenuTab={handleSubmenuTab}
            openSubMenuTab={openSubMenuTab}
            backgroundShouldBeWhite={backgroundShouldBeWhite}
            setIsMenuOpen={setIsMenuOpen}
          />
          </div>

          <Button
            asChild
            className="transition-all duration-300 bg-black mr-6 #hidden tablet:block"
          >
            <Link href="/home/signIn">로그인</Link>
          </Button>

          <div className="hidden">
          <Hamburger
            width={30}
            height={30}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="
            rounded-sm transition-all duration-300 cursor-pointer hover:bg-gray-300 absolute right-[20px] tablet:relative tablet:right-0 tablet:mr-[40px]"
            />
          </div>
        </div>
      </nav>

      <HamburgerDesktopMenu
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
      />

      <HamburgerMobileMenu
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        openSubMenuTab={openSubMenuTab}
        setOpenSubMenuTab={setOpenSubMenuTab}
        handleSubmenuTab={handleSubmenuTab}
      />
    </div>
  );
};

export default Navbar;
