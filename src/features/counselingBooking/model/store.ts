import { create } from 'zustand';
import { CounselingReservation } from '@/src/entities/counseling';
import { Admin } from '@/src/entities/admin/model/types';
import { getAvailableAdmins, createCounselingReservation } from '@/src/entities/counseling/api';

interface CounselingBookingState {
  admins: Admin[];
  selectedAdmin: Admin | null;
  reservations: CounselingReservation[];
  isLoading: boolean;
  isSubmitting: boolean;
  error: string | null;
}

interface CounselingBookingActions {
  setAdmins: (admins: Admin[]) => void;
  setSelectedAdmin: (admin: Admin | null) => void;
  setReservations: (reservations: CounselingReservation[]) => void;
  setLoading: (isLoading: boolean) => void;
  setSubmitting: (isSubmitting: boolean) => void;
  setError: (error: string | null) => void;
  fetchAdmins: () => Promise<void>;
  createReservation: (data: { adminId: number; date: string | null; timeSlotId: number | null; scheduleId: number | null; consultationContent: string }) => Promise<void>;
  reset: () => void;
}

export const useCounselingBookingStore = create<CounselingBookingState & CounselingBookingActions>((set) => ({
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

  fetchAdmins: async () => {
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
      await createCounselingReservation(data);
      set({ isSubmitting: false });
    } catch (error) {
      set({ error: '상담 예약에 실패했습니다.', isSubmitting: false });
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