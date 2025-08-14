export interface ExamResult {
  examResultId: number;
  examId: number;
  studentId: number;
  totalScore: number;
  grade: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface ExamResultCreate {
  examId: number;
  studentId: number;
  totalScore: number;
  grade: number;
}

export interface ExamResultUpdate {
  examId?: number;
  studentId?: number;
  totalScore?: number;
  grade?: number;
}

export interface ExamResultWithRelations extends ExamResult {
  exam?: {
    examId: number;
    examName: string;
    totalQuestions: number;
  };
  student?: {
    memberId: number;
    studentName: string;
    studentPhone: string;
  };
  questionResults?: ExamQuestionResult[];
}

export interface ExamQuestionResult {
  id: number;
  examResultId: number;
  questionNumber: number;
  isCorrect: boolean;
  score: number;
}

export interface ExamQuestionResultCreate {
  examResultId: number;
  questionNumber: number;
  isCorrect: boolean;
  score: number;
}
