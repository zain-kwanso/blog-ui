import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { toast } from "react-toastify";
import UserDetails from "./UserDetails";
import { AuthContext } from "../context/authContext";
import { routeUrl } from "../utils/pageRoutes";

const PrivateHeader: React.FC = () => {
  const { user, signout } = useContext(AuthContext);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  const handleProfileClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <header className="fixed top-0 left-0 w-full bg-gradient-to-r from-purple-500 via-indigo-600 to-blue-500 text-white shadow-md z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to={routeUrl.base} className="text-2xl font-bold">
            MyBlogApp
          </Link>
          <nav className="hidden md:flex space-x-6">
            <Link to={routeUrl.base} className="hover:text-gray-200">
              Home
            </Link>
            <Link to={routeUrl.about} className="hover:text-gray-200">
              About
            </Link>
          </nav>
          <button
            onClick={handleProfileClick}
            className="flex items-center focus:outline-none"
            aria-label="User Profile"
          >
            <FaUser className="w-6 h-6 md:w-4 md:h-4" />
          </button>
          <button
            onClick={toggleMobileMenu}
            className="md:hidden flex items-center focus:outline-none"
            aria-label="Toggle mobile menu"
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
                  to={routeUrl.base}
                  className="block py-2 hover:bg-gray-700 rounded"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to={routeUrl.about}
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

      {isModalOpen && user && (
        <UserDetails
          user={user}
          onSignOut={() => {
            signout();
            handleCloseModal();
            toast.success("Signout Successful");
          }}
          onClose={handleCloseModal}
        />
      )}
    </>
  );
};

export default React.memo(PrivateHeader);
