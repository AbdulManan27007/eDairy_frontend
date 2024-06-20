import React, { useContext, useEffect, useState } from "react";
import dayjs from "dayjs";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import {
  Box,
  Button,
  Divider,
  FormControlLabel,
  Paper,
  Radio,
  RadioGroup,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import styled from "@emotion/styled";
import { useTheme } from "@emotion/react";
import { CardWrapper } from "../../../Components/CardWrapper";
import Loading from "../../../Components/Loading";
import eDairyContext from "../../../context/eDairyContext";
import { GET_ALL_students } from "../../../services/Students";
import { UPDATE_BY_ID } from "../../../services/Classes";
import { AttendanceListClass } from "./AttendanceListClass";

const StyledButton = styled(Button)(() => ({
  color: "#4e73df",
  fontWeight: "600",
  variant: "contained",
}));

export const Attendance = () => {
  const context = useContext(eDairyContext);
  const { user, selectedClass, setSelectedClass } = context;
  const theme = useTheme();
  const [students, setStudents] = useState([]);

  const [isLoading, setisLoading] = useState(false);
  const [newAttendance, setNewAttendance] = useState(false);

  useEffect(() => {
    if (selectedClass?.id) {
      GET_ALL_students({ class: selectedClass.id })
        .then((resp) => {
          setStudents(resp?.data);
          if (resp?.data && resp?.data?.length) {
            const updatedAttendance = resp.data.map(() => "Present");
            setAttendance(updatedAttendance);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      setStudents([]);
    }
  }, [selectedClass]);

  // Getting Today's Date
  const currentDate = dayjs(new Date().toString()).format("DD/MMM/YYYY");

  const [attendance, setAttendance] = useState([]);
  const handleRadioChange = (index, value) => {
    const updatedAttendance = [...attendance];
    updatedAttendance[index] = value;
    setAttendance(updatedAttendance);
  };

  // Color change according to Attendance
  const getLabelColor = (index) => {
    const status = attendance[index];

    if (status) {
      return status == "Present" || status == "Leave" ? "#4e73df" : "red";
    } else {
      return "#4e73df";
    }
  };

  // Clear the Attendance sheet
  const handleClearAttendance = () => {
    setAttendance([]);
  };

  // For quick marking if all are present
  const handleAllPresent = () => {
    const updatedAttendance = students.map(() => "Present");
    setAttendance(updatedAttendance);
  };

  // Handling Data
  const handleAttendance = () => {
    // Calculate the attendance percentage
    const presentCount = attendance.filter(
      (status) => status == "Present"
    ).length;
    const totalStudents = students?.length;
    const attendancePercentage = ((presentCount / totalStudents) * 100).toFixed(
      2
    );

    // Filter and output only the absentees
    const absentArray = students?.filter(
      (student, index) => attendance[index] == "Absent"
    );

    const leaveArray = students?.filter(
      (student, index) => attendance[index] == "Leave"
    );

    let onleave = leaveArray.map((student) => ({
      name: student.name,
      rollno: student.id,
      id: student.rollNumber,
    }));

    let absentees = absentArray.map((student) => ({
      name: student.name,
      rollno: student.id,
      id: student.rollNumber,
    }));

    if (absentees?.length === 0 || onleave?.length === 0) {
      absentees = ["All Present"];
    }

    // Attendance object to send to API
    const attendanceObject = {
      date: currentDate,
      absentees: absentees,
      onleave: onleave,
      attendancePercentage: attendancePercentage,
    };
    Attndnce(attendanceObject);
  };

  const Attndnce = (data) => {
    let attendanceExist = null;

    if (!selectedClass?.id) {
      toast.error(`Select a class first`);
      return;
    }

    if (selectedClass?.attendance && selectedClass?.attendance?.length) {
      attendanceExist = selectedClass?.attendance?.find(
        (item) => item?.date == data.date
      );
    }

    if (attendanceExist) {
      toast.error(`Attendance for date ${data.date} already Submitted`);
      return;
    }

    const data2 = [...selectedClass.attendance, data];

    UPDATE_BY_ID({ id: selectedClass.id, attendance: data2 })
      .then((response) => {
        response.data && setSelectedClass(response.data);
        toast.success("submitted todays Attendance");
        setNewAttendance(false);
      })
      .catch((error) => toast.error(error.error || error.data.error.message));
  };

  //  Handling Page Display
  let content;
  if (isLoading) {
    content = <Loading open={isLoading} />;
  }
  content = (
    <>
      {newAttendance ? (
        <Box sx={{ mt: 1 }}>
          <ToastContainer />
          <Paper
            sx={{
              backgroundColor:
                theme.palette.mode === "light" ? "#fff" : "#1a2027",
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
                sx={{
                  p: 2,
                  fontSize: "1rem",
                  color: "#4e73df",
                  fontWeight: "700",
                }}
              >
                Attendance
              </Typography>

              <Typography
                sx={{
                  p: 2,
                  fontSize: "1rem",
                  color: "#4e73df",
                  fontWeight: "700",
                }}
              >
                {currentDate}
              </Typography>

              <Button
                sx={{
                  m: 2,
                  color: "#4e73df",
                  fontWeight: "600",
                }}
                variant="outlined"
                onClick={() => setNewAttendance(false)}
              >
                Cancel
              </Button>
            </Box>
            <Divider />

            <Box sx={{ m: 1 }}>
              <Box>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Roll No</TableCell>
                      <TableCell>Name</TableCell>
                      <TableCell>Attendance</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {selectedClass?.id &&
                      students?.map((student, index) => (
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
                              {student.rollNumber}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Typography
                              variant="body1"
                              component="span"
                              style={{
                                color: getLabelColor(index),
                                fontWeight: "bold",
                              }}
                            >
                              {student.name}
                            </Typography>
                          </TableCell>
                          <TableCell style={{ flex: 1 }}>
                            <RadioGroup
                              value={attendance[index] || "Present"}
                              onChange={(event) =>
                                handleRadioChange(index, event.target.value)
                              }
                              row
                            >
                              <FormControlLabel
                                value="Present"
                                control={<Radio />}
                                label="Present"
                              />
                              <FormControlLabel
                                value="Absent"
                                control={<Radio color="error" />}
                                label="Absent"
                              />

                              <FormControlLabel
                                value="Leave"
                                control={<Radio color="info" />}
                                label="Leave"
                              />
                            </RadioGroup>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
                <Box mt={2} display="flex" justifyContent="space-between">
                  <StyledButton
                    variant="outlined"
                    disabled={!selectedClass?.id}
                    onClick={handleAllPresent}
                  >
                    All Present
                  </StyledButton>
                  <StyledButton
                    variant="outlined"
                    disabled={!selectedClass?.id}
                    onClick={handleAttendance}
                  >
                    Submit Attendance
                  </StyledButton>
                  <StyledButton
                    variant="outlined"
                    disabled={!selectedClass?.id}
                    onClick={handleClearAttendance}
                  >
                    Clear All
                  </StyledButton>
                </Box>
              </Box>
            </Box>
          </Paper>
        </Box>
      ) : (
        <AttendanceListClass setNewAttendance={setNewAttendance} />
      )}
    </>
  );

  return content;
};
