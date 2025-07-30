import { Academy, AcademyImage, UpdateAcademyRequest } from './types';
import { VALIDATION_FUNCTIONS } from '@/shared/lib/validation';
import { ERROR_MESSAGES } from '@/shared/config/messages';

// Academy 유효성 검사 함수들
export const ACADEMY_VALIDATION = {
  // Academy 전체 유효성 검사
  validateAcademy: (academy: Academy): { isValid: boolean; errors: string[] } => {
    const errors: string[] = [];
    
    // 필수 필드 검사
    if (!academy.academyName || academy.academyName.trim().length === 0) {
      errors.push('학원명은 필수입니다.');
    }
    
    if (!academy.academyPhone) {
      errors.push('학원 전화번호는 필수입니다.');
    } else if (!VALIDATION_FUNCTIONS.isValidPhone(academy.academyPhone)) {
      errors.push(ERROR_MESSAGES.VALIDATION.INVALID_PHONE);
    }
    
    if (!academy.academyAddress || academy.academyAddress.trim().length === 0) {
      errors.push('학원 주소는 필수입니다.');
    }
    
    // ID 검사
    if (academy.academyId <= 0) {
      errors.push('유효하지 않은 학원 ID입니다.');
    }
    
    // 날짜 검사
    if (!academy.createdAt || !(academy.createdAt instanceof Date)) {
      errors.push('생성일은 필수입니다.');
    }
    
    if (!academy.updatedAt || !(academy.updatedAt instanceof Date)) {
      errors.push('수정일은 필수입니다.');
    }
    
    return {
      isValid: errors.length === 0,
      errors
    };
  },

  // Academy 생성용 유효성 검사 (ID 제외)
  validateAcademyForCreate: (academy: Omit<Academy, 'academyId' | 'createdAt' | 'updatedAt' | 'academyStudents' | 'academyAdmins' | 'academyAnnouncements'>): { isValid: boolean; errors: string[] } => {
    const errors: string[] = [];
    
    // 필수 필드 검사
    if (!academy.academyName || academy.academyName.trim().length === 0) {
      errors.push('학원명은 필수입니다.');
    }
    
    if (!academy.academyPhone || academy.academyPhone.trim().length === 0) {
      errors.push('학원 전화번호는 필수입니다.');
    }
    
    if (!academy.academyAddress || academy.academyAddress.trim().length === 0) {
      errors.push('학원 주소는 필수입니다.');
    }
    
    // 이미지 검사
    if (academy.academyImages && academy.academyImages.length > 0) {
      for (const image of academy.academyImages) {
        const imageValidation = ACADEMY_VALIDATION.validateAcademyImage(image);
        if (!imageValidation.isValid) {
          errors.push(...imageValidation.errors);
        }
      }
    }
    
    return {
      isValid: errors.length === 0,
      errors
    };
  },

  // Academy 업데이트용 유효성 검사
  validateAcademyForUpdate: (updateData: UpdateAcademyRequest): { isValid: boolean; errors: string[] } => {
    const errors: string[] = [];
    
    // 업데이트할 필드가 있는지 확인
    const hasUpdateFields = Object.keys(updateData).some(key => 
      key !== 'updatedAt' && updateData[key as keyof UpdateAcademyRequest] !== undefined
    );
    
    if (!hasUpdateFields) {
      errors.push('업데이트할 필드가 없습니다.');
    }
    
    // 전화번호 검사
    if (updateData.academyPhone && !VALIDATION_FUNCTIONS.isValidPhone(updateData.academyPhone)) {
      errors.push(ERROR_MESSAGES.VALIDATION.INVALID_PHONE);
    }
    
    // 이름 검사
    if (updateData.academyName && updateData.academyName.trim().length === 0) {
      errors.push('학원명은 비어있을 수 없습니다.');
    }
    
    // 주소 검사
    if (updateData.academyAddress && updateData.academyAddress.trim().length === 0) {
      errors.push('학원 주소는 비어있을 수 없습니다.');
    }
    
    return {
      isValid: errors.length === 0,
      errors
    };
  },

  // AcademyImage 유효성 검사
  validateAcademyImage: (image: AcademyImage): { isValid: boolean; errors: string[] } => {
    const errors: string[] = [];
    
    if (!image.academyImageUrl || image.academyImageUrl.trim().length === 0) {
      errors.push('학원 이미지 URL은 필수입니다.');
    }
    
    if (image.academyId <= 0) {
      errors.push('유효하지 않은 학원 ID입니다.');
    }
    
    // URL 형식 검사
    try {
      new URL(image.academyImageUrl);
    } catch {
      errors.push('유효하지 않은 이미지 URL 형식입니다.');
    }
    
    return {
      isValid: errors.length === 0,
      errors
    };
  },

  // Academy 배열 유효성 검사
  validateAcademies: (academies: Academy[]): { isValid: boolean; errors: string[] } => {
    const errors: string[] = [];
    
    if (!Array.isArray(academies)) {
      errors.push('학원 목록은 배열이어야 합니다.');
      return { isValid: false, errors };
    }
    
    for (let i = 0; i < academies.length; i++) {
      const academyValidation = ACADEMY_VALIDATION.validateAcademy(academies[i]);
      if (!academyValidation.isValid) {
        errors.push(`학원 ${i + 1}: ${academyValidation.errors.join(', ')}`);
      }
    }
    
    return {
      isValid: errors.length === 0,
      errors
    };
  },
} as const; 