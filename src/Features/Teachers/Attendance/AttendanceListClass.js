import React, { useContext, useEffect, useState } from "react";
import dayjs from "dayjs";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useTheme } from "@emotion/react";
import { GET_ALL_students } from "../../../services/Students";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

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
import { CustomNoRowsOverlay } from "../../../Components/NoRowsOverlay";
import { NoRowsOverlayMessage } from "../../../Components/NoRowsOverlayMessage";

const StyledButton = styled(Button)(() => ({
  color: "#4e73df",
  fontWeight: "600",
  variant: "contained",
}));

export const AttendanceListClass = ({ setNewAttendance }) => {
  const context = useContext(eDairyContext);
  const { user, selectedClass, selectedChilren } = context;
  const [students, setStudents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(dayjs(Date.now()));
  const [attendanceObject, setAttendanceObject] = useState(null);
  useEffect(() => {
    if (selectedClass?.id) {
      GET_ALL_students({ class: selectedClass.id })
        .then((resp) => {
          setStudents(resp?.data);
          setSelectedDate(dayjs(Date.now()));
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      setStudents([]);
    }
  }, [selectedClass]);

  useEffect(() => {
    if (
      selectedClass &&
      selectedClass?.attendance &&
      selectedClass?.attendance?.length
    ) {
      const dat = dayjs(selectedDate.toString()).format("DD/MMM/YYYY");
      const attendanceExist = selectedClass?.attendance?.find(
        (item) => item?.date == dat
      );
      if (attendanceExist) {
        setAttendanceObject(attendanceExist);
      } else {
        setAttendanceObject(null);
      }
    }
  }, [selectedDate]);

  const [isLoading, setisLoading] = useState(false);

  console.log("attendanceObject", attendanceObject);

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
        <Box
          sx={{
            display: "flex",
            gap: "30px",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography
            sx={{ p: 2, fontSize: "1rem", color: "#4e73df", fontWeight: "700" }}
          >
            Attendance List
          </Typography>

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Attendance Date"
              disableFuture
              format="DD/MM/YYYY"
              value={selectedDate}
              onChange={(value) => {
                setSelectedDate(value);
              }}
            />
          </LocalizationProvider>

          <Button
            sx={{
              m: 2,
              color: "#4e73df",
              fontWeight: "600",
            }}
            disabled={user?.id !== selectedClass?.incharge}
            variant="outlined"
            onClick={() => setNewAttendance(true)}
          >
            New Attendance
          </Button>
        </Box>
        <Divider />

        <Box sx={{ m: 1 }}>
          {" "}
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>RollNumber</TableCell>

                <TableCell>Attendance</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {students && students?.length ? (
                students.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <Typography component="span" style={{}}>
                        {item?.name}
                      </Typography>
                    </TableCell>

                    <TableCell>
                      <Typography component="span" style={{}}>
                        {item?.rollNumber}
                      </Typography>
                    </TableCell>

                    <TableCell>
                      {attendanceObject ? (
                        <RadioGroup
                          value={
                            attendanceObject?.absentees?.some(
                              (absentee) => absentee?.rollno === item.id
                            )
                              ? "Absent"
                              : attendanceObject?.onleave?.some(
                                  (leave) => leave?.rollno === item.id
                                )
                              ? "Leave"
                              : "Present"
                          }
                          onChange={() => {}}
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

                          <FormControlLabel
                            value="Leave"
                            control={<Radio color="error" disabled />}
                            label="Leave"
                          />
                        </RadioGroup>
                      ) : (
                        <Typography variant="body1" component="span" style={{}}>
                          Not Exist For The Date
                        </Typography>
                      )}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <Box
                  sx={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    minWidth: "80vw",
                  }}
                >
                  <NoRowsOverlayMessage message={"Select a different class"} />
                </Box>
              )}
            </TableBody>
          </Table>
        </Box>
      </Paper>
    </Box>
  );

  return content;
};
