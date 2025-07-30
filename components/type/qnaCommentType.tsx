import { UserInfo } from "@/entities/user/model/types";

export interface QnaComment {
  user: UserInfo;
  commentId: number;
  commentContent: string;
  commentMemberId: number;
  qnaId: number;
  createdAt: string;
  updatedAt: string;
}
