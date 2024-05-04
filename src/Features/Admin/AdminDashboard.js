import { Box } from "@mui/material";
import React, { useContext, useEffect } from "react";
import eDairyContext from "../../context/eDairyContext";
import Dashboard from "../../Components/Dashboard/Dashboard";

export const AdminDashboard = () => {
  const context = useContext(eDairyContext);
  const {
    getInnitialAdminDashboardData,
    classes,
    selectedClass,
    sections,
    selectedSection,
  } = context;

  useEffect(() => {
    getInnitialAdminDashboardData();
  }, []);

  return <Dashboard />;
};
