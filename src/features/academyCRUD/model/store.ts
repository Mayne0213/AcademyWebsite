import { useCallback } from 'react';
import { Academy } from "@/src/entities/academy/model/types";
import { academyApi } from '@/src/entities/academy/api';
import { useAcademyStore } from "@/src/entities/academy/model/store";

// API 호출과 전역 상태 관리를 통합하는 훅
export const useAcademyFeatureStore = () => {
  const entityStore = useAcademyStore.getState();

  const readAcademies = useCallback(async () => {
    entityStore.setLoading(true);
    try {
      entityStore.readAcademies(await academyApi.getAcademies());
    } finally {
      entityStore.setLoading(false);
    }
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const createAcademy = useCallback(async (newAcademy: Omit<Academy, "academyId" | "createdAt" | "updatedAt">) => {
    entityStore.setLoading(true);
    try {
      entityStore.createAcademy(await academyApi.createAcademy(newAcademy));
    } finally {
      entityStore.setLoading(false);
    }
  }, [entityStore]);

  const updateAcademy = useCallback(async (academyId: number, updateData: { academyId: number; academyName: string; academyPhone: string; academyAddress: string; files?: any[]; deletedFiles?: number[] }) => {
    entityStore.setLoading(true);
    try {
      // 업데이트 (삭제된 파일은 백엔드에서 처리)
      entityStore.updateAcademy(await academyApi.updateAcademy(academyId, updateData));
    } finally {
      entityStore.setLoading(false);
    }
  }, [entityStore]);

  const deleteAcademy = useCallback(async (academyId: number) => {
    entityStore.setLoading(true);
    try {
      // 학원 삭제 (DB에서 CASCADE로 파일도 자동 삭제됨)
      entityStore.deleteAcademy(await academyApi.deleteAcademy(academyId));
    } finally {
      entityStore.setLoading(false);
    }
  }, [entityStore]);

  return {
    readAcademies,
    createAcademy,
    updateAcademy,
    deleteAcademy,
  };
};