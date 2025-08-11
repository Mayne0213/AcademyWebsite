# Academy QnA/Announcement/Asset Board Frontend

## 프로젝트 소개

이 프로젝트는 학원용 QnA 게시판, 공지사항, 자료실(Asset) 기능을 제공하는 **Next.js 기반 프론트엔드**입니다.
Zustand를 활용한 전역 상태 관리, Prisma ORM, S3 파일 업로드, 반응형 UI, 관리자/학생 권한 분리 등
실제 서비스 운영에 필요한 다양한 기능을 갖추고 있습니다.

---

## 주요 기능

- **QnA 게시판**
  - 질문 목록, 상세, 댓글(등록/삭제), 이미지 첨부, 페이징
  - 질문/댓글은 zustand store에서 전역 관리, 상세 fetch는 on-demand
- **공지사항/자료실**
  - 공지/자료 목록, 상세, 파일 첨부, 관리자만 작성/수정/삭제
- **학생/관리자 권한 분리**
  - 학생은 본인 QnA만, 관리자는 전체 QnA/공지/자료 관리
- **반응형 UI**
  - 모바일/PC 모두 최적화
- **S3 파일 업로드**
  - 이미지/파일 첨부 및 미리보기
- **Prisma ORM + MySQL**
  - schema.prisma 참고

---

## 폴더 구조

```
frontend/
  app/
    dashboard/
      qna/              # QnA 게시판 (목록, 상세, 추가, 수정)
      announcement/     # 공지사항
      assets/           # 자료실
    api/                # Next.js API routes (백엔드)
  components/
    hooks/              # zustand 등 커스텀 훅
    type/               # 타입 정의 (QnA, 댓글 등)
    ui/                 # 공통 UI 컴포넌트
  contexts/             # 인증 등 context
  lib/                  # prisma, utils
  prisma/
    schema.prisma       # DB 스키마
  public/               # 정적 파일, 이미지
```

---

## 기술 스택

- **Next.js 14**
- **React 18**
- **TypeScript**
- **Zustand** (상태 관리)
- **Prisma ORM** (DB)
- **MySQL**
- **AWS S3** (파일 업로드)
- **Tailwind CSS**
- **Sonner** (toast)
- 기타: react-hook-form, radix-ui, etc.

---

## 개발/실행 방법

1. **환경 변수 설정**
   - `.env` 파일에 DB, S3, JWT 등 환경 변수 입력
2. **의존성 설치**
   ```bash
   npm install
   ```
3. **DB 마이그레이션**
   ```bash
   npx prisma migrate deploy
   ```
4. **개발 서버 실행**
   ```bash
   npm run dev
   ```
   - [http://localhost:3000](http://localhost:3000) 접속

5. **빌드/배포**
   ```bash
   npm run build
   npm start
   ```

---

## 상태 관리 (Zustand)

- **QnA/댓글/상세**는 모두 `useQna` 커스텀 훅에서 전역 관리
- 컴포넌트에서는 zustand의 상태만 사용, 직접 setState 금지
- 댓글 추가/삭제/수정 시 store에서 QnA/상세 모두 자동 동기화

```ts
const {
  Qnas,
  addComment,
  deleteCommentFromQna,
  expandedDetails,
  setExpandedDetails,
  // ...
} = useQna();
```

---

## QnA/댓글 데이터 구조

- **Qna**
  ```ts
  interface Qna {
    qnaId: number;
    qnaTitle: string;
    qnaContent: string;
    qnaImageUrl: string | null;
    qnaUserId: number;
    createdAt: string;
    updatedAt: string;
    comments?: QnaComment[];
    user?: { memberId: number; userId: string; role: ...; student?: { studentName: string } }
  }
  ```
- **QnaComment**
  ```ts
  interface QnaComment {
    commentId: number;
    commentContent: string;
    commentMemberId: number;
    qnaId: number;
    createdAt: string;
    updatedAt: string;
    user: any;
  }
  ```

---

## 환경 변수 예시 (.env)

```
DATABASE_URL=mysql://user:password@host:3306/dbname
AWS_ACCESS_KEY_ID=...
AWS_SECRET_ACCESS_KEY=...
AWS_S3_BUCKET=...
JWT_SECRET=...
```

---

## 기타

- **코드 컨벤션**: TypeScript, 함수형 컴포넌트, 커스텀 훅 적극 활용
- **테스트/배포**: Vercel, AWS 등 어디서든 배포 가능
- **문의/기여**: PR/이슈 환영

---

(자세한 사용법/구현 문의는 코드 주석 및 각 page.tsx 참고)
