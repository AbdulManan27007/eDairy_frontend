import React, { useContext } from "react";
import { Box, Divider, Paper, Typography } from "@mui/material";
import { useTheme } from "@emotion/react";
import SelectSectionComp from "./selectDropDownOther/SelectSectionComp";
import eDairyContext from "../context/eDairyContext";
import SelectClassComp from "./selectDropDownOther/SelectClassComp";

export const CardWrapper = ({ title, children }) => {
  const theme = useTheme();

  const context = useContext(eDairyContext);
  const { user } = context;

  return (
    <Box sx={{ mt: 1 }}>
      <Paper
        sx={{
          backgroundColor: theme.palette.mode === "light" ? "#fff" : "#1a2027",
          pb: 1,
        }}
      >
        <Box sx={{ display: "flex", gap: "30px", alignItems: "center" }}>
          <Typography
            sx={{ p: 2, fontSize: "1rem", color: "#4e73df", fontWeight: "700" }}
          >
            {title}
          </Typography>

          {user?.role !== "admin" &&
            user?.role !== "parent" &&
            title !== "Add New E_Dairy" && <SelectClassComp />}

          {user?.role !== "admin" && title !== "Add New E_Dairy" && (
            <SelectSectionComp />
          )}

          <Divider />
        </Box>
        <Box sx={{ m: 1 }}>{children}</Box>
      </Paper>
    </Box>
  );
};
