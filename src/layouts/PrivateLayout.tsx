import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Outlet, Navigate } from "react-router-dom";
import PrivateHeader from "../components/PrivateHeader";
import Footer from "../components/Footer";
import { routeUrl } from "../utils/pageRoutes";

interface PrivateLayoutProps {
  isAuthenticated: boolean;
}

const PrivateLayout: React.FC<PrivateLayoutProps> = ({
  isAuthenticated,
}): React.JSX.Element => {
  if (!isAuthenticated) {
    console.log("private layout");
    return <Navigate to={routeUrl.base} />;
  }

  return (
    <div className="flex flex-col min-h-screen h-full justify-between relative">
      <PrivateHeader />
      <ToastContainer />
      <Outlet />

      <Footer />
    </div>
  );
};

export default PrivateLayout;
