import { Student } from "@/src/entities/student/model";

// Prisma ExamCategory enum과 동일하게 정의 (확장 시 schema.prisma와 함께 수정)
export type ExamCategory = "GRADED" | "PASS_FAIL";

// 카테고리 표시명 매핑
export const EXAM_CATEGORY_LABELS: Record<ExamCategory, string> = {
  GRADED: "등급제",
  PASS_FAIL: "P/NP"
};

// 시험 엔티티
export interface Exam {
  examId: number;
  examName: string;
  examCategory: ExamCategory;
  totalQuestions: number;
  correctAnswers: JSON; // Json 타입
  questionScores: JSON; // Json 타입
  questionTypes: JSON; // Json 타입
  createdAt: Date;
  updatedAt: Date;
  results: ExamResult[];
}

export interface ExamSummary {
  examId: number;
  examName: string;
  examCategory: ExamCategory;
  totalQuestions: number;
  createdAt: Date;
  updatedAt: Date;
}

// 시험 결과 엔티티
export interface ExamResult {
  examResultId: number;
  examId: number;
  studentId: number;
  totalScore: number;
  grade: number;
  results: any; // Json 타입
  createdAt: Date;
  updatedAt: Date;
  exam: Exam;
  student: Student;
}

// 시험 배열
export interface ExamState {
  exams: ExamSummary[];
  examDetail: Exam | null; // 개별 시험 상세 정보
  isLoading: boolean;
  isDetailLoading: boolean;
  totalCount: number;
  currentPage: number;
}

// 시험 기본 액션 타입
export interface ExamBasicActions {
  readExamSummaries: (exams: ExamSummary[], totalCount: number, currentPage?: number) => void;
  readExamDetail: (exam: Exam) => void;
  createExam: (exam: ExamSummary) => void;
  deleteExam: (examId: number) => void;
  setLoading: (isLoading: boolean) => void;
  setDetailLoading: (isDetailLoading: boolean) => void;
  setCurrentPage: (currentPage: number) => void;
}

// 시험 생성 요청 타입
export interface CreateExamRequest {
  examName: string;
  examCategory: ExamCategory;
  totalQuestions: number;
  correctAnswers: any;
  questionScores: any;
  questionTypes: any;
  passScore?: number;
}