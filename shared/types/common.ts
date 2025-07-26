// 기본 엔티티 인터페이스
export interface BaseEntity {
  id: number;
  createdAt: string;
  updatedAt: string;
}

// From Clients to Server ex) 2pages, 10items to show.
export interface PaginationParams {
  page: number;
  pageSize: number;
}

// From Server to Client ex) 2pages, 10items to show? OK. I'll return datas<T> and totalCount, totalPages.
export interface PaginationResponse<T> extends PaginationParams {
  data: T[];
  totalCount: number;
  totalPages: number;
}

// File Types
export interface FileItem {
  url: string;
  name: string;
  type: string;
}

// User Role Types
export type UserRole = "STUDENT" | "ADMIN" | "DEVELOPER";

// Sort Direction Types
export type SortDirection = "asc" | "desc";

// Filter Options Types
export interface FilterOptions {
  search?: string;
  sortBy?: string;
  sortDirection?: SortDirection;
  category?: string;
}

// API Response Types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

// API Error Types
export interface ApiError {
  message: string;
  code?: string;
  details?: any;
}

// Form State Types
export interface FormState {
  isLoading: boolean;
  isSubmitting: boolean;
  error?: string;
  success?: string;
}

// Modal State Types
export interface ModalState {
  isOpen: boolean;
  data?: any;
}

// Selection State Types
export interface SelectionState {
  selectedItems: number[];
  isAllSelected: boolean;
}

// Date Range Types
export interface DateRange {
  startDate: string;
  endDate: string;
}

// Search Params Types
export interface SearchParams {
  query?: string;
  filters?: Record<string, any>;
  sort?: {
    field: string;
    direction: SortDirection;
  };
  pagination?: PaginationParams;
} 