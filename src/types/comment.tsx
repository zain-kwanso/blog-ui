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

export interface UseCreateComment {
  createComment: (
    content: string,
    postId: number,
    parentId?: number
  ) => Promise<CommentResponse>;
  error: string;
  success: string;
}

export interface UseDeleteComment {
  deleteComment: (commentId: number) => Promise<void>;
  error: string;
}

export interface UseFetchComments {
  comments: CommentList;
  loading: boolean;
  error: string;
  fetchComments: (postId: number) => Promise<void>;
}
