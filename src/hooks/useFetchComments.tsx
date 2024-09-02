import { useState } from "react";
import axiosInstance from "../axiosInstance";
import { url } from "../utils/API";
import { CommentList } from "../types/comment";
import { AxiosResponse } from "axios";

const useFetchComments = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [comments, setComments] = useState<CommentList>([]);

  const fetchComments = async (postId: number): Promise<void> => {
    setLoading(true);
    setError("");
    try {
      const response = await axiosInstance.get<
        CommentList,
        AxiosResponse<CommentList>
      >(`${url.posts}/${postId}/comments`);
      setComments(response.data);
    } catch (err) {
      setError("Failed to load comments");
    } finally {
      setLoading(false);
    }
  };

  return { fetchComments, comments, loading, error };
};

export default useFetchComments;
