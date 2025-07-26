import { Academy } from "@/shared/types/entities";
import { 
  PaginationParams, 
  PaginationResponse, 
  FilterOptions, 
  SortDirection,
  FormState
} from "@/shared/types/common";

// 학원 생성 요청 타입
export interface CreateAcademyRequest {
  academyName: string;
  academyPhone: string;
  academyAddress: string;
  academyMainImage?: string;
}

// 학원 업데이트 요청 타입
export interface UpdateAcademyRequest {
  academyId: number;
  academyName?: string;
  academyPhone?: string;
  academyAddress?: string;
  academyMainImage?: string;
}

// 학원 필터 타입
export interface AcademyFilter extends FilterOptions {}

// 학원 정렬 타입
export interface AcademySort {
  field: 'academyName' | 'createdAt';
  direction: SortDirection;
}

// 학원 페이지네이션 타입
export interface AcademyPagination extends PaginationParams {}

// 학원 목록 응답 타입 
export interface AcademyListResponse extends PaginationResponse<Academy> {
  academies: Academy[];
  filters: AcademyFilter;
  sort: AcademySort;
}

// 학원 이미지 업로드 요청 타입
export interface AcademyImageUploadRequest {
  academyId: number;
  imageFile: File;
  imageName?: string;
}

// 학원 상태 타입
export interface AcademyState extends FormState {
  selectedAcademy: Academy | null;
}