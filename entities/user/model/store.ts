import { create } from "zustand";
import { UserState } from "./types";
import { UserInfo } from "@/shared/types/entities";

// 사용자 기본 상태 관리
export const useUserStore = create<UserState>((set) => ({
  user: null,
  isLoggedIn: false,
  isLoading: false,
  isSubmitting: false,
  error: undefined,

  // 사용자 설정
  setUser: (user: UserInfo | null) => {
    set({ 
      user, 
      isLoggedIn: !!user,
      error: undefined 
    });
  },

  // 로그아웃
  logout: () => {
    set({
      user: null,
      isLoggedIn: false,
      error: undefined
    });
  },

  // 상태 초기화
  reset: () => {
    set({
      user: null,
      isLoggedIn: false,
      isLoading: false,
      isSubmitting: false,
      error: undefined
    });
  }
})); 