import { Student } from "@/src/entities/student/model";

// 시험 엔티티
export interface Exam {
  examId: number;
  examName: string;
  totalQuestions: number;
  correctAnswers: any; // Json 타입
  questionScores: any; // Json 타입
  questionTypes: any; // Json 타입
  createdAt: Date;
  updatedAt: Date;
  results: ExamResult[];
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
  isLoading: boolean;
}

// 시험 기본 액션 타입
export interface ExamBasicActions {
  readExams: (exams: Exam[]) => void;
  createExam: (exam: Exam) => void;
  deleteExam: (examId: number) => void;
  setLoading: (isLoading: boolean) => void;
}

// 시험 목록용 간단한 타입 (지연 데이터 fetch)
export interface ExamSummary {
  examId: number;
  examName: string;
  totalQuestions: number;
  createdAt: Date;
  updatedAt: Date;
}

// 시험 생성 요청 타입
export interface CreateExamRequest {
  examName: string;
  totalQuestions: number;
  correctAnswers: any;
  questionScores: any;
  questionTypes: any;
}

// 시험 업데이트 요청 타입
export interface UpdateExamRequest {
  examName?: string;
  totalQuestions?: number;
  correctAnswers?: any;
  questionScores?: any;
  questionTypes?: any;
  updatedAt: Date;
}
