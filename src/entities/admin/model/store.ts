import { create } from 'zustand';
import { Admin, AdminState, AdminBasicActions } from './types';

// 순수한 관리자 상태 관리 스토어
export const useAdminStore = create<AdminState & AdminBasicActions>((set) => ({
  admins: [],
  isLoading: false,

  // 순수한 상태 업데이트 메서드들
  readAdmins: (admins: Admin[]) => set({ admins }),
  
  createAdmin: (admin: Admin) => set((state) => ({
    admins: [admin, ...state.admins]
  })),
  
  updateAdmin: (updatedAdmin: Admin) => set((state) => ({
    admins: state.admins.map(admin => 
      admin.memberId === updatedAdmin.memberId ? updatedAdmin : admin
    )
  })),
  
  deleteAdmin: (adminId: number) => set((state) => ({
    admins: state.admins.filter(admin => admin.memberId !== adminId)
  })),

  setLoading: (isLoading: boolean) => set({ isLoading }),
})); 