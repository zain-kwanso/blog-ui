import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import postValidationSchema from "../validation/postValidationSchema";
import useCreatePost from "../hooks/useCreatePost";

const CreatePostPage = () => {
  const { createPost } = useCreatePost();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
  } = useForm({
    resolver: yupResolver(postValidationSchema),
    mode: "onBlur",
    reValidateMode: "onChange",
  });

  const onSubmit = async (data) => {
    clearErrors();

    try {
      const post = await createPost(data);
      toast.success("Post created successfully!");
      navigate(`/post/${post?.id}/preview`);
    } catch (error) {
      setError("api", {
        type: "manual",
        message:  "An error occurred during post creation",
      });
      toast.error( "An error occurred during post creation");
    }
  };

  return (
    <div className="flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-3xl border w-full">
        <h2 className="text-xl font-bold mb-4">Create New Post</h2>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-3">
              Title
            </label>
            <input
              type="text"
              {...register("title")}
              className={`w-full p-4 border outline-purple-500 rounded-lg ${
                errors.title ? "border-red-500" : ""
              }`}
            />
            {errors.title && (
              <p className="text-red-500 text-sm mt-1">
                {errors.title.message}
              </p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-3">
              Content
            </label>
            <textarea
              {...register("content")}
              className={`w-full px-3 py-2 border outline-purple-500 rounded-lg ${
                errors.content ? "border-red-500" : ""
              }`}
              rows="10"
            />
            {errors.content && (
              <p className="text-red-500 text-sm mt-1">
                {errors.content.message}
              </p>
            )}
          </div>
          
          <div className="flex gap-4 justify-end font-medium">
            <button
              type="submit"
              className="bg-purple-500 text-white py-2 px-4 rounded-lg"
            >
              Create Post
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePostPage;
