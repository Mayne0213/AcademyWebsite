"use client";

import {
  createContext,
  useContext,
  ReactNode,
  useCallback,
  useEffect,
} from "react";
import { UserInfo } from "@/src/entities/user/model/types";
import {
  useAuthFeatureStore,
  useAuthRouting,
} from "@/src/features/signIn/api/index";

// 인증 컨텍스트 타입 정의
interface AuthContextType {
  user: UserInfo | null;
  isLoggedIn: boolean;
  isLoading: boolean;
  error: string | null;
  login: (userId: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

// 인증 컨텍스트 생성
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// 인증 프로바이더 컴포넌트
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const authFeatureStore = useAuthFeatureStore();
  const authRouting = useAuthRouting();

  const login = useCallback(
    async (userId: string, password: string) => {
      const userInfo = await authFeatureStore.login(userId, password);
      if (userInfo) {
        authRouting.handleLoginSuccess(userInfo);
      }
    },
    [authFeatureStore, authRouting],
  );

  const logout = useCallback(async () => {
    await authFeatureStore.logout();
    authRouting.handleLogout();
  }, [authFeatureStore, authRouting]);

  // 페이지 로드 시 사용자 정보 확인
  useEffect(() => {
    authFeatureStore.getCurrentUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user: authFeatureStore.user,
        isLoggedIn: !!authFeatureStore.user,
        isLoading: authFeatureStore.isAuthenticating,
        error: authFeatureStore.error,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// 인증 훅
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};
