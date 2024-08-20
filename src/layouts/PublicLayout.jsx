import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

const PublicLayout = ({ isAuthenticated }) => {
  if (isAuthenticated) {
    // If the user is authenticated, redirect to the dashboard or home page
    return <Navigate to="/dashboard" />;
  }

  return (
    <div>
      {/* Public Header (if any) */}
      <Header />

      <main>
        {/* The Outlet component will render the matched child routes */}
        <Outlet />
      </main>

      {/* Optional Footer */}
      <Footer />
    </div>
  );
};

export default PublicLayout;
