import { useCallback } from 'react';
import { CreateAnnouncementRequest } from "@/src/entities/announcement/model/types";
import { announcementApi } from '@/src/entities/announcement/api';
import { useAnnouncementStore } from "@/src/entities/announcement/model/store";
import { useFileFeatureStore } from '@/src/features/fileDelete';
import { usePaginationStore } from '@/src/shared/model/pagination';

// API 호출과 전역 상태 관리를 통합하는 훅
export const useAnnouncementFeatureStore = () => {
  const entityStore = useAnnouncementStore.getState();
  const paginationStore = usePaginationStore.getState();
  const { deleteAnnouncementFiles } = useFileFeatureStore();

  const readAnnouncements = useCallback(async (page: number, itemsPerPage: number, isAssetOnly: boolean = false) => {
    entityStore.setLoading(true);
    const result = await announcementApi.getAnnouncements(page, itemsPerPage, isAssetOnly);
    entityStore.readAnnouncements(result.announcements);
    paginationStore.setTotalCount(result.totalCount);
    paginationStore.setCurrentPage(page);
    paginationStore.setItemsPerPage(itemsPerPage);
    entityStore.setLoading(false);
    return result;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const createAnnouncement = useCallback(async (newAnnouncement: CreateAnnouncementRequest) => {
    entityStore.setLoading(true);
    const result = await announcementApi.createAnnouncement(newAnnouncement);
    entityStore.createAnnouncement(result);
    const currentPage = paginationStore.currentPage;
    const itemsPerPage = paginationStore.itemsPerPage;
    await readAnnouncements(currentPage, itemsPerPage, false);
    
    entityStore.setLoading(false);
    return result;
  }, [entityStore, paginationStore, readAnnouncements]);

  const updateAnnouncement = useCallback(async (announcementId: number, updateData: { announcementId: number; announcementTitle: string; announcementContent: string; isItAssetAnnouncement: boolean; isItImportantAnnouncement: boolean; files?: any[]; academyIds?: number[] }) => {
    entityStore.setLoading(true);
    const result = await announcementApi.updateAnnouncement(announcementId, updateData);
    entityStore.updateAnnouncement(result);
    
    if (result.isItAssetAnnouncement) {
      entityStore.deleteAnnouncement(announcementId);
    }
    
    entityStore.setLoading(false);
    
    return result;
  }, [entityStore]);

  const deleteAnnouncement = useCallback(async (announcementId: number) => {
    entityStore.setLoading(true);

    const announcement = entityStore.announcements.find(a => a.announcementId === announcementId);
    if (announcement && announcement.announcementFiles && announcement.announcementFiles.length > 0) {
      await deleteAnnouncementFiles(announcement.announcementFiles);
    }

    // 공지사항 삭제 (DB, 상태 관리)
    const deletedId = await announcementApi.deleteAnnouncement(announcementId);
    entityStore.deleteAnnouncement(deletedId);
    
    // 공지 삭제 후 목록 새로고침하여 totalCount 업데이트
    const currentPage = paginationStore.currentPage;
    const itemsPerPage = paginationStore.itemsPerPage;
    await readAnnouncements(currentPage, itemsPerPage, false);
    
    entityStore.setLoading(false);
    return deletedId;
  }, [deleteAnnouncementFiles, entityStore, paginationStore, readAnnouncements]);

  const readAssetAnnouncements = useCallback(async (page: number, itemsPerPage: number) => {
    entityStore.setLoading(true);
    const result = await announcementApi.getAssetAnnouncements(page, itemsPerPage);
    entityStore.readAnnouncements(result.announcements);
    paginationStore.setTotalCount(result.totalCount);
    paginationStore.setCurrentPage(page);
    paginationStore.setItemsPerPage(itemsPerPage);
    entityStore.setLoading(false);
    return result;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const readAnnouncementById = useCallback(async (announcementId: number) => {
    return await announcementApi.getAnnouncementById(announcementId);
  }, []);

  const toggleImportantAnnouncement = useCallback(async (announcementId: number, isItImportantAnnouncement: boolean) => {
    entityStore.setLoading(true);
    const result = await announcementApi.toggleImportantAnnouncement(announcementId, isItImportantAnnouncement);
    entityStore.updateAnnouncement(result);
    entityStore.setLoading(false);
    return result;
  }, [entityStore]);

  return {
    readAnnouncements,
    readAnnouncementById,
    createAnnouncement,
    updateAnnouncement,
    toggleImportantAnnouncement,
    deleteAnnouncement,
    readAssetAnnouncements,
  };
}; 