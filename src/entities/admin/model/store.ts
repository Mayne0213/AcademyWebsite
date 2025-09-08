import { create } from 'zustand';
import { Admin, AdminSummary, AdminState, AdminBasicActions } from './types';

// 순수한 관리자 상태 관리 스토어
export const useAdminStore = create<AdminState & AdminBasicActions>((set) => ({
  admins: [],
  isLoading: true,

  // 1. 간략한 정보만을 불러오는 함수
  readAdminSummaries: (adminSummaries: AdminSummary[]) => set({
    admins: adminSummaries,
  }),

  // 2. 디테일한 개인의 정보를 전부 불러오는 함수
  readAdmins: (admins: Admin[]) => set({
    admins: admins,
  }),

  // 3. adminId를 받아서 해당하는 개인의 간략한 정보만을 불러오는 함수
  getAdminSummary: (adminSummary: AdminSummary) => set((state) => ({
    admins: [adminSummary, ...state.admins],
  })),

  // 4. adminId를 받아서 해당하는 개인의 디테일한 정보를 불러오는 함수
  getAdmin: (admin: Admin) => set((state) => ({
    admins: state.admins.map((existingAdmin: Admin | AdminSummary) =>
      existingAdmin.memberId === admin.memberId ? admin : existingAdmin
    )
  })),

  createAdmin: (newAdmin: Admin) => set((state) => ({
    admins: [newAdmin, ...state.admins],
  })),

  updateAdmin: (updatedAdmin: Admin) => set((state) => ({
    admins: state.admins.map(admin => 
      admin.memberId === updatedAdmin.memberId ? updatedAdmin : admin
    ),
  })),

  deleteAdmin: (adminId: number) => set((state) => ({
    admins: state.admins.filter(admin => admin.memberId !== adminId),
  })),

  setLoading: (isLoading: boolean) => set({ isLoading }),
})); 