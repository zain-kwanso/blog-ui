import React from "react";
import { Outlet, Navigate } from "react-router-dom";

const PrivateLayout = ({ isAuthenticated }) => {
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="flex">
      {/* Sidebar */}
      <aside className="w-64">{/* Insert your Sidebar component here */}</aside>

      <div className="flex-1">
        {/* Private Header */}
        <header>{/* Insert your Header component here */}</header>

        <main>
          {/* The Outlet component will render the matched child routes */}
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default PrivateLayout;
