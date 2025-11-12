import { apiGet, apiPut } from "@/src/shared/api/http";
import { Toggle } from "../model/types";

export const toggleApi = {
  // Toggle 설정 조회
  getToggle: async (): Promise<Toggle> => {
    try {
      const result = await apiGet<Toggle>('/api/toggle');
      return result;
    } catch (error) {
      throw error;
    }
  },

  // Toggle 설정 업데이트
  updateToggle: async (isReviewPopupOn: boolean): Promise<Toggle> => {
    try {
      const result = await apiPut<Toggle>('/api/toggle', { isReviewPopupOn });
      return result;
    } catch (error) {
      throw error;
    }
  },
};
