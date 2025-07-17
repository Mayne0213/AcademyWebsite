"use client";

import { SectionScale } from "./designSystem";

const HomePageActualAdvertising = (props: React.HTMLAttributes<HTMLDivElement>) => {

  return (
    <SectionScale {...props} className="py-20 px-6 z-20 bg-[#fdf1da]">
      <div className="max-w-7xl mx-auto text-center space-y-6 relative">
        <h1
          className={`text-2xl smalltablet:text-3xl tablet:text-4xl font-MaruBuri-Bold`}
        >
          선생님, 커리큘럼, 교재까지. <br />모든게 준비되었습니다.
        </h1>
        <h2 className="text-lg font-MaruBuri-Light">
          이제는 여러분 차례입니다.
        </h2>
      </div>
    </SectionScale>
  );
};

export default HomePageActualAdvertising;
