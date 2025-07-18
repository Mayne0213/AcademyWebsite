"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
  useCallback,
} from "react";
import { useRouter } from "next/navigation";
import { UserInfo } from "@/components/type/userInfoType";

interface AuthContextType {
  user: UserInfo | null;
  isLoggedIn: boolean;
  isLoading: boolean;
  error: string | null;
  login: (user: UserInfo) => void;
  logout: () => void;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const [user, setUser] = useState<UserInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const clearError = () => setError(null);

  const login = (userInfo: UserInfo) => {
    setUser(userInfo);
    router.push(userInfo.role === "ADMIN" ? "/main" : "/dashboard");
  };

  const logout = async () => {
    try {
      setUser(null);
      router.refresh();
      router.push("/home");
      
      // 백그라운드에서 로그아웃 API 호출
      fetch("/api/member/signOut", { method: "POST" }).catch(err => {
        console.error("Logout API failed", err);
      });
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  const fetchUser = useCallback(async () => {
    try {
      setIsLoading(true);
      const res = await fetch("/api/member/me", {
        method: "GET",
        credentials: "include",
      });

      if (res.ok) {
        const data = await res.json();
        setUser(data.user);
      } else if (res.status === 401) {
        // 인증 실패: 콘솔에 에러를 찍지 않음
        setUser(null);
      } else {
        // 기타 에러만 콘솔에 출력
        console.error("서버 오류", res.status);
        setUser(null);
      }
    } catch (err) {
      // 네트워크 등 진짜 에러만 콘솔에 출력
      console.error(err);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn: !!user,
        isLoading,
        error,
        login,
        logout,
        clearError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
