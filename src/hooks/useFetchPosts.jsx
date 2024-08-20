import { useState, useEffect } from "react";
import axiosInstance from "../axiosInstance";
import { useError } from "./useError";
import { url } from "../utils/API";

const useFetchPosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useError();
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    nextPageUrl: null,
    prevPageUrl: null,
  });

  const fetchAllPosts = async ({
    pageUrl = url.posts,
    page = 1,
    limit = 9,
    search = "",
  }) => {
    setError(null);
    setLoading(true);
    setPosts([]);
    console.log(pageUrl);

    try {
      const response = await axiosInstance.get(
        `${pageUrl}page=${page}&limit=${limit}&search=${search}`
      );

      const data = response.data;
      setPosts(data.posts);
      setPagination({
        currentPage: data.pagination?.currentPage || pagination.currentPage,
        totalPages: data.pagination?.totalPages || pagination.totalPages,
        nextPageUrl: data.pagination?.nextPageUrl || pagination.nextPageUrl,
        prevPageUrl: data.pagination?.previousPageUrl || pagination.prevPageUrl,
      });
    } catch (error) {
      setError(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchUserPosts = async (pageUrl = url.user_posts) => {
    fetchAllPosts(pageUrl);
  };

  return { posts, pagination, loading, fetchAllPosts, fetchUserPosts, error };
};

export default useFetchPosts;