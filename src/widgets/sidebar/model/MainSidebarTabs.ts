import {
  IdCard,
  Calendar,
  Megaphone,
  File,
  FileX,
  FileText,
  Users,
  LucideBookMarked,
  GraduationCap,
  MessageCircle,
  Coins,
  Mail,
  LogOut,
  UserRoundPen,
  Book,
  Building,
  MessageCircleQuestion,
  Paperclip
} from "lucide-react";

const tabs = [
  {
    label: "수강생",
    submenu: [
      {
        label: "수강생 관리",
        icon: IdCard,
        href: "/main/student",
        description: "",
      },
      {
        label: "출석 관리X",
        icon: Calendar,
        href: "/main/attendance",
        description: "",
      },
    ],
  },
  {
    label: "학습 관리",
    submenu: [
      {
        label: "성적 관리",
        icon: GraduationCap,
        href: "/main/grading",
        description: "",
      },
      {
        label: "시험 채점",
        icon: LucideBookMarked,
        href: "/main/omr",
        description: "",
      },
      {
        label: "학습 리포트X",
        icon: FileText,
        href: "/main/studentReport",
        description: "",
      },
      {
        label: "문자 전송X",
        icon: Mail,
        href: "/main/message",
        description: "",
      },
    ],
  },
  {
    label: "소통",
    submenu: [
      {
        label: "학원 공지",
        icon: Megaphone,
        href: "/main/announcement",
        description: "",
      },
      {
        label: "학원 자료실",
        icon: Paperclip,
        href: "/main/asset",
        description: "",
      },
      {
        label: "QnA 관리",
        icon: MessageCircleQuestion,
        href: "/main/studentQuestions",
        description: "",
      },
      {
        label: "상담 관리",
        icon: MessageCircle,
        href: "/main/setCounseling",
        description: "",
      },
    ],
  },
  {
    label: "학원 정보",
    submenu: [
      {
        label: "교재 관리X",
        icon : Book,
        href: "/main/textbookManagement",
        description: "",
      },
      {
        label: "직원 관리X",
        icon: Users,
        href: "/main/employeeManagement",
        description: "",
      },
      {
        label: "단과 관리",
        icon: Building,
        href: "/main/academyManagement",
        description: "",
      },
    ],
  },
  {
    label: "설정",
    submenu: [
      {
        label: "프로필 수정X",
        icon : UserRoundPen,
        href: "",
        description: "",
      },
      {
        label: "로그아웃",
        icon : LogOut,
        href: "logout",
        description: "",
      },
    ],
  }
];

export default tabs; 