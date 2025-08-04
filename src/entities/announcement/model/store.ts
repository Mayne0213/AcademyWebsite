import { create } from 'zustand';
import { Announcement, AnnouncementState, AnnouncementBasicActions } from './types';

// 순수한 관리자 상태 관리 스토어 (pagination 제거)
export const useAnnouncementStore = create<AnnouncementState & AnnouncementBasicActions>((set) => ({
  announcements: [],
  isLoading: true,

  readAnnouncements: (announcements: Announcement[]) => set({ announcements }),

  createAnnouncement: (newAnnouncement: Announcement) => set((state) => ({
    announcements: [newAnnouncement, ...state.announcements]
  })),

  updateAnnouncement: (updatedAnnouncement: Announcement) => set((state) => ({
    announcements: state.announcements.map(announcement =>
      announcement.announcementId === updatedAnnouncement.announcementId ? updatedAnnouncement : announcement
    )
  })),

  deleteAnnouncement: (announcementId: number) => set((state) => ({
    announcements: state.announcements.filter(announcement => announcement.announcementId !== announcementId)
  })),

  setLoading: (isLoading: boolean) => set({ isLoading }),
})); 