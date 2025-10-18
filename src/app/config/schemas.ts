/**
 * SEO를 위한 JSON-LD 구조화 데이터
 * Google 검색 결과에 Rich Snippet을 표시하기 위한 Schema.org 스키마
 */

/**
 * 교육 기관 스키마 데이터
 * - Google에 학원 정보를 전달
 * - "주혜연" 검색 시 학원과 연결
 */
export const academySchema = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  "name": "주혜연 학원",
  "alternateName": "확신의 1등급 주혜연",
  "description": "주혜연 선생님의 확신의 1등급 학원입니다. 체계적인 학습 관리와 맞춤형 교육으로 학생들의 성적 향상을 돕습니다.",
  "url": "https://joossameng.com",
  "logo": "https://joossameng.com/favicon.ico",
  "image": "https://joossameng.com/og-image.jpg", // TODO: 1200x630px 이미지 준비 필요
  "founder": {
    "@type": "Person",
    "name": "주혜연",
    "jobTitle": "원장",
    "description": "확신의 1등급 주혜연 선생님"
  },
  "sameAs": [
    // 소셜 미디어 링크들 (있다면 주석 해제하고 실제 URL로 변경)
    // "https://www.facebook.com/주혜연",
    // "https://www.instagram.com/주혜연",
    // "https://www.youtube.com/@주혜연",
    // "https://blog.naver.com/주혜연"
  ]
};

/**
 * 웹사이트 스키마 데이터
 * - 다양한 검색 키워드 등록
 * - 사이트 내 검색 기능 연동
 */
export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "주혜연 학원",
  "alternateName": ["확신의 1등급 주혜연", "주혜연T"],
  "url": "https://joossameng.com", // 실제 도메인으로 변경
  "potentialAction": {
    "@type": "SearchAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": "https://joossameng.com/search?q={search_term_string}"
    },
    "query-input": "required name=search_term_string"
  }
};

/**
 * 조직 스키마 데이터
 * - 학원의 조직 정보
 * - 연락처 정보
 */
export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "주혜연 학원",
  "alternateName": "확신의 1등급 주혜연",
  "url": "https://joossameng.com",
  "logo": "https://joossameng.com/favicon.ico",
  "contactPoint": {
    "@type": "ContactPoint",
    "contactType": "customer service",
    "availableLanguage": "Korean"
  }
};

