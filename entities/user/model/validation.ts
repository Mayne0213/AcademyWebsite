import { UserInfo, UserRole } from './types';
import { VALIDATION_FUNCTIONS } from '@/shared/lib/validation';
import { ERROR_MESSAGES } from '@/shared/config/messages';

// User 유효성 검사 함수들
export const USER_VALIDATION = {
  // UserInfo 전체 유효성 검사
  validateUserInfo: (userInfo: UserInfo): { isValid: boolean; errors: string[] } => {
    const errors: string[] = [];
    
    // ID 검사
    if (!userInfo.memberId || userInfo.memberId <= 0) {
      errors.push('유효하지 않은 회원 ID입니다.');
    }
    
    // 사용자 ID 검사
    if (!userInfo.userId || userInfo.userId.trim().length === 0) {
      errors.push('사용자 ID는 필수입니다.');
    } else if (!VALIDATION_FUNCTIONS.isValidUserId(userInfo.userId)) {
      errors.push('유효하지 않은 사용자 ID 형식입니다.');
    }
    
    // 역할 검사
    if (!userInfo.role) {
      errors.push('사용자 역할은 필수입니다.');
    } else if (!Object.values(UserRole).includes(userInfo.role)) {
      errors.push('유효하지 않은 사용자 역할입니다.');
    }
    
    // 날짜 검사
    if (!userInfo.createdAt || !(userInfo.createdAt instanceof Date)) {
      errors.push('생성일은 필수입니다.');
    }
    
    if (!userInfo.updatedAt || !(userInfo.updatedAt instanceof Date)) {
      errors.push('수정일은 필수입니다.');
    }
    
    return {
      isValid: errors.length === 0,
      errors
    };
  },

  // UserInfo 생성용 유효성 검사 (ID 제외)
  validateUserInfoForCreate: (userInfo: Omit<UserInfo, 'memberId' | 'createdAt' | 'updatedAt' | 'student' | 'admin'>): { isValid: boolean; errors: string[] } => {
    const errors: string[] = [];
    
    // 사용자 ID 검사
    if (!userInfo.userId || userInfo.userId.trim().length === 0) {
      errors.push('사용자 ID는 필수입니다.');
    } else if (!VALIDATION_FUNCTIONS.isValidUserId(userInfo.userId)) {
      errors.push('유효하지 않은 사용자 ID 형식입니다.');
    }
    
    // 역할 검사
    if (!userInfo.role) {
      errors.push('사용자 역할은 필수입니다.');
    } else if (!Object.values(UserRole).includes(userInfo.role)) {
      errors.push('유효하지 않은 사용자 역할입니다.');
    }
    
    return {
      isValid: errors.length === 0,
      errors
    };
  },

  // UserInfo 업데이트용 유효성 검사
  validateUserInfoForUpdate: (updateData: Partial<UserInfo>): { isValid: boolean; errors: string[] } => {
    const errors: string[] = [];
    
    // 업데이트할 필드가 있는지 확인
    const hasUpdateFields = Object.keys(updateData).some(key => 
      updateData[key as keyof UserInfo] !== undefined
    );
    
    if (!hasUpdateFields) {
      errors.push('업데이트할 필드가 없습니다.');
    }
    
    // 사용자 ID 검사
    if (updateData.userId) {
      if (updateData.userId.trim().length === 0) {
        errors.push('사용자 ID는 비어있을 수 없습니다.');
      } else if (!VALIDATION_FUNCTIONS.isValidUserId(updateData.userId)) {
        errors.push('유효하지 않은 사용자 ID 형식입니다.');
      }
    }
    
    // 역할 검사
    if (updateData.role && !Object.values(UserRole).includes(updateData.role)) {
      errors.push('유효하지 않은 사용자 역할입니다.');
    }
    
    return {
      isValid: errors.length === 0,
      errors
    };
  },

  // UserRole 유효성 검사
  validateUserRole: (role: string): { isValid: boolean; errors: string[] } => {
    const errors: string[] = [];
    
    if (!role) {
      errors.push('사용자 역할은 필수입니다.');
    } else if (!Object.values(UserRole).includes(role as UserRole)) {
      errors.push('유효하지 않은 사용자 역할입니다.');
    }
    
    return {
      isValid: errors.length === 0,
      errors
    };
  },

  // UserInfo 배열 유효성 검사
  validateUserInfos: (userInfos: UserInfo[]): { isValid: boolean; errors: string[] } => {
    const errors: string[] = [];
    
    if (!Array.isArray(userInfos)) {
      errors.push('사용자 목록은 배열이어야 합니다.');
      return { isValid: false, errors };
    }
    
    for (let i = 0; i < userInfos.length; i++) {
      const userValidation = USER_VALIDATION.validateUserInfo(userInfos[i]);
      if (!userValidation.isValid) {
        errors.push(`사용자 ${i + 1}: ${userValidation.errors.join(', ')}`);
      }
    }
    
    return {
      isValid: errors.length === 0,
      errors
    };
  },

  // 비밀번호 유효성 검사 (선택적)
  validatePassword: (password?: string): { isValid: boolean; errors: string[] } => {
    const errors: string[] = [];
    
    if (password !== undefined) {
      if (!password || password.trim().length === 0) {
        errors.push('비밀번호는 필수입니다.');
      } else if (!VALIDATION_FUNCTIONS.isValidPassword(password)) {
        errors.push(ERROR_MESSAGES.VALIDATION.PASSWORD_TOO_WEAK);
      }
    }
    
    return {
      isValid: errors.length === 0,
      errors
    };
  },
} as const; 