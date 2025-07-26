import { 
  UserRole, 
  PaginationParams, 
  PaginationResponse, 
  FilterOptions, 
  SortDirection,
  FormState,
  ApiResponse
} from "@/shared/types/common";
import { UserInfo } from "@/shared/types/entities";

// 사용자 생성 요청 타입
export interface CreateUserRequest {
  userId: string;
  userPassword: string;
  role: UserRole;
}

// 사용자 업데이트 요청 타입
export interface UpdateUserRequest {
  memberId: number;
  userId?: string;
  userPassword?: string;
  role?: UserRole;
}

// 사용자 로그인 요청 타입
export interface LoginRequest {
  userId: string;
  userPassword: string;
}

// 사용자 로그인 응답 타입 (ApiResponse 확장)
export interface LoginResponse extends ApiResponse<{ user: UserInfo; token?: string }> {}

// 사용자 상태 타입 (FormState 확장)
export interface UserState extends FormState {
  user: UserInfo | null;
  isLoggedIn: boolean;
}

// 사용자 필터 타입 (FilterOptions 확장)
export interface UserFilter extends FilterOptions {}

// 사용자 정렬 타입
export interface UserSort {
  field: 'memberId' | 'userId' | 'role' | 'createdAt';
  direction: SortDirection;
}

// 사용자 페이지네이션 타입 (PaginationParams 확장)
export interface UserPagination extends PaginationParams {
  totalCount: number;
  totalPages: number;
}

// 사용자 목록 응답 타입 (PaginationResponse 확장)
export interface UserListResponse extends PaginationResponse<UserInfo> {
  users: UserInfo[];
  filters: UserFilter;
  sort: UserSort;
}

 