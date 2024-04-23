import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box, Divider, Grid, Paper, Typography } from "@mui/material";

import { useGetStudentDataQuery } from "./studentApiSlice";
import Loading from "../../Components/Loading";
import { TimeTable } from "../../Components/TimeTable";
import { StaffTable } from "../../Components/StaffTable";
import Error from "../../Components/Error";
import { CardWrapper } from "../../Components/CardWrapper";
import eDairyContext from "../../context/eDairyContext";
import { useTheme } from "@emotion/react";
/**
 * Component for displaying the timetable and staff table.
 * Uses the useGetStudentDataQuery hook to fetch data.
 */
export const Timetable = () => {
  const [isLoading, setisLoading] = React.useState(false);

  const context = useContext(eDairyContext);
  const {
    user,
    students,
    setStudents,
    teachers,
    setTeachers,
    selectedClass,
    classes,
    setClasses,
    subjects,
    setSubjects,
    sections,
    setSections,
    selectedChilren,
    setSelectedChildren,
    childrens,
    setChildrens,
    setSelectedClass,
    setSelectedSection,
  } = context;

  // Get Student Query Hook
  const theme = useTheme();
  let content;

  if (isLoading) {
    content = <Loading open={isLoading} />; // Show loading state while fetching data
  }
  // Render the staff container if data is successfully fetched
  else {
    content = (
      <Grid container spacing={2}>
        <Grid item xs={12} lg={8}>
          <Box sx={{ mt: 1 }}>
            <Paper
              sx={{
                backgroundColor:
                  theme.palette.mode === "light" ? "#fff" : "#1a2027",
                pb: 1,
              }}
            >
              <Box sx={{ display: "flex", gap: "30px", alignItems: "center" }}>
                <Typography
                  sx={{
                    p: 2,
                    fontSize: "1rem",
                    color: "#4e73df",
                    fontWeight: "700",
                  }}
                >
                  Time Table
                </Typography>
                <Divider />
              </Box>
              <Box sx={{ m: 1 }}>
                <TimeTable data={selectedChilren?.section?.timeTable} />
              </Box>
            </Paper>
          </Box>
        </Grid>
        <Grid item xs={12} lg={4}>
          <Box sx={{ mt: 1 }}>
            <Paper
              sx={{
                backgroundColor:
                  theme.palette.mode === "light" ? "#fff" : "#1a2027",
                pb: 1,
              }}
            >
              <Box sx={{ display: "flex", gap: "30px", alignItems: "center" }}>
                <Typography
                  sx={{
                    p: 2,
                    fontSize: "1rem",
                    color: "#4e73df",
                    fontWeight: "700",
                  }}
                >
                  Subjects
                </Typography>
                <Divider />
              </Box>
              <Box sx={{ m: 1 }}>
                <StaffTable data={subjects} />
              </Box>
            </Paper>
          </Box>
        </Grid>
      </Grid>
    );
  }
  // Show error message if there's an error fetching data

  return content;
};
