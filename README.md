# Academy Management System

A full-stack academy management platform built with Next.js 14 and PostgreSQL. Provides student dashboards, admin panels, OMR grading, learning reports, and multi-academy support.

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript 5 |
| Database | PostgreSQL + Prisma 6 |
| State | Zustand 5, React Hook Form |
| Auth | JWT (jose) + bcrypt, cookie-based sessions |
| Styling | Tailwind CSS 3.4, Shadcn/UI (Radix) |
| Storage | AWS S3 (pre-signed URLs) |
| Charts | Recharts |
| PDF | @react-pdf/renderer, jspdf, html2canvas |
| Animation | Framer Motion, Swiper |
| Validation | Zod |

## Architecture

The project follows **Feature-Sliced Design (FSD)** methodology:

```
src/
  app/         → Application config, providers, global styles
  entities/    → Domain models (API, store, types, UI per entity)
  features/    → Business logic (CRUD operations, workflows)
  shared/      → Reusable utilities, hooks, UI primitives
  widgets/     → Page-level layout components (navbar, sidebar, footer)
```

## Project Structure

```
.
├── app/                          # Next.js App Router
│   ├── (routing)/
│   │   ├── dashboard/            # Student-facing pages
│   │   │   ├── announcement/
│   │   │   ├── asset/
│   │   │   ├── grade/
│   │   │   ├── qna/
│   │   │   ├── reservation/
│   │   │   └── review/
│   │   ├── home/                 # Public landing & auth
│   │   │   ├── (contents)/       # Academy info, curriculum, news
│   │   │   ├── signIn/
│   │   │   └── signUp/
│   │   └── main/                 # Admin panel
│   │       ├── exam/             # Exam management & statistics
│   │       ├── student/          # Student management
│   │       ├── omr/              # OMR grading
│   │       ├── announcement/     # Notice management
│   │       ├── report/           # Learning reports
│   │       ├── textbook/         # Textbook management
│   │       ├── review/           # Review management
│   │       ├── listening/        # Listening material creation
│   │       ├── message/          # SMS sending
│   │       ├── setCounseling/    # Counseling schedule
│   │       ├── admin/            # Staff management
│   │       └── academyManagement/
│   └── api/                      # 42 API route handlers
│       ├── academy/
│       ├── admin/
│       ├── announcement/
│       ├── exam/
│       ├── examResult/
│       ├── files/                # S3 upload/download/delete
│       ├── health/
│       ├── learning-report/
│       ├── member/               # signIn, signUp, signOut, me
│       ├── omr/
│       ├── qna/
│       ├── reservation/
│       ├── review/
│       ├── schedule/
│       ├── student/
│       ├── textbook/
│       └── toggle/
├── src/
│   ├── app/                      # App config & providers
│   │   ├── config/               # Metadata, schemas
│   │   ├── providers/            # Auth provider
│   │   └── styles/               # Global CSS, fonts
│   ├── entities/                 # 14 domain entities
│   │   ├── academy/
│   │   ├── admin/
│   │   ├── announcement/
│   │   ├── exam/
│   │   ├── examResult/
│   │   ├── file/
│   │   ├── qna/
│   │   ├── reservation/
│   │   ├── review/
│   │   ├── schedule/
│   │   ├── student/
│   │   ├── textbook/
│   │   ├── toggle/
│   │   └── user/                 # Auth, JWT, session
│   ├── features/                 # 18 business features
│   │   ├── academyCRUD/
│   │   ├── adminCRUD/
│   │   ├── announcementCRUD/
│   │   ├── examCRUD/             # Includes statistics
│   │   ├── fileDelete/
│   │   ├── fileUpload/
│   │   ├── learningReport/       # Performance analytics
│   │   ├── omrGrading/           # Optical mark recognition
│   │   ├── qnaCRUD/
│   │   ├── reportGeneration/     # PDF export
│   │   ├── reservationCRUD/
│   │   ├── reviewCRUD/
│   │   ├── reviewPopup/
│   │   ├── scheduleCRUD/
│   │   ├── signIn/
│   │   ├── signUp/
│   │   ├── studentCRUD/
│   │   └── textbookCRUD/
│   ├── shared/                   # Shared utilities
│   │   ├── api/                  # HTTP client
│   │   ├── config/               # Messages, time slots, validation
│   │   ├── hooks/                # Pagination, search, sort
│   │   ├── lib/                  # Formatting, device detection
│   │   ├── model/                # Pagination model
│   │   ├── seo/                  # JSON-LD
│   │   └── ui/                   # Shadcn/UI + custom components
│   └── widgets/                  # Layout components
│       ├── footer/
│       ├── header/
│       ├── landingPage/          # 15 landing sections
│       ├── navbar/
│       └── sidebar/
├── prisma/
│   ├── schema.prisma             # 18 models, 4 enums
│   └── client.tsx
├── components/                   # Legacy textbook components
├── public/
│   ├── fonts/                    # NotoSansKR, MaruBuri, GangwonEdu
│   └── homeCopy/                 # Landing page images
├── middleware.tsx                 # Route protection & redirects
├── tailwind.config.ts
├── next.config.mjs
├── package.json
└── tsconfig.json
```

## Database Schema

PostgreSQL with 18 Prisma models across these domains:

| Domain | Models | Description |
|--------|--------|-------------|
| Auth | User | Roles: DEVELOPER, ADMIN, STUDENT |
| People | Admin, Student | Staff and learner profiles |
| Organization | Academy, AcademyFile | Multi-academy support |
| Content | Announcement, AnnouncementFile | Notices with attachments |
| Q&A | QnABoard, QnAFile, QnABoardComment | Student question board |
| Exam | Exam, ExamResult, ExamQuestionResult | Tests, scoring, per-question results |
| Scheduling | CounselingSchedule, CounselingReservation | Appointment booking |
| Materials | Textbook | Categorized study resources (S3) |
| Misc | Review, Toggle | Testimonials, feature flags |

## Roles & Access

| Area | Path | Access |
|------|------|--------|
| Landing page | `/home/*` | Public |
| Student dashboard | `/dashboard/*` | Authenticated (any role) |
| Admin panel | `/main/*` | ADMIN, DEVELOPER only |

Middleware handles JWT validation and role-based redirects.

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL
- AWS S3 bucket (for file storage)

### Environment Variables

```bash
# Database
DATABASE_URL="postgresql://user:password@host:port/database"

# Authentication
JWT_SECRET="your-secret-key"

# AWS S3
AWS_ACCESS_KEY_ID="your-access-key"
AWS_SECRET_ACCESS_KEY="your-secret-key"
AWS_REGION="ap-northeast-2"
AWS_S3_BUCKET_NAME="your-bucket"
AWS_S3_BUCKET_URL="https://your-bucket.s3.region.amazonaws.com"
```

### Installation

```bash
npm install
npx prisma generate
npx prisma db push      # Apply schema to database
npm run dev              # Start dev server at http://localhost:3000
```

### Production

```bash
npm run build            # Runs prisma generate + next build
npm start
```

## Key Features

- **OMR Grading** - Client-side optical mark recognition for exam scoring
- **Learning Reports** - Performance analytics with charts, exportable as PDF
- **Multi-Academy** - Manage multiple academy branches under one system
- **Counseling Booking** - Time-slot based reservation system
- **File Management** - S3-backed uploads with pre-signed URLs for announcements, Q&A, textbooks
- **Review Popup** - Toggleable student testimonial display on landing page
