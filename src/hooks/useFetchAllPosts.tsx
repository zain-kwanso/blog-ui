import { useState, useEffect } from "react";
import axiosInstance from "../axiosInstance";
import { url } from "../utils/API";
import { PostsResponse, Post, Pagination } from "../types/post";

const useFetchAllPosts = () => {
  // Type the state for posts as an array of Post
  const [posts, setPosts] = useState<Post[]>([]);
  // Type the state for loading
  const [loading, setLoading] = useState<boolean>(true);
  // Type the state for error
  const [error, setError] = useState<string>("");
  // Type the state for pagination using the Pagination interface
  const [pagination, setPagination] = useState<Pagination>({
    currentPage: 1,
    totalPages: 1,
    nextPageUrl: null,
    previousPageUrl: null,
  });

  const fetchAllPosts = async ({
    pageUrl = url.posts,
    page = 1,
    limit = 10,
    search = "",
  }: {
    pageUrl?: string;
    page?: number;
    limit?: number;
    search?: string;
  }) => {
    setError("");
    setLoading(true);
    setPosts([]); // Clear the posts state before fetching

    try {
      const response = await axiosInstance.get<PostsResponse>(
        `${pageUrl}?page=${page}&limit=${limit}&search=${search}`
      );

      const data = response.data;
      setPosts(data.posts); // Set the posts state with the fetched data
      setPagination({
        currentPage: data.pagination.currentPage,
        totalPages: data.pagination.totalPages,
        nextPageUrl: data.pagination.nextPageUrl,
        previousPageUrl: data.pagination.previousPageUrl,
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
  }: {
    pageUrl?: string;
    page?: number;
    limit?: number;
    search?: string;
  }) => {
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
