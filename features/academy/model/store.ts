import { create } from 'zustand';
import { Academy } from "@/entities/academy/model/types";
import { academyApi } from '@/entities/academy/api';
import { useAcademyStore } from "@/entities/academy/model/store";

// API 호출과 전역 상태 관리를 통합하는 스토어
export const useAcademyFeatureStore = create(() => ({
  
  // 모든 학원 조회
  readAcademies: async () => {
    const entityStore = useAcademyStore.getState();
    entityStore.setLoading(true);
    
    try {
      const academies = await academyApi.getAcademies();
      entityStore.readAcademies(academies);
      entityStore.setError(null);
    } catch (error) {
      entityStore.setError(error instanceof Error ? error.message : '학원 목록을 불러오는데 실패했습니다.');
    } finally {
      entityStore.setLoading(false);
    }
  },

  // 학원 생성
  createAcademy: async (newAcademy: Omit<Academy, "academyId" | "createdAt" | "updatedAt">) => {
    const entityStore = useAcademyStore.getState();
    entityStore.setLoading(true);
    
    try {
      const academy = await academyApi.createAcademy(newAcademy);
      entityStore.createAcademy(academy);
      entityStore.setError(null);
      return academy;
    } catch (error) {
      entityStore.setError(error instanceof Error ? error.message : '학원 생성에 실패했습니다.');
      throw error;
    } finally {
      entityStore.setLoading(false);
    }
  },

  // 학원 수정
  updateAcademy: async (academyId: number, updatedAcademy: Academy) => {
    const entityStore = useAcademyStore.getState();
    entityStore.setLoading(true);
    
    try {
      const academy = await academyApi.updateAcademy(academyId, updatedAcademy);
      entityStore.updateAcademy(academy);
      entityStore.setError(null);
      return academy;
    } catch (error) {
      entityStore.setError(error instanceof Error ? error.message : '학원 수정에 실패했습니다.');
      throw error;
    } finally {
      entityStore.setLoading(false);
    }
  },

  // 학원 삭제
  deleteAcademy: async (academyId: number) => {
    const entityStore = useAcademyStore.getState();
    entityStore.setLoading(true);
    
    try {
      await academyApi.deleteAcademy(academyId);
      entityStore.deleteAcademy(academyId);
      entityStore.setError(null);
    } catch (error) {
      entityStore.setError(error instanceof Error ? error.message : '학원 삭제에 실패했습니다.');
      throw error;
    } finally {
      entityStore.setLoading(false);
    }
  },
}));