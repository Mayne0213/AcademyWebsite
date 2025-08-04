import { z } from 'zod';
import { VALIDATION_FUNCTIONS } from '@/src/shared/lib/validation';
import { ERROR_MESSAGES } from '@/src/shared/config/messages';
import { Student } from './types';
import { toast } from 'sonner';

// Zod 스키마 정의
export const StudentSchema = z.object({
  academyId: z.number().positive('유효하지 않은 학원 ID입니다.'),
  studentName: z.string().refine(VALIDATION_FUNCTIONS.isValidName, ERROR_MESSAGES.VALIDATION.INVALID_NAME),
  studentPhone: z.string().refine(VALIDATION_FUNCTIONS.isValidPhone, ERROR_MESSAGES.VALIDATION.INVALID_PHONE),
  studentHighschool: z.string().optional(),
  studentBirthYear: z.string().refine(VALIDATION_FUNCTIONS.isValidBirthYear,ERROR_MESSAGES.VALIDATION.INVALID_BIRTH_YEAR
  ),
  studentMemo: z.string().optional(),
  studentQnas: z.array(z.any()),
  academy: z.any(),
});

export const CreateStudentSchema = StudentSchema.pick({
  academyId: true,
  studentName: true,
  studentPhone: true,
  studentHighschool: true,
  studentBirthYear: true,
});

export const UpdateStudentSchema = CreateStudentSchema.partial().refine(
  (data) => Object.keys(data).some(key => data[key as keyof typeof data] !== undefined),
  { message: '업데이트할 필드가 없습니다.' }
);

// 타입 안전성을 위한 타입 체크 함수
export const validateStudentType = (data: unknown): data is Student => {
  return StudentSchema.safeParse(data).success;
};

// 유효성 검사 함수들
export const STUDENT_VALIDATION = {
  // Student 전체 유효성 검사
  validateStudent: (student: unknown) => {
    const result = StudentSchema.safeParse(student);

    if (!result.success) {
      const errorMessage = result.error.issues[0].message || '유효하지 않은 데이터입니다.';
      toast.error(errorMessage);
      throw new Error(errorMessage);
    }
  },

  // Student 생성용 유효성 검사
  validateStudentForCreate: (student: unknown) => {
    const result = CreateStudentSchema.safeParse(student);

    if (!result.success) {
      const errorMessage = result.error.issues[0].message || '유효하지 않은 데이터입니다.';
      toast.error(errorMessage);
      throw new Error(errorMessage);
    }
  },

  // Student 업데이트용 유효성 검사
  validateStudentForUpdate: (updateData: unknown) => {
    const result = UpdateStudentSchema.safeParse(updateData);

    if (!result.success) {
      const errorMessage = result.error.issues[0].message || '유효하지 않은 데이터입니다.';
      toast.error(errorMessage);
      throw new Error(errorMessage);
    }
  },

  // Student 배열 유효성 검사
  validateStudents: (students: unknown) => {
    const result = z.array(StudentSchema).safeParse(students);

    if (!result.success) {
      const errorMessage = result.error.issues[0].message || '유효하지 않은 데이터입니다.';
      toast.error(errorMessage);
      throw new Error(errorMessage);
    }
  },
} as const; 