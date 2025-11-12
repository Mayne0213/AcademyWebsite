// entities/announcement/api/index.ts
import { Announcement, AnnouncementSummary, CreateAnnouncementRequest } from "@/src/entities/announcement/model/types";
import { apiGet, apiPost, apiPut, apiDelete } from "@/src/shared/api/http";
import { API_ENDPOINTS } from "@/src/shared/config/api";
import { toast } from "sonner";

export const announcementApi = {

  readAnnouncementSummaries: async (page: number, itemsPerPage: number, isAssetOnly: boolean = false): Promise<{ announcements: AnnouncementSummary[]; totalCount: number }> => {
    try {
      const url = `${API_ENDPOINTS.ANNOUNCEMENT.BASE}?page=${page}&pageSize=${itemsPerPage}&type=summary&isItAssetAnnouncement=${isAssetOnly}`;
      const result = await apiGet<{ announcements: AnnouncementSummary[]; totalCount: number }>(url);

      return result;
    } catch (error) {
      throw error;
    }
  },

  readAnnouncements: async (page: number, itemsPerPage: number, isAssetOnly: boolean=false): Promise<{ announcements: Announcement[]; totalCount: number }> => {
    try {
      const url = `${API_ENDPOINTS.ANNOUNCEMENT.BASE}?page=${page}&pageSize=${itemsPerPage}&type=detail&isItAssetAnnouncement=${isAssetOnly}`;
      const result = await apiGet<{ announcements: Announcement[]; totalCount: number }>(url);

      return result;
    } catch (error) {
      throw error;
    }
  },

  getAnnouncementSummary: async (announcementId: number): Promise<AnnouncementSummary> => {
    try {
      const result = await apiGet<AnnouncementSummary>(`${API_ENDPOINTS.ANNOUNCEMENT.BY_ID(announcementId)}?type=summary`);
      return result;
    } catch (error) {
      throw error;
    }
  },

  getAnnouncement: async (announcementId: number): Promise<Announcement> => {
    try {
      const result = await apiGet<Announcement>(`${API_ENDPOINTS.ANNOUNCEMENT.BY_ID(announcementId)}?type=detail`);
      return result;
    } catch (error) {
      throw error;
    }
  },

  createAnnouncement: async (newAnnouncement: CreateAnnouncementRequest): Promise<Announcement> => {
    try {
      const result = await apiPost<Announcement>(API_ENDPOINTS.ANNOUNCEMENT.BASE, newAnnouncement);
      toast.success("공지사항이 성공적으로 생성되었습니다.");

      return result;
    } catch (error) {
      throw error;
    }
  },

  updateAnnouncement: async (announcementId: number, updateData: { announcementId: number; announcementTitle: string; announcementContent: string; isItAssetAnnouncement: boolean; isItImportantAnnouncement: boolean; files?: any[]; academyIds?: number[] }): Promise<Announcement> => {
    try {
      const result = await apiPut<Announcement>(API_ENDPOINTS.ANNOUNCEMENT.BY_ID(announcementId), updateData);
      toast.success("공지사항이 성공적으로 수정되었습니다.");

      return result;
    } catch (error) {
      throw error;
    }
  },

  deleteAnnouncement: async (announcementId: number): Promise<number> => {
    try {
      await apiDelete<number>(API_ENDPOINTS.ANNOUNCEMENT.BY_ID(announcementId));
      toast.success("공지사항이 성공적으로 삭제되었습니다.");

      return announcementId;
    } catch (error) {
      throw error;
    }
  },

  toggleImportantAnnouncement: async (announcementId: number, isItImportantAnnouncement: boolean): Promise<Announcement> => {
    try {
      const result = await apiPut<Announcement>(API_ENDPOINTS.ANNOUNCEMENT.BY_ID(announcementId), {
        announcementId,
        isItImportantAnnouncement,
      });
      toast.success("공지사항이 성공적으로 수정되었습니다.");

      return result;
    } catch (error) {
      throw error;
    }
  },
};