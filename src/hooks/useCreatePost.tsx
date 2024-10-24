import { useState } from "react";
import axiosInstance from "../axiosInstance";
import { url } from "../utils/API";
import { PostFormData, Post, UseCreatePost } from "src/types/post";
import { Identity } from "src/types/generic";
import { AxiosResponse } from "axios";

const useCreatePost = (): UseCreatePost => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");

  const createPost = async (data: Identity<PostFormData>): Promise<Post> => {
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      const response = await axiosInstance.post<
        Post,
        AxiosResponse<Post>,
        PostFormData
      >(`${url.posts}`, data);
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
