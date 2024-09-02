import { useState } from "react";
import axiosInstance from "../axiosInstance";
import { url } from "../utils/API";
import { PostFormData } from "src/types/post";

const useDeletePost = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const deletePost = async (postId: number): Promise<void> => {
    try {
      setLoading(true);
      setError("");
      await axiosInstance.delete<PostFormData>(`${url.posts}/${postId}`);
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
