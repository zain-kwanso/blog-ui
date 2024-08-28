import { useState, useEffect } from "react";
import axiosInstance from "../axiosInstance";
import { url } from "../utils/API";

const useFetchAllPosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const [pagination, setPagination] = useState({
    currentPage: null,
    totalPages: null,
    nextPageUrl: null,
    prevPageUrl: null,
  });

  const fetchAllPosts = async ({
    pageUrl = url.posts,
    page = 1,
    limit = 10,
    search = "",
  }) => {
    setError(null);
    setLoading(true);
    setPosts([]);
    // console.log(pageUrl);

    try {
      const response = await axiosInstance.get(
        `${pageUrl}?page=${page}&limit=${limit}&search=${search}`
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
