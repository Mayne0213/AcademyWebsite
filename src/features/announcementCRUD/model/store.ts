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
    try {
      const result = await announcementApi.getAnnouncements(page, itemsPerPage, isAssetOnly);
      entityStore.readAnnouncements(result.announcements);
      paginationStore.setTotalCount(result.totalCount);
      paginationStore.setCurrentPage(page);
      paginationStore.setItemsPerPage(itemsPerPage);
      return result;
    } finally {
      entityStore.setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const createAnnouncement = useCallback(async (newAnnouncement: CreateAnnouncementRequest) => {
    entityStore.setLoading(true);
    try {
      const result = await announcementApi.createAnnouncement(newAnnouncement);
      entityStore.createAnnouncement(result);
      paginationStore.incrementTotalCount();

      return result;
    } finally {
      entityStore.setLoading(false);
    }
  }, [entityStore, paginationStore]);

  const updateAnnouncement = useCallback(async (announcementId: number, updateData: { announcementId: number; announcementTitle: string; announcementContent: string; isItAssetAnnouncement: boolean; isItImportantAnnouncement: boolean; files?: any[]; academyIds?: number[] }) => {
    entityStore.setLoading(true);
    try {
      const result = await announcementApi.updateAnnouncement(announcementId, updateData);
      entityStore.updateAnnouncement(result);

      // 자료실 공지로 변경된 경우 현재 목록에서 제거하고 목록 새로고침
      if (result.isItAssetAnnouncement) {
        entityStore.deleteAnnouncement(announcementId);
        const currentPage = paginationStore.currentPage;
        const itemsPerPage = paginationStore.itemsPerPage;
        await readAnnouncements(currentPage, itemsPerPage, true);
      }

      return result;
    } finally {
      entityStore.setLoading(false);
    }
  }, [entityStore, paginationStore, readAnnouncements]);

  const deleteAnnouncement = useCallback(async (announcementId: number) => {
    entityStore.setLoading(true);
    try {
      const announcement = entityStore.announcements.find(a => a.announcementId === announcementId);
      if (announcement && announcement.announcementFiles && announcement.announcementFiles.length > 0) {
        await deleteAnnouncementFiles(announcement.announcementFiles);
      }

      // 공지사항 삭제 (DB, 상태 관리)

      entityStore.deleteAnnouncement(await announcementApi.deleteAnnouncement(announcementId));

      // totalCount를 직접 감소시킴
      paginationStore.decrementTotalCount();

      // 현재 페이지의 마지막 항목을 삭제했고, 이전 페이지가 있다면 이전 페이지로 이동
      // const currentPage = paginationStore.currentPage;
      // const itemsPerPage = paginationStore.itemsPerPage;
      // const totalCount = paginationStore.totalCount;

      // // 현재 페이지에서 마지막 항목을 삭제했고, 이전 페이지가 있는 경우
      // if (totalCount > 0 && (totalCount % itemsPerPage === 0) && currentPage > 1) {
      //   paginationStore.setCurrentPage(currentPage - 1);
      // }

      return announcementId;
    } finally {
      entityStore.setLoading(false);
    }
  }, [deleteAnnouncementFiles, entityStore, paginationStore]);

  const readAnnouncementById = useCallback(async (announcementId: number) => {
    return await announcementApi.getAnnouncementById(announcementId);
  }, []);

  const toggleImportantAnnouncement = useCallback(async (announcementId: number, isItImportantAnnouncement: boolean) => {
    entityStore.setLoading(true);
    try {
      const result = await announcementApi.toggleImportantAnnouncement(announcementId, isItImportantAnnouncement);
      entityStore.updateAnnouncement(result);
      return result;
    } finally {
      entityStore.setLoading(false);
    }
  }, [entityStore]);

  return {
    readAnnouncements,
    readAnnouncementById,
    createAnnouncement,
    updateAnnouncement,
    toggleImportantAnnouncement,
    deleteAnnouncement,
  };
}; 