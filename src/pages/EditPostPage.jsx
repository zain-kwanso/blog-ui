import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { postValidationSchema } from "../validation/validationSchema";
import useEditPost from "../hooks/useEditPost";
import useFetchPost from "../hooks/useFetchPost";
import useCustomNavigation from "../hooks/useCustomNavigation";

const EditPostPage = () => {
  const { navigateToPreviewPostPage } = useCustomNavigation();
  const { editPost } = useEditPost();
  const { fetchPost, post } = useFetchPost();
  const { postId } = useParams();
  const [isFirstSubmit, setIsFirstSubmit] = useState(true);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    setError,
    clearErrors,
  } = useForm({
    resolver: yupResolver(postValidationSchema),
    mode: "onChange",
    reValidateMode: "onChange",
  });

  useEffect(() => {
    fetchPost(postId);
  }, [postId]);

  useEffect(() => {
    if (post) {
      setValue("title", post?.title || "");
      setValue("content", post?.content || "");
    }
  }, [post]);

  const onSubmit = async (data) => {
    if (isFirstSubmit) {
      setIsFirstSubmit(false);
    }

    clearErrors();

    try {
      await editPost(postId, data);
      toast.success("Post updated successfully!");
      navigateToPreviewPostPage(postId);
    } catch (error) {
      setError("api", {
        type: "manual",
        message: "An error occurred during post update",
      });
      toast.error("An error occurred during post update");
    }
  };

  return (
    <div className="pt-16 py-2 px-2 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-3xl border w-full">
        <h2 className="text-xl font-bold mb-4">Edit Post</h2>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-3">
              Title
            </label>
            <input
              type="text"
              {...register("title")}
              className={`w-full p-4 border rounded-lg ${
                errors.title && !isFirstSubmit
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
            />
            {(errors.title || (!isFirstSubmit && errors.title)) && (
              <p className="text-red-500 text-sm mt-1">
                {errors.title?.message}
              </p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-3">
              Content
            </label>
            <textarea
              {...register("content")}
              className={`w-full px-3 py-2 border rounded-lg ${
                errors.content && !isFirstSubmit
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
              rows="10"
            />
            {(errors.content || (!isFirstSubmit && errors.content)) && (
              <p className="text-red-500 text-sm mt-1">
                {errors.content?.message}
              </p>
            )}
          </div>

          <div className="flex gap-4 justify-end font-medium">
            <button
              type="submit"
              className="bg-purple-500 text-white py-2 px-4 rounded-lg"
            >
              Update Post
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditPostPage;
