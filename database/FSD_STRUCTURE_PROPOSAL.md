```
frontend/
├── app/                          # Next.js App Router
├── shared/                       # 공유 레이어
│   ├── ui/                       # UI 컴포넌트
│   │   ├── button/               # button.tsx
│   │   ├── input/                # input.tsx
│   │   ├── card/                 # card.tsx
│   │   ├── calendar/             # calendar.tsx
│   │   ├── dropdown-menu/        # dropdown-menu.tsx
│   │   ├── alert-dialog/         # alert-dialog.tsx
│   │   ├── popover/              # popover.tsx
│   │   ├── label/                # label.tsx
│   │   ├── textarea/             # textarea.tsx
│   │   ├── loading/              # loading.tsx
│   │   ├── sonner/               # sonner.tsx
│   │   ├── icon-with-circle/     # icon-with-circle.tsx
│   │   └── index.ts
│   ├── lib/                      # 유틸리티
│   │   ├── utils.ts              # 현재 lib/utils.ts
│   │   ├── constants.ts          # 상수 정의
│   │   ├── api.ts                # 공통 API 함수
│   │   └── prisma.tsx            # 현재 lib/prisma.tsx
│   ├── config/                   # 설정
│   │   ├── database.ts           # 데이터베이스 설정
│   │   └── auth.ts               # 인증 설정
│   └── types/                    # 공통 타입
│       ├── common.ts             # BaseEntity, PaginationParams 등
│       ├── api.ts                # ApiResponse, ApiError 등
│       └── entities.ts           # User 등 공통 엔티티
├── entities/                     # 엔티티 레이어
│   ├── user/
│   │   ├── model/
│   │   │   ├── types.ts          # userInfoType 기반
│   │   │   └── store.ts          # 사용자 기본 상태
│   │   ├── ui/
│   │   │   └── UserCard.tsx      # 사용자 카드 컴포넌트
│   │   └── index.ts
│   ├── student/
│   │   ├── model/
│   │   │   ├── types.ts          # studentType 기반
│   │   │   └── store.ts          # 학생 기본 상태
│   │   ├── ui/
│   │   │   └── StudentCard.tsx   # 학생 카드 컴포넌트
│   │   └── index.ts
│   ├── academy/
│   │   ├── model/
│   │   │   ├── types.ts          # academyType 기반
│   │   │   └── store.ts          # 학원 기본 상태
│   │   ├── ui/
│   │   │   └── AcademyCard.tsx   # 학원 카드 컴포넌트
│   │   └── index.ts
│   ├── announcement/
│   │   ├── model/
│   │   │   ├── types.ts          # announcementType 기반
│   │   │   └── store.ts          # 공지사항 기본 상태
│   │   ├── ui/
│   │   │   └── AnnouncementCard.tsx # 공지사항 카드 컴포넌트
│   │   └── index.ts
│   ├── qna/
│   │   ├── model/
│   │   │   ├── types.ts          # qnaType, qnaCommentType 기반
│   │   │   └── store.ts          # QnA 기본 상태
│   │   ├── ui/
│   │   │   └── QnaCard.tsx       # QnA 카드 컴포넌트
│   │   └── index.ts
│   ├── textbook/
│   │   ├── model/
│   │   │   ├── types.ts          # textbookType 기반
│   │   │   └── store.ts          # 교재 기본 상태
│   │   ├── ui/
│   │   │   └── TextbookCard.tsx  # 교재 카드 컴포넌트
│   │   └── index.ts
│   └── attendance/
│       ├── model/
│       │   ├── types.ts          # attendanceType 기반
│       │   └── store.ts          # 출석 기본 상태
│       ├── ui/
│       │   └── AttendanceCard.tsx # 출석 카드 컴포넌트
│       └── index.ts
├── features/                     # 기능 레이어
│   ├── auth/                     # 인증 기능
│   │   ├── model/
│   │   │   ├── types.ts          # 인증 관련 타입
│   │   │   ├── store.ts          # useSignUp 훅 기반
│   │   │   └── api.ts            # 인증 API 호출
│   │   ├── ui/
│   │   │   ├── LoginForm.tsx     # 로그인 폼
│   │   │   ├── SignupForm.tsx    # 회원가입 폼
│   │   │   └── AuthGuard.tsx     # 인증 가드
│   │   └── index.ts
│   ├── student-management/        # 수강생 관리
│   │   ├── model/
│   │   │   ├── types.ts          # studentType 기반
│   │   │   ├── store.ts          # useStudents, useFilteredSortedPaginatedUsers
│   │   │   └── api.ts            # 학생 API 호출
│   │   ├── ui/
│   │   │   ├── StudentList.tsx   # studentTable.tsx
│   │   │   ├── StudentForm.tsx   # studentRegister.tsx
│   │   │   ├── StudentFilter.tsx # academyFilter.tsx
│   │   │   ├── StudentSearch.tsx # searchBar.tsx
│   │   │   ├── StudentSort.tsx   # sortButton.tsx
│   │   │   └── StudentPagination.tsx # paginationControls.tsx
│   │   └── index.ts
│   ├── announcement-management/   # 공지사항 관리
│   │   ├── model/
│   │   │   ├── types.ts          # announcementType 기반
│   │   │   ├── store.ts          # useAnnouncement
│   │   │   └── api.ts            # 공지사항 API 호출
│   │   ├── ui/
│   │   │   ├── AnnouncementList.tsx  # announcementList.tsx
│   │   │   ├── AnnouncementItem.tsx  # announcementItem.tsx
│   │   │   ├── AnnouncementForm.tsx  # addAnnouncement.tsx, editAnnouncement.tsx
│   │   │   └── AnnouncementFilter.tsx # 필터 컴포넌트
│   │   └── index.ts
│   ├── attendance-management/     # 출석 관리
│   │   ├── model/
│   │   │   ├── types.ts          # attendanceType 기반
│   │   │   ├── store.ts          # useAttendanceStatusMap
│   │   │   └── api.ts            # 출석 API 호출
│   │   ├── ui/
│   │   │   ├── AttendanceList.tsx    # attendanceList.tsx
│   │   │   ├── AttendanceItem.tsx    # attendanceItem.tsx
│   │   │   ├── AttendanceStats.tsx   # attendanceStatsPanel.tsx
│   │   │   ├── AttendanceBar.tsx     # attendanceBar.tsx
│   │   │   └── BulkAttendanceUpdate.tsx # allChangeToAttend.tsx
│   │   └── index.ts
│   ├── qna-management/           # QnA 관리
│   │   ├── model/
│   │   │   ├── types.ts          # qnaType, qnaCommentType 기반
│   │   │   ├── store.ts          # useQna
│   │   │   └── api.ts            # QnA API 호출
│   │   ├── ui/
│   │   │   ├── QnaList.tsx       # QnA 목록
│   │   │   ├── QnaForm.tsx       # QnA 작성/수정 폼
│   │   │   ├── QnaComment.tsx    # 댓글 컴포넌트
│   │   │   └── QnaFilter.tsx     # QnA 필터
│   │   └── index.ts
│   ├── academy-management/        # 학원 관리
│   │   ├── model/
│   │   │   ├── types.ts          # academyType 기반
│   │   │   ├── store.ts          # useAcademy
│   │   │   └── api.ts            # 학원 API 호출
│   │   ├── ui/
│   │   │   ├── AcademyList.tsx   # academyList.tsx
│   │   │   ├── AcademyItem.tsx   # academyItem.tsx
│   │   │   ├── AcademyForm.tsx   # addAcademy.tsx, editAcademy.tsx
│   │   │   └── AcademyFilter.tsx # 학원 필터
│   │   └── index.ts
│   ├── textbook-management/       # 교재 관리
│   │   ├── model/
│   │   │   ├── types.ts          # textbookType 기반
│   │   │   ├── store.ts          # useTextbook, useFilteredSortedPaginatedTextbook
│   │   │   └── api.ts            # 교재 API 호출
│   │   ├── ui/
│   │   │   ├── TextbookList.tsx  # 교재 목록
│   │   │   ├── TextbookItem.tsx  # textbookItem.tsx
│   │   │   ├── TextbookForm.tsx  # uploadTextbook.tsx
│   │   │   ├── TextbookSearch.tsx # search.tsx
│   │   │   └── TextbookFilter.tsx # 교재 필터
│   │   └── index.ts
│   └── grade-management/          # 성적 관리
│       ├── model/
│       │   ├── types.ts          # 성적 관련 타입
│       │   ├── store.ts          # 성적 상태 관리
│       │   └── api.ts            # 성적 API 호출
│       ├── ui/
│       │   ├── GradeList.tsx     # 성적 목록
│       │   ├── GradeForm.tsx     # 성적 입력 폼
│       │   ├── GradeStats.tsx    # 성적 통계
│       │   └── GradeFilter.tsx   # 성적 필터
│       └── index.ts
├── widgets/                      # 위젯 레이어
│   ├── header/                   # 헤더 위젯
│   │   ├── ui/
│   │   │   ├── Header.tsx        # DashboardStructureComponent/header.tsx
│   │   │   ├── Navigation.tsx    # 네비게이션 컴포넌트
│   │   │   └── UserMenu.tsx      # 사용자 메뉴
│   │   └── index.ts
│   ├── sidebar/                  # 사이드바 위젯
│   │   ├── ui/
│   │   │   ├── Sidebar.tsx       # MainStructureComponent/sidebar.tsx
│   │   │   └── Menu.tsx          # 메뉴 컴포넌트
│   │   └── index.ts
│   ├── navbar/                   # 네비게이션 바 위젯
│   │   ├── ui/
│   │   │   ├── Navbar.tsx        # HomeStructureComponent/navbar.tsx
│   │   │   ├── SubNavbar.tsx     # HomeStructureComponent/subNavbar.tsx
│   │   │   └── MainNavbar.tsx    # MainStructureComponent/navbar.tsx
│   │   └── index.ts
│   ├── dashboard/                # 대시보드 위젯
│   │   ├── ui/
│   │   │   ├── DashboardStats.tsx    # 대시보드 통계
│   │   │   ├── RecentActivity.tsx    # 최근 활동
│   │   │   └── QuickActions.tsx      # 빠른 액션
│   │   └── index.ts
│   ├── footer/                   # 푸터 위젯
│   │   ├── ui/
│   │   │   └── Footer.tsx        # HomeStructureComponent/footer.tsx
│   │   └── index.ts
│   └── tabs/                     # 탭 위젯
│       ├── ui/
│       │   └── Tabs.tsx          # components/main/tabs.tsx
│       └── index.ts
├── pages/                        # 페이지 레이어
│   ├── home/                     # 홈페이지
│   │   ├── ui/
│   │   │   ├── HomePage.tsx      # app/home/page.tsx
│   │   │   ├── LandingSection.tsx    # homePageWelcome.tsx
│   │   │   ├── AnnouncementSection.tsx # homePageAnnouncement.tsx
│   │   │   ├── CurriculumSection.tsx  # homePageCurriculumIntroduction.tsx
│   │   │   ├── TextbookSection.tsx    # homePageTextbookIntroduction.tsx
│   │   │   ├── TestPaperSection.tsx   # homePageTestPaperIntroduction.tsx
│   │   │   ├── AdvertisingSection.tsx # homePageActualAdvertising.tsx
│   │   │   ├── ReviewsSection.tsx     # homePageReviews.tsx
│   │   │   ├── AcademySection.tsx     # homePageAcademyDepartments.tsx
│   │   │   ├── SNSSection.tsx         # homePageSNSLinks.tsx
│   │   │   └── FloatingChat.tsx       # homePageFloatingChatButton.tsx
│   │   └── index.ts
│   ├── admin/                    # 관리자 페이지
│   │   ├── ui/
│   │   │   ├── AdminDashboard.tsx     # app/main/page.tsx
│   │   │   ├── StudentManagement.tsx  # app/main/(수강생 관리)/student/page.tsx
│   │   │   ├── AnnouncementManagement.tsx # app/main/(학원 공지)/announcement/page.tsx
│   │   │   ├── AttendanceManagement.tsx   # 출석 관리 페이지
│   │   │   ├── QnaManagement.tsx      # QnA 관리 페이지
│   │   │   ├── AcademyManagement.tsx  # 학원 관리 페이지
│   │   │   ├── TextbookManagement.tsx # 교재 관리 페이지
│   │   │   └── GradeManagement.tsx    # 성적 관리 페이지
│   │   └── index.ts
│   └── dashboard/                # 대시보드 페이지
│       ├── ui/
│       │   ├── DashboardPage.tsx     # app/dashboard/page.tsx
│       │   ├── AnnouncementPage.tsx  # app/dashboard/announcement/page.tsx
│       │   ├── QnaBoardPage.tsx      # app/dashboard/qnaBoard/page.tsx
│       │   ├── AssetsPage.tsx        # app/dashboard/assets/page.tsx
│       │   └── PersonalInfoPage.tsx  # app/dashboard/personalInfo/page.tsx
│       └── index.ts
└── processes/                    # 프로세스 레이어
    ├── student-enrollment/       # 학생 등록 프로세스
    │   ├── ui/
    │   │   ├── EnrollmentFlow.tsx    # 전체 등록 프로세스
    │   │   ├── Step1PersonalInfo.tsx # 1단계: 개인정보
    │   │   ├── Step2AcademySelect.tsx # 2단계: 학원선택
    │   │   ├── Step3Payment.tsx      # 3단계: 결제
    │   │   └── Step4Confirmation.tsx # 4단계: 확인
    │   └── index.ts
    ├── attendance-tracking/      # 출석 관리 프로세스
    │   ├── ui/
    │   │   ├── AttendanceFlow.tsx    # 출석 관리 프로세스
    │   │   ├── BulkAttendanceUpdate.tsx # 일괄 출석 수정
    │   │   └── AttendanceReport.tsx  # 출석 리포트 생성
    │   └── index.ts
    ├── grade-management/         # 성적 관리 프로세스
    │   ├── ui/
    │   │   ├── GradeManagementFlow.tsx # 성적 관리 프로세스
    │   │   ├── GradeInput.tsx         # 성적 입력
    │   │   ├── GradeAnalysis.tsx      # 성적 분석
    │   │   └── GradeReport.tsx        # 성적 리포트
    │   └── index.ts
    └── announcement-publishing/  # 공지사항 발행 프로세스
        ├── ui/
        │   ├── PublishingFlow.tsx     # 공지사항 발행 프로세스
        │   ├── DraftReview.tsx        # 초안 검토
        │   ├── ApprovalProcess.tsx    # 승인 프로세스
        │   └── PublishConfirmation.tsx # 발행 확인
        └── index.ts
```
