// entities/announcement/api/index.ts
import { Announcement, CreateAnnouncementRequest, AnnouncementDetail } from "@/src/entities/announcement/model/types";
import { apiGet, apiPost, apiPut, apiDelete } from "@/src/shared/api/http";
import { API_ENDPOINTS } from "@/src/shared/config/api";
import { ANNOUNCEMENT_VALIDATION } from "@/src/entities/announcement/model/validation";
import { toast } from "sonner";

export const announcementApi = {
  getAnnouncements: async (page: number, itemsPerPage: number, isAssetOnly: boolean=false): Promise<{ announcements: Announcement[]; totalCount: number }> => {
    const url = `${API_ENDPOINTS.ANNOUNCEMENT.BASE}?page=${page}&pageSize=${itemsPerPage}&isItAssetAnnouncement=${isAssetOnly}`;
    const result = await apiGet<{ announcements: Announcement[]; totalCount: number }>(url);
    
    return result;
  },

  createAnnouncement: async (newAnnouncement: CreateAnnouncementRequest): Promise<Announcement> => {
    ANNOUNCEMENT_VALIDATION.validateAnnouncementForCreate(newAnnouncement);
    const result = await apiPost<Announcement>(API_ENDPOINTS.ANNOUNCEMENT.BASE, newAnnouncement);
    toast.success("공지사항이 성공적으로 생성되었습니다.");
    
    return result;
  },

  updateAnnouncement: async (announcementId: number, updateData: { announcementId: number; announcementTitle: string; announcementContent: string; isItAssetAnnouncement: boolean; isItImportantAnnouncement: boolean; files?: any[]; academyIds?: number[] }): Promise<Announcement> => {
    ANNOUNCEMENT_VALIDATION.validateAnnouncementForUpdate(updateData);
    const result = await apiPut<Announcement>(API_ENDPOINTS.ANNOUNCEMENT.BY_ID(announcementId), updateData);
    toast.success("공지사항이 성공적으로 수정되었습니다.");

    return result;
  },

  deleteAnnouncement: async (announcementId: number): Promise<number> => {
    const result = await apiDelete<number>(API_ENDPOINTS.ANNOUNCEMENT.BY_ID(announcementId));
    toast.success("공지사항이 성공적으로 삭제되었습니다.");
    
    return announcementId;
  },
  
  getAnnouncementById: async (announcementId: number): Promise<AnnouncementDetail> => {
    const result = await apiGet<AnnouncementDetail>(API_ENDPOINTS.ANNOUNCEMENT.BY_ID(announcementId));
    return result;
  },
  
  getAssetAnnouncements: async (page: number, itemsPerPage: number): Promise<{ announcements: Announcement[]; totalCount: number }> => {
    const url = `${API_ENDPOINTS.ANNOUNCEMENT.BASE}?page=${page}&pageSize=${itemsPerPage}&isItAssetAnnouncement=true`;  
    const result = await apiGet<{ announcements: Announcement[]; totalCount: number }>(url);
    
    return result;
  },

  toggleImportantAnnouncement: async (announcementId: number, isItImportantAnnouncement: boolean): Promise<Announcement> => {
    const result = await apiPut<Announcement>(API_ENDPOINTS.ANNOUNCEMENT.BY_ID(announcementId), {
      announcementId,
      isItImportantAnnouncement,
    });
    toast.success("공지사항이 성공적으로 수정되었습니다.");

    return result;
  },
};