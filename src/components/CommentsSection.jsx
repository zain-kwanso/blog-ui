import React, { useState } from "react";
import { toast } from "react-toastify";
import CommentSkeleton from "./CommentSkeleton";

const CommentsSection = ({
  comments,
  user,
  handleAddComment,
  handleDeleteComment,
  handleAddReply,
  loading,
  error,
}) => {
  const [replyComment, setReplyComment] = useState({});
  const [newComment, setNewComment] = useState("");

  const renderComments = (
    comments,
    parent = null,
    isReply = false,
    level = 0
  ) => {
    return comments?.map((comment) => (
      <div key={comment?.id} className={`ml-${level * 4} mt-2 border-l-2 pl-4`}>
        <div className="flex items-start gap-4">
          <div className="w-8 h-8 border rounded-full">
            <img
              src="https://generated.vusercontent.net/placeholder-user.jpg"
              alt="@new"
            />
          </div>
          <div className="grid gap-1">
            <div className="font-medium text-sm text-gray-700">
              {comment?.User?.name || user.name}
            </div>
            <p className="text-muted-foreground text-sm">{comment?.content}</p>
          </div>
        </div>
        {comment?.UserId === user?.id && (
          <button
            className="text-red-500 text-xs"
            onClick={() => handleDeleteComment(comment?.id)}
          >
            Delete
          </button>
        )}
        {level < 1 && user?.id != undefined && (
          <button
            className="text-blue-500 text-xs ml-2"
            onClick={() =>
              setReplyComment((prev) => ({
                ...prev,
                [comment?.id]: prev[comment?.id] || "",
              }))
            }
          >
            Reply
          </button>
        )}
        {/* Reply Section */}
        {replyComment[comment?.id] !== undefined && level < 1 && (
          <div className="mt-2">
            <textarea
              className="w-full p-2 border rounded text-sm"
              value={replyComment[comment?.id]}
              rows={3}
              onChange={(e) => handleReplyChange(comment?.id, e.target.value)}
              placeholder="Add a reply"
            />
            <div className="flex items-center justify-end gap-3">
              <button
                className="bg-gray-500 text-white text-xs px-4 py-2 rounded mt-2"
                onClick={() =>
                  setReplyComment((prev) => ({
                    ...prev,
                    [comment?.id]: undefined,
                  }))
                }
              >
                Cancel
              </button>
              <button
                className="bg-blue-500 text-white text-xs px-4 py-2 rounded mt-2"
                onClick={() => handleAddReply(comment?.id)}
              >
                Add Reply
              </button>
            </div>
          </div>
        )}
        {comment?.replies &&
          comment?.replies?.length > 0 &&
          renderComments(comment?.replies, comment?.id, true, level + 1)}
      </div>
    ));
  };

  return (
    <div className="mt-12 border-t pt-6">
      <h2 className="text-xl font-bold mb-4">Comments</h2>
      <div className="space-y-6">
        <div className="flex-grow overflow-auto mb-4">
        {loading && (
            <>
              <CommentSkeleton />
              <CommentSkeleton />
              <CommentSkeleton />
            </>
          )}
          {error && toast.error("An error occurred while loading Comments")}
          {!loading && !error && comments?.length === 0 && (
            <p className="text-gray-500">
              No comments yet. Be the first to comment!
            </p>
          )}
          {!loading &&
            !error &&
            comments?.length > 0 &&
            renderComments(comments)}
        </div>
      </div>

      {user?.id != undefined && (
        <div className="mt-8">
          <h3 className="text-lg font-bold">Add a comment</h3>
          <div className="mt-4 grid gap-4">
            <div className="grid grid-cols-[48px_1fr] items-start gap-4">
              <div className="w-12 h-12 border rounded-full">
                <span className="relative flex shrink-0 overflow-hidden rounded-full w-12 h-12 border">
                  <img
                    className="aspect-square h-full w-full"
                    alt="@shadcn"
                    src="https://generated.vusercontent.net/placeholder-user.jpg"
                  />
                </span>
              </div>
              <div className="flex items-end gap-2">
                <textarea
                  className="w-full p-2 border rounded text-sm"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Add a comment"
                  rows="3"
                />
                <button
                  className="bg-blue-500 text-white text-sm px-4 py-2 rounded"
                  onClick={() => handleAddComment(newComment)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 inline-block rotate-90"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 10l7-7m0 0l7 7m-7-7v18"
                    />
                  </svg>
                  {/* Send */}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CommentsSection;
