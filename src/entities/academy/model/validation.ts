import { z } from 'zod';
import { VALIDATION_FUNCTIONS } from '@/src/shared/lib/validation';
import { ERROR_MESSAGES } from '@/src/shared/config/messages';
import { Academy, AcademyFile } from './types';
import { toast } from 'sonner';

// Zod 스키마 정의 - types.ts의 타입에 맞춰 정의
export const AcademyFileSchema = z.object({
  academyFileId: z.number().min(0, '유효하지 않은 파일 ID입니다.'), // 0도 허용 (새로 업로드된 파일)
  academyFileUrl: z.string().refine(VALIDATION_FUNCTIONS.isValidUrl,ERROR_MESSAGES.VALIDATION.INVALID_URL),
  academyFileName: z.string().optional(),
  createdAt: z.date().optional(), // 선택적으로 만들기 (새로 업로드된 파일의 경우)
  academyId: z.number().positive('유효하지 않은 학원 ID입니다.'),
  academy: z.any().optional(), // 선택적으로 만들기
});

export const AcademySchema = z.object({
  academyId: z.number().positive('유효하지 않은 학원 ID입니다.'),
  academyName: z.string().min(1, "학원 이름을 입력해 주세요."),
  academyPhone: z.string().min(1, "전화번호를 입력해 주세요."),
  academyAddress: z.string().min(1, "주소를 입력해 주세요."),
  academyMainImage: z.string().optional(),
  academyFiles: z.array(AcademyFileSchema).default([]),
  academyStudents: z.array(z.any()).default([]), // Student 타입은 별도로 정의
  academyAdmins: z.array(z.any()).default([]), // Admin 타입은 별도로 정의
  academyAnnouncements: z.array(z.any()).default([]), // Announcement 타입은 별도로 정의
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const CreateAcademySchema = AcademySchema.pick({
  academyName: true,
  academyPhone: true,
  academyAddress: true,
  academyMainImage: true,
  academyFiles: true,
})

export const UpdateAcademySchema = z.object({
  academyId: z.number().positive('유효하지 않은 학원 ID입니다.'),
  academyName: z.string().min(1, "학원 이름을 입력해 주세요."),
  academyPhone: z.string().min(1, "전화번호를 입력해 주세요."),
  academyAddress: z.string().min(1, "주소를 입력해 주세요."),
  files: z.array(z.any()).optional(),
  deletedFiles: z.array(z.number()).optional(),
});

// 타입 안전성을 위한 타입 체크 함수
export const validateAcademyType = (data: unknown): data is Academy => {
  return AcademySchema.safeParse(data).success;
};

export const validateAcademyImageType = (data: unknown): data is AcademyFile => {
  return AcademyFileSchema.safeParse(data).success;
};

// 유효성 검사 함수들
export const ACADEMY_VALIDATION = {
  // Academy 전체 유효성 검사
  validateAcademy: (academy: unknown) => {
    const result = AcademySchema.safeParse(academy);
    
    if (!result.success) {
      const errorMessage = result.error.issues[0].message || '유효하지 않은 데이터입니다.';
      toast.error(errorMessage);
      throw new Error(errorMessage);
    }
  },

  // Academy 생성용 유효성 검사
  validateAcademyForCreate: (academy: unknown) => {
    const result = CreateAcademySchema.safeParse(academy);
    
    if (!result.success) {
      const errorMessage = result.error.issues[0].message || '유효하지 않은 데이터입니다.';
      toast.error(errorMessage);
      throw new Error(errorMessage);
    }
  },

  // Academy 업데이트용 유효성 검사
  validateAcademyForUpdate: (updateData: unknown) => {
    const result = UpdateAcademySchema.safeParse(updateData);
    
    if (!result.success) {
      const errorMessage = result.error.issues[0].message || '유효하지 않은 데이터입니다.';
      toast.error(errorMessage);
      throw new Error(errorMessage);
    }
  },

  // AcademyImage 유효성 검사
  validateAcademyImage: (image: unknown) => {
    const result = AcademyFileSchema.safeParse(image);
    
    if (!result.success) {
      const errorMessage = result.error.issues[0].message || '유효하지 않은 데이터입니다.';
      toast.error(errorMessage);
      throw new Error(errorMessage);
    }
  },

  // Academy 배열 유효성 검사
  validateAcademies: (academies: unknown) => {
    const result = z.array(AcademySchema).safeParse(academies);
    
    if (!result.success) {
      const errorMessage = result.error.issues[0].message || '유효하지 않은 데이터입니다.';
      toast.error(errorMessage);
      throw new Error(errorMessage);
    }
  },
} as const; 