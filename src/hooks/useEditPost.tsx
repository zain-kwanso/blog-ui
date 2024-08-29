import { useState } from "react";
import axiosInstance from "../axiosInstance";
import { url } from "../utils/API";
import { Post } from "src/types/post";

const useEditPost = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const editPost = async (postId: number, postData: Partial<Post>) => {
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      const response = await axiosInstance.put(
        `${url.posts}/${postId}`,
        postData
      );
      setSuccess("Post updated successfully!");
      return response.data;
    } catch (err) {
      setError("Failed to update the post. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return { editPost, loading, error, success };
};

export default useEditPost;
