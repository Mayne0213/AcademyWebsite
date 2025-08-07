import { create } from 'zustand';
import { 
  CounselingReservation, 
  CounselingSchedule, 
  CounselingState, 
  CounselingBasicActions 
} from './types';

// 순수한 상담 상태 관리 스토어
export const useCounselingStore = create<CounselingState & CounselingBasicActions>((set) => ({
  reservations: [],
  schedules: [],
  isLoading: true,

  readReservations: (reservations: CounselingReservation[]) => set({ reservations }),

  readSchedules: (schedules: CounselingSchedule[]) => set({ schedules }),

  createReservation: (newReservation: CounselingReservation) => set((state) => ({
    reservations: [newReservation, ...state.reservations]
  })),

  createSchedule: (newSchedule: CounselingSchedule) => set((state) => ({
    schedules: [newSchedule, ...state.schedules]
  })),

  updateReservation: (updatedReservation: CounselingReservation) => set((state) => ({
    reservations: state.reservations.map(reservation =>
      reservation.reservationId === updatedReservation.reservationId ? updatedReservation : reservation
    )
  })),

  updateSchedule: (updatedSchedule: CounselingSchedule) => set((state) => ({
    schedules: state.schedules.map(schedule =>
      schedule.scheduleId === updatedSchedule.scheduleId ? updatedSchedule : schedule
    )
  })),

  deleteReservation: (reservationId: number) => set((state) => ({
    reservations: state.reservations.filter(reservation => reservation.reservationId !== reservationId)
  })),

  deleteSchedule: (scheduleId: number) => set((state) => ({
    schedules: state.schedules.filter(schedule => schedule.scheduleId !== scheduleId)
  })),

  setLoading: (isLoading: boolean) => set({ isLoading }),
}));
