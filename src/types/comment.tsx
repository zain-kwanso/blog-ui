import { UserForComment } from "./user";

export interface CommentData {
  content: string;
  PostId: number;
  ParentId?: number | null;
}

export interface CommentResponse extends CommentData {
  id: number;
  UserId: number;
  createdAt: string;
  updatedAt: string;
  User: UserForComment;
  replies: CommentResponse[];
}

export interface ReplyComment {
  [key: number]: string | null;
}

export type CommentList = CommentResponse[];
