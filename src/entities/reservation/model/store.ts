import { create } from 'zustand';
import { 
  CounselingReservation, 
  ReservationState, 
  ReservationBasicActions 
} from './types';

// 순수한 예약 상태 관리 스토어
export const useReservationStore = create<ReservationState & ReservationBasicActions>((set) => ({
  reservations: [],
  isLoading: true,

  readReservations: (reservations: CounselingReservation[]) => set({ reservations }),

  createReservation: (newReservation: CounselingReservation) => set((state) => ({
    reservations: [newReservation, ...state.reservations]
  })),

  updateReservation: (updatedReservation: CounselingReservation) => set((state) => ({
    reservations: state.reservations.map(reservation =>
      reservation.reservationId === updatedReservation.reservationId ? updatedReservation : reservation
    )
  })),

  deleteReservation: (reservationId: number) => set((state) => ({
    reservations: state.reservations.filter(reservation => reservation.reservationId !== reservationId)
  })),

  setLoading: (isLoading: boolean) => set({ isLoading }),
}));
