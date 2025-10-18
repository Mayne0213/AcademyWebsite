import { Metadata } from "next";

export const metadata: Metadata = {
  // 기본 메타데이터
  title: {
    default: "주혜연 학원 | 확신의 1등급 주혜연T",
    template: "%s | 주혜연 학원"
  },
  description: "주혜연 선생님의 확신의 1등급 학원입니다. 체계적인 학습 관리와 맞춤형 교육으로 학생들의 성적 향상을 돕습니다.",
  keywords: [
    "주혜연",
    "주혜연 학원",
    "주혜연T",
    "주혜연 선생님",
    "확신의 1등급",
    "확신의 1등급 주혜연",
    "학원",
    "입시",
    "수능",
    "내신",
    "학습 관리",
    "성적 향상"
  ],
  authors: [{ name: "주혜연" }],
  creator: "주혜연",

  // Open Graph (Facebook, KakaoTalk 등)
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: "https://joossameng.com", // 실제 도메인으로 변경
    siteName: "주혜연 학원",
    title: "주혜연 학원 | 확신의 1등급 주혜연T",
    description: "주혜연 선생님의 확신의 1등급 학원입니다. 체계적인 학습 관리와 맞춤형 교육으로 학생들의 성적 향상을 돕습니다.",
    images: [
      {
        url: "/og-image.jpg", // TODO: public/og-image.jpg (1200x630px) 준비 필요
        width: 1200,
        height: 630,
        alt: "주혜연 학원"
      }
    ]
  },

  // Twitter Card
  twitter: {
    card: "summary_large_image",
    title: "주혜연 학원 | 확신의 1등급 주혜연T",
    description: "주혜연 선생님의 확신의 1등급 학원입니다.",
    images: ["/og-image.jpg"],
    creator: "@주혜연" // 트위터 계정이 있다면
  },

  // 검색 엔진 최적화
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  // 검증 (Google Search Console 등록 후 추가)
  verification: {
    google: "your-google-verification-code", // Google Search Console에서 발급받은 코드
    // naver: "your-naver-verification-code", // 네이버 서치어드바이저
  },

  // 기타
  alternates: {
    canonical: "https://joossameng.com", // 실제 도메인으로 변경
  },

  // 아이콘
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};