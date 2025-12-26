import { z } from 'zod';
import { Textbook, TextbookCategory } from './types';
import { toast } from 'sonner';

// 교재 카테고리 스키마
const TextbookCategorySchema = z.enum([
  'LISTENING',
  'MATERIAL',
  'WEEKLY_TEST',
  'PPT',
  'ETC',
  'ASSISTANT'
]);

// Textbook 스키마
export const TextbookSchema = z.object({
  textbookId: z.number(),
  textbookName: z.string().min(1, '파일명은 필수입니다.'),
  fileName: z.string().min(1, 'S3 Key는 필수입니다.'),
  fileType: z.string().default('application/pdf'),
  fileSize: z.number().optional(),
  isImportant: z.boolean(),
  category: TextbookCategorySchema,
  createdAt: z.date(),
  updatedAt: z.date(),
});

// 교재 생성 스키마
export const CreateTextbookSchema = z.object({
  textbookName: z.string().min(1, '파일명은 필수입니다.'),
  fileName: z.string().min(1, 'S3 Key는 필수입니다.'),
  fileType: z.string().default('application/pdf'),
  fileSize: z.number().optional(),
  isImportant: z.boolean(),
  category: TextbookCategorySchema,
});

// 교재 업데이트 스키마
export const UpdateTextbookSchema = z.object({
  textbookName: z.string().min(1, '파일명은 필수입니다.').optional(),
  isImportant: z.boolean().optional(),
  category: TextbookCategorySchema.optional(),
});

// 타입 안전성을 위한 타입 체크 함수
export const validateTextbookType = (data: unknown): data is Textbook => {
  return TextbookSchema.safeParse(data).success;
};

// 유효성 검사 함수들
export const TEXTBOOK_VALIDATION = {
  // Textbook 전체 유효성 검사
  validateTextbook: (textbook: unknown) => {
    const result = TextbookSchema.safeParse(textbook);

    if (!result.success) {
      const errorMessage = result.error.issues[0].message || '유효하지 않은 데이터입니다.';
      toast.error(errorMessage);
      throw new Error(errorMessage);
    }
  },

  // Textbook 생성용 유효성 검사
  validateTextbookForCreate: (textbook: unknown) => {
    const result = CreateTextbookSchema.safeParse(textbook);

    if (!result.success) {
      const errorMessage = result.error.issues[0].message || '유효하지 않은 데이터입니다.';
      toast.error(errorMessage);
      throw new Error(errorMessage);
    }
  },

  // Textbook 업데이트용 유효성 검사
  validateTextbookForUpdate: (updateData: unknown) => {
    const result = UpdateTextbookSchema.safeParse(updateData);

    if (!result.success) {
      const errorMessage = result.error.issues[0].message || '유효하지 않은 데이터입니다.';
      toast.error(errorMessage);
      throw new Error(errorMessage);
    }
  },

  // Textbook 배열 유효성 검사
  validateTextbooks: (textbooks: unknown) => {
    const result = z.array(TextbookSchema).safeParse(textbooks);

    if (!result.success) {
      const errorMessage = result.error.issues[0].message || '유효하지 않은 데이터입니다.';
      toast.error(errorMessage);
      throw new Error(errorMessage);
    }
  },
} as const;
