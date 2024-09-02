import React from "react";

const PostContentSkeleton = (): React.JSX.Element => {
  return (
    <article className="pt-16 prose prose-gray dark:prose-invert">
      <header className="mb-8 flex flex-col gap-2">
        <div className="bg-gray-200 dark:bg-gray-300 h-8 w-3/4 rounded-md animate-pulse" />
        <div className="bg-gray-200 dark:bg-gray-300 h-6 w-1/4 rounded-md animate-pulse" />
      </header>
      <div>
        <div className="bg-gray-200 dark:bg-gray-300 h-4 w-full mb-4 rounded-md animate-pulse" />
        <div className="bg-gray-200 dark:bg-gray-300 h-4 w-full mb-4 rounded-md animate-pulse" />
        <div className="bg-gray-200 dark:bg-gray-300 h-4 w-full mb-4 rounded-md animate-pulse" />
        <div className="bg-gray-200 dark:bg-gray-300 h-4 w-full mb-4 rounded-md animate-pulse" />
      </div>
    </article>
  );
};

export default PostContentSkeleton;
