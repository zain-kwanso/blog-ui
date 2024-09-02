import { useState } from "react";
import axiosInstance from "../axiosInstance";
import { url } from "../utils/API";
import { PostFormData, Post } from "src/types/post";

const useCreatePost = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("null");

  const createPost = async (data: PostFormData): Promise<Post> => {
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      const response = await axiosInstance.post(`${url.posts}/create`, data);
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
