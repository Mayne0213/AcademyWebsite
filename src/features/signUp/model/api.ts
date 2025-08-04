import { SignUpFormData } from "./types";
import { apiPost } from "@/src/shared/api/http";
import { API_ENDPOINTS } from "@/src/shared/config/api";
import { ApiResponse } from "@/src/shared/api/types";

// 회원가입 API 호출
export const signUpApi = {
  // 회원가입 제출
  submitSignUp: async (signUpData: SignUpFormData): Promise<ApiResponse> => {
    const result = await apiPost<ApiResponse>(
      API_ENDPOINTS.AUTH.SIGN_UP_COMBINED,
      {
        ...signUpData,
        studentBirthYear: parseInt(signUpData.studentBirthYear) || 0,
      }
    );
    
    return result;
  },
};