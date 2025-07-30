import { Admin } from "@/entities/admin/model/types";
import { apiGet, apiPost, apiPut, apiDelete } from "@/shared/api/http";
import { API_ENDPOINTS } from "@/shared/config/api";

// 관리자 API 관련 함수들
export const adminApi = {
  // 모든 관리자 조회
  getAdmins: async (): Promise<Admin[]> => {
    return await apiGet<Admin[]>(API_ENDPOINTS.ADMIN.BASE);
  },

  // 관리자 생성
  createAdmin: async (newAdmin: Omit<Admin, "memberId" | "createdAt" | "updatedAt" | "announcements" | "academies">): Promise<Admin> => {
    return await apiPost<Admin>(API_ENDPOINTS.ADMIN.BASE, newAdmin);
  },

  // 관리자 수정
  updateAdmin: async (adminId: number, updatedAdmin: Admin): Promise<Admin> => {
    return await apiPut<Admin>(API_ENDPOINTS.ADMIN.BY_ID(adminId), updatedAdmin);
  },

  // 관리자 삭제
  deleteAdmin: async (adminId: number): Promise<void> => {
    await apiDelete<void>(API_ENDPOINTS.ADMIN.BY_ID(adminId));
  },

  // 특정 학원의 관리자들 조회
  getAdminsByAcademy: async (academyId: number): Promise<Admin[]> => {
    return await apiGet<Admin[]>(`${API_ENDPOINTS.ADMIN.BASE}?academyId=${academyId}`);
  },
}; 