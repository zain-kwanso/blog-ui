import { useState } from "react";
import axiosInstance from "../axiosInstance";
import { useError } from "./useError";
import { url } from "../utils/API";

const useFetchPostWithComments = (postId, refresh) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useError();

  const fetchPostWithComment = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axiosInstance.get(`${url.posts}/${postId}`);
      return response.data;
    } catch (err) {
      setError("Failed to load post");
    } finally {
      setLoading(false);
    }
  };

  return { fetchPostWithComment, loading, error };
};

export default useFetchPostWithComments;
