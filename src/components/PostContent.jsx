import React from "react";

const PostContent = ({ post }) => {
  if (!post) return null;

  return (
    <article className="pt-16 prose prose-gray dark:prose-invert">
      <header className="mb-8 flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight capitalize">
          {post.title}
        </h1>
        <p className="text-gray-600 text-sm">
          Posted on{" "}
          {new Date(post.createdAt).toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
          })}
        </p>
      </header>
      <div>
        <p className="whitespace-pre-line w-auto text-justify text-base leading-relaxed">
          {post.content}
        </p>
      </div>
    </article>
  );
};

export default PostContent;
