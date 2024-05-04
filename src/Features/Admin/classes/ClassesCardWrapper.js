import React, { useContext, useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  Divider,
  Paper,
  Typography,
} from "@mui/material";
import { useTheme } from "@emotion/react";
import styled from "@emotion/styled";
import { useSelector } from "react-redux";
import eDairyContext from "../../../context/eDairyContext";
import { ClassTable } from "./ClassTable";
import { AddClass } from "./AddClass";

export const ClassesCardWrapper = () => {
  const context = useContext(eDairyContext);
  const { user, classes, setClasses } = context;

  const theme = useTheme();
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const StyledBox = styled(Box)(() => ({
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  }));

  return (
    <Box sx={{ mt: 3 }}>
      <Paper
        sx={{
          backgroundColor: theme.palette.mode === "light" ? "#fff" : "#1a2027",
          pb: 1,
        }}
      >
        <StyledBox>
          <Typography
            sx={{ p: 2, fontSize: "1rem", color: "#4e73df", fontWeight: "700" }}
          >
            Classes
          </Typography>

          <Button
            sx={{
              mx: 2,
              color: "#4e73df",
              fontWeight: "600",
            }}
            variant="outlined"
            onClick={handleClickOpen}
          >
            Add Class
          </Button>
        </StyledBox>
        <Divider />
        <Box sx={{ m: 2 }}>
          <ClassTable classes={classes} setClasses={setClasses} />
        </Box>

        <Dialog open={open} onClose={handleClose}>
          <DialogContent>
            <AddClass />
          </DialogContent>
        </Dialog>
      </Paper>
    </Box>
  );
};
