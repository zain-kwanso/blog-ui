import { useState } from "react";
import axiosInstance from "../axiosInstance";
import { url } from "../utils/API";
import {
  PostsResponse,
  Post,
  Pagination,
  FetchPostsArgs,
  UseFetchAllPosts,
} from "../types/post";
import axios, { AxiosResponse } from "axios";

const useFetchAllPosts = (): UseFetchAllPosts => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const [error, setError] = useState<string>("");
  const [pagination, setPagination] = useState<Pagination>({
    currentPage: 1,
    totalPages: 1,
  });

  const fetchAllPosts = async ({
    pageUrl = url.posts,
    page = 1,
    limit = 10,
    search = "",
  }: FetchPostsArgs): Promise<void> => {
    setError("");
    setLoading(true);
    setPosts([]);

    try {
      console.log("fetch posts");
      const response = await axiosInstance.get<
        PostsResponse,
        AxiosResponse<PostsResponse>
      >(`${pageUrl}?page=${page}&limit=${limit}&search=${search}`);

      const data = response.data;
      setPosts(data.posts);
      setPagination({
        currentPage: data.pagination.currentPage,
        totalPages: data.pagination.totalPages,
      });
    } catch (error) {
      console.log(error);
      setError("Failed to fetch posts");
    } finally {
      setLoading(false);
    }
  };

  const fetchUserPosts = async ({
    pageUrl = url.user_posts,
    page = 1,
    limit = 10,
    search = "",
  }: FetchPostsArgs): Promise<void> => {
    fetchAllPosts({
      pageUrl: pageUrl,
      page: page,
      limit: limit,
      search: search,
    });
  };

  return { posts, pagination, loading, fetchAllPosts, fetchUserPosts, error };
};

export default useFetchAllPosts;
