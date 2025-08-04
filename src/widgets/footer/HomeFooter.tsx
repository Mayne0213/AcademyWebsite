import Link from "next/link";
import tabs from "../navbar/model/HomeNavbarTabs";

const HomeFooter = () => {

  return (
    <footer className="bg-gray-800 text-white p-10 font-sansKR-Regular">
      <div className="hidden #tablet:flex">
        {tabs.map((tab, index) => (
          <div
            key={index}
            className={`${index === 0 ? "ml-[10px]" : ""}
                        tablet:text-sm tablet:mr-12 desktop:text-base desktop:mr-16
                        text-white cursor-pointer hover:font-sansKR-Bold`}
          >
            <Link href={tab.href}>{tab.label}</Link>
          </div>
        ))}
      </div>

      <hr
        className="hidden tablet:block px-1 my-6 border-gray-500"
      />

      <div className="text-xs ml-[10px]">
        <div
          className="text-center tablet:text-left text-gray-200 whitespace-pre"
        >

        </div>
        <div
          className="text-gray-400 tablet:text-left tablet:mt-5 text-center"
        >
          COPYRIGHTⓒ 꽃필날 연구소 All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default HomeFooter;
