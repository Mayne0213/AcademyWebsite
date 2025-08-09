// Schedule 관련 엔티티 타입들 (Prisma 스키마와 일치)
export interface CounselingSchedule {
  scheduleId: number;
  adminId: number;
  date: string;
  timeSlotId: number;
  isAvailable: boolean;
  createdAt: Date;
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

// Schedule Store 타입들
export interface ScheduleState {
  schedules: CounselingSchedule[];
  isLoading: boolean;
}

export interface ScheduleBasicActions {
  readSchedules: (schedules: CounselingSchedule[]) => void;
  createSchedule: (newSchedule: CounselingSchedule) => void;
  updateSchedule: (updatedSchedule: CounselingSchedule) => void;
  deleteSchedule: (scheduleId: number) => void;
  setLoading: (isLoading: boolean) => void;
}
