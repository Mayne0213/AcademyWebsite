// 교재 카테고리 타입
export type TextbookCategory =
  | 'LISTENING'     // 듣기파일
  | 'MATERIAL'      // 수업교재
  | 'WEEKLY_TEST'   // 주간테스트
  | 'PPT'           // PPT
  | 'ETC'           // 기타자료
  | 'ASSISTANT';    // 조교자료

// 카테고리 표시 이름
export const TEXTBOOK_CATEGORY_LABELS: Record<TextbookCategory, string> = {
  LISTENING: '듣기파일',
  MATERIAL: '수업교재',
  WEEKLY_TEST: '주간테스트',
  PPT: 'PPT',
  ETC: '기타자료',
  ASSISTANT: '조교자료',
};

// 교재 엔티티
export interface Textbook {
  textbookId: number;
  textbookName: string;   // 원본 파일명
  fileName: string;       // S3 Key
  fileType: string;
  fileSize?: number;
  isImportant: boolean;
  category: TextbookCategory;
  createdAt: Date;
  updatedAt: Date;
}

// 교재 상태
export interface TextbookState {
  textbooks: Textbook[];
  isLoading: boolean;
}

// 교재 기본 액션
export interface TextbookBasicActions {
  readTextbooks: (textbooks: Textbook[]) => void;
  getTextbook: (textbook: Textbook) => void;
  createTextbook: (textbook: Textbook) => void;
  updateTextbook: (updatedTextbook: Textbook) => void;
  deleteTextbook: (textbookId: number) => void;
  setLoading: (isLoading: boolean) => void;
}

// 교재 생성 요청 타입
export interface CreateTextbookRequest {
  textbookName: string;
  fileName: string;
  fileType: string;
  fileSize?: number;
  isImportant: boolean;
  category: TextbookCategory;
}

// 교재 업데이트 요청 타입
export interface UpdateTextbookRequest {
  textbookName?: string;
  isImportant?: boolean;
  category?: TextbookCategory;
}
