// entities/qna/api/index.ts
import { QnABoard, QnABoardComment } from "@/src/entities/qna/model/types";
import { apiGet, apiPost, apiPut, apiDelete } from "@/src/shared/api/http";
import { API_ENDPOINTS } from "@/src/shared/config/api";
import { QNA_VALIDATION } from "@/src/entities/qna/model/validation";
import { toast } from "sonner";

// QnA API 관련 함수들
export const qnaApi = {
  // 모든 QnA 조회
  getQnAs: async (): Promise<QnABoard[]> => {
    try {
      return await apiGet<QnABoard[]>(API_ENDPOINTS.QNA.BASE);
    } catch (error) {
      throw error;
    }
  },

  // QnA 생성 (간단한 validation)
  createQnA: async (newQnA: Omit<QnABoard, "qnaId" | "createdAt" | "updatedAt" | "qnaStudent" | "qnaComments">): Promise<QnABoard> => {
    try {
      QNA_VALIDATION.validateQnABoardForCreate(newQnA);

      const result = await apiPost<QnABoard>(API_ENDPOINTS.QNA.BASE, newQnA);
      toast.success("QnA가 성공적으로 생성되었습니다.");

      return result;
    } catch (error) {
      if (error instanceof Error && error.message.includes("validation")) {
        toast.error("입력 정보를 확인해주세요.");
      }
      throw error;
    }
  },

  // QnA 수정 (간단한 validation)
  updateQnA: async (qnaId: number, updatedQnA: QnABoard): Promise<QnABoard> => {
    try {
      QNA_VALIDATION.validateQnABoardForUpdate(updatedQnA);

      const result = await apiPut<QnABoard>(API_ENDPOINTS.QNA.BY_ID(qnaId), updatedQnA);
      toast.success("QnA가 성공적으로 수정되었습니다.");

      return result;
    } catch (error) {
      if (error instanceof Error && error.message.includes("validation")) {
        toast.error("입력 정보를 확인해주세요.");
      }
      throw error;
    }
  },

  // QnA 삭제
  deleteQnA: async (qnaId: number): Promise<number> => {
    try {
      await apiDelete<void>(API_ENDPOINTS.QNA.BY_ID(qnaId));
      toast.success("QnA가 성공적으로 삭제되었습니다.");

      return qnaId;
    } catch (error) {
      throw error;
    }
  },

  // 특정 사용자의 QnA 조회
  getQnAsByUser: async (userId: number): Promise<QnABoard[]> => {
    try {
      return await apiGet<QnABoard[]>(`${API_ENDPOINTS.QNA.BASE}?userId=${userId}`);
    } catch (error) {
      throw error;
    }
  },

  // 댓글 생성 (간단한 validation)
  createComment: async (qnaId: number, newComment: Omit<QnABoardComment, "commentId" | "createdAt" | "updatedAt" | "qnaCommentUser" | "qnaCommentQna">): Promise<QnABoardComment> => {
    try {
      QNA_VALIDATION.validateQnABoardCommentForCreate(newComment);

      const result = await apiPost<QnABoardComment>(API_ENDPOINTS.QNA.COMMENT.BY_QNA_ID(qnaId), newComment);
      toast.success("댓글이 성공적으로 생성되었습니다.");

      return result;
    } catch (error) {
      if (error instanceof Error && error.message.includes("validation")) {
        toast.error("입력 정보를 확인해주세요.");
      }
      throw error;
    }
  },

  // 댓글 수정 (간단한 validation)
  updateComment: async (qnaId: number, commentId: number, updatedComment: QnABoardComment): Promise<QnABoardComment> => {
    try {
      QNA_VALIDATION.validateQnABoardCommentForUpdate(updatedComment);

      const result = await apiPut<QnABoardComment>(API_ENDPOINTS.QNA.COMMENT.BY_ID(qnaId, commentId), updatedComment);
      toast.success("댓글이 성공적으로 수정되었습니다.");

      return result;
    } catch (error) {
      if (error instanceof Error && error.message.includes("validation")) {
        toast.error("입력 정보를 확인해주세요.");
      }
      throw error;
    }
  },

  // 댓글 삭제
  deleteComment: async (qnaId: number, commentId: number): Promise<number> => {
    try {
      await apiDelete<void>(API_ENDPOINTS.QNA.COMMENT.BY_ID(qnaId, commentId));
      toast.success("댓글이 성공적으로 삭제되었습니다.");

      return commentId;
    } catch (error) {
      throw error;
    }
  },

  // 특정 QnA의 댓글들 조회
  getCommentsByQnA: async (qnaId: number): Promise<QnABoardComment[]> => {
    try {
      return await apiGet<QnABoardComment[]>(API_ENDPOINTS.QNA.COMMENT.BY_QNA_ID(qnaId));
    } catch (error) {
      throw error;
    }
  },
};