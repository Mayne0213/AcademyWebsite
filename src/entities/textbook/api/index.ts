import { Textbook, CreateTextbookRequest, UpdateTextbookRequest } from "@/src/entities/textbook/model/types";
import { apiGet, apiPost, apiPut, apiDelete } from "@/src/shared/api/http";
import { API_ENDPOINTS } from "@/src/shared/config/api";
import { toast } from "sonner";

export const textbookApi = {
  // 전체 교재 목록 조회
  readTextbooks: async (): Promise<Textbook[]> => {
    try {
      const result = await apiGet<Textbook[]>(API_ENDPOINTS.TEXTBOOK.BASE);
      return result;
    } catch (error) {
      throw error;
    }
  },

  // 특정 교재 조회
  getTextbook: async (textbookId: number): Promise<Textbook> => {
    try {
      const result = await apiGet<Textbook>(API_ENDPOINTS.TEXTBOOK.BY_ID(textbookId));
      return result;
    } catch (error) {
      throw error;
    }
  },

  // 교재 생성
  createTextbook: async (newTextbook: CreateTextbookRequest): Promise<Textbook> => {
    try {
      const result = await apiPost<Textbook>(API_ENDPOINTS.TEXTBOOK.BASE, newTextbook);
      toast.success("교재가 성공적으로 등록되었습니다.");
      return result;
    } catch (error) {
      throw error;
    }
  },

  // 교재 업데이트
  updateTextbook: async (textbookId: number, updateData: UpdateTextbookRequest): Promise<Textbook> => {
    try {
      const result = await apiPut<Textbook>(API_ENDPOINTS.TEXTBOOK.BY_ID(textbookId), updateData);
      toast.success("교재가 성공적으로 수정되었습니다.");
      return result;
    } catch (error) {
      throw error;
    }
  },

  // 교재 삭제 (DB + S3)
  deleteTextbook: async (textbookId: number): Promise<number> => {
    try {
      await apiDelete<void>(API_ENDPOINTS.TEXTBOOK.BY_ID(textbookId));
      toast.success("교재가 성공적으로 삭제되었습니다.");
      return textbookId;
    } catch (error) {
      throw error;
    }
  },

  // 중요 교재 토글
  toggleImportantTextbook: async (textbookId: number, isImportant: boolean): Promise<Textbook> => {
    try {
      const result = await apiPut<Textbook>(API_ENDPOINTS.TEXTBOOK.BY_ID(textbookId), { isImportant });
      toast.success("교재가 성공적으로 수정되었습니다.");
      return result;
    } catch (error) {
      throw error;
    }
  },
};
