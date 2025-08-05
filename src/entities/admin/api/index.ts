import { Admin } from "@/src/entities/admin/model/types";
import { apiGet, apiPost, apiPut, apiDelete } from "@/src/shared/api/http";
import { API_ENDPOINTS } from "@/src/shared/config/api";
import { ADMIN_VALIDATION } from "@/src/entities/admin/model/validation";
import { toast } from "sonner";

// 관리자 API 관련 함수들
export const adminApi = {
  // 모든 관리자 조회
  getAdmins: async (): Promise<Admin[]> => {
    try {
      return await apiGet<Admin[]>(API_ENDPOINTS.ADMIN.BASE);
    } catch (error) {
      throw error;
    }
  },

  // 관리자 생성 (간단한 validation)
  createAdmin: async (newAdmin: Omit<Admin, "memberId" | "createdAt" | "updatedAt" | "announcements" | "academies">): Promise<Admin> => {
    try {
      ADMIN_VALIDATION.validateAdminForCreate(newAdmin);

      const result = await apiPost<Admin>(API_ENDPOINTS.ADMIN.BASE, newAdmin);
      toast.success("관리자가 성공적으로 생성되었습니다.");

      return result;
    } catch (error) {
      if (error instanceof Error && error.message.includes("validation")) {
        toast.error("입력 정보를 확인해주세요.");
      }
      throw error;
    }
  },

  // 관리자 수정 (간단한 validation)
  updateAdmin: async (adminId: number, updatedAdmin: Admin): Promise<Admin> => {
    try {
      ADMIN_VALIDATION.validateAdminForUpdate(updatedAdmin);

      const result = await apiPut<Admin>(API_ENDPOINTS.ADMIN.BY_ID(adminId), updatedAdmin);
      toast.success("관리자 정보가 성공적으로 수정되었습니다.");

      return result;
    } catch (error) {
      if (error instanceof Error && error.message.includes("validation")) {
        toast.error("입력 정보를 확인해주세요.");
      }
      throw error;
    }
  },

  // 관리자 삭제
  deleteAdmin: async (adminId: number): Promise<number> => {
    try {
      await apiDelete<void>(API_ENDPOINTS.ADMIN.BY_ID(adminId));
      toast.success("관리자가 성공적으로 삭제되었습니다.");

      return adminId;
    } catch (error) {
      throw error;
    }
  },
};