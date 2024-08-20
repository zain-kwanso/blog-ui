import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

const PrivateLayout = ({ isAuthenticated }) => {
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="flex flex-col min-h-screen h-full justify-between relative">
      <Header />

      <Outlet />

      <Footer />
    </div>
  );
};

export default PrivateLayout;
