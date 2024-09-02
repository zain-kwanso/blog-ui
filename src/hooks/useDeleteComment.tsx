// src/hooks/useDeleteComment.js
import { useState } from "react";
import axiosInstance from "../axiosInstance";
import { url } from "../utils/API";
import { CommentData } from "src/types/comment";

const useDeleteComment = () => {
  const [error, setError] = useState("");

  const deleteComment = async (commentId: number): Promise<void> => {
    try {
      await axiosInstance.delete<CommentData>(`${url.comments}/${commentId}`);
    } catch (err) {
      setError("Failed to delete comment");
    }
  };

  return { deleteComment, error };
};

export default useDeleteComment;
