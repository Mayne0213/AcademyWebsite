import { Student } from "@/entities/student/model/index"; 
import { UserInfo } from "@/entities/user/model/types";

// 공지 엔티티
export interface QnABoard  {
  qnaId: number;
  qnaTitle: string;
  qnaContent: string;
  qnaImageUrl?: string;
  qnaUserId: number;
  qnaComments: QnABoardComment[];
  qnaStudent: Student; 
  createdAt: Date;
  updatedAt: Date;
}

export interface QnABoardComment {
  commentId: number;
  commentContent: string;
  commentUserId: number;
  qnaId: number;
  qnaCommentUser: UserInfo;
  qnaCommentQna: QnABoard;
  createdAt: Date;
  updatedAt: Date;
}

// 공지 배열
export interface QnABoardState {
  qnas: QnABoard[];
  isLoading: boolean;
  error: string | null;
}

// 공지 기본 타입
export interface QnABoardBasicActions {
  readQnABoards: (qnaBoards: QnABoard[]) => void;
  createQnABoard: (qnaBoard: QnABoard) => void;
  updateQnABoard: (updatedQnABoard: QnABoard) => void;
  deleteQnABoard: (qnaId: number) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
  clearError: () => void;
}

// 공지 업데이트 요청 타입
export interface UpdateQnABoardRequest {
  qnaTitle?: string;
  qnaContent?: string;
  qnaImageUrl?: string;
  qnaUserId?: number;
  updatedAt: Date;
}