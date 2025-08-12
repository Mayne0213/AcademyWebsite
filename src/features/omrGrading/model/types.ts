export interface OMRGradingResult {
  totalScore: number;
  grade: number;
  results: OMRResult[];
}

export interface OMRResult {
  questionNumber: number;
  studentAnswer: string;
  correctAnswer: string;
  score: number;
  earnedScore: number;
  questionType: string;
}

export interface OMRGradingInput {
  imageFile: File;
  correctAnswers: Record<number, string>;  // {1: "3", 2: "4", ...}
  questionScores: Record<number, number>;  // {1: 2, 2: 2, ...}
  questionTypes: Record<number, string>;   // {1: "듣기", 2: "듣기", ...}
}

export interface OMRProcessingResult {
  success: boolean;
  data?: OMRGradingResult;
  error?: string;
}
