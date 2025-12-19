import { Student } from "@/src/entities/student/model/types";

// QnA 엔티티 (Prisma 스키마와 정확히 일치)
export interface QnABoard  {
  qnaId: number;
  qnaTitle: string;
  qnaContent: string;
  createdAt: Date;
  updatedAt: Date;
  qnaUserId: number;
  isItAnswered: boolean;
  comments: QnABoardComment[];
  files: QnAFile[];
  student: Student;
}

// QnA 상세 정보 타입 (지연 로딩용)
export interface QnADetail {
  qnaId: number;
  qnaTitle: string;
  qnaContent: string;
  createdAt: Date;
  updatedAt: Date;
  student: Student;
  comments: QnABoardComment[];
  files: QnAFile[];
}

export interface QnABoardComment {
  commentId: number;
  commentContent: string;
  studentId?: number;
  adminId?: number;
  qnaId: number;
  createdAt: Date;
  updatedAt: Date;
  student?: Student;
  admin?: {
    memberId: number;
    adminName: string;
    adminPhone: string;
    adminPosition: string;
    adminMemo?: string;
  };
  qna: QnABoard;
}

export interface QnAFile {
  fileId: number;
  qnaId: number;
  fileName: string;
  originalName: string;
  fileUrl: string;
  fileType: string;
  fileSize?: number;
  createdAt: Date;
}

// QnA 배열
export interface  QnABoardState {
  qnas: QnABoard[];
  isLoading: boolean;
}

// QnA 기본 타입
export interface QnABoardBasicActions {
  readQnABoards: (qnaBoards: QnABoard[]) => void;
  createQnABoard: (qnaBoard: QnABoard) => void;
  updateQnABoard: (updatedQnABoard: QnABoard) => void;
  deleteQnABoard: (qnaId: number) => void;
  setLoading: (isLoading: boolean) => void;
}

// 댓글 생성 요청 타입
export interface CreateCommentRequest {
  commentContent: string;
  commentMemberId: number;
  qnaId: number;
}

// QnA 생성 요청 타입
export interface CreateQnARequest {
  qnaTitle: string;
  qnaContent: string;
  qnaUserId: number;
  isItAnswered: boolean;
  files?: {
    fileId?: number;
    fileName?: string;
    originalName?: string;
    fileUrl?: string;
    fileType?: string;
    fileSize?: number;
  }[];
}

// QnA 상세 정보 상태 관리 타입
export interface QnaDetailState {
  selectedDetail: QnADetail | null;
  isDetailLoading: boolean;
}

// QnA 상세 정보 기본 액션 타입
export interface QnaDetailBasicAction {
  readDetail: (detail: QnADetail) => void;
  clearDetail: () => void;
  addComment: (comment: QnABoardComment) => void;
  removeComment: (commentId: number) => void;
  setIsDetailLoading: (isDetailLoading: boolean) => void;
}