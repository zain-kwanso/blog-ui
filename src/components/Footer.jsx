import React from "react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-r from-purple-500 via-indigo-600 to-blue-500 text-white py-4 px-4 md:px-8 lg:px-12 sticky bottom-0">
      <div className="max-w-3xl mx-auto flex justify-between items-center">
        <p>&copy; {currentYear} Blog Application. All rights reserved.</p>
        <div className="flex gap-4">
          <a href="/privacy-policy" className="hover:text-gray-400">
            Privacy Policy
          </a>
          <a href="/terms-of-service" className="hover:text-gray-400">
            Terms of Service
          </a>
        </div>
      </div>
    </footer>
  );
};

export default React.memo(Footer);
