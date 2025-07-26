import { BaseEntity, UserRole, FileItem } from "./common";

// 사용자 정보 엔티티
export interface UserInfo {
  name: string;
  userId: string;
  memberId: number;
  role: UserRole;
}

// 학생 엔티티
export interface Student extends BaseEntity {
  memberId: number;
  academyId: number;
  studentName: string;
  studentPhone: string;
  studentHighschool: string;
  studentBirthYear: number;
  studentMemo?: string;
}

// 학원 엔티티
export interface Academy extends BaseEntity {
  academyId: number;
  academyName: string;
  academyPhone: string;
  academyAddress: string;
  academyMainImage?: string;
  images: FileItem[];
  mainImageUrl?: string;
}

// 공지사항 엔티티
export interface Announcement extends BaseEntity {
  announcementId: number;
  title: string;
  content?: string; // 목록에서는 선택적
  authorId: number;
  isItAssetAnnouncement: boolean;
  isItImportantAnnouncement: boolean;
  files?: FileItem[]; // 목록에서는 선택적
  academies?: {
    academyId: number;
    academyName: string;
  }[];
  author?: {
    adminName: string;
  };
}

// QnA 엔티티
export interface Qna extends BaseEntity {
  qnaId: number;
  qnaTitle: string;
  qnaContent: string; //이것도 목록에서는 선택적이어야함
  qnaImageUrl: string | null;
  qnaUserId: number;
  comments?: QnaComment[];

  user?: { //누가 썼는지는 필수로 들어가야함
    memberId: number;
    userId: string;
    role: UserRole;
    student?: {
      studentName: string;
    };
  };
}

// QnA 댓글 엔티티
export interface QnaComment extends BaseEntity {
  commentId: number;
  commentContent: string;
  commentMemberId: number;
  qnaId: number;
  user: any; // UserInfo 타입으로 변경 필요
}

// 교재 엔티티
export interface Textbook extends BaseEntity {
  textbookId: number;
  textbookName: string;
  category: string;
  favorite?: boolean;
}

// 출석 엔티티
export interface Attendance extends BaseEntity {
  attendanceId: number;
  studentId: number;
  academyId: string;
  attendanceDate: string;
  attendanceStatus: string;
}

// 관리자 엔티티
export interface Admin extends BaseEntity {
  adminId: number;
  adminName: string;
  adminPhone: string;
  adminEmail?: string;
}

// 파일 엔티티
export interface FileEntity extends BaseEntity {
  fileId: number;
  originalName: string;
  key: string;
  fileType: string;
  size: number;
  url: string;
}

// 학원 이미지 엔티티
export interface AcademyImage extends BaseEntity {
  academyImageId: number;
  academyId: number;
  academyImageUrl: string;
  academyImageName: string;
}

// 공지사항 파일 엔티티
export interface AnnouncementFile extends BaseEntity {
  announcementFileId: number;
  announcementId: number;
  key: string;
  originalName: string;
  fileType: string;
} 