import { Announcement } from "@/components/type/announcementType";
import { Academy } from "@/entities/academy/model/index";
import { UserInfo } from "@/entities/user/model/types";

// 관리자 엔티티
export interface Admin extends UserInfo {
  adminName: string;
  adminPhone: string;
  adminPosition: string;
  adminMemo?: string;
  announcements: Announcement[];
  academies: Academy[];
}

// 관리자 배열
export interface AdminState {
  admins: Admin[];
  isLoading: boolean;
  error: string | null;
}

// 관리자 기본 타입
export interface AdminBasicActions {
  readAdmins: (admins: Admin[]) => void;
  createAdmin: (admin: Admin) => void;
  updateAdmin: (updatedAdmin: Admin) => void;
  deleteAdmin: (adminId: number) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
  clearError: () => void;
}

// 관리자 업데이트 요청 타입
export interface UpdateAdminRequest {
  adminName?: string;
  adminPhone?: string;
  adminPosition?: string;
  adminMemo?: string;
} 