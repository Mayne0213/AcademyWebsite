import { z } from 'zod';
import { VALIDATION_FUNCTIONS } from '@/src/shared/lib/validation';
import { ERROR_MESSAGES } from '@/src/shared/config/messages';
import { UserInfo, UserRole } from './types';
import { toast } from 'sonner';

// Zod 스키마 정의
export const UserRoleSchema = z.nativeEnum(UserRole);

export const UserInfoSchema = z.object({
  memberId: z.number().positive('유효하지 않은 회원 ID입니다.'),
  userId: z.string().refine(VALIDATION_FUNCTIONS.isValidUserId, '유효하지 않은 사용자 ID 형식입니다.'),
  userPassword: z.string().optional(),
  role: UserRoleSchema,
  createdAt: z.date(),
  updatedAt: z.date(),
  student: z.any().optional(),
  admin: z.any().optional(),
});

export const CreateUserInfoSchema = UserInfoSchema.pick({
  userId: true,
  userPassword: true,
  role: true,
});

export const UpdateUserInfoSchema = UserInfoSchema.pick({
  userId: true,
  userPassword: true,
  role: true,
}).partial().refine(
  (data) => Object.keys(data).some(key => data[key as keyof typeof data] !== undefined),
  { message: '업데이트할 필드가 없습니다.' }
);

// 타입 안전성을 위한 타입 체크 함수
export const validateUserInfoType = (data: unknown): data is UserInfo => {
  return UserInfoSchema.safeParse(data).success;
};

// 유효성 검사 함수들
export const USER_VALIDATION = {
  // UserInfo 전체 유효성 검사
  validateUserInfo: (userInfo: unknown) => {
    const result = UserInfoSchema.safeParse(userInfo);

    if (!result.success) {
      const errorMessage = result.error.issues[0].message || '유효하지 않은 데이터입니다.';
      toast.error(errorMessage);
      throw new Error(errorMessage);
    }
  },

  // UserInfo 생성용 유효성 검사
  validateUserInfoForCreate: (userInfo: unknown) => {
    const result = CreateUserInfoSchema.safeParse(userInfo);

    if (!result.success) {
      const errorMessage = result.error.issues[0].message || '유효하지 않은 데이터입니다.';
      toast.error(errorMessage);
      throw new Error(errorMessage);
    }
  },

  // UserInfo 업데이트용 유효성 검사
  validateUserInfoForUpdate: (updateData: unknown) => {
    const result = UpdateUserInfoSchema.safeParse(updateData);

    if (!result.success) {
      const errorMessage = result.error.issues[0].message || '유효하지 않은 데이터입니다.';
      toast.error(errorMessage);
      throw new Error(errorMessage);
    }
  },

  // UserRole 유효성 검사
  validateUserRole: (role: unknown) => {
    const result = UserRoleSchema.safeParse(role);

    if (!result.success) {
      const errorMessage = result.error.issues[0].message || '유효하지 않은 데이터입니다.';
      toast.error(errorMessage);
      throw new Error(errorMessage);
    }
  },

  // 비밀번호 유효성 검사
  validatePassword: (password: unknown, userCheckPassword: unknown) => {
    if (password === undefined) {
      return;
    }
    
    if (userCheckPassword !== password) {
      toast.error("비밀번호가 일치하지 않습니다.");
      throw new Error("비밀번호가 일치하지 않습니다.");
    }
    
    const result = z.string().refine(VALIDATION_FUNCTIONS.isValidPassword, ERROR_MESSAGES.VALIDATION.PASSWORD_TOO_WEAK).safeParse(password);

    if (!result.success) {
      const errorMessage = result.error.issues[0].message || '유효하지 않은 데이터입니다.';
      toast.error(errorMessage);
      throw new Error(errorMessage);
    }
  },
} as const; 