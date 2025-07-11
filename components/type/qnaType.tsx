import { QnaComment } from "./qnaCommentType";

export interface Qna {
  qnaId: number;
  qnaTitle: string;
  qnaContent: string;
  qnaImageUrl: string | null;
  qnaUserId: number;
  createdAt: string;
  updatedAt: string;
  comments?: QnaComment[];

  user?: {
    memberId: number;
    userId: string;
    role: "DEVELOPER" | "ADMIN" | "STUDENT";
    student?: {
      studentName: string;
    };
  };
}

export interface QnaCommentFormInput {
  commentContent: string;
  commentMemberId: number;
  qnaId: number;
}
