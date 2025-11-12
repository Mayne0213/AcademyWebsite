import { create } from 'zustand';
import { ToggleState, ToggleBasicActions, Toggle } from './types';

export const useToggleStore = create<ToggleState & ToggleBasicActions>((set) => ({
  // 초기 상태
  toggle: null,
  isLoading: true,

  // Toggle 설정
  setToggle: (toggle: Toggle) => set({
    toggle,
    isLoading: false
  }),

  // 로딩 상태 설정
  setLoading: (isLoading: boolean) => set({ isLoading }),
}));
