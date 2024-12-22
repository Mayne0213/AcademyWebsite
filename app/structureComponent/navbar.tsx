"use client";

import React, { useState, useEffect } from "react";

import Link from "next/link";
import { usePathname } from "next/navigation";

import Image from "next/image";
import logo from "@/public/title.png";
import logoWithoutMark from "@/public/titleWIthoutMark.png";

import tabs from "@/components/tabs";
import academyInformation from "@/components/academyInformation";
import useDeviceDetect from "@/components/hooks/useMobileDetect";

import NextNProgress from "nextjs-toploader";
import Loading from "../loading";

import {
  MenuIcon,
  X,
  PhoneCallIcon,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

const Navbar: React.FC = () => {
  const route = usePathname();
  const deviceCondition = useDeviceDetect();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [openSubMenuTab, setOpenSubMenuTab] = useState<number>(-1);
  const backgroundShouldBeWhite =
    route === "/login" ||
    isScrolled ||
    (deviceCondition === 3 && (isHovered || isMenuOpen));

  const handleSubmenuTab = (index: number) => {
    setOpenSubMenuTab(index);
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 50);
      sessionStorage.setItem("isScrolled", isScrolled.toString());
    };

    setIsScrolled(sessionStorage.getItem("isScrolled") === "true");
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (deviceCondition === null) {
    return <Loading />;
  }

  return (
    <div className="z-[999999999999999999]">
      <NextNProgress
        color={backgroundShouldBeWhite ? "#1d4ed8" : "#ffffff"}
        height={backgroundShouldBeWhite ? 3 : 5}
        shadow={false}
      />

      {/* Navbar width, height, and background initialization */}
      <nav
        onMouseEnter={() => {
          setIsHovered(true);
        }}
        onMouseLeave={() => {
          setIsHovered(false);
        }}
        className={`${backgroundShouldBeWhite ? " bg-white border-gray-200 border-opacity-50" : "bg-transparent border-white border-opacity-5"}
                    ${deviceCondition === 0 ? "h-[50px]" : deviceCondition === 1 || deviceCondition === 2 ? "h-[70px]" : "h-[90px]"}
                    fixed z-[3] w-full flex items-center justify-end transition duration-300 border-b-2`}
      >
        {/* Logo */}
        <Link href={"/"}>
          <Image
            priority
            src={deviceCondition === 0 ? logoWithoutMark : logo}
            alt="Logo"
            width={deviceCondition === 0 ? 100 : 200}
            className={`absolute 
                        ${deviceCondition <= 2 ? "top-[-15px] left-[20px]" : "bottom-[0px] left-[30px]"}`}
            onClick={() => {
              setIsMenuOpen(false);
            }}
          />
        </Link>

        {/* Main Menu */}
        {deviceCondition === 3 && (
          <div className="text-md flex pt-[35px]">
            {tabs.map((tab, index) => (
              <div className={`cursor-pointer`} key={index}>
                {/* <Link className={cursor-pointer} href={tab.href} key={index}> */}
                <div
                  onMouseEnter={() => handleSubmenuTab(index)}
                  onMouseLeave={() => handleSubmenuTab(-1)}
                  onClick={() => setIsMenuOpen(false)}
                  className={`${index === 5 ? "" : "pr-12"} 
                            ${backgroundShouldBeWhite ? "text-black" : "text-white"}
                            
                            items-center justify-center
                            relative pb-[35px] cursor-pointer hover:text-blue-700 transition-all duration-300
                            before:absolute before:block before:h-[1.5px] before:bg-blue-700 before:left-0 before:bottom-0 before:top-[56.5px] before:w-0 hover:before:w-1/2 before:transition-all before:duration-300`}
                >
                  {tab.label}

                  {/* SubMenu (appears when you hover one of the corresponding mainMenu) */}
                  {!isMenuOpen && (
                    <div
                      className={`overflow-hidden absolute top-[58px] left-0 w-[130px] bg-white shadow-lg transition-all duration-300
                                  ${openSubMenuTab === index ? "opacity-100" : "opacity-0 pointer-events-none"} 
                                `}
                    >
                      {tab.submenu.map((item, subIndex) => (
                        <div
                          key={subIndex}
                          className={`hover:bg-gray-400 hover:bg-opacity-10 m-[5px]`}
                        >
                          {/* Error found */}
                          <Link
                            href={item.href}
                            className={`block text-gray-800 text-xs p-2 duration-300 hover:translate-x-1.5`}
                          >
                            {item.label}
                          </Link>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Hamburger icon */}
        {!isMenuOpen && (
          <MenuIcon
            style={{
              filter: backgroundShouldBeWhite ? "none" : "invert(100%)",
            }}
            width={30}
            height={30}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`${deviceCondition <= 2 ? "absolute right-[20px]" : "ml-[60px] mr-[40px] hover:bg-gray-300"}
                        rounded-sm transition-all duration-300 cursor-pointer `}
          />
        )}

        {/* X icon (When Hamburger icon is clicked) */}
        {deviceCondition === 3 && isMenuOpen && (
          <X
            width={30}
            height={30}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`ml-[60px] mr-[40px] hover:bg-gray-300 rounded-sm transition-all duration-300 cursor-pointer`}
          />
        )}
      </nav>

      {/* Hamburger Desktop icon function */}
      {deviceCondition === 3 && (
        <div
          className={`z-[2] fixed min-w-full h-[300px] border-b-2 border-gray-200 border-opacity-50 bg-white transition duration-500 px-[30px]
                      ${isMenuOpen ? "translate-y-[90px]" : "translate-y-[-300px]"}
                      overflow-x-auto`}
        >
          <div className="flex py-[20px] justify-between flex-shrink-0">
            {tabs.map((tab, index) => (
              <div key={index} className="flex-shrink-0">
                <Link
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  href={tab.href}
                  className={`font-sansKR-SemiBold block text-gray-600 transition duration-300 px-[100px] relative
                              ${index === 5 ? "hidden" : ""}
                              before:absolute before:w-[250px] before:top-0 before:bottom-[-10px] before:left-2 before:right-0  before:border-b-[2px] before:border-blue-300`}
                >
                  {tab.label}
                </Link>
                {tab.submenu.length > 0 && (
                  <div className="mt-4">
                    {tab.submenu.map((item, subIndex) => (
                      <Link
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        key={subIndex}
                        href={item.href}
                        className="block text-gray-600 hover:text-blue-700 text-sm pl-4 py-2"
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
      )}

      {/* Hamburger Mobile icon function */}
      {deviceCondition <= 2 && (
        <div>
          {/* Blurs background */}
          <div
            className={`fixed w-full h-full z-[3] bg-black transition-opacity duration-300
                           ${isMenuOpen ? "opacity-50" : "opacity-0 pointer-events-none"}`}
            onClick={() => (setIsMenuOpen(!isMenuOpen), setOpenSubMenuTab(-1))}
          ></div>

          <div
            className={`fixed w-[300px]  h-full z-[3] right-[0] bg-gray-50 shadow-lg transition-transform duration-300 
              ${isMenuOpen ? "translate-x-0" : "translate-x-full"}`}
          >
            <div className="flex text-sm h-[70px] items-center justify-between px-[20px] bg-gray-200">
              <Link href={"/login"} onClick={() => setIsMenuOpen(!isMenuOpen)}>
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
              <div
                className="flex bg-red-700 h-[60px] rounded-sm text-center text-white items-center justify-center font-sansKR-SemiBold cursor-pointer"
                onClick={() => {}}
              >
                <PhoneCallIcon className="mr-[8px]"></PhoneCallIcon>
                {academyInformation.phoneNumber}
              </div>

              <div className="py-[30px]">
                {tabs.map((tab, index) => (
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
                        {tab.submenu.map((item, subIndex) => (
                          <div key={subIndex}>
                            <Link
                              key={subIndex}
                              href={item.href}
                              onClick={() => {
                                setIsMenuOpen(!isMenuOpen);
                                setOpenSubMenuTab(-1);
                              }}
                              className={`px-[20px] block text-gray-600 text-left py-[2px]`}
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
      )}
    </div>
  );
};

export default Navbar;
