import React from "react";
import { Post } from "src/types/post";

interface PostContentProps {
  post?: Post;
}

const formatDate = (post: Post): string => {
  return new Date(post?.createdAt!).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
};
const PostContent: React.FC<PostContentProps> = ({
  post,
}): React.JSX.Element => {
  if (!post) return <></>;

  return (
    <article className="pt-16 prose prose-gray dark:prose-invert">
      <header className="mb-8 flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight capitalize">
          {post?.title}
        </h1>
        <p className="text-gray-600 text-sm">Posted on {formatDate(post)}</p>
      </header>
      <div>
        <p className="whitespace-pre-line w-auto text-justify text-base leading-relaxed">
          {post?.content || ""}
        </p>
      </div>
    </article>
  );
};

export default PostContent;
