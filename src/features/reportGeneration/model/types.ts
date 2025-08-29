export interface ReportProcessingProgress {
  current: number;
  total: number;
  currentStudentName: string;
  currentStep: 'loading' | 'generating';
  processingTime?: string;
}

export interface ReportGenerationError {
  message: string;
  studentId?: number;
}

export interface ReportGenerationResult {
  studentId: number;
  examResultId: number;
  studentName: string;
  success: boolean;
  error?: string;
  totalScore?: number;
  grade?: string;
}
