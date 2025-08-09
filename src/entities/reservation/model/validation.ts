import { z } from 'zod';
import { toast } from 'sonner';

// Reservation 엔티티 스키마
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

// 타입 안전성을 위한 타입 체크 함수
export const validateCounselingReservationType = (data: unknown): data is any => {
  return CounselingReservationSchema.safeParse(data).success;
};

// 유효성 검사 함수들
export const RESERVATION_VALIDATION = {
  validateCounselingReservation: (reservation: unknown) => {
    const result = CounselingReservationSchema.safeParse(reservation);
    if (!result.success) {
      const errorMessage = result.error.issues[0].message || '유효하지 않은 상담 예약 데이터입니다.';
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
} as const;
