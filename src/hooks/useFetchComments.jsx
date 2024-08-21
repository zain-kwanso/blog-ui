import { useState } from "react";
import axiosInstance from "../axiosInstance";
import { url } from "../utils/API";

const useFetchComments = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const [comments, setComments] = useState(null);

  const fetchComments = async (postId) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axiosInstance.get(
        `${url.posts}/${postId}/comments`
      );
      setComments(response.data);
    } catch (err) {
      setError("Failed to load comments");
    } finally {
      setLoading(false);
    }
  };

  return { fetchComments, comments, loading, error };
};

export default useFetchComments;
