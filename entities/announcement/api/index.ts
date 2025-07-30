import { Announcement } from "@/entities/announcement/model/types";
import { apiGet, apiPost, apiPut, apiDelete } from "@/shared/api/http";
import { API_ENDPOINTS } from "@/shared/config/api";

// 공지사항 API 관련 함수들
export const announcementApi = {
  // 모든 공지사항 조회
  getAnnouncements: async (): Promise<Announcement[]> => {
    return await apiGet<Announcement[]>(API_ENDPOINTS.ANNOUNCEMENT.BASE);
  },

  // 공지사항 생성
  createAnnouncement: async (newAnnouncement: Omit<Announcement, "announcementId" | "createdAt" | "updatedAt" | "author" | "announcementAcademies">): Promise<Announcement> => {
    return await apiPost<Announcement>(API_ENDPOINTS.ANNOUNCEMENT.BASE, newAnnouncement);
  },

  // 공지사항 수정
  updateAnnouncement: async (announcementId: number, updatedAnnouncement: Announcement): Promise<Announcement> => {
    return await apiPut<Announcement>(API_ENDPOINTS.ANNOUNCEMENT.BY_ID(announcementId), updatedAnnouncement);
  },

  // 공지사항 삭제
  deleteAnnouncement: async (announcementId: number): Promise<void> => {
    await apiDelete<void>(API_ENDPOINTS.ANNOUNCEMENT.BY_ID(announcementId));
  },

  // 중요 공지사항만 조회
  getImportantAnnouncements: async (): Promise<Announcement[]> => {
    return await apiGet<Announcement[]>(`${API_ENDPOINTS.ANNOUNCEMENT.BASE}?important=true`);
  },

  // 자산 공지사항만 조회
  getAssetAnnouncements: async (): Promise<Announcement[]> => {
    return await apiGet<Announcement[]>(`${API_ENDPOINTS.ANNOUNCEMENT.BASE}?asset=true`);
  },

  // 특정 학원의 공지사항 조회
  getAnnouncementsByAcademy: async (academyId: number): Promise<Announcement[]> => {
    return await apiGet<Announcement[]>(`${API_ENDPOINTS.ANNOUNCEMENT.BASE}?academyId=${academyId}`);
  },
}; 