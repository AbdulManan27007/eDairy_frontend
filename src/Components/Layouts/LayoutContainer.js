import React, { useContext, useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { styled } from "@mui/system";
import { alpha } from "@mui/material/styles";
import { Hidden } from "@mui/material";

import {
  selectLgView,
  selectMobView,
} from "../../Features/ToggleSideBar/ToggleSidebarSlice";
import { NavBar } from "./Navbar";
import { SidebarWrapper } from "./SidebarWrapper";
import { drawerWidth, fullDrawerWidth } from "./DrawerWidth";
import DashboardRoutes from "../../Routes/DashboardRoutes";
import eDairyContext from "../../context/eDairyContext";
import Loading from "../Loading";

// Main Container
const Main = styled("main", {
  shouldForwardProp: (prop) => prop !== "open" && prop !== "openWide",
})(({ theme, open, openWide }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: 0,
  marginTop: 60,
  backgroundColor: alpha(theme.palette.grey[400], 0.15),
  [theme.breakpoints.up("sm")]: {
    marginLeft: `${drawerWidth}px`,
  },
  ...(open && {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: `${drawerWidth}px`,
  }),
  ...(openWide && {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: `${fullDrawerWidth}px !important`,
  }),
}));

export const LayoutContainer = () => {
  const open = useSelector(selectMobView);
  const openWide = useSelector(selectLgView);

  const context = useContext(eDairyContext);
  const { user, setUser } = context;

  const isUserExist = !!user;
  if (!isUserExist) {
    // Show loading component while user data is loading
    return <Loading open={isUserExist} />;
  }

  return (
    <>
      {user?.role ? (
        <>
          <NavBar />
          <SidebarWrapper />
          <Hidden smUp>
            <Main open={open}>
              <DashboardRoutes user={user} />
              <Outlet />
            </Main>
          </Hidden>
          <Hidden smDown>
            <Main openWide={openWide}>
              <DashboardRoutes user={user} />
              <Outlet />
            </Main>
          </Hidden>
        </>
      ) : (
        <Navigate to="/auth/login" />
      )}
    </>
  );
};
