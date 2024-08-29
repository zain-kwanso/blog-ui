import React from "react";
import { HomeIcon, UserCircleIcon } from "@heroicons/react/outline";

const Sidebar = () => {
  return (
    <div
      className="hidden sm:block fixed top-16 bottom-16 w-64 bg-indigo-800 text-white shadow-lg"
      style={{ position: "sticky", top: "4rem", bottom: "4rem" }} // Adjust based on header and footer heights
    >
      <div className="flex flex-col h-full">
        <div className="flex-1 flex flex-col mt-8">
          <a
            href="#all-posts"
            className="flex items-center p-4 hover:bg-indigo-700"
          >
            <HomeIcon className="h-6 w-6" />
            <span className="ml-4">All Posts</span>
          </a>
          <a
            href="#my-posts"
            className="flex items-center p-4 hover:bg-indigo-700"
          >
            <UserCircleIcon className="h-6 w-6" />
            <span className="ml-4">My Posts</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
