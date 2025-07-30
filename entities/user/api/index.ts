import { UserInfo } from "@/entities/user/model/types";
import { apiGet, apiPost, apiPut, apiDelete } from "@/shared/api/http";
import { API_ENDPOINTS } from "@/shared/config/api";

// 사용자 API 관련 함수들
export const userApi = {
  // 현재 사용자 정보 조회
  getCurrentUser: async (): Promise<UserInfo> => {
    return await apiGet<UserInfo>(API_ENDPOINTS.AUTH.ME);
  },

  // 사용자 생성 (회원가입)
  createUser: async (newUser: Omit<UserInfo, "memberId" | "createdAt" | "updatedAt" | "student" | "admin">): Promise<UserInfo> => {
    return await apiPost<UserInfo>(API_ENDPOINTS.AUTH.SIGN_UP_COMBINED, newUser);
  },

  // 사용자 정보 수정
  updateUser: async (userId: number, updatedUser: Partial<UserInfo>): Promise<UserInfo> => {
    return await apiPut<UserInfo>(`${API_ENDPOINTS.AUTH.ME}`, updatedUser);
  },

  // 사용자 삭제
  deleteUser: async (userId: number): Promise<void> => {
    await apiDelete<void>(`${API_ENDPOINTS.AUTH.ME}`);
  },

  // 로그인
  signIn: async (credentials: { userId: string; userPassword: string }): Promise<UserInfo> => {
    return await apiPost<UserInfo>(API_ENDPOINTS.AUTH.SIGN_IN, credentials);
  },

  // 로그아웃
  signOut: async (): Promise<void> => {
    await apiPost<void>(API_ENDPOINTS.AUTH.SIGN_OUT, {});
  },

  // 특정 역할의 사용자들 조회
  getUsersByRole: async (role: string): Promise<UserInfo[]> => {
    return await apiGet<UserInfo[]>(`${API_ENDPOINTS.AUTH.ME}?role=${role}`);
  },
}; 