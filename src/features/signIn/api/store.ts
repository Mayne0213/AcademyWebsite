import { create } from 'zustand';
import { useRouter } from 'next/navigation';
import { AuthFeatureState, AuthFeatureActions } from './types';
import { UserInfo } from '@/src/entities/user/model/types';
import { API_ENDPOINTS } from '@/src/shared/config/api';
import { apiPost, apiGetWithAuth } from '@/src/shared/api/http';
import { ApiResponse } from '@/src/shared/api/types';

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
      
      const response = await apiPost<UserInfo>(API_ENDPOINTS.AUTH.SIGN_IN, loginData);
      console.log("response=", response);

      if (response) {
        set({ user: response, error: null });
        // 로딩 상태는 리다이렉트 완료 후에 해제됨
        return response;
      } else {
        const errorMessage = '로그인에 실패했습니다.';
        set({ error: errorMessage, isAuthenticating: false });
        return null;
      }
    } catch (error) { 
      const errorMessage = error instanceof Error ? error.message : '로그인 중 오류가 발생했습니다.';
      set({ error: errorMessage, isAuthenticating: false });
      throw error;
    }
  },

  // 로그아웃 기능 - 성능 최적화: 즉시 로컬 상태 초기화
  logout: () => {
    // 즉시 로컬 상태 초기화 (사용자 경험 향상)
    set({ user: null, error: null, isAuthenticating: false });

    // API 호출은 백그라운드에서 처리 (완전히 비동기)
    apiPost<ApiResponse>(API_ENDPOINTS.AUTH.SIGN_OUT, {}).catch(error => {
      console.error("Background logout API failed", error);
    });
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

  // 로딩 상태 설정
  setLoading: (isAuthenticating: boolean) => {
    set({ isAuthenticating });
  },
}));

export const useAuthRouting = () => {
  const router = useRouter();

  const handleLoginSuccess = (user: UserInfo) => {
    let targetPath: string;
    
    switch (user.role) {
      case "ADMIN":
        targetPath = "/main";
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
    router.push("/home");
  };

  return {
    handleLoginSuccess,
    handleLogout
  };
}; 