import { Announcement } from "@/src/entities/announcement/model";
import { Student } from "@/src/entities/student/model";
import { Admin } from "@/src/entities/admin/model";
import type { File as FileType } from "@/src/entities/file/model/types";

// 학원 엔티티
export interface Academy  {
  academyId: number;
  academyName: string;
  academyPhone: string;
  academyAddress: string;
  academyStudents: Student[];
  academyAdmins: Admin[];
  academyAnnouncements: Announcement[];
  academyFiles: AcademyFile[];
  createdAt: Date;
  updatedAt: Date;
}

export interface AcademyFile {
  academyId: number;
  fileId: number;
  academy: Academy;
  file: FileType;
}

// 학원 배열
export interface AcademyState {
  academies: Academy[];
  isLoading: boolean;
}

// 학원 기본 타입
export interface AcademyBasicActions {
  readAcademies: (academies: Academy[]) => void;
  createAcademy: (academy: Academy) => void;
  updateAcademy: (updatedAcademy: Academy) => void;
  deleteAcademy: (academyId: number) => void;
  setLoading: (isLoading: boolean) => void;
}

// 학원 업데이트 요청 타입
export interface UpdateAcademyRequest {
  academyName?: string;
  academyPhone?: string;
  academyAddress?: string;
  academyMemo?: string;
  updatedAt: Date;
}