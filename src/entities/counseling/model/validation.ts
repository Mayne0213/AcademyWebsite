import { z } from 'zod';
import { toast } from 'sonner';

// 기본 엔티티 스키마들
export const CounselingScheduleSchema = z.object({
  scheduleId: z.number().positive('유효하지 않은 스케줄 ID입니다.'),
  adminId: z.number().positive('유효하지 않은 상담사 ID입니다.'),
  date: z.date(),
  timeSlotId: z.number().positive('유효하지 않은 시간대 ID입니다.'),
  isAvailable: z.boolean(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const CounselingReservationSchema = z.object({
  reservationId: z.number().positive('유효하지 않은 예약 ID입니다.'),
  studentId: z.number().positive('유효하지 않은 학생 ID입니다.'),
  adminId: z.number().positive('유효하지 않은 상담사 ID입니다.'),
  scheduleId: z.number().positive('유효하지 않은 스케줄 ID입니다.'),
  consultationContent: z.string().min(1, '상담 내용을 입력해주세요.'),
  status: z.enum(['PENDING', 'CONFIRMED', 'CANCELLED', 'COMPLETED']),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const AdminSchema = z.object({
  memberId: z.number().positive('유효하지 않은 상담사 ID입니다.'),
  adminName: z.string().min(1, '상담사 이름을 입력해주세요.'),
  adminPhone: z.string().min(1, '상담사 전화번호를 입력해주세요.'),
  adminPosition: z.string().min(1, '상담사 직책을 입력해주세요.'),
  adminMemo: z.string().optional(),
});

export const StudentSchema = z.object({
  memberId: z.number().positive('유효하지 않은 학생 ID입니다.'),
  academyId: z.number().positive('유효하지 않은 학원 ID입니다.'),
  studentName: z.string().min(1, '학생 이름을 입력해주세요.'),
  studentPhone: z.string().min(1, '학생 전화번호를 입력해주세요.'),
  studentHighschool: z.string().optional(),
  studentBirthYear: z.number().positive('유효하지 않은 출생년도입니다.'),
  studentMemo: z.string().optional(),
});

// API 요청/응답 스키마들
export const CreateCounselingReservationSchema = z.object({
  adminId: z.number().positive('상담사를 선택해주세요.'),
  date: z.string().min(1, '날짜를 선택해주세요.'),
  timeSlotId: z.number().positive('시간대를 선택해주세요.'),
  consultationContent: z.string()
    .min(1, '상담 내용을 입력해주세요.')
    .max(1000, '상담 내용은 1000자 이내로 작성해주세요.'),
});

export const UpdateCounselingReservationSchema = z.object({
  reservationId: z.number().positive('유효하지 않은 예약 ID입니다.'),
  consultationContent: z.string().optional(),
  adminId: z.number().positive().optional(),
  date: z.string().optional(),
  timeSlotId: z.number().positive().optional(),
  status: z.enum(['PENDING', 'CONFIRMED', 'CANCELLED', 'COMPLETED']).optional(),
});

// 타입 안전성을 위한 타입 체크 함수들
export const validateCounselingScheduleType = (data: unknown): data is any => {
  return CounselingScheduleSchema.safeParse(data).success;
};

export const validateCounselingReservationType = (data: unknown): data is any => {
  return CounselingReservationSchema.safeParse(data).success;
};

export const validateAdminType = (data: unknown): data is any => {
  return AdminSchema.safeParse(data).success;
};

export const validateStudentType = (data: unknown): data is any => {
  return StudentSchema.safeParse(data).success;
};

// 유효성 검사 함수들
export const COUNSELING_VALIDATION = {
  validateCounselingSchedule: (schedule: unknown) => {
    const result = CounselingScheduleSchema.safeParse(schedule);
    if (!result.success) {
      const errorMessage = result.error.issues[0].message || '유효하지 않은 상담 스케줄 데이터입니다.';
      toast.error(errorMessage);
      throw new Error(errorMessage);
    }
  },

  validateCounselingReservation: (reservation: unknown) => {
    const result = CounselingReservationSchema.safeParse(reservation);
    if (!result.success) {
      const errorMessage = result.error.issues[0].message || '유효하지 않은 상담 예약 데이터입니다.';
      toast.error(errorMessage);
      throw new Error(errorMessage);
    }
  },

  validateAdmin: (admin: unknown) => {
    const result = AdminSchema.safeParse(admin);
    if (!result.success) {
      const errorMessage = result.error.issues[0].message || '유효하지 않은 상담사 데이터입니다.';
      toast.error(errorMessage);
      throw new Error(errorMessage);
    }
  },

  validateStudent: (student: unknown) => {
    const result = StudentSchema.safeParse(student);
    if (!result.success) {
      const errorMessage = result.error.issues[0].message || '유효하지 않은 학생 데이터입니다.';
      toast.error(errorMessage);
      throw new Error(errorMessage);
    }
  },

  validateCreateReservation: (data: unknown) => {
    const result = CreateCounselingReservationSchema.safeParse(data);
    if (!result.success) {
      const errorMessage = result.error.issues[0].message || '유효하지 않은 예약 데이터입니다.';
      toast.error(errorMessage);
      throw new Error(errorMessage);
    }
  },

  validateUpdateReservation: (data: unknown) => {
    const result = UpdateCounselingReservationSchema.safeParse(data);
    if (!result.success) {
      const errorMessage = result.error.issues[0].message || '유효하지 않은 예약 수정 데이터입니다.';
      toast.error(errorMessage);
      throw new Error(errorMessage);
    }
  },

  validateCounselingReservations: (reservations: unknown) => {
    const result = z.array(CounselingReservationSchema).safeParse(reservations);
    if (!result.success) {
      const errorMessage = result.error.issues[0].message || '유효하지 않은 상담 예약 목록입니다.';
      toast.error(errorMessage);
      throw new Error(errorMessage);
    }
  },

  validateAdmins: (admins: unknown) => {
    const result = z.array(AdminSchema).safeParse(admins);
    if (!result.success) {
      const errorMessage = result.error.issues[0].message || '유효하지 않은 상담사 목록입니다.';
      toast.error(errorMessage);
      throw new Error(errorMessage);
    }
  },
} as const; 