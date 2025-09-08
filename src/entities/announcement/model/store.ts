import { create } from 'zustand';
import { Announcement, AnnouncementSummary, AnnouncementState, AnnouncementBasicActions } from './types';

// 순수한 공지사항 상태 관리 스토어
export const useAnnouncementStore = create<AnnouncementState & AnnouncementBasicActions>((set) => ({
  announcements: [],
  isLoading: true,
  isDetailLoading: {},

  // 1. 간략한 정보만을 불러오는 함수
  readAnnouncementSummaries: (announcementSummaries: AnnouncementSummary[]) => set({
    announcements: announcementSummaries,
  }),

  // 2. 디테일한 개인의 정보를 전부 불러오는 함수
  readAnnouncements: (announcements: Announcement[]) => set({
    announcements: announcements,
  }),

  // 3. announcementId를 받아서 해당하는 개인의 간략한 정보만을 불러오는 함수
  getAnnouncementSummary: (announcementSummary: AnnouncementSummary) => set((state) => ({
    announcements: [announcementSummary, ...state.announcements],
  })),

  // 4. announcementId를 받아서 해당하는 개인의 디테일한 정보를 불러오는 함수
  getAnnouncement: (announcement: Announcement) => set((state) => ({
    announcements: state.announcements.map((existingAnnouncement: Announcement | AnnouncementSummary) =>
      existingAnnouncement.announcementId === announcement.announcementId ? announcement : existingAnnouncement
    )
  })),

  createAnnouncement: (newAnnouncement: Announcement) => set((state) => ({
    announcements: [newAnnouncement, ...state.announcements],
  })),

  updateAnnouncement: (updatedAnnouncement: Announcement) => set((state) => ({
    announcements: state.announcements.map(announcement =>
      announcement.announcementId === updatedAnnouncement.announcementId ? updatedAnnouncement : announcement
    ),
  })),

  deleteAnnouncement: (announcementId: number) => set((state) => ({
    announcements: state.announcements.filter(announcement => announcement.announcementId !== announcementId),
  })),

  setLoading: (isLoading: boolean) => set({ isLoading }),

  setDetailLoading: (announcementId: number, isLoading: boolean) => set((state) => ({
    isDetailLoading: {
      ...state.isDetailLoading,
      [announcementId]: isLoading,
    },
  })),
})); 