import { z } from 'zod';
import { toast } from 'sonner';

// Schedule 엔티티 스키마
export const CounselingScheduleSchema = z.object({
  scheduleId: z.number().positive('유효하지 않은 스케줄 ID입니다.'),
  adminId: z.number().positive('유효하지 않은 상담사 ID입니다.'),
  date: z.date(),
  timeSlotId: z.number().positive('유효하지 않은 시간대 ID입니다.'),
  isAvailable: z.boolean(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

// 타입 안전성을 위한 타입 체크 함수
export const validateCounselingScheduleType = (data: unknown): data is any => {
  return CounselingScheduleSchema.safeParse(data).success;
};

// 스케줄 생성용 스키마
export const CreateCounselingScheduleSchema = z.object({
  date: z.string().min(1, '날짜는 필수입니다.'),
  timeSlotId: z.number().positive('유효하지 않은 시간대 ID입니다.'),
});

// 유효성 검사 함수들
export const SCHEDULE_VALIDATION = {
  validateCounselingSchedule: (schedule: unknown) => {
    const result = CounselingScheduleSchema.safeParse(schedule);
    if (!result.success) {
      const errorMessage = result.error.issues[0].message || '유효하지 않은 상담 스케줄 데이터입니다.';
      toast.error(errorMessage);
      throw new Error(errorMessage);
    }
  },

  validateScheduleForCreate: (data: unknown) => {
    const result = CreateCounselingScheduleSchema.safeParse(data);
    if (!result.success) {
      const errorMessage = result.error.issues[0].message || '유효하지 않은 스케줄 생성 데이터입니다.';
      toast.error(errorMessage);
      throw new Error(errorMessage);
    }
  },
} as const;
