export interface PostFormData {
  title: string;
  content: string;
}

export interface Post extends PostFormData {
  id: number;
  UserId: number;
  createdAt: string;
  updatedAt: string;
  authorName?: string;
}

export interface Pagination {
  currentPage: number;
  totalPages: number;
  nextPageUrl: string | null;
  previousPageUrl: string | null;
}

export interface PostsResponse {
  posts: Post[];
  pagination: Pagination;
}

export interface UseDeletePost {
  deletePost: (postId: number) => Promise<void>;
  loading: boolean;
  error: string;
}

export interface FetchPostsArgs {
  pageUrl?: string;
  page?: number;
  limit?: number;
  search?: string;
}

export interface UseFetchAllPosts {
  posts: Post[];
  pagination: Pagination;
  loading: boolean;
  fetchAllPosts: (args: FetchPostsArgs) => Promise<void>;
  fetchUserPosts: (args: FetchPostsArgs) => Promise<void>;
  error: string;
}

export interface UseFetchPost {
  fetchPost: (postId: number) => Promise<void>;
  post: Post | null;
  loading: boolean;
  error: string;
}

export interface UseEditPost {
  editPost: (postId: number, postData: PostFormData) => Promise<void>;
  loading: boolean;
  error: string;
  success: string;
}

export interface UseCreatePost {
  createPost: (data: PostFormData) => Promise<Post>;
  loading: boolean;
  error: string;
  success: string;
}

export type DeleteEditResponse = {
  message: string;
};
