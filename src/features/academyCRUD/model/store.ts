import { useCallback } from 'react';
import { Academy } from "@/src/entities/academy/model/types";
import { academyApi } from '@/src/entities/academy/api';
import { useAcademyStore } from "@/src/entities/academy/model/store";
import { useFileFeatureStore } from '@/src/features/fileDelete';

// API 호출과 전역 상태 관리를 통합하는 훅
export const useAcademyFeatureStore = () => {
  const entityStore = useAcademyStore.getState();
  const { deleteAcademyFiles } = useFileFeatureStore();

  const readAcademies = useCallback(async () => {
    entityStore.setLoading(true);
    entityStore.readAcademies(await academyApi.getAcademies());
    entityStore.setLoading(false);
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const createAcademy = useCallback(async (newAcademy: Omit<Academy, "academyId" | "createdAt" | "updatedAt">) => {
    entityStore.setLoading(true);
    entityStore.createAcademy(await academyApi.createAcademy(newAcademy));
    entityStore.setLoading(false);
  }, [entityStore]);

  const updateAcademy = useCallback(async (academyId: number, updateData: { academyId: number; academyName: string; academyPhone: string; academyAddress: string; files?: any[]; deletedFiles?: number[] }) => {
    entityStore.setLoading(true);
    
    // 삭제된 파일이 있으면 먼저 삭제
    if (updateData.deletedFiles && updateData.deletedFiles.length > 0) {
      const academy = entityStore.academies.find(a => a.academyId === academyId);
      if (academy && academy.academyFiles) {
        const filesToDelete = academy.academyFiles.filter(file => 
          updateData.deletedFiles!.includes(file.fileId)
        );
        if (filesToDelete.length > 0) {
          await deleteAcademyFiles(filesToDelete);
        }
      }
    }
    
    entityStore.updateAcademy(await academyApi.updateAcademy(academyId, updateData));
    entityStore.setLoading(false);
  }, [entityStore, deleteAcademyFiles]);

  const deleteAcademy = useCallback(async (academyId: number) => {
    entityStore.setLoading(true);

    const academy = entityStore.academies.find(a => a.academyId === academyId);
    if (academy && academy.academyFiles && academy.academyFiles.length > 0) {
      await deleteAcademyFiles(academy.academyFiles);
    }

    // 학원 삭제 (DB, 상태 관리)
    entityStore.deleteAcademy(await academyApi.deleteAcademy(academyId));
    entityStore.setLoading(false);
  }, [entityStore, deleteAcademyFiles]);

  return {
    readAcademies,
    createAcademy,
    updateAcademy,
    deleteAcademy,
  };
};