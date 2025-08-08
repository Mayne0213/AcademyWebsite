import { UserInfo } from "@/src/entities/user/model/types";

export interface Qna {
  qnaId: number;
  qnaTitle: string;
  qnaContent: string;
  qnaImageUrl: string | null;
  qnaUserId: number;
  createdAt: string;
  updatedAt: string;
  comments?: QnaComment[];

  student?: {
    memberId: number;
    studentName: string;
  };
}

export interface QnaCommentFormInput {
  commentContent: string;
  commentMemberId: number;
  qnaId: number;
}

export interface QnaComment {
  user: UserInfo;
  commentId: number;
  commentContent: string;
  commentMemberId: number;
  qnaId: number;
  createdAt: string;
  updatedAt: string;
}
