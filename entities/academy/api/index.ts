import { Academy } from "@/entities/academy/model/types";
import { apiGet, apiPost, apiPut, apiDelete } from "@/shared/api/http";
import { API_ENDPOINTS } from "@/shared/config/api";

// 학원 API 관련 함수들
export const academyApi = {
  // 모든 학원 조회
  getAcademies: async (): Promise<Academy[]> => {
    return await apiGet<Academy[]>(API_ENDPOINTS.ACADEMY.BASE);
  },

  // 학원 생성
  createAcademy: async (newAcademy: Omit<Academy, "academyId" | "createdAt" | "updatedAt">): Promise<Academy> => {
    return await apiPost<Academy>(API_ENDPOINTS.ACADEMY.BASE, newAcademy);
  },

  // 학원 수정
  updateAcademy: async (academyId: number, updatedAcademy: Academy): Promise<Academy> => {
    return await apiPut<Academy>(API_ENDPOINTS.ACADEMY.BY_ID(academyId), updatedAcademy);
  },

  // 학원 삭제
  deleteAcademy: async (academyId: number): Promise<void> => {
    await apiDelete<void>(API_ENDPOINTS.ACADEMY.BY_ID(academyId));
  },
}; 