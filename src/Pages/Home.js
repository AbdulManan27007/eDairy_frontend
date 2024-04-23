import React from "react";
import { Link } from "react-router-dom";

import { Box, Paper, Typography } from "@mui/material";
import DashboardImage from "../Assets/Images/Dashboard.png";
import DashboardImage2 from "../Assets/Images/Dashboard 2.png";

import Logo from "../Assets/Images/logo.png";

import Background from "../Assets/background.png";
import Banner from "../Assets/login-banner.png";

const Home = () => {
  return (
    <div
      className="grid grid-cols-2 max-sm:grid-cols-1 max-md:grid-cols-1 h-screen relative"
      style={{ maxWidth: "100vw", overflow: "hidden" }}
    >
      <div className="flex justify-center items-center">
        <Paper
          elevation={3}
          sx={{
            p: 3,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box>
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              Welcome To
            </Typography>
          </Box>
          {/* ----- Dashboard Image------- */}
          <Box>
            <img
              height="300"
              width="250"
              src={DashboardImage}
              alt="Dashboard"
            />
          </Box>
          {/* ------- Login ------ */}
          <Box>
            <Link to="/auth/login">
              <Typography sx={{ fontWeight: "500", color: "#1a73e8" }}>
                Login to Dashboard
              </Typography>
            </Link>
          </Box>
          {/* ------- Sign up ----- */}
          <Box></Box>
        </Paper>
      </div>
      <div
        style={{ backgroundImage: `url(${Background})` }}
        className="h-full bg-cover flex justify-center items-center max-sm:hidden max-md:hidden"
      >
        <div className="flex flex-col items-center">
          <img
            style={{ width: "200px", height: "150px" }}
            src={DashboardImage2}
            alt=".."
            className="mb-5"
          />
          <img src={Banner} alt=".." />
        </div>
      </div>
    </div>

    // <Box
    //   sx={{
    //     display: "flex",
    //     flexDirection: "column",
    //     alignItems: "center",
    //     justifyContent: "center",
    //     minHeight: "100vh",
    //   }}
    // >

    // </Box>
  );
};

export default Home;
