import { useState } from "react";
import axiosInstance from "../axiosInstance";
import { useError } from "./useError";
import { url } from "../utils/settings";

const useDeletePost = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useError();

  const deletePost = async (postId) => {
    try {
      setLoading(true);
      await axiosInstance.delete(`${API_URL.post}/${postId}`);
    } catch (error) {
      console.error("Error deleting post:", error);
      setError(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  return { deletePost, loading, error };
};

export default useDeletePost;
