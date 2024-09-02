import { useState } from "react";
import axiosInstance from "../axiosInstance";
import { url } from "../utils/API";
import { PostFormData } from "src/types/post";

const useEditPost = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const editPost = async (
    postId: number,
    postData: PostFormData
  ): Promise<void> => {
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      const response = await axiosInstance.put<PostFormData>(
        `${url.posts}/${postId}`,
        postData
      );
      setSuccess("Post updated successfully!");
    } catch (err) {
      setError("Failed to update the post. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return { editPost, loading, error, success };
};

export default useEditPost;
