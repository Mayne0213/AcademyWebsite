import { USER_VALIDATION } from "@/src/entities/user/model/validation";
import { STUDENT_VALIDATION } from "@/src/entities/student/model/validation";
import { SignUpFormData, Step1FormData, Step2FormData } from "./types";

// 회원가입 validation 유틸리티
export const SIGNUP_VALIDATION = {
  // Step1 유효성 검증 (User 정보)
  validateStep1: (formData: Step1FormData) => {
    USER_VALIDATION.validateUserInfoForCreate({
      userId: formData.userId,
      userPassword: formData.userPassword,
      role: "STUDENT"
    });

    USER_VALIDATION.validatePassword(formData.userPassword, formData.userCheckPassword);
  },

  // Step2 유효성 검증 (Student 정보)
  validateStep2: (formData: Step2FormData) => {
    STUDENT_VALIDATION.validateStudentForCreate({
      academyId: formData.academyId,
      studentName: formData.studentName,
      studentPhone: formData.studentPhone,
      studentBirthYear: formData.studentBirthYear,
      studentHighschool: formData.studentHighschool,
    });
  },

  // 최종 회원가입 데이터 유효성 검증
  validateSignUpData: (formData: SignUpFormData) => {
    // Step1: User 정보 검증
    SIGNUP_VALIDATION.validateStep1({
      userId: formData.userId,
      userPassword: formData.userPassword,
      userCheckPassword: formData.userCheckPassword,
    });

    // Step2: Student 정보 검증
    SIGNUP_VALIDATION.validateStep2({
      academyId: formData.academyId,
      studentName: formData.studentName,
      studentPhone: formData.studentPhone,
      studentBirthYear: formData.studentBirthYear,
      studentHighschool: formData.studentHighschool,
    });
  },
}; 