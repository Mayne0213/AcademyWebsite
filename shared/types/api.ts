import { ApiResponse, ApiError, FileItem } from "./common";
import {
  UserInfo,
  Student,
  Academy,
  Announcement,
  AnnouncementDetail,
  Qna,
  QnaComment,
  Textbook,
  Attendance,
} from "./entities";

// API 요청/응답 타입들

// 인증 관련 API 타입
export interface LoginRequest {
  userId: string;
  userPassword: string;
}

export interface LoginResponse extends ApiResponse<{
  user: UserInfo;
  token?: string;
}> {}

export interface SignUpRequest {
  userId: string;
  userPassword: string;
  userCheckPassword: string;
  studentName: string;
  studentPhone: string;
  studentHighschool: string;
  studentBirthYear: number;
  academyId: number;
}

export interface SignUpResponse extends ApiResponse<{
  user: UserInfo;
}> {}

// 학생 관련 API 타입
export interface StudentListResponse extends ApiResponse<Student[]> {}

export interface StudentDetailResponse extends ApiResponse<Student> {}

export interface CreateStudentRequest {
  memberId: number;
  academyId: number;
  studentName: string;
  studentPhone: string;
  studentHighschool: string;
  studentBirthYear: number;
  studentMemo?: string;
}

export interface UpdateStudentRequest extends Partial<CreateStudentRequest> {
  memberId: number;
}

// 학원 관련 API 타입
export interface AcademyListResponse extends ApiResponse<Academy[]> {}

export interface AcademyDetailResponse extends ApiResponse<Academy> {}

export interface CreateAcademyRequest {
  academyName: string;
  academyPhone: string;
  academyAddress: string;
  academyMainImage?: string;
  images?: FileItem[];
}

export interface UpdateAcademyRequest extends Partial<CreateAcademyRequest> {
  academyId: number;
}

// 공지사항 관련 API 타입
export interface AnnouncementListResponse extends ApiResponse<{
  announcements: Announcement[];
  totalCount: number;
}> {}

export interface AnnouncementDetailResponse extends ApiResponse<AnnouncementDetail> {}

export interface CreateAnnouncementRequest {
  title: string;
  content: string;
  isItAssetAnnouncement: boolean;
  isItImportantAnnouncement: boolean;
  academyIds?: number[];
  files?: FileItem[];
}

export interface UpdateAnnouncementRequest extends Partial<CreateAnnouncementRequest> {
  announcementId: number;
}

// QnA 관련 API 타입
export interface QnaListResponse extends ApiResponse<Qna[]> {}

export interface QnaDetailResponse extends ApiResponse<Qna> {}

export interface CreateQnaRequest {
  qnaTitle: string;
  qnaContent: string;
  qnaImageUrl?: string;
}

export interface UpdateQnaRequest extends Partial<CreateQnaRequest> {
  qnaId: number;
}

export interface CreateQnaCommentRequest {
  commentContent: string;
  commentMemberId: number;
  qnaId: number;
}

export interface QnaCommentResponse extends ApiResponse<QnaComment> {}

// 교재 관련 API 타입
export interface TextbookListResponse extends ApiResponse<Textbook[]> {}

export interface TextbookDetailResponse extends ApiResponse<Textbook> {}

export interface CreateTextbookRequest {
  textbookName: string;
  category: string;
  favorite?: boolean;
}

export interface UpdateTextbookRequest extends Partial<CreateTextbookRequest> {
  textbookId: number;
}

// 출석 관련 API 타입
export interface AttendanceListResponse extends ApiResponse<Attendance[]> {}

export interface AttendanceDetailResponse extends ApiResponse<Attendance> {}

export interface CreateAttendanceRequest {
  studentId: number;
  academyId: string;
  attendanceDate: string;
  attendanceStatus: string;
}

export interface UpdateAttendanceRequest extends Partial<CreateAttendanceRequest> {
  attendanceId: number;
}

// 파일 업로드 관련 API 타입
export interface UploadUrlRequest {
  fileType: string;
  folder?: string;
}

export interface UploadUrlResponse extends ApiResponse<{
  uploadUrl: string;
  key: string;
}> {}

export interface DeleteFileRequest {
  fileUrl: string;
}

export interface DeleteFileResponse extends ApiResponse<{
  success: boolean;
}> {}

// 페이지네이션 API 타입
export interface PaginatedRequest {
  page?: number;
  pageSize?: number;
  search?: string;
  sortBy?: string;
  sortDirection?: "asc" | "desc";
}

// 필터링 API 타입
export interface FilterRequest {
  isItAssetAnnouncement?: boolean;
  isItImportantAnnouncement?: boolean;
  academyId?: number;
  category?: string;
  status?: string;
  dateRange?: {
    startDate: string;
    endDate: string;
  };
}

// API 에러 응답 타입
export interface ApiErrorResponse {
  success: false;
  error: string;
  message: string;
  details?: any;
}

// API 성공 응답 타입
export interface ApiSuccessResponse<T = any> {
  success: true;
  data: T;
  message?: string;
}

// API 응답 유니온 타입
export type ApiResult<T = any> = ApiSuccessResponse<T> | ApiErrorResponse; 