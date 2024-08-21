import { useState } from "react";
import axiosInstance from "../axiosInstance";
import { url } from "../utils/API";

const useDeletePost = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  const deletePost = async (postId) => {
    try {
      setLoading(true);
      setError(null);
      await axiosInstance.delete(`${url.posts}/${postId}`);
    } catch (error) {
      console.error("Error deleting post:", error);
      setError("Error deleting post.");
    } finally {
      setLoading(false);
    }
  };

  return { deletePost, loading, error };
};

export default useDeletePost;
