import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PublicHeader from "../components/PublicHeader";
import PrivateHeader from "../components/PrivateHeader";
import Footer from "../components/Footer";

interface PublicLayoutProps {
  isAuthenticated: boolean;
}

const PublicLayout: React.FC<PublicLayoutProps> = ({ isAuthenticated }) => {
  return (
    <div className="flex flex-col min-h-screen h-full justify-between relative">
      {isAuthenticated ? <PrivateHeader /> : <PublicHeader />}
      <ToastContainer />
      <Outlet />

      <Footer />
    </div>
  );
};

export default PublicLayout;
