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
//generics
export interface PostsResponse {
  posts: Post[];
  pagination: Pagination;
}
