import { useState } from "react";
import axiosInstance from "../axiosInstance";
import { url } from "../utils/API";
import { Post } from "../types/post";

const useFetchPost = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [post, setPost] = useState<Post | null>(null);

  const fetchPost = async (postId: number) => {
    setLoading(true);
    setError("");
    try {
      const response = await axiosInstance.get(`${url.posts}/${postId}`);
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