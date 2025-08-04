import { z } from 'zod';
import { VALIDATION_FUNCTIONS } from '@/src/shared/lib/validation';
import { ERROR_MESSAGES } from '@/src/shared/config/messages';
import { Admin } from './types';
import { toast } from 'sonner';

// Zod 스키마 정의 - Admin 전용 필드들만 검사
export const AdminSchema = z.object({
  // Admin 전용 필드들만 검사
  adminName: z.string().refine(VALIDATION_FUNCTIONS.isValidName, ERROR_MESSAGES.VALIDATION.INVALID_NAME),
  adminPhone: z.string().refine(VALIDATION_FUNCTIONS.isValidPhone, ERROR_MESSAGES.VALIDATION.INVALID_PHONE),
  adminPosition: z.string().min(1, '관리자 직책은 필수입니다.'),
  adminMemo: z.string().optional(),
  announcements: z.array(z.any()),
  academies: z.array(z.any()),
});

export const CreateAdminSchema = AdminSchema.pick({
  adminName: true,
  adminPhone: true,
  adminPosition: true,
  adminMemo: true,
});

export const UpdateAdminSchema = AdminSchema.pick({
  adminName: true,
  adminPhone: true,
  adminPosition: true,
  adminMemo: true,
}).partial().refine(
  (data) => Object.keys(data).some(key => data[key as keyof typeof data] !== undefined),
  { message: '업데이트할 필드가 없습니다.' }
);

// 타입 안전성을 위한 타입 체크 함수
export const validateAdminType = (data: unknown): data is Admin => {
  return AdminSchema.safeParse(data).success;
};

// 유효성 검사 함수들
export const ADMIN_VALIDATION = {
  // Admin 전체 유효성 검사
  validateAdmin: (admin: unknown) => {
    const result = AdminSchema.safeParse(admin);

    if (!result.success) {
      const errorMessage = result.error.issues[0].message || '유효하지 않은 데이터입니다.';
      toast.error(errorMessage);
      throw new Error(errorMessage);
    }
  },

  // Admin 생성용 유효성 검사
  validateAdminForCreate: (admin: unknown) => {
    const result = CreateAdminSchema.safeParse(admin);

    if (!result.success) {
      const errorMessage = result.error.issues[0].message || '유효하지 않은 데이터입니다.';
      toast.error(errorMessage);
      throw new Error(errorMessage);
    }
  },

  // Admin 업데이트용 유효성 검사
  validateAdminForUpdate: (updateData: unknown) => {
    const result = UpdateAdminSchema.safeParse(updateData);

    if (!result.success) {
      const errorMessage = result.error.issues[0].message || '유효하지 않은 데이터입니다.';
      toast.error(errorMessage);
      throw new Error(errorMessage);
    }
  },

  // Admin 배열 유효성 검사
  validateAdmins: (admins: unknown) => {
    const result = z.array(AdminSchema).safeParse(admins);

    if (!result.success) {
      const errorMessage = result.error.issues[0].message || '유효하지 않은 데이터입니다.';
      toast.error(errorMessage);
      throw new Error(errorMessage);
    }
  },
} as const; 