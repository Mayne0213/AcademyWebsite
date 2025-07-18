"use client";

import { Quote } from "lucide-react";
import { SectionUp } from "./designSystem";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import BackgroundGrayShape from "../backgroundGrayShelf";

const reviews = [
  { name: "김X미", title: "고3 - 문과", text: "처음 들을 때는 너무 쉬운가 싶지만 뒷부분 가면 결코 쉽지만은 않다 그래서 1-2등급도 바로 코드독해 하지 않고, 조교쌤들이 추천해주시는 대로 한줄독해부터 차근차근 하나씩 해나가면 뒷단계는 더 수월하게 할 수 있도록 기반을 다질 수 있는 것 같다 그리고 게시판 답변도 빠르고 공부 관련 상담도 자세히 해주셔서 상당히 만족하며 듣고있다 감사합니다!" },
  { name: "황X수", title: "고3 - 이과", text: "사실 어법이 어려워서 많이 피하고 있었는데 주혜연선생님 덕분에 문법의 중요성이랑 문장해석도 다시한번 중요하다고 생각하고 극복할 수 있었던 것 같아요! 선생님 책 꾸준히 복습해서 수능에서는 좋은 성적 받을게요!!! 선생님 사랑해요 : d" },
  { name: "이X연", title: "고1 - 문과", text: "다정한 기초영어랑 한줄독해를 방학때 들었는데 영어 기본문제만 겨우 맞추는 수준에서 20일만에 3등급 됐습니다.. 기적이예요 앞으로 남은 시간도 혜연선생님 커리 타려고요ㅋㅋ 더 올라갈일만 남은 것 같습니다 저에게 더 높은 목표를 설정하게 해주신 주혜연 선생님 감사합니다!" },
  { name: "주X", title: "", text: "순서삽입 유형에 부족한 분들이 들으시면 좋은 강의!! 판서 진짜 깔끔하고 되게 자세하게 본문 하나하나 다 해석해주심 교재도 짱 이쁨! 쭈쌤 늘 감사드려용 쌤 강의 저한테 도움 정말 많이 됬어요 순서삽입 문제들 쌤 방법대로 앞으로 열심히 해결해보도록 하겠습니당" },
  { name: "박X지", title: "재수 - 이과", text: "다른 선생님을 듣다가 이대로는 수능 때 점수 안나오겠다 싶어서 바꿨는데, 그 선택이 옳았다는 걸 증명하게 해주셔서 감사해요. 정말 과정이 힘들었는데 끝나고 나니 세상이 아름답게 보여요 ㅎㅎ 주혜연 선생님, 인강 때 친절하게 잘 이끌어주셔서, 영어를 어떻게 풀어야 할지 알려주셔서 다시 한번 정말 감사합니다!" },
  { name: "사X서", title: "", text: "한줄독해 끝내고 2주완성 시리즈까지 들었습니다! 기본적인 문장구조 파악도 제대로 못했던 저를 멱살잡고 끌어올려서 글의 유기적 독해까지 할 수 있게 되었어요. 특히 저는 순서삽입 문제가 많이 약했는데 이 강의 들으면서 기출 문제를 분석하고 생각 문제들 풀면서 문제를 풀어나가는 방법을 익힐 수 있어서 너무 좋았습니다" },
  { name: "권X찬", title: "재수 - 이과", text: "공통문부터 시작해서 드디어 빈칸이랑 순삽 완강했습니다!! 한줄독해에서 영어지문을 읽는 법 2주시리즈에서 문장의 흐름을 읽는법까지 도움을 많이 받았어요. 강의 시작할때마다 덕담해주시는 한마디 덕분에 여기까지 올 수 있었던 것 같습니다. 남은 기간동안 기출과 모의고사도 열심히 달려서 좋은 성적표로 돌아올겠습니다. 감사합니다.!!!" },
  { name: "남X인", title: "재수 - 문과", text: "코드독해 진짜 좋음… 처음에는 얇아서 이걸로 될까 싶었는데 너무 잘 짚어주시고 여태까지 내 독해 방법 부정 당함 정말 그지같이도 읽고 있었음 코드독해하고 심봉사 눈 뜨듯 답이 명확하게 보이고 시간 단축에 너무 좋음 등급 상관없이.. 정만 맘 먹고 들으면 3일 안에두 다 들을 수 있으니 꼬옥..들으시길" }
];

const STYLES = {
  container: [
    "pt-10 pb-16",
    "tablet:pt-12",
    "desktop:pt-16",
  ].join(" "),
  containers: [
    "mb-10 text-4xl",
    "smalltablet:text-5xl",
    "tablet:mb-12 tablet:text-5xl",
    "desktop:mb-16",
  ].join(" "),
  grid: "px-[20px] smalltablet:grid-cols-2 smalltablet:px-[5vw] tablet:grid-cols-3 tablet:px-[30px] desktop:grid-cols-4 desktop:px-[20px]",

};

const HomePageReviews = () => {
  return (
    <SectionUp className={`relative ${STYLES.container}`}>
      <BackgroundGrayShape />
      <h2 className={`text-center text-black font-MaruBuri-Bold ${STYLES.containers}`}>학생 후기</h2>
      <div className="block smalltablet:hidden px-[20px]">
        <Swiper
          modules={[Pagination]}
          pagination={{ clickable: true }}
          spaceBetween={20}
          slidesPerView={1}
          className="max-w-[350px]"
        >
          {reviews.map((review, idx) => (
            <SwiperSlide key={idx} className="mb-[70px]">
              <ReviewCard review={review} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className={`hidden smalltablet:grid gap-6 max-w-7xl mx-auto items-center justify-center justify-items-center auto-rows-fr ${STYLES.grid}`}>
        {reviews.map((review, idx) => (
          <ReviewCard key={idx} review={review} />
        ))}
      </div>
    </SectionUp>
  );
};

const ReviewCard = ({ review }: { review: { name: string; title: string; text: string } }) => (
  <article
    className="bg-white border border-gray-200 p-6 rounded-xl shadow-md flex flex-col justify-between h-[400px] smalltablet:h-[300px] max-w-sm group space-y-6 z-20"
  >
    <div className="flex items-center justify-center">
      <Quote className="text-yellow-400" />
    </div>
    <div className="text-gray-800 text-sm leading-relaxed font-MaruBuri-Regular overflow-y-hidden group-hover:overflow-y-auto">
      {review.text}
    </div>
    <div className="flex items-center justify-between">
      <div className="items-center font-MaruBuri-Bold">
        <p className="text-sm text-gray-900">{review.name}</p>
        <p className="text-xs text-gray-600">{review.title}</p>
      </div>
      <p className="text-sm text-gray-400">스크롤 하기</p>
    </div>
  </article>
);


export default HomePageReviews;
