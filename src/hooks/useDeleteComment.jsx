// src/hooks/useDeleteComment.js
import { useState } from "react";
import axiosInstance from "../axiosInstance";
import { url } from "../utils/API";

const useDeleteComment = () => {
  const [error, setError] = useState(null);

  const deleteComment = async (commentId) => {
    try {
      const response = await axiosInstance.delete(
        `${url.comments}/${commentId}`
      );
      return true;
    } catch (err) {
      setError("Failed to delete comment");
    }
  };

  return { deleteComment, error };
};

export default useDeleteComment;