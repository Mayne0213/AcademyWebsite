import { QnABoard, QnABoardComment } from "@/entities/qna/model/types";
import { apiGet, apiPost, apiPut, apiDelete } from "@/shared/api/http";
import { API_ENDPOINTS } from "@/shared/config/api";

// QnA API 관련 함수들
export const qnaApi = {
  // 모든 QnA 조회
  getQnAs: async (): Promise<QnABoard[]> => {
    return await apiGet<QnABoard[]>(API_ENDPOINTS.QNA.BASE);
  },

  // QnA 생성
  createQnA: async (newQnA: Omit<QnABoard, "qnaId" | "createdAt" | "updatedAt" | "qnaStudent" | "qnaComments">): Promise<QnABoard> => {
    return await apiPost<QnABoard>(API_ENDPOINTS.QNA.BASE, newQnA);
  },

  // QnA 수정
  updateQnA: async (qnaId: number, updatedQnA: QnABoard): Promise<QnABoard> => {
    return await apiPut<QnABoard>(API_ENDPOINTS.QNA.BY_ID(qnaId), updatedQnA);
  },

  // QnA 삭제
  deleteQnA: async (qnaId: number): Promise<void> => {
    await apiDelete<void>(API_ENDPOINTS.QNA.BY_ID(qnaId));
  },

  // 특정 사용자의 QnA 조회
  getQnAsByUser: async (userId: number): Promise<QnABoard[]> => {
    return await apiGet<QnABoard[]>(`${API_ENDPOINTS.QNA.BASE}?userId=${userId}`);
  },

  // 댓글 생성
  createComment: async (qnaId: number, newComment: Omit<QnABoardComment, "commentId" | "createdAt" | "updatedAt" | "qnaCommentStudent" | "qnaCommentQna">): Promise<QnABoardComment> => {
    return await apiPost<QnABoardComment>(API_ENDPOINTS.QNA.COMMENT.BY_QNA_ID(qnaId), newComment);
  },

  // 댓글 수정
  updateComment: async (qnaId: number, commentId: number, updatedComment: QnABoardComment): Promise<QnABoardComment> => {
    return await apiPut<QnABoardComment>(API_ENDPOINTS.QNA.COMMENT.BY_ID(qnaId, commentId), updatedComment);
  },

  // 댓글 삭제
  deleteComment: async (qnaId: number, commentId: number): Promise<void> => {
    await apiDelete<void>(API_ENDPOINTS.QNA.COMMENT.BY_ID(qnaId, commentId));
  },

  // 특정 QnA의 댓글들 조회
  getCommentsByQnA: async (qnaId: number): Promise<QnABoardComment[]> => {
    return await apiGet<QnABoardComment[]>(API_ENDPOINTS.QNA.COMMENT.BY_QNA_ID(qnaId));
  },
}; 