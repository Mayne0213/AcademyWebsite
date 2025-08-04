import { create } from 'zustand';
import { Academy, AcademyState, AcademyBasicActions } from './types';

// 순수한 관리자 상태 관리 스토어
export const useAcademyStore = create<AcademyState & AcademyBasicActions>((set) => ({
  academies: [],
  isLoading: true,

  readAcademies: (academies: Academy[]) => set({ academies }),

  createAcademy: (newAcademy: Academy) => set((state) => ({
    academies: [newAcademy, ...state.academies]
  })),

  updateAcademy: (updatedAcademy: Academy) => set((state) => ({
    academies: state.academies.map(academy =>
      academy.academyId === updatedAcademy.academyId ? updatedAcademy : academy
    )
  })),

  deleteAcademy: (academyId: number) => set((state) => ({
    academies: state.academies.filter(academy => academy.academyId !== academyId)
  })),

  setLoading: (isLoading: boolean) => set({ isLoading }),
})); 