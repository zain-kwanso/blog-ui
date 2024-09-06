import { useState } from "react";
import axiosInstance from "../axiosInstance";
import { url } from "../utils/API";
import { DeleteEditResponse, UseDeletePost } from "src/types/post";
import { AxiosResponse } from "axios";

const useDeletePost = (): UseDeletePost => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const deletePost = async (postId: number): Promise<void> => {
    try {
      setLoading(true);
      setError("");
      await axiosInstance.delete<
        DeleteEditResponse,
        AxiosResponse<DeleteEditResponse>,
        number
      >(`${url.posts}/${postId}`);
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
