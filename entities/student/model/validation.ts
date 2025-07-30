import { Student, UpdateStudentRequest } from './types';
import { VALIDATION_FUNCTIONS } from '@/shared/lib/validation';
import { ERROR_MESSAGES } from '@/shared/config/messages';

// Student 유효성 검사 함수들
export const STUDENT_VALIDATION = {
  // Student 전체 유효성 검사
  validateStudent: (student: Student): { isValid: boolean; errors: string[] } => {
    const errors: string[] = [];
    
    // UserInfo 기본 필드 검사
    if (!student.memberId || student.memberId <= 0) {
      errors.push('유효하지 않은 회원 ID입니다.');
    }
    
    if (!student.userId || student.userId.trim().length === 0) {
      errors.push('사용자 ID는 필수입니다.');
    } else if (!VALIDATION_FUNCTIONS.isValidUserId(student.userId)) {
      errors.push('유효하지 않은 사용자 ID 형식입니다.');
    }
    
    if (!student.role) {
      errors.push('사용자 역할은 필수입니다.');
    }
    
    // Student 전용 필드 검사
    if (!student.studentName || student.studentName.trim().length === 0) {
      errors.push('학생 이름은 필수입니다.');
    } else if (!VALIDATION_FUNCTIONS.isValidName(student.studentName)) {
      errors.push(ERROR_MESSAGES.VALIDATION.INVALID_NAME);
    }
    
    if (!student.studentPhone) {
      errors.push('학생 전화번호는 필수입니다.');
    } else if (!VALIDATION_FUNCTIONS.isValidPhone(student.studentPhone)) {
      errors.push(ERROR_MESSAGES.VALIDATION.INVALID_PHONE);
    }
    
    if (!student.studentHighschool || student.studentHighschool.trim().length === 0) {
      errors.push('고등학교명은 필수입니다.');
    }
    
    if (!student.studentBirthYear || student.studentBirthYear <= 0) {
      errors.push('출생년도는 필수입니다.');
    } else {
      const birthYearStr = student.studentBirthYear.toString();
      if (!VALIDATION_FUNCTIONS.isValidBirthYear(birthYearStr)) {
        errors.push(ERROR_MESSAGES.VALIDATION.INVALID_BIRTH_YEAR);
      }
    }
    
    if (!student.academyId || student.academyId <= 0) {
      errors.push('학원 ID는 필수입니다.');
    }
    
    // 날짜 검사
    if (!student.createdAt || !(student.createdAt instanceof Date)) {
      errors.push('생성일은 필수입니다.');
    }
    
    if (!student.updatedAt || !(student.updatedAt instanceof Date)) {
      errors.push('수정일은 필수입니다.');
    }
    
    return {
      isValid: errors.length === 0,
      errors
    };
  },

  // Student 생성용 유효성 검사 (ID 제외)
  validateStudentForCreate: (student: Omit<Student, 'memberId' | 'createdAt' | 'updatedAt' | 'studentQnas' | 'academy'>): { isValid: boolean; errors: string[] } => {
    const errors: string[] = [];
    
    // UserInfo 기본 필드 검사
    if (!student.userId || student.userId.trim().length === 0) {
      errors.push('사용자 ID는 필수입니다.');
    } else if (!VALIDATION_FUNCTIONS.isValidUserId(student.userId)) {
      errors.push('유효하지 않은 사용자 ID 형식입니다.');
    }
    
    if (!student.role) {
      errors.push('사용자 역할은 필수입니다.');
    }
    
    // Student 전용 필드 검사
    if (!student.studentName || student.studentName.trim().length === 0) {
      errors.push('학생 이름은 필수입니다.');
    } else if (!VALIDATION_FUNCTIONS.isValidName(student.studentName)) {
      errors.push(ERROR_MESSAGES.VALIDATION.INVALID_NAME);
    }
    
    if (!student.studentPhone) {
      errors.push('학생 전화번호는 필수입니다.');
    } else if (!VALIDATION_FUNCTIONS.isValidPhone(student.studentPhone)) {
      errors.push(ERROR_MESSAGES.VALIDATION.INVALID_PHONE);
    }
    
    if (!student.studentHighschool || student.studentHighschool.trim().length === 0) {
      errors.push('고등학교명은 필수입니다.');
    }
    
    if (!student.studentBirthYear || student.studentBirthYear <= 0) {
      errors.push('출생년도는 필수입니다.');
    } else {
      const birthYearStr = student.studentBirthYear.toString();
      if (!VALIDATION_FUNCTIONS.isValidBirthYear(birthYearStr)) {
        errors.push(ERROR_MESSAGES.VALIDATION.INVALID_BIRTH_YEAR);
      }
    }
    
    if (!student.academyId || student.academyId <= 0) {
      errors.push('학원 ID는 필수입니다.');
    }
    
    return {
      isValid: errors.length === 0,
      errors
    };
  },

  // Student 업데이트용 유효성 검사
  validateStudentForUpdate: (updateData: UpdateStudentRequest): { isValid: boolean; errors: string[] } => {
    const errors: string[] = [];
    
    // 업데이트할 필드가 있는지 확인
    const hasUpdateFields = Object.keys(updateData).some(key => 
      updateData[key as keyof UpdateStudentRequest] !== undefined
    );
    
    if (!hasUpdateFields) {
      errors.push('업데이트할 필드가 없습니다.');
    }
    
    // 전화번호 검사
    if (updateData.studentPhone && !VALIDATION_FUNCTIONS.isValidPhone(updateData.studentPhone)) {
      errors.push(ERROR_MESSAGES.VALIDATION.INVALID_PHONE);
    }
    
    // 이름 검사
    if (updateData.studentName) {
      if (updateData.studentName.trim().length === 0) {
        errors.push('학생 이름은 비어있을 수 없습니다.');
      } else if (!VALIDATION_FUNCTIONS.isValidName(updateData.studentName)) {
        errors.push(ERROR_MESSAGES.VALIDATION.INVALID_NAME);
      }
    }
    
    // 고등학교명 검사
    if (updateData.studentHighschool && updateData.studentHighschool.trim().length === 0) {
      errors.push('고등학교명은 비어있을 수 없습니다.');
    }
    
    // 출생년도 검사
    if (updateData.studentBirthYear) {
      if (updateData.studentBirthYear <= 0) {
        errors.push('출생년도는 0보다 커야 합니다.');
      } else {
        const birthYearStr = updateData.studentBirthYear.toString();
        if (!VALIDATION_FUNCTIONS.isValidBirthYear(birthYearStr)) {
          errors.push(ERROR_MESSAGES.VALIDATION.INVALID_BIRTH_YEAR);
        }
      }
    }
    
    // 학원 ID 검사
    if (updateData.academyId && updateData.academyId <= 0) {
      errors.push('유효하지 않은 학원 ID입니다.');
    }
    
    return {
      isValid: errors.length === 0,
      errors
    };
  },

  // Student 배열 유효성 검사
  validateStudents: (students: Student[]): { isValid: boolean; errors: string[] } => {
    const errors: string[] = [];
    
    if (!Array.isArray(students)) {
      errors.push('학생 목록은 배열이어야 합니다.');
      return { isValid: false, errors };
    }
    
    for (let i = 0; i < students.length; i++) {
      const studentValidation = STUDENT_VALIDATION.validateStudent(students[i]);
      if (!studentValidation.isValid) {
        errors.push(`학생 ${i + 1}: ${studentValidation.errors.join(', ')}`);
      }
    }
    
    return {
      isValid: errors.length === 0,
      errors
    };
  },
} as const; 