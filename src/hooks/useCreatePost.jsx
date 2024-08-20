import { useState } from "react";
import axiosInstance from "../axiosInstance";
import { useError } from "./useError";
import { url } from "../utils/settings";

const useCreatePost = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useError();
  const [success, setSuccess] = useState(null);

  const createPost = async (data) => {
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      const response = await axiosInstance.post(url.post, data);
      setSuccess("Post created successfully!");
      return response.data;
    } catch (err) {
      setError("Failed to create post.");

      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { createPost, loading, error, success };
};

export default useCreatePost;
