import { useState } from "react";
import axiosInstance from "../axiosInstance";
import { url } from "../utils/API";
import { CommentData, CommentResponse } from "../types/comment";
import { AxiosResponse } from "axios";

export const useCreateComment = () => {
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");

  const createComment = async (
    content: string,
    postId: number,
    parentId: number | null = null
  ): Promise<CommentResponse> => {
    try {
      const data: CommentData = parentId
        ? { content, PostId: postId, ParentId: parentId }
        : { content, PostId: postId };
      const response = await axiosInstance.post<
        CommentResponse,
        AxiosResponse<CommentResponse>,
        CommentData
      >(`${url.comments}/create`, data);
      setSuccess("Comment created successfully!");
      return response.data;
    } catch (err) {
      setError("Failed to create comment.");
      throw err;
    }
  };

  return { createComment, error, success };
};

export default useCreateComment;
