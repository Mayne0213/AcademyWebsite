import { Admin, UpdateAdminRequest } from './types';
import { VALIDATION_FUNCTIONS } from '@/shared/lib/validation';
import { ERROR_MESSAGES } from '@/shared/config/messages';

// Admin 유효성 검사 함수들
export const ADMIN_VALIDATION = {
  // Admin 전체 유효성 검사
  validateAdmin: (admin: Admin): { isValid: boolean; errors: string[] } => {
    const errors: string[] = [];
    
    // Admin 전용 필드 검사
    if (!admin.adminName || admin.adminName.trim().length === 0) {
      errors.push('관리자 이름은 필수입니다.');
    } else if (!VALIDATION_FUNCTIONS.isValidName(admin.adminName)) {
      errors.push(ERROR_MESSAGES.VALIDATION.INVALID_NAME);
    }
    
    if (!admin.adminPhone) {
      errors.push('관리자 전화번호는 필수입니다.');
    } else if (!VALIDATION_FUNCTIONS.isValidPhone(admin.adminPhone)) {
      errors.push(ERROR_MESSAGES.VALIDATION.INVALID_PHONE);
    }
    
    if (!admin.adminPosition || admin.adminPosition.trim().length === 0) {
      errors.push('관리자 직책은 필수입니다.');
    }
    
    return {
      isValid: errors.length === 0,
      errors
    };
  },

  // Admin 생성용 유효성 검사 (ID 제외)
  validateAdminForCreate: (admin: Omit<Admin, 'memberId' | 'createdAt' | 'updatedAt' | 'announcements' | 'academies'>): { isValid: boolean; errors: string[] } => {
    const errors: string[] = [];
    
    // Admin 전용 필드 검사
    if (!admin.adminName || admin.adminName.trim().length === 0) {
      errors.push('관리자 이름은 필수입니다.');
    } else if (!VALIDATION_FUNCTIONS.isValidName(admin.adminName)) {
      errors.push(ERROR_MESSAGES.VALIDATION.INVALID_NAME);
    }
    
    if (!admin.adminPhone) {
      errors.push('관리자 전화번호는 필수입니다.');
    } else if (!VALIDATION_FUNCTIONS.isValidPhone(admin.adminPhone)) {
      errors.push(ERROR_MESSAGES.VALIDATION.INVALID_PHONE);
    }
    
    if (!admin.adminPosition || admin.adminPosition.trim().length === 0) {
      errors.push('관리자 직책은 필수입니다.');
    }
    
    return {
      isValid: errors.length === 0,
      errors
    };
  },

  // Admin 업데이트용 유효성 검사
  validateAdminForUpdate: (updateData: UpdateAdminRequest): { isValid: boolean; errors: string[] } => {
    const errors: string[] = [];
    
    // 업데이트할 필드가 있는지 확인
    const hasUpdateFields = Object.keys(updateData).some(key => 
      updateData[key as keyof UpdateAdminRequest] !== undefined
    );
    
    if (!hasUpdateFields) {
      errors.push('업데이트할 필드가 없습니다.');
    }
    
    // 전화번호 검사
    if (updateData.adminPhone && !VALIDATION_FUNCTIONS.isValidPhone(updateData.adminPhone)) {
      errors.push(ERROR_MESSAGES.VALIDATION.INVALID_PHONE);
    }
    
    // 이름 검사
    if (updateData.adminName) {
      if (updateData.adminName.trim().length === 0) {
        errors.push('관리자 이름은 비어있을 수 없습니다.');
      } else if (!VALIDATION_FUNCTIONS.isValidName(updateData.adminName)) {
        errors.push(ERROR_MESSAGES.VALIDATION.INVALID_NAME);
      }
    }
    
    // 직책 검사
    if (updateData.adminPosition && updateData.adminPosition.trim().length === 0) {
      errors.push('관리자 직책은 비어있을 수 없습니다.');
    }
    
    return {
      isValid: errors.length === 0,
      errors
    };
  },

  // Admin 배열 유효성 검사
  validateAdmins: (admins: Admin[]): { isValid: boolean; errors: string[] } => {
    const errors: string[] = [];
    
    if (!Array.isArray(admins)) {
      errors.push('관리자 목록은 배열이어야 합니다.');
      return { isValid: false, errors };
    }
    
    for (let i = 0; i < admins.length; i++) {
      const adminValidation = ADMIN_VALIDATION.validateAdmin(admins[i]);
      if (!adminValidation.isValid) {
        errors.push(`관리자 ${i + 1}: ${adminValidation.errors.join(', ')}`);
      }
    }
    
    return {
      isValid: errors.length === 0,
      errors
    };
  },
} as const; 