import { UserInfo } from '@/entities/user/model/types';

// 인증 기능 상태 타입
export interface AuthFeatureState {
  isInitialized: boolean;
  isAuthenticating: boolean;
  user: UserInfo | null;
  error: string | null;
}

// 인증 기능 액션 타입
export interface AuthFeatureActions {
  login: (userId: string, password: string) => Promise<UserInfo | null>;
  logout: () => Promise<void>;
  getCurrentUser: () => Promise<UserInfo | null>;
  initializeAuth: () => Promise<void>;
  setUser: (user: UserInfo | null) => void;
  setError: (error: string | null) => void;
  clearError: () => void;
}
