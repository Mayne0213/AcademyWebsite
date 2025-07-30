import { QnABoard, QnABoardComment, UpdateQnABoardRequest } from './types';
import { VALIDATION_FUNCTIONS } from '@/shared/lib/validation';
import { ERROR_MESSAGES } from '@/shared/config/messages';

// QnA 유효성 검사 함수들
export const QNA_VALIDATION = {
  // QnABoard 전체 유효성 검사
  validateQnABoard: (qnaBoard: QnABoard): { isValid: boolean; errors: string[] } => {
    const errors: string[] = [];
    
    // ID 검사
    if (!qnaBoard.qnaId || qnaBoard.qnaId <= 0) {
      errors.push('유효하지 않은 QnA ID입니다.');
    }
    
    // 제목 검사
    if (!qnaBoard.qnaTitle || qnaBoard.qnaTitle.trim().length === 0) {
      errors.push('QnA 제목은 필수입니다.');
    } else if (qnaBoard.qnaTitle.trim().length > 200) {
      errors.push('QnA 제목은 200자를 초과할 수 없습니다.');
    }
    
    // 내용 검사
    if (!qnaBoard.qnaContent || qnaBoard.qnaContent.trim().length === 0) {
      errors.push('QnA 내용은 필수입니다.');
    }
    
    // 사용자 ID 검사
    if (!qnaBoard.qnaUserId || qnaBoard.qnaUserId <= 0) {
      errors.push('유효하지 않은 사용자 ID입니다.');
    }
    
    // 날짜 검사
    if (!qnaBoard.createdAt || !(qnaBoard.createdAt instanceof Date)) {
      errors.push('생성일은 필수입니다.');
    }
    
    if (!qnaBoard.updatedAt || !(qnaBoard.updatedAt instanceof Date)) {
      errors.push('수정일은 필수입니다.');
    }
    
    // 이미지 URL 검사
    if (qnaBoard.qnaImageUrl) {
      try {
        new URL(qnaBoard.qnaImageUrl);
      } catch {
        errors.push('유효하지 않은 이미지 URL 형식입니다.');
      }
    }
    
    // 댓글 검사
    if (qnaBoard.qnaComments && qnaBoard.qnaComments.length > 0) {
      for (const comment of qnaBoard.qnaComments) {
        const commentValidation = QNA_VALIDATION.validateQnABoardComment(comment);
        if (!commentValidation.isValid) {
          errors.push(...commentValidation.errors);
        }
      }
    }
    
    return {
      isValid: errors.length === 0,
      errors
    };
  },

  // QnABoard 생성용 유효성 검사 (ID 제외)
  validateQnABoardForCreate: (qnaBoard: Omit<QnABoard, 'qnaId' | 'createdAt' | 'updatedAt' | 'qnaStudent' | 'qnaComments'>): { isValid: boolean; errors: string[] } => {
    const errors: string[] = [];
    
    // 제목 검사
    if (!qnaBoard.qnaTitle || qnaBoard.qnaTitle.trim().length === 0) {
      errors.push('QnA 제목은 필수입니다.');
    } else if (qnaBoard.qnaTitle.trim().length > 200) {
      errors.push('QnA 제목은 200자를 초과할 수 없습니다.');
    }
    
    // 내용 검사
    if (!qnaBoard.qnaContent || qnaBoard.qnaContent.trim().length === 0) {
      errors.push('QnA 내용은 필수입니다.');
    }
    
    // 사용자 ID 검사
    if (!qnaBoard.qnaUserId || qnaBoard.qnaUserId <= 0) {
      errors.push('유효하지 않은 사용자 ID입니다.');
    }
    
    // 이미지 URL 검사
    if (qnaBoard.qnaImageUrl) {
      try {
        new URL(qnaBoard.qnaImageUrl);
      } catch {
        errors.push('유효하지 않은 이미지 URL 형식입니다.');
      }
    }
    
    return {
      isValid: errors.length === 0,
      errors
    };
  },

  // QnABoard 업데이트용 유효성 검사
  validateQnABoardForUpdate: (updateData: UpdateQnABoardRequest): { isValid: boolean; errors: string[] } => {
    const errors: string[] = [];
    
    // 업데이트할 필드가 있는지 확인
    const hasUpdateFields = Object.keys(updateData).some(key => 
      key !== 'updatedAt' && updateData[key as keyof UpdateQnABoardRequest] !== undefined
    );
    
    if (!hasUpdateFields) {
      errors.push('업데이트할 필드가 없습니다.');
    }
    
    // 제목 검사
    if (updateData.qnaTitle) {
      if (updateData.qnaTitle.trim().length === 0) {
        errors.push('QnA 제목은 비어있을 수 없습니다.');
      } else if (updateData.qnaTitle.trim().length > 200) {
        errors.push('QnA 제목은 200자를 초과할 수 없습니다.');
      }
    }
    
    // 내용 검사
    if (updateData.qnaContent && updateData.qnaContent.trim().length === 0) {
      errors.push('QnA 내용은 비어있을 수 없습니다.');
    }
    
    // 사용자 ID 검사
    if (updateData.qnaUserId && updateData.qnaUserId <= 0) {
      errors.push('유효하지 않은 사용자 ID입니다.');
    }
    
    // 이미지 URL 검사
    if (updateData.qnaImageUrl) {
      try {
        new URL(updateData.qnaImageUrl);
      } catch {
        errors.push('유효하지 않은 이미지 URL 형식입니다.');
      }
    }
    
    return {
      isValid: errors.length === 0,
      errors
    };
  },

  // QnABoardComment 유효성 검사
  validateQnABoardComment: (comment: QnABoardComment): { isValid: boolean; errors: string[] } => {
    const errors: string[] = [];
    
    if (!comment.commentId || comment.commentId <= 0) {
      errors.push('유효하지 않은 댓글 ID입니다.');
    }
    
    if (!comment.commentContent || comment.commentContent.trim().length === 0) {
      errors.push('댓글 내용은 필수입니다.');
    } else if (comment.commentContent.trim().length > 1000) {
      errors.push('댓글 내용은 1000자를 초과할 수 없습니다.');
    }
    
    if (!comment.commentUserId || comment.commentUserId <= 0) {
      errors.push('유효하지 않은 댓글 작성자 ID입니다.');
    }
    
    if (!comment.qnaId || comment.qnaId <= 0) {
      errors.push('유효하지 않은 QnA ID입니다.');
    }
    
    // 날짜 검사
    if (!comment.createdAt || !(comment.createdAt instanceof Date)) {
      errors.push('생성일은 필수입니다.');
    }
    
    if (!comment.updatedAt || !(comment.updatedAt instanceof Date)) {
      errors.push('수정일은 필수입니다.');
    }
    
    return {
      isValid: errors.length === 0,
      errors
    };
  },

  // QnABoardComment 생성용 유효성 검사 (ID 제외)
  validateQnABoardCommentForCreate: (comment: Omit<QnABoardComment, 'commentId' | 'createdAt' | 'updatedAt' | 'qnaCommentStudent' | 'qnaCommentQna'>): { isValid: boolean; errors: string[] } => {
    const errors: string[] = [];
    
    if (!comment.commentContent || comment.commentContent.trim().length === 0) {
      errors.push('댓글 내용은 필수입니다.');
    } else if (comment.commentContent.trim().length > 1000) {
      errors.push('댓글 내용은 1000자를 초과할 수 없습니다.');
    }
    
    if (!comment.commentUserId || comment.commentUserId <= 0) {
      errors.push('유효하지 않은 댓글 작성자 ID입니다.');
    }
    
    if (!comment.qnaId || comment.qnaId <= 0) {
      errors.push('유효하지 않은 QnA ID입니다.');
    }
    
    return {
      isValid: errors.length === 0,
      errors
    };
  },

  // QnABoard 배열 유효성 검사
  validateQnABoards: (qnaBoards: QnABoard[]): { isValid: boolean; errors: string[] } => {
    const errors: string[] = [];
    
    if (!Array.isArray(qnaBoards)) {
      errors.push('QnA 목록은 배열이어야 합니다.');
      return { isValid: false, errors };
    }
    
    for (let i = 0; i < qnaBoards.length; i++) {
      const qnaValidation = QNA_VALIDATION.validateQnABoard(qnaBoards[i]);
      if (!qnaValidation.isValid) {
        errors.push(`QnA ${i + 1}: ${qnaValidation.errors.join(', ')}`);
      }
    }
    
    return {
      isValid: errors.length === 0,
      errors
    };
  },
} as const; 