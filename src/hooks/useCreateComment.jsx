import { useState } from "react";
import axiosInstance from "../axiosInstance";
import { url } from "../utils/API";

export const useCreateComment = () => {
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const createComment = async (content, postId, parentId = null) => {
    try {
      const data = parentId
        ? { content, PostId: postId, ParentId: parentId }
        : { content, PostId: postId };
      const response = await axiosInstance.post(`${url.comments}/create`, data);
      setSuccess("Comment created successfully!");
      return response.data;
    } catch (err) {
      if (err.response) {
        setError(err.response.data.message || "Failed to create comment.");
      } else {
        setError("Failed to create comment.");
      }
      throw err;
    }
  };

  return { createComment, error, success };
};

export default useCreateComment;
