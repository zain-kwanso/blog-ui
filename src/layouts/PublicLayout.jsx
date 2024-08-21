import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Header from "../components/PrivateHeader";
import Footer from "../components/Footer";

const PublicLayout = ({ isAuthenticated }) => {
  return (
    <div className="flex flex-col min-h-screen h-full justify-between relative">
      <Header />
      <ToastContainer />
      <Outlet />

      <Footer />
    </div>
  );
};

export default PublicLayout;
