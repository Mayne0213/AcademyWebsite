import { z } from 'zod';
import { ERROR_MESSAGES } from '@/src/shared/config/messages';
import { Exam, ExamResult } from './types';
import { toast } from 'sonner';

// Zod 스키마 정의 - types.ts의 타입에 맞춰 정의
export const ExamResultSchema = z.object({
  examResultId: z.string().min(1, '유효하지 않은 시험 결과 ID입니다.'),
  examId: z.string().min(1, '유효하지 않은 시험 ID입니다.'),
  studentId: z.number().positive('유효하지 않은 학생 ID입니다.'),
  totalScore: z.number().min(0, '총점은 0 이상이어야 합니다.'),
  grade: z.number().min(1, '등급은 1 이상이어야 합니다.'),
  results: z.any(), // Json 타입
  createdAt: z.date(),
  updatedAt: z.date(),
  exam: z.any().optional(),
  student: z.any().optional(),
});

export const ExamSchema = z.object({
  examId: z.string().min(1, '유효하지 않은 시험 ID입니다.'),
  examName: z.string().min(1, "시험 이름을 입력해 주세요."),
  totalQuestions: z.number().positive("문제 수는 1개 이상이어야 합니다."),
  correctAnswers: z.any(), // Json 타입
  questionScores: z.any(), // Json 타입
  questionTypes: z.any(), // Json 타입
  createdAt: z.date(),
  updatedAt: z.date(),
  results: z.array(ExamResultSchema).default([]),
});

export const CreateExamSchema = ExamSchema.pick({
  examName: true,
  totalQuestions: true,
  correctAnswers: true,
  questionScores: true,
  questionTypes: true,
});

export const UpdateExamSchema = z.object({
  examName: z.string().min(1, "시험 이름을 입력해 주세요.").optional(),
  totalQuestions: z.number().positive("문제 수는 1개 이상이어야 합니다.").optional(),
  correctAnswers: z.any().optional(), // Json 타입
  questionScores: z.any().optional(), // Json 타입
  questionTypes: z.any().optional(), // Json 타입
});

// 타입 안전성을 위한 타입 체크 함수
export const validateExamType = (data: unknown): data is Exam => {
  return ExamSchema.safeParse(data).success;
};

export const validateExamResultType = (data: unknown): data is ExamResult => {
  return ExamResultSchema.safeParse(data).success;
};

// 유효성 검사 함수들
export const EXAM_VALIDATION = {
  // Exam 전체 유효성 검사
  validateExam: (exam: unknown) => {
    const result = ExamSchema.safeParse(exam);
    
    if (!result.success) {
      const errorMessage = result.error.issues[0].message || '유효하지 않은 데이터입니다.';
      toast.error(errorMessage);
      throw new Error(errorMessage);
    }
  },

  // Exam 생성용 유효성 검사
  validateExamForCreate: (exam: unknown) => {
    const result = CreateExamSchema.safeParse(exam);
    
    if (!result.success) {
      const errorMessage = result.error.issues[0].message || '유효하지 않은 데이터입니다.';
      toast.error(errorMessage);
      throw new Error(errorMessage);
    }
  },

  // Exam 업데이트용 유효성 검사
  validateExamForUpdate: (updateData: unknown) => {
    const result = UpdateExamSchema.safeParse(updateData);
    
    if (!result.success) {
      const errorMessage = result.error.issues[0].message || '유효하지 않은 데이터입니다.';
      toast.error(errorMessage);
      throw new Error(errorMessage);
    }
  },

  // ExamResult 유효성 검사
  validateExamResult: (examResult: unknown) => {
    const result = ExamResultSchema.safeParse(examResult);
    
    if (!result.success) {
      const errorMessage = result.error.issues[0].message || '유효하지 않은 데이터입니다.';
      toast.error(errorMessage);
      throw new Error(errorMessage);
    }
  },
};
