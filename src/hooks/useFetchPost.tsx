import { useState } from "react";
import axiosInstance from "../axiosInstance";
import { url } from "../utils/API";
import { Post, UseFetchPost } from "../types/post";
import axios, { AxiosResponse } from "axios";

const useFetchPost = (): UseFetchPost => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [post, setPost] = useState<Post | null>(null);

  const fetchPost = async (postId: number): Promise<void> => {
    setLoading(true);
    setError("");
    try {
      const response = await axiosInstance.get<Post, AxiosResponse<Post>>(
        `${url.posts}/${postId}`
      );
      setPost(response.data);
    } catch (err) {
      setError("Failed to load post");
    } finally {
      setLoading(false);
    }
  };

  return { fetchPost, post, loading, error };
};

export default useFetchPost;
