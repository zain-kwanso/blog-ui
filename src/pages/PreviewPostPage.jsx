import React, { useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import PostContent from "../components/PostContent";
import CommentsSection from "../components/CommentsSection";
import useFetchPost from "../hooks/useFetchPost";
import useFetchComments from "../hooks/useFetchComments";
import useCreateComment from "../hooks/useCreateComment";
import useDeleteComment from "../hooks/useDeleteComment";
import { AuthContext } from "../context/authContext";

const PreviewPostPage = () => {
  const { postId } = useParams();
  const { fetchPost, post } = useFetchPost();
  const { comments, fetchComments, loading, error } = useFetchComments();
  const { user } = useContext(AuthContext);
  const { createComment } = useCreateComment();
  const { deleteComment } = useDeleteComment();

  useEffect(() => {
    fetchPost(postId);
    fetchComments(postId);
  }, [postId]);

  const handleAddComment = async (newComment) => {
    if (newComment.trim() === "") return;
    try {
      await createComment(newComment, postId);
      fetchComments(postId);
      toast.success("Comment added successfully.");
    } catch (error) {
      console.error("Error adding comment:", error);
      toast.error("Failed to add comment.");
    }
  };

  const handleAddReply = async (replyComment, parentId) => {
    if (replyComment[parentId]?.trim() === "") return;
    try {
      await createComment(replyComment[parentId], post.id, parentId);
      fetchComments(postId);
      toast.success("Reply added successfully.");
    } catch (error) {
      console.error("Error adding reply:", error);
      toast.error("Failed to add reply.");
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      await deleteComment(commentId);
      fetchComments(postId);
      toast.success("Comment deleted successfully.");
    } catch (error) {
      console.error("Error deleting comment:", error);
      toast.error("Failed to delete comment.");
    }
  };

  return (
    <>
      <div className="w-full max-w-4xl mx-auto py-8 px-4 md:px-6">
        {post ? (
          <>
            <PostContent post={post} />
            <CommentsSection
              comments={comments}
              user={user}
              handleAddComment={handleAddComment}
              handleDeleteComment={handleDeleteComment}
              handleAddReply={handleAddReply}
              loading={loading}
              error={error}
            />
          </>
        ) : (
          <div className="text-center text-red-500">
            <h2>Post not found</h2>
            <p>
              Sorry, the post you are looking for does not exist or has been
              removed.
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default PreviewPostPage;
