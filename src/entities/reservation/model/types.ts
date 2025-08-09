// Schedule 관련 타입들
export interface AvailableSchedule {
  scheduleId: number;
  adminId: number;
  date: string;
  timeSlotId: number;
  isAvailable: boolean;
  createdAt: string;
  updatedAt: string;
  timeSlot: {
    timeSlotId: number;
    startTime: string;
    endTime: string;
    displayName: string;
  };
}

export interface AdminWithSchedules {
  memberId: number;
  adminName: string;
  adminPosition: string;
  adminPhone?: string;
  schedules: AvailableSchedule[];
}

// Reservation 관련 엔티티 타입들 (Prisma 스키마와 일치)
export interface CounselingReservation {
  reservationId: number;
  studentId: number;
  adminId: number;
  scheduleId: number;
  consultationContent: string;
  createdAt: Date;
  updatedAt: Date;
  student: {
    studentName: string;
    studentPhone: string;
    studentHighschool: string | null;
  };
  admin: {
    adminName: string;
    adminPosition: string;
  };
  schedule: {
    scheduleId: number;
    date: string;
    timeSlot: {
      timeSlotId: number;
      startTime: string;
      endTime: string;
      displayName: string;
    };
  };
}

// API 요청/응답 타입들
export interface CreateCounselingReservationRequest {
  adminId: number;
  date: string | null;
  timeSlotId: number | null;
  scheduleId: number;
  consultationContent: string;
}

// API 폼 전송용
export interface CreateReservationFormData {
  adminId: number;
  date: string;
  timeSlotId: number;
  scheduleId: number;
  consultationContent: string;
}

// ui 폼 상태용 
export interface CounselingBookingFormData {
  adminId: number;
  date: Date | null;
  timeSlotId: number | null;
  scheduleId: number | null;
  consultationContent: string;
}

export interface UpdateCounselingReservationRequest {
  reservationId: number;
  consultationContent?: string;
  adminId?: number;
  date?: string;
  timeSlotId?: number;
  status?: 'PENDING' | 'CONFIRMED' | 'CANCELLED' | 'COMPLETED';
}

// Reservation Store 타입들
export interface ReservationState {
  reservations: CounselingReservation[];
  isLoading: boolean;
}

export interface ReservationBasicActions {
  readReservations: (reservations: CounselingReservation[]) => void;
  createReservation: (newReservation: CounselingReservation) => void;
  updateReservation: (updatedReservation: CounselingReservation) => void;
  deleteReservation: (reservationId: number) => void;
  setLoading: (isLoading: boolean) => void;
}
