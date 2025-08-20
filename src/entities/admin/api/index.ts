import { Admin, AdminSummary } from "@/src/entities/admin/model/types";
import { apiGet, apiPost, apiPut, apiDelete } from "@/src/shared/api/http";
import { API_ENDPOINTS } from "@/src/shared/config/api";
import { toast } from "sonner";

// 관리자 API 관련 함수들
export const adminApi = {
  // 1. 간략한 정보만을 불러오는 함수
  readAdminSummaries: async (): Promise<AdminSummary[]> => {
    try {
      return await apiGet<AdminSummary[]>(`${API_ENDPOINTS.ADMIN.BASE}?type=summary`);
    } catch (error) {
      throw error;
    }
  },

  // 2. 디테일한 개인의 정보를 전부 불러오는 함수
  readAdmins: async (): Promise<Admin[]> => {
    try {
      return await apiGet<Admin[]>(`${API_ENDPOINTS.ADMIN.BASE}?type=detail`);
    } catch (error) {
      throw error;
    }
  },

  // 3. adminId를 받아서 해당하는 개인의 간략한 정보만을 불러오는 함수
  getAdminSummary: async (adminId: number): Promise<AdminSummary> => {
    try {
      return await apiGet<AdminSummary>(`${API_ENDPOINTS.ADMIN.BASE}/${adminId}?type=summary`);
    } catch (error) {
      throw error;
    }
  },

  // 4. adminId를 받아서 해당하는 개인의 디테일한 정보를 불러오는 함수
  getAdmin: async (adminId: number): Promise<Admin> => {
    try {
      return await apiGet<Admin>(`${API_ENDPOINTS.ADMIN.BASE}/${adminId}?type=detail`);
    } catch (error) {
      throw error;
    }
  },

  // 관리자 생성 (전체 정보 반환)
  createAdmin: async (newAdmin: any): Promise<Admin> => {
    try {
      const result = await apiPost<any>(API_ENDPOINTS.ADMIN.BASE, newAdmin);
      toast.success("관리자가 성공적으로 생성되었습니다.");

      // API 응답을 Admin 형식으로 반환
      return result;
    } catch (error) {
      throw error;
    }
  },

  // 관리자 수정
  updateAdmin: async (adminId: number, updatedAdmin: any): Promise<Admin> => {
    try {
      const result = await apiPut<any>(`${API_ENDPOINTS.ADMIN.BASE}?memberId=${adminId}`, updatedAdmin);
      toast.success("관리자 정보가 성공적으로 수정되었습니다.");

      // 업데이트된 관리자 정보를 반환 (실제로는 다시 조회해야 할 수도 있음)
      return result;
    } catch (error) {
      throw error;
    }
  },

  // 관리자 삭제
  deleteAdmin: async (adminId: number): Promise<number> => {
    try {
      await apiDelete<void>(`${API_ENDPOINTS.ADMIN.BASE}?memberId=${adminId}`);
      toast.success("관리자가 성공적으로 삭제되었습니다.");

      return adminId;
    } catch (error) {
      throw error;
    }
  },
};