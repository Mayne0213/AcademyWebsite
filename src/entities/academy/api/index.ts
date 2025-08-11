import { Academy } from "@/src/entities/academy/model/types";
import { apiGet, apiPost, apiPut, apiDelete } from "@/src/shared/api/http";
import { API_ENDPOINTS } from "@/src/shared/config/api";
import { toast } from "sonner";

// 학원 API 관련 함수들
export const academyApi = {
  // 모든 학원 조회
  getAcademies: async (): Promise<Academy[]> => {
    try {
      return await apiGet<Academy[]>(API_ENDPOINTS.ACADEMY.BASE);
    } catch (error) {
      throw error;
    }
  },

  // 학원 생성
  createAcademy: async (newAcademy: Omit<Academy, "academyId" | "createdAt" | "updatedAt">): Promise<Academy> => {
    try {
      const result = await apiPost<Academy>(API_ENDPOINTS.ACADEMY.BASE, newAcademy);
      toast.success("학원이 성공적으로 생성되었습니다.");

      return result;
    } catch (error) {
      throw error;
    }
  },

  // 학원 수정
  updateAcademy: async (academyId: number, updateData: { academyId: number; academyName: string; academyPhone: string; academyAddress: string; files?: any[]; deletedFiles?: number[] }): Promise<Academy> => {
    try {
      const result = await apiPut<Academy>(API_ENDPOINTS.ACADEMY.BY_ID(academyId), updateData);
      toast.success("학원 정보가 성공적으로 수정되었습니다.");

      return result;
    } catch (error) {
      throw error;
    }
  },

  // 학원 삭제
  deleteAcademy: async (academyId: number): Promise<number> => {
    try {
      await apiDelete<void>(API_ENDPOINTS.ACADEMY.BY_ID(academyId));
      toast.success("학원이 성공적으로 삭제되었습니다.");

      return academyId;
    } catch (error) {
      throw error;
    }
  },
};