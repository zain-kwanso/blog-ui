import React from "react";
import PropTypes from "prop-types";

const truncateText = (text, maxLength = 100) => {
  if (text.length > maxLength) {
    return text.slice(0, maxLength) + "...";
  }
  return text;
};

const transformPostData = (post) => ({
  id: post.id || null,
  title: post.title || "Untitled",
  content: post.content || "No content available",
  authorName: post.authorName || "Anonymous",
});

const PostCard = ({ post, onClick, onDelete, onEdit, isUserPost }) => {
  const { title, content, authorName, id } = transformPostData(post);

  return (
    <div
      onClick={() => onClick(post)}
      className="bg-white p-4 rounded-lg shadow-lg w-full cursor-pointer hover:shadow-2xl transition-shadow"
      role="button"
      aria-label={`View post titled ${title}`}
    >
      {/* Render title */}
      <h2 className="text-xl font-bold mb-2">{title}</h2>

      {/* Render truncated content */}
      <p className="text-gray-700">{truncateText(content, 200)}</p>

      {/* Render author name */}
      <p className="text-gray-500 text-sm mt-2">Posted by {authorName}</p>

      {/* Conditionally render Edit and Delete buttons if it's the user's post */}
      {isUserPost && (
        <div className="mt-4 flex justify-end space-x-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onEdit(post);
            }}
            className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition-colors focus:outline-none focus:ring-2 focus:ring-yellow-300"
          >
            Edit
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete(id);
            }}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors focus:outline-none focus:ring-2 focus:ring-red-300"
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

PostCard.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    content: PropTypes.string,
    authorName: PropTypes.string,
  }).isRequired,
  onClick: PropTypes.func.isRequired,
  onDelete: PropTypes.func,
  onEdit: PropTypes.func,
  isUserPost: PropTypes.bool.isRequired,
};

export default PostCard;
