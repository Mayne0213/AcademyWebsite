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

// 시험 통계를 위한 새로운 타입들
export interface QuestionStatistics {
  questionNumber: number;
  totalAttempts: number;
  correctAnswers: number;
  incorrectAnswers: number;
  correctRate: number;
  incorrectRate: number;
  averageScore: number;
  actualScore: number; // 실제 배점
  questionType?: string;
  choiceStatistics?: ChoiceStatistics[];
}

export interface ChoiceStatistics {
  choice: string; // A, B, C, D 등
  selectedCount: number;
  selectionRate: number;
  isCorrect: boolean;
}

export interface GradeDistribution {
  grade: number;
  count: number;
  percentage: number;
}

export interface ExamStatistics {
  examId: number;
  examName: string;
  totalQuestions: number;
  totalParticipants: number;
  averageScore: number;
  averageGrade: number;
  highestScore: number;
  lowestScore: number;
  questionStatistics: QuestionStatistics[];
  overallCorrectRate: number;
  overallIncorrectRate: number;
  gradeDistribution: GradeDistribution[];
}

export interface ExamStatisticsSummary {
  examId: number;
  examName: string;
  totalParticipants: number;
  averageScore: number;
  overallCorrectRate: number;
  createdAt: Date;
}
