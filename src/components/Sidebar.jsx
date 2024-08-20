import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  HomeIcon,
  LoginIcon,
  UserAddIcon,
  XIcon,
  MenuIcon,
} from "@heroicons/react/outline";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex">
      {/* Hamburger Icon for Mobile Screens */}
      <button
        className="md:hidden p-4"
        onClick={toggleSidebar}
        aria-label="Toggle Sidebar"
      >
        <MenuIcon className="h-6 w-6 text-gray-700" />
      </button>

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:relative md:translate-x-0 transition-transform duration-300 ease-in-out bg-gray-900 w-64 p-6 shadow-lg z-50`}
      >
        <button
          className="md:hidden p-4 text-white"
          onClick={toggleSidebar}
          aria-label="Close Sidebar"
        >
          <XIcon className="h-6 w-6" />
        </button>
        {/* Sidebar Content */}
        <nav className="space-y-6">
          <Link
            to="/"
            className="flex items-center text-white hover:bg-gray-700 p-2 rounded-md transition-colors duration-300"
          >
            <HomeIcon className="h-5 w-5 mr-3" />
            Home
          </Link>
          <Link
            to="/login"
            className="flex items-center text-white hover:bg-gray-700 p-2 rounded-md transition-colors duration-300"
          >
            <LoginIcon className="h-5 w-5 mr-3" />
            Login
          </Link>
          <Link
            to="/signup"
            className="flex items-center text-white hover:bg-gray-700 p-2 rounded-md transition-colors duration-300"
          >
            <UserAddIcon className="h-5 w-5 mr-3" />
            Signup
          </Link>
          {/* Add other navigation links as needed */}
        </nav>
      </div>

      {/* Overlay for Mobile Screens */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 md:hidden"
          onClick={toggleSidebar}
          aria-hidden="true"
        />
      )}
    </div>
  );
};

export default Sidebar;
