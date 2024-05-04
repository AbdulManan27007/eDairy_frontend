import React, { useContext, useEffect, useState } from "react";
import dayjs from "dayjs";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useTheme } from "@emotion/react";

import {
  Box,
  Button,
  FormControlLabel,
  Radio,
  RadioGroup,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  Divider,
  Paper,
} from "@mui/material";

import styled from "@emotion/styled";

import { CardWrapper } from "../../../Components/CardWrapper";
import Loading from "../../../Components/Loading";
import eDairyContext from "../../../context/eDairyContext";

const StyledButton = styled(Button)(() => ({
  color: "#4e73df",
  fontWeight: "600",
  variant: "contained",
}));

export const AttendanceListStodent = () => {
  const context = useContext(eDairyContext);
  const { user, students, setStudents, selectedClass, selectedChilren } =
    context;

  const [isLoading, setisLoading] = useState(false);

  // Getting Today's Date
  const handleRadioChange = (index, value) => {};

  // Color change according to Attendance
  const getLabelColor = (index) => {
    return "#4e73df";
  };

  // Filter and output only the absentees

  // Attendance object to send to API

  const theme = useTheme();
  //  Handling Page Display
  let content;
  if (isLoading) {
    content = <Loading open={isLoading} />;
  }
  content = (
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
            Attendance of {selectedChilren?.name || selectedChilren?.username}
          </Typography>

          <Divider />
        </Box>
        <Box sx={{ m: 1 }}>
          {" "}
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell>Attendance</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {selectedChilren?.class?.attendance &&
                selectedChilren?.class?.attendance?.length &&
                selectedChilren?.class?.attendance?.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <Typography
                        variant="body1"
                        component="span"
                        style={{
                          color: getLabelColor(index),
                          fontWeight: "bold",
                        }}
                      >
                        {item?.date}
                      </Typography>
                    </TableCell>

                    <TableCell>
                      <RadioGroup
                        value={
                          item?.absentees?.rollno == selectedChilren.id
                            ? "Absent"
                            : "Present"
                        }
                        onChange={(event) =>
                          handleRadioChange(index, event.target.value)
                        }
                        row
                      >
                        <FormControlLabel
                          value="Present"
                          control={<Radio disabled />}
                          label="Present"
                        />
                        <FormControlLabel
                          value="Absent"
                          control={<Radio color="error" disabled />}
                          label="Absent"
                        />
                      </RadioGroup>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </Box>
      </Paper>
    </Box>
  );

  return content;
};
