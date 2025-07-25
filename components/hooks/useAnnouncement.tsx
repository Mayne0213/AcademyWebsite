import { toast } from "sonner";
import { create } from "zustand";
import { Announcement, AnnouncementDetail } from "../type/announcementType";

interface AnnouncementFormInput {
  title: string;
  content: string;
  authorId: number;
  isItAssetAnnouncement: boolean;
  isItImportantAnnouncement: boolean;
  files?: {
    url: string;
    name: string;
    type: string;
  }[];
}

interface AnnouncementUpdateInput {
  announcementId: number;
  title: string;
  content: string;
  authorId: number;
  isItAssetAnnouncement: boolean;
  isItImportantAnnouncement: boolean;
  files?: {
    url: string;
    name: string;
    type: string;
  }[];
  academyIds?: number[];
}

interface AnnouncementState {
  announcements: Announcement[];
  totalCount: number;
  files: Announcement[];
  filesTotalCount: number;
  isLoading: boolean;
  isLoadingFiles: boolean;
  // 추가
  assets: Announcement[];
  assetsTotalCount: number;
  isLoadingAssets: boolean;
  loadInitialAnnouncement: (page: number, pageSize: number, isItAssetAnnouncement?: boolean) => void;
  loadInitialAsset: (page: number, pageSize: number) => void;
  getAnnouncementDetail: (announcementId: number) => Promise<AnnouncementDetail | null>;
  addAnnouncement: (newAnnouncement: AnnouncementFormInput) => void;
  updateAnnouncement: (updatedAnnouncement: AnnouncementUpdateInput) => void;
  removeAnnouncement: (announcementId: number) => void;
}

export const useAnnouncement = create<AnnouncementState>((set) => ({
  announcements: [],
  totalCount: 0,
  files: [],
  filesTotalCount: 0,
  isLoading: true,
  isLoadingFiles: true,
  // 추가
  assets: [],
  assetsTotalCount: 0,
  isLoadingAssets: true,

  loadInitialAnnouncement: async (page, pageSize, isItAssetAnnouncement = false, isItImportantAnnouncement = false) => {
    set({ isLoading: true });
    try {
      const res = await fetch(`/api/announcement?isItAssetAnnouncement=${isItAssetAnnouncement}&isItImportantAnnouncement=${isItImportantAnnouncement}&page=${page}&pageSize=${pageSize}`);
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();
      set({ announcements: data.announcements, totalCount: data.totalCount });
    } catch (error) {
      toast.error("공지사항 로딩 중 오류가 발생했습니다.");
    } finally {
      set({ isLoading: false });
    }
  },

  loadInitialAsset: async (page, pageSize) => {
    set({ isLoadingAssets: true });
    try {
      const res = await fetch(`/api/announcement?isItAssetAnnouncement=true&page=${page}&pageSize=${pageSize}`);
      if (!res.ok) throw new Error("Failed to fetch assets");
      const data = await res.json();
      set({ assets: data.announcements, assetsTotalCount: data.totalCount });
    } catch (error) {
      toast.error("자료실 로딩 중 오류가 발생했습니다.");
    } finally {
      set({ isLoadingAssets: false });
    }
  },

  getAnnouncementDetail: async (announcementId) => {
    try {
      const res = await fetch(`/api/announcement/${announcementId}`);
      if (!res.ok) throw new Error("Failed to fetch announcement detail");
      const data: AnnouncementDetail = await res.json();
      return data;
    } catch (error) {
      return null;
    }
  },

  addAnnouncement: async (newAnnouncement) => {
    try {
      const res = await fetch("/api/announcement", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newAnnouncement),
      });

      if (!res.ok) throw new Error("공지사항 추가 실패");

      const created: Announcement = await res.json();

      set((state) => ({
        announcements: [created, ...state.announcements],
      }));

      toast("처리 완료", {
        description: "공지사항이 추가되었습니다.",
      });
    } catch (error) {
      toast.error("공지사항 추가 중 오류가 발생했습니다.");
    }
  },

  updateAnnouncement: async (updatedAnnouncement) => {
    try {
      const res = await fetch(
        `/api/announcement/${updatedAnnouncement.announcementId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedAnnouncement),
        }
      );

      if (!res.ok) throw new Error("공지사항 수정 실패");

      const data: Announcement = await res.json();

      set((state) => ({
        announcements: state.announcements.map((a) =>
          a.announcementId === data.announcementId ? data : a
        ),
        files: state.files.map((a) =>
          a.announcementId === data.announcementId ? data : a
        ),
      }));

      toast("처리 완료", {
        description: "공지글이 수정되었습니다.",
      });
    } catch (error) {
      toast.error("공지글 수정 중 오류가 발생했습니다.");
    }
  },

  removeAnnouncement: async (announcementId) => {
    try {
      // 1. 상세 정보 fetch
      const detail = await useAnnouncement.getState().getAnnouncementDetail(announcementId);

      // 2. 첨부파일 삭제
      if (detail && Array.isArray(detail.files) && detail.files.length > 0) {
        const deletePromises = detail.files.map(async (file: { url: string; name: string; type: string }) => {
          try {
            const deleteResponse = await fetch(`/api/delete-file?fileUrl=${encodeURIComponent(file.url)}`, {
              method: 'DELETE',
            });
            if (!deleteResponse.ok) {
              const errorData = await deleteResponse.json();
              throw new Error(errorData.error || '파일 삭제 실패');
            }
          } catch (error) {
            console.error(`[HOOK] S3 파일 삭제 실패: ${file.url}`, error);
          }
        });

        await Promise.all(deletePromises);
      }
      
      // 3. 공지사항 삭제
      const res = await fetch(`/api/announcement/${announcementId}`, {
        method: "DELETE",
      });
      
      if (!res.ok) {
        throw new Error("공지사항 삭제 실패");
      }

      // 4. 로컬 상태 업데이트
      set((state) => ({
        announcements: state.announcements.filter(
          (a) => a.announcementId !== announcementId
        ),
        files: state.files.filter(
          (a) => a.announcementId !== announcementId
        ),
        assets: state.assets.filter(
          (a) => a.announcementId !== announcementId
        ),
      }));

      toast("처리 완료", {
        description: "공지글이 삭제되었습니다.",
      });
    } catch (error) {
      toast.error("공지글 삭제 중 오류가 발생했습니다.");
    }
  },

}));

export default useAnnouncement;