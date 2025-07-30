import { Announcement } from "@/components/type/announcementType";
import { Student } from "@/entities/student/model";
import { Admin } from "@/entities/admin/model";

// 학원 엔티티
export interface Academy  {
  academyId: number;
  academyName: string;
  academyPhone: string;
  academyAddress: string;
  academyMainImage: string;
  academyImages: AcademyImage[];
  academyStudents: Student[];
  academyAdmins: Admin[];
  academyAnnouncements: Announcement[];
  createdAt: Date;
  updatedAt: Date;
}

export interface AcademyImage {
  academyImageId: number;
  academyImageUrl: string;
  academyImageName?: string;
  createdAt: Date;
  academyId: number;
  academy: Academy;
}

// 학원 배열
export interface AcademyState {
  academies: Academy[];
  isLoading: boolean;
  error: string | null;
}

// 학원 기본 타입
export interface AcademyBasicActions {
  readAcademies: (academies: Academy[]) => void;
  createAcademy: (academy: Academy) => void;
  updateAcademy: (updatedAcademy: Academy) => void;
  deleteAcademy: (academyId: number) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
  clearError: () => void;
}

// 학원 업데이트 요청 타입
export interface UpdateAcademyRequest {
  academyName?: string;
  academyPhone?: string;
  academyAddress?: string;
  academyMemo?: string;
  academyMainImage?: string;
  updatedAt: Date;
}