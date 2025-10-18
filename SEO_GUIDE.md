# 🔍 SEO 개선 가이드

## ✅ 완료된 작업

### 1. 메타데이터 강화
- ✅ `src/app/config/metadata.ts` - 기본 SEO 메타데이터 설정
  - Title 템플릿 추가 (페이지별 제목 자동 생성)
  - Description, Keywords 최적화
  - Open Graph 태그 추가 (Facebook, KakaoTalk)
  - Twitter Card 설정
  - 검색 로봇 설정

### 2. 검색 엔진 설정
- ✅ `app/robots.ts` - 검색 로봇 접근 제어
- ✅ `app/sitemap.ts` - 사이트맵 자동 생성

### 3. 구조화된 데이터
- ✅ `src/shared/ui/JsonLd.tsx` - JSON-LD 스키마 추가
  - EducationalOrganization 스키마
  - WebSite 스키마
  - Organization 스키마

### 4. 레이아웃 최적화
- ✅ `app/layout.tsx` - 루트 레이아웃에 JSON-LD 추가
- ✅ `app/(routing)/home/page.tsx` - 홈페이지 메타데이터 추가
- ✅ HTML lang 속성을 "ko"로 변경

---

## 🚀 추가로 해야 할 작업

### 1️⃣ **도메인 설정 (최우선)**
다음 파일에서 `https://your-domain.com`을 실제 도메인으로 변경:
- [ ] `src/app/config/metadata.ts`
- [ ] `app/robots.ts`
- [ ] `app/sitemap.ts`
- [ ] `src/shared/ui/JsonLd.tsx`

### 2️⃣ **이미지 준비**
public 폴더에 다음 이미지들을 추가:
- [ ] `/public/og-image.jpg` (1200x630px) - 소셜 미디어 공유용
- [ ] `/public/logo.png` - 학원 로고
- [ ] `/public/apple-touch-icon.png` (180x180px) - iOS 홈화면 아이콘
- [ ] `/public/favicon.ico` - 파비콘

### 3️⃣ **Google Search Console 등록**
1. [ ] https://search.google.com/search-console 접속
2. [ ] 도메인 추가 및 소유권 확인
3. [ ] verification code를 `metadata.ts`의 `verification.google`에 입력
4. [ ] sitemap 제출: https://your-domain.com/sitemap.xml

### 4️⃣ **네이버 서치어드바이저 등록** (선택)
1. [ ] https://searchadvisor.naver.com 접속
2. [ ] 사이트 등록 및 소유권 확인
3. [ ] verification code를 `metadata.ts`의 `verification.naver`에 입력

### 5️⃣ **소셜 미디어 연동** (있는 경우)
`src/shared/ui/JsonLd.tsx`의 `academySchema.sameAs`에 추가:
- [ ] 네이버 블로그
- [ ] Instagram
- [ ] YouTube
- [ ] Facebook
- [ ] 기타 SNS

### 6️⃣ **콘텐츠 최적화**
- [ ] 각 페이지마다 고유한 `<h1>` 태그 확인
- [ ] 이미지에 `alt` 속성 추가
- [ ] 내부 링크 구조 개선
- [ ] "주혜연" 키워드가 포함된 콘텐츠 작성

### 7️⃣ **성능 최적화**
```bash
# 페이지 속도 측정
npm run build
npm run start
# https://pagespeed.web.dev/ 에서 테스트
```
- [ ] 이미지 최적화 (WebP 형식 사용)
- [ ] 코드 스플리팅 확인
- [ ] 캐싱 설정

### 8️⃣ **모바일 최적화**
- [ ] 모바일 반응형 디자인 확인
- [ ] Touch 인터페이스 최적화
- [ ] 모바일 페이지 속도 개선

---

## 📊 SEO 체크리스트

### 기본 SEO
- [x] Title 태그 최적화
- [x] Meta Description 설정
- [x] Keywords 설정
- [x] robots.txt 생성
- [x] sitemap.xml 생성
- [x] 언어 설정 (lang="ko")

### 고급 SEO
- [x] Open Graph 태그
- [x] Twitter Card
- [x] JSON-LD 구조화 데이터
- [ ] Google Search Console 등록
- [ ] 도메인 HTTPS 적용
- [ ] 페이지 로딩 속도 최적화

### 콘텐츠 SEO
- [ ] 각 페이지별 고유 메타데이터
- [ ] H1-H6 태그 계층 구조
- [ ] 이미지 alt 속성
- [ ] 내부 링크 구조
- [ ] 키워드 밀도 최적화

---

## 🎯 기대 효과

이 SEO 최적화를 완료하면:

1. **"주혜연"** 단독 검색 시 노출 향상
2. **"주혜연 학원"**, **"주혜연 선생님"** 등 관련 검색어 노출
3. Google 검색 결과에 **리치 스니펫** 표시 (별점, 로고 등)
4. 소셜 미디어 공유 시 **이미지와 설명** 자동 표시
5. 검색 순위 향상 (시간 필요: 2-4주)

---

## 📝 참고 자료

- [Google Search Console](https://search.google.com/search-console)
- [Schema.org](https://schema.org/)
- [Next.js Metadata](https://nextjs.org/docs/app/building-your-application/optimizing/metadata)
- [PageSpeed Insights](https://pagespeed.web.dev/)
- [네이버 서치어드바이저](https://searchadvisor.naver.com/)

---

## ⚠️ 주의사항

1. SEO 효과는 **즉시 나타나지 않습니다** (보통 2-4주 소요)
2. **지속적인 콘텐츠 업데이트**가 중요합니다
3. **백링크 구축**도 병행하면 더 효과적입니다
4. **모바일 최적화**는 필수입니다 (Google Mobile-First Indexing)

