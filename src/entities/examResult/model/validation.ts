import { z } from 'zod';

export const examResultCreateSchema = z.object({
  examId: z.number().int().positive('시험 ID는 양의 정수여야 합니다'),
  studentId: z.number().int().positive('학생 ID는 양의 정수여야 합니다'),
  totalScore: z.number().int().min(0, '총점은 0 이상이어야 합니다'),
  grade: z.number().int().min(1, '등급은 1 이상이어야 합니다').max(9, '등급은 9 이하여야 합니다'),
});

export const examResultUpdateSchema = z.object({
  examId: z.number().int().positive('시험 ID는 양의 정수여야 합니다').optional(),
  studentId: z.number().int().positive('학생 ID는 양의 정수여야 합니다').optional(),
  totalScore: z.number().int().min(0, '총점은 0 이상이어야 합니다').optional(),
  grade: z.number().int().min(1, '등급은 1 이상이어야 합니다').max(9, '등급은 9 이하여야 합니다').optional(),
});

export const examResultIdSchema = z.object({
  examResultId: z.number().int().positive('시험 결과 ID는 양의 정수여야 합니다'),
});

export const examResultQuerySchema = z.object({
  examId: z.number().int().positive().optional(),
  studentId: z.number().int().positive().optional(),
  grade: z.number().int().min(1).max(9).optional(),
  page: z.number().int().min(1).optional(),
  limit: z.number().int().min(1).max(100).optional(),
  sortBy: z.enum(['createdAt', 'totalScore', 'grade']).optional(),
  sortOrder: z.enum(['asc', 'desc']).optional(),
});

export const examQuestionResultCreateSchema = z.object({
  examResultId: z.number().int().positive('시험 결과 ID는 양의 정수여야 합니다'),
  questionNumber: z.number().int().positive('문제 번호는 양의 정수여야 합니다'),
  isCorrect: z.boolean('정답 여부는 boolean 값이어야 합니다'),
  score: z.number().int().min(0, '문제 점수는 0 이상이어야 합니다'),
});

export const examQuestionResultUpdateSchema = z.object({
  questionNumber: z.number().int().positive('문제 번호는 양의 정수여야 합니다').optional(),
  isCorrect: z.boolean('정답 여부는 boolean 값이어야 합니다').optional(),
  score: z.number().int().min(0, '문제 점수는 0 이상이어야 합니다').optional(),
});

export type ExamResultCreateInput = z.infer<typeof examResultCreateSchema>;
export type ExamResultUpdateInput = z.infer<typeof examResultUpdateSchema>;
export type ExamResultQueryInput = z.infer<typeof examResultQuerySchema>;
export type ExamQuestionResultCreateInput = z.infer<typeof examQuestionResultCreateSchema>;
export type ExamQuestionResultUpdateInput = z.infer<typeof examQuestionResultUpdateSchema>;
