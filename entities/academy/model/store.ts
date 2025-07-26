import { create } from "zustand";
import { Academy } from "@/shared/types/entities";

// 학원 기본 상태 관리
export const useAcademyStore = create<{
  academies: Academy[];
  selectedAcademy: Academy | null;
  setAcademies: (academies: Academy[]) => void;
  setSelectedAcademy: (academy: Academy | null) => void;
  reset: () => void;
}>((set) => ({
  academies: [],
  selectedAcademy: null,

  // 상태 변경
  setAcademies: (academies: Academy[]) => {
    set({ academies });
  },

  setSelectedAcademy: (academy: Academy | null) => {
    set({ selectedAcademy: academy });
  },

  reset: () => {
    set({
      academies: [],
      selectedAcademy: null
    });
  }
})); 