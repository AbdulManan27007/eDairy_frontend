import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";

const RequireAuth = ({ allowedRoles, user }) => {
  // Retrieving from Redux Store
  return (
    user?.role === allowedRoles && (
      //  If allowed roles exist, render the nested routes
      <Outlet />
    )
  );
};

export default RequireAuth;
