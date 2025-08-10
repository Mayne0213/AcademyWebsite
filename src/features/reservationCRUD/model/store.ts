import { create } from 'zustand';
import { CounselingReservation } from '@/src/entities/reservation';
import { AdminWithSchedules, CreateReservationFormData } from '@/src/entities/reservation/model/types';
import { getAvailableAdmins, createCounselingReservation } from '@/src/entities/reservation/api';

interface ReservationCRUDState {
  admins: AdminWithSchedules[];
  selectedAdmin: AdminWithSchedules | null;
  reservations: CounselingReservation[];
  isLoading: boolean;
  isSubmitting: boolean;
  error: string | null;
}

interface ReservationCRUDActions {
  setAdmins: (admins: AdminWithSchedules[]) => void;
  setSelectedAdmin: (admin: AdminWithSchedules | null) => void;
  setReservations: (reservations: CounselingReservation[]) => void;
  setLoading: (isLoading: boolean) => void;
  setSubmitting: (isSubmitting: boolean) => void;
  setError: (error: string | null) => void;
  readAdmins: () => Promise<void>;
  createReservation: (data: CreateReservationFormData) => Promise<void>;
  reset: () => void;
}

export const useReservationCRUDStore = create<ReservationCRUDState & ReservationCRUDActions>((set) => ({
  admins: [],
  selectedAdmin: null,
  reservations: [],
  isLoading: false,
  isSubmitting: false,
  error: null,

  setAdmins: (admins) => set({ admins }),
  setSelectedAdmin: (admin) => set({ selectedAdmin: admin }),
  setReservations: (reservations) => set({ reservations }),
  setLoading: (isLoading) => set({ isLoading }),
  setSubmitting: (isSubmitting) => set({ isSubmitting }),
  setError: (error) => set({ error }),

  readAdmins: async () => {
    set({ isLoading: true, error: null });
    try {
      const admins = await getAvailableAdmins();
      set({ admins, isLoading: false });
    } catch (error) {
      set({ error: '상담사 목록을 불러오는데 실패했습니다.', isLoading: false });
    }
  },

  createReservation: async (data) => {
    set({ isSubmitting: true, error: null });
    try {
      // CreateReservationFormData를 CreateCounselingReservationRequest로 변환
      const requestData = {
        adminId: data.adminId,
        date: data.date,
        timeSlotId: data.timeSlotId,
        scheduleId: data.scheduleId,
        consultationContent: data.consultationContent
      };
      await createCounselingReservation(requestData);
      set({ isSubmitting: false });
    } catch (error) {
      set({ error: '상담 예약에 실패했습니다.', isSubmitting: false });
      throw error;
    }
  },

  reset: () => set({
    admins: [],
    selectedAdmin: null,
    reservations: [],
    isLoading: false,
    isSubmitting: false,
    error: null,
  }),
})); 