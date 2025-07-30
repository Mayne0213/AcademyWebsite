import { VALIDATION_FUNCTIONS } from "@/shared/lib/validation";
import { ERROR_MESSAGES } from "@/shared/config/messages";
import { SignUpFormData, Step1FormData, Step2FormData } from "./types";

// 회원가입 validation 유틸리티
export const SIGNUP_VALIDATION = {
  // Step1 유효성 검증
  validateStep1: (formData: Step1FormData) => {
    const isUserIdValid = Boolean(formData.userId && VALIDATION_FUNCTIONS.isValidUserId(formData.userId));
    const isPasswordMatch = formData.userPassword === formData.userCheckPassword;
    const isStep1Valid = Boolean(
      formData.userId && 
      formData.userPassword && 
      formData.userCheckPassword && 
      isPasswordMatch && 
      isUserIdValid
    );

    return {
      isUserIdValid,
      isPasswordMatch,
      isStep1Valid,
      errors: {
        userId: formData.userId && !isUserIdValid ? ERROR_MESSAGES.VALIDATION.INVALID_FORMAT : null,
        passwordMatch: formData.userCheckPassword && !isPasswordMatch ? ERROR_MESSAGES.VALIDATION.PASSWORD_MISMATCH : null,
      }
    };
  },

  // Step2 유효성 검증
  validateStep2: (formData: Step2FormData) => {
    const isPhoneValid = Boolean(formData.studentPhone && VALIDATION_FUNCTIONS.isValidPhone(formData.studentPhone));
    const isBirthYearValid = Boolean(formData.studentBirthYear && VALIDATION_FUNCTIONS.isValidBirthYear(formData.studentBirthYear));
    const isStep2Valid = Boolean(
      formData.academyId &&
      formData.studentName &&
      formData.studentPhone &&
      formData.studentBirthYear &&
      formData.studentHighschool &&
      isPhoneValid &&
      isBirthYearValid
    );

    return {
      isPhoneValid,
      isBirthYearValid,
      isStep2Valid,
      errors: {
        phone: formData.studentPhone && !isPhoneValid ? ERROR_MESSAGES.VALIDATION.INVALID_PHONE : null,
        birthYear: formData.studentBirthYear && !isBirthYearValid ? ERROR_MESSAGES.VALIDATION.INVALID_BIRTH_YEAR : null,
      }
    };
  },

  // 최종 회원가입 데이터 유효성 검증
  validateSignUpData: (formData: SignUpFormData) => {
    const step1Validation = SIGNUP_VALIDATION.validateStep1({
      userId: formData.userId,
      userPassword: formData.userPassword,
      userCheckPassword: formData.userCheckPassword,
    });

    const step2Validation = SIGNUP_VALIDATION.validateStep2({
      academyId: formData.academyId,
      studentName: formData.studentName,
      studentPhone: formData.studentPhone,
      studentBirthYear: formData.studentBirthYear,
      studentHighschool: formData.studentHighschool,
    });

    const isValid = step1Validation.isStep1Valid && step2Validation.isStep2Valid;
    const errors = [];

    if (step1Validation.errors.userId) {
      errors.push(step1Validation.errors.userId);
    }
    if (step1Validation.errors.passwordMatch) {
      errors.push(step1Validation.errors.passwordMatch);
    }
    if (step2Validation.errors.phone) {
      errors.push(step2Validation.errors.phone);
    }
    if (step2Validation.errors.birthYear) {
      errors.push(step2Validation.errors.birthYear);
    }

    return {
      isValid,
      errors
    };
  },
}; 