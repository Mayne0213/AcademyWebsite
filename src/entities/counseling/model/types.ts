// 기본 엔티티 타입들 (Prisma 스키마와 일치)
export interface CounselingReservation {
  reservationId: number;
  studentId: number;
  adminId: number;
  scheduleId: number;
  consultationContent: string;
  createdAt: Date; // ㄴㅇㅇㄴㄴㅇㄴㅇ
  updatedAt: Date;
  student: {
    studentName: string;
    studentPhone: string;
    studentHighschool: string | null;
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

export interface CounselingSchedule {
  scheduleId: number;
  adminId: number;
  date: string;
  timeSlotId: number;
  isAvailable: boolean;
  createdAt: Date; //ㅇㄴㅇㄴㄴㅇㅇㄴ
  updatedAt: Date;
  timeSlot: {
    timeSlotId: number;
    startTime: string;
    endTime: string;
    displayName: string;
  };
  reservations?: {
    reservationId: number;
    student: {
      studentName: string;
      studentPhone: string;
      studentHighschool: string | null;
      studentBirthYear: number;
      studentMemo: string | null;
    };
  };
}

// API 요청/응답 타입들
export interface CreateCounselingReservationRequest {
  adminId: number;
  date: string | null;
  timeSlotId: number | null;
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

// Store 타입들
export interface CounselingState {
  reservations: CounselingReservation[];
  schedules: CounselingSchedule[];
  isLoading: boolean;
}

export interface CounselingBasicActions {
  readReservations: (reservations: CounselingReservation[]) => void;
  readSchedules: (schedules: CounselingSchedule[]) => void;
  createReservation: (newReservation: CounselingReservation) => void;
  createSchedule: (newSchedule: CounselingSchedule) => void;
  updateReservation: (updatedReservation: CounselingReservation) => void;
  updateSchedule: (updatedSchedule: CounselingSchedule) => void;
  deleteReservation: (reservationId: number) => void;
  deleteSchedule: (scheduleId: number) => void;
  setLoading: (isLoading: boolean) => void;
} 