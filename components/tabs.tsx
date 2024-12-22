import greetings from "/public/home/subNavbar/greetings.webp";
import system from "/public/home/subNavbar/system.webp";
import board from "/public/home/subNavbar/board.webp";
import reservation from "/public/home/subNavbar/reservation.jpg";

const tabs = [
  {
    label: "학원 안내",
    href: "/greetings",
    imageHref: greetings,
    sectionIndex: 0,
    submenu: [
      {
        label: "인사말",
        englishLabel: "GREETINGS",
        href: "/greetings",
        description: "",
      },
      {
        label: "!연혁",
        englishLabel: "INTRODUCTION",
        href: "/introduction",
        description: "",
      },
      {
        label: "둘러보기",
        englishLabel: "VIEW",
        href: "/view",
        description: "",
      },
      {
        label: "오시는 길",
        englishLabel: "MAP",
        href: "/map",
        description: "",
      },
    ],
  },
  {
    label: "커리큘럼",
    href: "/system",
    imageHref: system,
    sectionIndex: 1,
    submenu: [
      {
        label: "!학원 시스템",
        englishLabel: "SYSTEM",
        href: "/system",
        description: "",
      },
      {
        label: "!정규 수업",
        englishLabel: "REGULAR",
        href: "/regular",
        description: "",
      },
      {
        label: "!내신 수업",
        englishLabel: "ADMISSION",
        href: "/admission",
        description: "",
      },
      {
        label: "!수능 수업",
        englishLabel: "SAT",
        href: "/sat",
        description: "",
      },
    ],
  },
  {
    label: "학원 소식",
    href: "/board",
    imageHref: board,
    sectionIndex: 2,
    submenu: [
      {
        label: "성공 사례",
        englishLabel: "BOARD",
        href: "/board",
        description: `기재된 학생들 외 수많은 학생들의 성공사례를 보유하고 있으나, 
          온라인 공개를 원하지 않는 학생들의 사례는 업로드 되어있지 않습니다. 
          더 많은 대학별 합격사례는 학원 앞에서 확인하실 수 있습니다.`,
      },
      {
        label: "수강료 납부",
        englishLabel: "PAYMENT",
        href: "/payment",
        description: `학부모님의 귀한 자녀를 맡겨 주셔서 감사합니다. 
          보내주신 수강료가 헛되이 사용되지 않도록 최선을 다해 지도하겠습니다.
          원활한 학원의 운영을 위하여 수강료는 매월 1일까지 등록해 주시면 됩니다.`,
      },
    ],
  },
  {
    label: "상담 문의",
    href: "/reservation",
    imageHref: reservation,
    sectionIndex: 3,
    submenu: [
      {
        label: "상담 예약",
        englishLabel: "RESERVATION",
        href: "/reservation",
        description: `학원에 대한 궁금증부터 학습에 대한 고민, 고등학교와 대학 진로에 대한 궁금증까지 무엇이든 물어보세요.`,
      },
      {
        label: "!레벨 테스트",
        englishLabel: "LEVEL TEST",
        href: "/test",
        description: "",
      },
    ],
  },
  {
    label: "재원생 전용",
    href: "/homework",
    imageHref: system,
    sectionIndex: 4,
    submenu: [
      {
        label: "오늘의 숙제",
        englishLabel: "HOMEWORK",
        href: "/homework",
        description: "",
      },
      {
        label: "리스닝 파일",
        englishLabel: "LISTENING",
        href: "/listening",
        description: "",
      },
      {
        label: "성적 관리",
        englishLabel: "GRADE",
        href: "/grade",
        description: "",
      },
    ],
  },
  {
    label: "교직원 전용",
    href: "#",
    imageHref: system,
    sectionIndex: 5,
    submenu: [],
  },
];

export default tabs;
