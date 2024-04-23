import React, { useContext, useState } from "react";
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
import { useSelector } from "react-redux";
import eDairyContext from "../../../context/eDairyContext";
import { ClassTable } from "./ClassTable";
import { AddClass } from "./AddClass";
import { AddClassSections } from "./AddClassSections";
import { SectionsTable } from "./SectionsTable";
import { SelectClassComp } from "../../../Components/selectDropDown/SelectClassComp";

export const SectionsCardWrapper = () => {
  const context = useContext(eDairyContext);
  const { user, classes, setClasses } = context;
  const [selectedClass, setselectedClass] = useState({});

  const theme = useTheme();
  const [open, setOpen] = useState(false);

  const handleChange = (event) => {
    const selectedItem = classes?.find(
      (item) => item?.id === event.target.value
    );
    setselectedClass(selectedItem);
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
  console.log("classes", classes);
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
            Sections
          </Typography>

          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              gap: "15px",
              height: "46px",
            }}
          >
            <SelectClassComp />
          </Box>

          <Button
            sx={{
              mx: 2,
              color: "#4e73df",
              fontWeight: "600",
            }}
            variant="outlined"
            onClick={handleClickOpen}
          >
            Add Section
          </Button>
        </StyledBox>
        <Divider />
        <Box sx={{ m: 2 }}>
          <SectionsTable />
        </Box>
        <Dialog open={open} onClose={handleClose}>
          <DialogContent>
            <AddClassSections />
          </DialogContent>
        </Dialog>
      </Paper>
    </Box>
  );
};
