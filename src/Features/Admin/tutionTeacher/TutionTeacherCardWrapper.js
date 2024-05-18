import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  Divider,
  MenuItem,
  Paper,
  Select,
  Typography,
} from "@mui/material";
import { useTheme } from "@emotion/react";
import styled from "@emotion/styled";
import { GET_ALL } from "../../../services/parents";

import { AddTutionTeacher } from "./AddTutionTeacher";
import { TutionTeacherTable } from "./TutionTeacherTable";
import eDairyContext from "../../../context/eDairyContext";
export const TutionTeacherCardWrapper = () => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);

  const context = useContext(eDairyContext);
  const { setParents } = context;

  useEffect(() => {
    getallParents();
  }, []);

  const getallParents = async () => {
    const data = await GET_ALL();
    setParents(data.data);
  };

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
            Tution Teachers
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
            Add A New Tution Teacher
          </Button>
        </StyledBox>
        <Divider />
        <Box sx={{ m: 2 }}>
          <TutionTeacherTable />
        </Box>
        <Dialog open={open} onClose={handleClose}>
          <DialogContent>
            <AddTutionTeacher />
          </DialogContent>
        </Dialog>
      </Paper>
    </Box>
  );
};
