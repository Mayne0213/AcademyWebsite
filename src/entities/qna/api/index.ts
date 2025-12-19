// entities/qna/api/index.ts
import { QnABoard, QnABoardComment, QnADetail, CreateCommentRequest, CreateQnARequest } from "@/src/entities/qna/model/types";
import { apiGet, apiPost, apiPut, apiDelete } from "@/src/shared/api/http";
import { API_ENDPOINTS } from "@/src/shared/config/api";
import { toast } from "sonner";

// QnA API 관련 함수들
export const qnaApi = {
  // 모든 QnA 조회 (관리자/개발자만) - pagination 지원
  getQnAs: async (page: number, itemsPerPage: number): Promise<{ qnas: QnABoard[]; totalCount: number }> => {
    try {
      const url = `${API_ENDPOINTS.QNA.BASE}?page=${page}&pageSize=${itemsPerPage}`;
      return await apiGet<{ qnas: QnABoard[]; totalCount: number }>(url);
    } catch (error) {
      throw error;
    }
  },

  // 개인 QnA 조회 (학생만)
  getPersonalQnAs: async (): Promise<QnABoard[]> => {
    try {
      return await apiGet<QnABoard[]>(API_ENDPOINTS.QNA.PERSONAL);
    } catch (error) {
      throw error;
    }
  },

  // QnA 생성
  createQnA: async (newQnA: CreateQnARequest): Promise<QnABoard> => {
    try {
      const result = await apiPost<QnABoard>(API_ENDPOINTS.QNA.BASE, newQnA);
      toast.success("QnA가 성공적으로 생성되었습니다.");

      return result;
    } catch (error) {
      throw error;
    }
  },

  // QnA 수정
  updateQnA: async (qnaId: number, updatedQnA: QnABoard): Promise<QnABoard> => {
    try {
      const result = await apiPut<QnABoard>(API_ENDPOINTS.QNA.BY_ID(qnaId), updatedQnA);
      toast.success("QnA가 성공적으로 수정되었습니다.");

      return result;
    } catch (error) {
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

  // 댓글 생성
  createComment: async (qnaId: number, newComment: CreateCommentRequest): Promise<QnABoardComment> => {
    try {
      const result = await apiPost<QnABoardComment>(API_ENDPOINTS.QNA.COMMENT.BY_QNA_ID(qnaId), newComment);
      toast.success("댓글이 성공적으로 생성되었습니다.");

      return result;
    } catch (error) {
      throw error;
    }
  },

  // 댓글 수정
  updateComment: async (qnaId: number, commentId: number, updatedComment: QnABoardComment): Promise<QnABoardComment> => {
    try {
      const result = await apiPut<QnABoardComment>(API_ENDPOINTS.QNA.COMMENT.BY_ID(qnaId, commentId), updatedComment);
      toast.success("댓글이 성공적으로 수정되었습니다.");

      return result;
    } catch (error) {
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

  // QnA 상세 정보 조회 (지연 로딩용)
  getQnADetail: async (qnaId: number): Promise<QnADetail> => {
    try {
      const result = await apiGet<QnABoard>(API_ENDPOINTS.QNA.BY_ID(qnaId));

      // QnADetail 형태로 변환하여 반환
      return {
        qnaId: result.qnaId,
        qnaTitle: result.qnaTitle,
        qnaContent: result.qnaContent,
        createdAt: result.createdAt,
        updatedAt: result.updatedAt,
        student: result.student,
        comments: result.comments || [],
        files: result.files || []
      };
    } catch (error) {
      throw error;
    }
  },
};