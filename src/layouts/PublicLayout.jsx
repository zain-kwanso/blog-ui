import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

const PublicLayout = ({ isAuthenticated }) => {
  if (isAuthenticated) {
    // If the user is authenticated, redirect to the dashboard or home page
    return <Navigate to="/home" />;
  }

  return (
    <div className="flex flex-col min-h-screen h-full justify-between relative">
      <Header />

      <Outlet />

      <Footer />
    </div>
  );
};

export default PublicLayout;
