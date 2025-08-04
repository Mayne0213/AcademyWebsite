const tabs = [
  {
    label: "학원소개",
    href: "/home/greetings",
    imageHref: "/homeCopy/subNavbar/greetings.webp",
    sectionIndex: 0,
    submenu: [
      {
        label: "인사말",
        englishLabel: "GREETINGS",
        href: "/home/greetings",
        description: "",
      },
      {
        label: "둘러보기",
        englishLabel: "VIEW",
        href: "/home/view",
        description: "",
      },
      {
        label: "오시는 길",
        englishLabel: "MAP",
        href: "/home/map",
        description: "",
      },
    ],
  },
  {
    label: "커리큘럼",
    href: "/home/system",
    imageHref: "/homeCopy/subNavbar/system.webp",
    sectionIndex: 1,
    submenu: [
      {
        label: "특강",
        englishLabel: "SPECIAL",
        href: "/home/special",
        description: "",
      },
      {
        label: "중등반",
        englishLabel: "MIDDLESCHOOL",
        href: "/home/middleStudent",
        description: "",
      },
      {
        label: "고등반",
        englishLabel: "HIGHSCHOOL",
        href: "/home/highStudent",
        description: "",
      },
    ],
  },
  {
    label: "학원소식",
    href: "/home/board",
    imageHref: "/homeCopy/subNavbar/board.webp",
    sectionIndex: 2,
    submenu: [
      {
        label: "성공 사례",
        englishLabel: "BOARD",
        href: "/home/board",
        description: `기재된 학생들 외 수많은 학생들의 성공사례를 보유하고 있으나, 
          온라인 공개를 원하지 않는 학생들의 사례는 업로드 되어있지 않습니다. 
          더 많은 대학별 합격사례는 학원 앞에서 확인하실 수 있습니다.`,
      },
      {
        label: "수강료 납부",
        englishLabel: "PAYMENT",
        href: "/home/payment",
        description: `학부모님의 귀한 자녀를 맡겨 주셔서 감사합니다. 
          보내주신 수강료가 헛되이 사용되지 않도록 최선을 다해 지도하겠습니다.
          원활한 학원의 운영을 위하여 수강료는 매월 1일까지 등록해 주시면 됩니다.`,
      },
    ],
  },
  {
    label: "등록안내",
    href: "/home/reservation",
    imageHref: "/homeCopy/subNavbar/reservation.jpg",
    sectionIndex: 3,
    submenu: [
      {
        label: "상담 예약",
        englishLabel: "RESERVATION",
        href: "/home/reservation",
        description: `학원에 대한 궁금증부터 학습에 대한 고민, 고등학교와 대학 진로에 대한 궁금증까지 무엇이든 물어보세요.`,
      },
      {
        label: "!레벨 테스트",
        englishLabel: "LEVEL TEST",
        href: "/home/test",
        description: "",
      },
    ],
  },
];

export default tabs; 