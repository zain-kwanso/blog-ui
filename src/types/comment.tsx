import { UserForComment } from "./user";

export interface CommentData {
  content: string;
  PostId: number;
  ParentId?: number | null;
}

export interface CommentResponse {
  id: number;
  content: string;
  UserId: number;
  PostId: number;
  ParentId: number | null;
  createdAt: string;
  updatedAt: string;
  User: UserForComment;
  replies: CommentResponse[];
}

export interface ReplyComment {
  [key: number]: string | null;
}

export type CommentList = CommentResponse[];
