export interface Post {
  id?: number;
  title: string;
  content: string;
  UserId?: number;
  createdAt?: string;
  updatedAt?: string;
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
