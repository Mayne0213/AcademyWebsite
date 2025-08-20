import { Announcement } from "@/src/entities/announcement/model/types";
import { Academy } from "@/src/entities/academy/model/types";
import { UserInfo } from "@/src/entities/user/model/types";

// 관리자 요약 정보 (목록용)
export interface AdminSummary {
  memberId: number;
  adminName: string;
  adminPosition: string;
}

// 관리자 엔티티 (상세 정보)
export interface Admin extends UserInfo {
  adminName: string;
  adminPhone: string;
  adminPosition: string;
  adminMemo?: string;
  announcements: Announcement[];
  academies: Academy[];
}

// 관리자 상태
export interface AdminState {
  admins: (Admin | AdminSummary)[];
  isLoading: boolean;
}

// 관리자 기본 액션
export interface AdminBasicActions {
  readAdminSummaries: (adminSummaries: AdminSummary[]) => void;
  readAdmins: (admins: Admin[]) => void;
  getAdminSummary: (adminSummary: AdminSummary) => void;
  getAdmin: (admin: Admin) => void;
  createAdmin: (admin: Admin) => void;
  updateAdmin: (updatedAdmin: Admin) => void;
  deleteAdmin: (adminId: number) => void;
  setLoading: (isLoading: boolean) => void;
}

// 관리자 생성 요청 타입
export interface CreateAdminRequest {
  userId: string;
  userPassword: string;
  userCheckPassword: string;
  adminName: string;
  adminPhone: string;
  adminPosition: string;
  role: string;
}

// 관리자 업데이트 요청 타입
export interface UpdateAdminRequest {
  adminName?: string;
  adminPhone?: string;
  adminPosition?: string;
  adminMemo?: string;
  userPassword?: string;
} 