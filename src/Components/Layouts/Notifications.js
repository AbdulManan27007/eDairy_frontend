import React, { useContext } from "react";
import { useTheme } from "@emotion/react";
import { IconButton, Paper } from "@mui/material";
import { CustomNoRowsOverlay } from "../NoRowsOverlay";
import eDairyContext from "../../context/eDairyContext";
import { IoClose } from "react-icons/io5";
export const Notifications = () => {
  const context = useContext(eDairyContext);
  const { firstRender, setFirstRender } = context;

  const theme = useTheme();
  return (
    <Paper
      sx={{
        backgroundColor: theme.palette.mode === "light" ? "#fff" : "#1a2027",
        p: 2,
      }}
    >
      {firstRender ? (
        <div
          style={{
            display: "flex",
            gap: "20px",
            alignItems: "center",
            padding: "5px",
          }}
        >
          <span>1 new e diary added</span>
          <IconButton
            size="small"
            edge="start"
            color="primary"
            aria-label="open drawer"
            onClick={() => setFirstRender(false)}
          >
            <IoClose />
          </IconButton>
        </div>
      ) : (
        <CustomNoRowsOverlay />
      )}
    </Paper>
  );
};
