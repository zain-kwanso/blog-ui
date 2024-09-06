// src/hooks/useDeleteComment.js
import { useState } from "react";
import axiosInstance from "../axiosInstance";
import { url } from "../utils/API";
import { CommentData, UseDeleteComment } from "src/types/comment";
import { AxiosResponse } from "axios";
import { DeleteEditResponse } from "src/types/post";

const useDeleteComment = (): UseDeleteComment => {
  const [error, setError] = useState<string>("");

  const deleteComment = async (commentId: number): Promise<void> => {
    try {
      await axiosInstance.delete<
        DeleteEditResponse,
        AxiosResponse<DeleteEditResponse>,
        number
      >(`${url.comments}/${commentId}`);
    } catch (err) {
      setError("Failed to delete comment");
    }
  };

  return { deleteComment, error };
};

export default useDeleteComment;
