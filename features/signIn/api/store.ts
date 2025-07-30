import { create } from 'zustand';
import { useRouter } from 'next/navigation';
import { AuthFeatureState, AuthFeatureActions } from './types';
import { UserInfo } from '@/entities/user/model/types';
import { API_ENDPOINTS } from '@/shared/config/api';
import { apiPost, apiGetWithAuth } from '@/shared/api/http';
import { ApiResponse } from '@/shared/api/types';

// 인증 기능 스토어 (복잡한 비즈니스 로직)
export const useAuthFeatureStore = create<AuthFeatureState & AuthFeatureActions>((set, get) => ({
  isInitialized: false,
  isAuthenticating: false,
  user: null,
  error: null,

  // 로그인 기능
  login: async (userId: string, password: string) => {
    set({ isAuthenticating: true, error: null });

    try {
      const loginData = { userId: userId, userPassword: password };
      
      const response = await apiPost<ApiResponse<UserInfo>>(API_ENDPOINTS.AUTH.SIGN_IN, loginData);

      if (response.success && response.data) {
        set({ user: response.data, error: null });
        return response.data;
      } else {
        const errorMessage = response.message || '로그인에 실패했습니다.';
        set({ error: errorMessage, isAuthenticating: false });
        return null;
      }
    } catch (error) { 
      const errorMessage = error instanceof Error ? error.message : '로그인 중 오류가 발생했습니다.';
      set({ error: errorMessage, isAuthenticating: false });
      throw error;
    } finally {
      // 로그인 성공 시 짧은 지연 후 로딩 상태 해제
      setTimeout(() => {
        set({ isAuthenticating: false });
      }, 2000);
    }
  },

  // 로그아웃 기능
  logout: async () => {
    try {
      await apiPost<ApiResponse>(API_ENDPOINTS.AUTH.SIGN_OUT, {});
      set({ user: null, error: null });
    } catch (error) {
      console.error("Logout API failed", error);
      set({ isAuthenticating: false });
    }
  },

  // 현재 사용자 정보 가져오기
  getCurrentUser: async () => {
    try {
      const response = await apiGetWithAuth<ApiResponse<UserInfo>>(API_ENDPOINTS.AUTH.ME);

      if (response.success && response.data) {
        set({ user: response.data });
        return response.data;
      } else {
        set({ user: null });
        return null;
      }
    } catch (error) {
      set({ user: null });
      return null;
    }
  },

  // 인증 초기화
  initializeAuth: async () => {
    try {
      const user = await get().getCurrentUser();
    } catch (error) {
      console.error("Failed to initialize auth", error);
    } finally {
      set({ isInitialized: true });
    }
  },

  // 사용자 설정
  setUser: (user: UserInfo | null) => {
    set({ user });
  },

  // 에러 설정
  setError: (error: string | null) => {
    set({ error });
  },

  // 에러 초기화
  clearError: () => {
    set({ error: null });
  },
}));

export const useAuthRouting = () => {
  const router = useRouter();

  const handleLoginSuccess = (user: UserInfo) => {
    let targetPath: string;
    
    switch (user.role) {
      case "ADMIN":
        targetPath = "/dashboard";
        break;
      case "DEVELOPER":
        targetPath = "/main";
        break;
      case "STUDENT":
      default:
        targetPath = "/dashboard";
        break;
    }
    
    router.push(targetPath);
  };

  const handleLogout = () => {
    router.refresh();
    router.push("/home");
  };

  return {
    handleLoginSuccess,
    handleLogout
  };
}; 