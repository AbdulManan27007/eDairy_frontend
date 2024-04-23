import React, { useContext } from "react";
import { useSelector } from "react-redux";
import { selectCurrentRole, selectCurrentToken } from "./AuthSlice";
import { Navigate, Outlet } from "react-router-dom";
import eDairyContext from "../../context/eDairyContext";

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
