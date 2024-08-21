import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { FaUser } from "react-icons/fa";
import { AuthContext } from "../context/authContext";

const PrivateHeader = () => {
  const { user, signout } = useContext(AuthContext);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleProfileClick = () => {
    toast.info(
      <div>
        <p>Hi! {user?.name} Do you want to signOut?</p>
        <button
          onClick={() => {
            signout();
            toast.dismiss();
          }}
          className="bg-red-600 text-white py-1 px-4 rounded mt-2"
        >
          Sign Out
        </button>
      </div>,
      {
        autoClose: false,
        closeOnClick: true,
        draggable: false,
      }
    );
  };

  return (
    <header className="fixed top-0 left-0 w-full bg-gradient-to-r from-purple-500 via-indigo-600 to-blue-500 text-white shadow-md z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/home" className="text-2xl font-bold">
          MyBlogApp
        </Link>
        <nav className="hidden md:flex space-x-6">
          <Link to="/home" className="hover:text-gray-200">
            Home
          </Link>
          <Link to="/about" className="hover:text-gray-200">
            About
          </Link>
        </nav>
        {user ? (
          <button
            onClick={handleProfileClick}
            className="flex items-center focus:outline-none"
          >
            <FaUser className="w-6 h-6" />
          </button>
        ) : (
          <div className="flex items-center space-x-4">
            <Link to="/login" className="hover:text-gray-200">
              Login
            </Link>
            <Link to="/signup" className="hover:text-gray-200">
              Sign Up
            </Link>
          </div>
        )}
        <button
          onClick={toggleMobileMenu}
          className="md:hidden flex items-center focus:outline-none"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>
      {isMobileMenuOpen && (
        <nav className="md:hidden bg-gradient-to-r from-purple-500 via-indigo-600 to-blue-500 text-white">
          <ul className="space-y-4 px-4 py-2">
            <li>
              <Link
                to="/home"
                className="block py-2 hover:bg-gray-700 rounded"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className="block py-2 hover:bg-gray-700 rounded"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                About
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
};

export default PrivateHeader;
