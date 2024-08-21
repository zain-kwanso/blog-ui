import { useState } from "react";
import axiosInstance from "../axiosInstance";
import { url } from "../utils/API";

const useFetchPost = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const [post, setPost] = useState();

  const fetchPost = async (postId) => {
    setLoading(true);
    setError(null);
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
