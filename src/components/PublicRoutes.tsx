import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../context/authContext";

const PublicRoute = ({ redirectPath = "/" }): React.JSX.Element => {
  const { user } = useContext(AuthContext);

  if (user) {
    return <Navigate to={redirectPath} replace />;
  }

  return <Outlet />;
};

export default PublicRoute;
