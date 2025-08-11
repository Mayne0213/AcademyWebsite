// entities/user/api/index.ts
import { UserInfo } from "@/src/entities/user/model/types";
import { apiGet, apiPost, apiPut, apiDelete } from "@/src/shared/api/http";
import { API_ENDPOINTS } from "@/src/shared/config/api";
import { toast } from "sonner";

// 사용자 API 관련 함수들
export const userApi = {
  // 현재 사용자 정보 조회
  getCurrentUser: async (): Promise<UserInfo> => {
    try {
      return await apiGet<UserInfo>(API_ENDPOINTS.AUTH.ME);
    } catch (error) {
      throw error;
    }
  },

  // 사용자 생성은 회원가입 페이지에서 처리

  // 사용자 정보 수정
  updateUser: async (updatedUser: Partial<UserInfo>): Promise<UserInfo> => {
    try {
      const result = await apiPut<UserInfo>(`${API_ENDPOINTS.AUTH.ME}`, updatedUser);
      toast.success("사용자 정보가 성공적으로 수정되었습니다.");

      return result;
    } catch (error) {
      throw error;
    }
  },

  // 사용자 삭제
  deleteUser: async (userId: number): Promise<void> => {
    try {
      await apiDelete<void>(`${API_ENDPOINTS.AUTH.ME}`);
      toast.success("계정이 성공적으로 삭제되었습니다.");
    } catch (error) {
      throw error;
    }
  },

  // 로그인
  signIn: async (credentials: { userId: string; userPassword: string }): Promise<UserInfo> => {
    try {
      const result = await apiPost<UserInfo>(API_ENDPOINTS.AUTH.SIGN_IN, credentials);
      toast.success("로그인이 성공적으로 완료되었습니다.");

      return result;
    } catch (error) {
      throw error;
    }
  },

  // 로그아웃
  signOut: async (): Promise<void> => {
    try {
      await apiPost<void>(API_ENDPOINTS.AUTH.SIGN_OUT, {});
      toast.success("로그아웃되었습니다.");
    } catch (error) {
      throw error;
    }
  },
};