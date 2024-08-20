import { useState } from "react";
import axiosInstance from "../axiosInstance";
import { useError } from "./useError";
import { url } from "../utils/settings";

const useEditPost = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useError();
  const [success, setSuccess] = useState(null);

  const editPost = async (postId, postData) => {
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      const response = await axiosInstance.put(
        `${url.post}/${postId}`,
        postData
      );
      setSuccess("Post updated successfully!");
      return response.data;
    } catch (err) {
      setError("Failed to update the post. Please try again.");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { editPost, loading, error, success };
};

export default useEditPost;
