import { z } from 'zod';
import { VALIDATION_FUNCTIONS } from '@/src/shared/lib/validation';
import { QnABoard, QnABoardComment } from './types';
import { toast } from 'sonner';

// Zod 스키마 정의
export const QnABoardCommentSchema = z.object({
  commentId: z.number().positive('유효하지 않은 댓글 ID입니다.'),
  commentContent: z.string().max(1000, '댓글 내용은 1000자를 초과할 수 없습니다.'),
  commentUserId: z.number().positive('유효하지 않은 댓글 작성자 ID입니다.'),
  qnaId: z.number().positive('유효하지 않은 QnA ID입니다.'),
  qnaCommentUser: z.any(),
  qnaCommentQna: z.any(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const QnABoardSchema = z.object({
  qnaId: z.number().positive('유효하지 않은 QnA ID입니다.'),
  qnaTitle: z.string().max(200, 'QnA 제목은 200자를 초과할 수 없습니다.'),
  qnaContent: z.string().min(1, 'QnA 내용은 필수입니다.'),
  qnaImageUrl: z.string().refine(VALIDATION_FUNCTIONS.isValidUrl, '유효하지 않은 이미지 URL 형식입니다.').optional(),
  qnaUserId: z.number().positive('유효하지 않은 사용자 ID입니다.'),
  qnaComments: z.array(QnABoardCommentSchema),
  qnaStudent: z.any(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const CreateQnABoardSchema = QnABoardSchema.pick({
  qnaTitle: true,
  qnaContent: true,
  qnaImageUrl: true,
  qnaUserId: true,
});

export const UpdateQnABoardSchema = QnABoardSchema.partial().refine(
  (data) => Object.keys(data).some(key => data[key as keyof typeof data] !== undefined),
  { message: '업데이트할 필드가 없습니다.' }
);

export const UpdateQnABoardCommentSchema = QnABoardCommentSchema.partial().refine(
  (data) => Object.keys(data).some(key => data[key as keyof typeof data] !== undefined),
  { message: '업데이트할 필드가 없습니다.' }
);

export const CreateQnABoardCommentSchema = QnABoardCommentSchema.pick({
  commentContent: true,
  commentUserId: true,
  qnaId: true,
});

// 타입 안전성을 위한 타입 체크 함수
export const validateQnABoardType = (data: unknown): data is QnABoard => {
  return QnABoardSchema.safeParse(data).success;
};

export const validateQnABoardCommentType = (data: unknown): data is QnABoardComment => {
  return QnABoardCommentSchema.safeParse(data).success;
};

// 유효성 검사 함수들
export const QNA_VALIDATION = {
  // QnABoard 전체 유효성 검사
  validateQnABoard: (qnaBoard: unknown) => {
    const result = QnABoardSchema.safeParse(qnaBoard);

    if (!result.success) {
      const errorMessage = result.error.issues[0].message || '유효하지 않은 데이터입니다.';
      toast.error(errorMessage);
      throw new Error(errorMessage);
    }
  },

  // QnABoard 생성용 유효성 검사
  validateQnABoardForCreate: (qnaBoard: unknown) => {
    const result = CreateQnABoardSchema.safeParse(qnaBoard);

    if (!result.success) {
      const errorMessage = result.error.issues[0].message || '유효하지 않은 데이터입니다.';
      toast.error(errorMessage);
      throw new Error(errorMessage);
    }
  },

  validateQnABoardCommentForUpdate: (comment: unknown) => {
    const result = UpdateQnABoardCommentSchema.safeParse(comment);

    if (!result.success) {
      const errorMessage = result.error.issues[0].message || '유효하지 않은 데이터입니다.';
      toast.error(errorMessage);
      throw new Error(errorMessage);
    }
  },

  // QnABoard 업데이트용 유효성 검사
  validateQnABoardForUpdate: (updateData: unknown) => {
    const result = UpdateQnABoardSchema.safeParse(updateData);

    if (!result.success) {
      const errorMessage = result.error.issues[0].message || '유효하지 않은 데이터입니다.';
      toast.error(errorMessage);
      throw new Error(errorMessage);
    }
  },

  // QnABoardComment 유효성 검사
  validateQnABoardComment: (comment: unknown) => {
    const result = QnABoardCommentSchema.safeParse(comment);

    if (!result.success) {
      const errorMessage = result.error.issues[0].message || '유효하지 않은 데이터입니다.';
      toast.error(errorMessage);
      throw new Error(errorMessage);
    }
  },

  // QnABoardComment 생성용 유효성 검사
  validateQnABoardCommentForCreate: (comment: unknown) => {
    const result = CreateQnABoardCommentSchema.safeParse(comment);

    if (!result.success) {
      const errorMessage = result.error.issues[0].message || '유효하지 않은 데이터입니다.';
      toast.error(errorMessage);
      throw new Error(errorMessage);
    }
  },

  // QnABoard 배열 유효성 검사
  validateQnABoards: (qnaBoards: unknown) => {
    const result = z.array(QnABoardSchema).safeParse(qnaBoards);

    if (!result.success) {
      const errorMessage = result.error.issues[0].message || '유효하지 않은 데이터입니다.';
      toast.error(errorMessage);
      throw new Error(errorMessage);
    }
  },
} as const; 