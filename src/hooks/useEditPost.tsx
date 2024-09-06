import { useState } from "react";
import axiosInstance from "../axiosInstance";
import { url } from "../utils/API";
import {
  DeleteEditResponse,
  Post,
  PostFormData,
  UseEditPost,
} from "src/types/post";
import { Identity } from "src/types/generic";
import { AxiosResponse } from "axios";

const useEditPost = (): UseEditPost => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");

  const editPost = async (
    postId: number,
    postData: Identity<PostFormData>
  ): Promise<void> => {
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      await axiosInstance.put<
        DeleteEditResponse,
        AxiosResponse<DeleteEditResponse>,
        PostFormData
      >(`${url.posts}/${postId}`, postData);
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
