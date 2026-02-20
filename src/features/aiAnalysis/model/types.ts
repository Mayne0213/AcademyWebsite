export interface ExamAIAnalysis {
  id: number;
  examId: number;
  content: string;
  isEdited: boolean;
  generatedAt: string;
  editedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface StudentAIFeedback {
  id: number;
  examResultId: number;
  content: string;
  isEdited: boolean;
  generatedAt: string;
  editedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface BatchGenerationResult {
  total: number;
  generated: number;
  skipped: number;
  errors: Array<{
    examResultId: number;
    studentName: string;
    error: string;
  }>;
}

export interface ExamResultSummary {
  examResultId: number;
  studentId: number;
  totalScore: number;
  grade: number;
  student: {
    studentName: string;
  };
}

export interface FeedbackListResponse {
  feedbacks: Array<
    StudentAIFeedback & {
      examResult: ExamResultSummary;
    }
  >;
  allExamResults: ExamResultSummary[];
  totalExamResults: number;
  generatedCount: number;
}
