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
  qnaFiles: QnaFile[];
  student: Student;
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

export interface QnaFile {
  qnaId: number;
  fileId: number;
  qna: QnABoard;
  file: {
    fileId: number;
    fileName: string;
    originalName: string;
    fileUrl: string;
    fileType: string;
    fileSize?: number;
    createdAt: Date;
  };
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

// QnA 업데이트 요청 타입
export interface UpdateQnABoardRequest {
  qnaTitle?: string;
  qnaContent?: string;
  qnaUserId?: number;
  isItAnswered?: boolean;
  updatedAt: Date;
}