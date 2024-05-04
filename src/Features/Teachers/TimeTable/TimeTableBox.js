import React from "react";
import { Grid } from "@mui/material";
import { TimeTable } from "../../../Components/TimeTable";
import { StaffTable } from "../../../Components/StaffTable";
import Loading from "../../../Components/Loading";
import Error from "../../../Components/Error";
import { useParams } from "react-router-dom";
import { CardWrapper } from "../../../Components/CardWrapper";

// Time Table Component
// Render Timetable and StaffTables based on the classId
export const TimeTableBox = () => {
  let timetable = [];
  let staff = [];
  let isLoading = false;
  let isSuccess = true;
  let isError = false;

  let content;

  // Filtering timetable and staff data

  // Show loading state while fetching data
  if (isLoading) {
    content = <Loading open={isLoading} />;
  }
  // Render the staff container if data is successfully fetched
  else if (isSuccess) {
    content = (
      <Grid container spacing={2}>
        <Grid item xs={12} lg={8}>
          <CardWrapper title="Time Table">
            <TimeTable data={timetable} />
          </CardWrapper>
        </Grid>
        <Grid item xs={12} lg={4}>
          <CardWrapper title="Staff Table">
            <StaffTable data={staff} />
          </CardWrapper>
        </Grid>
      </Grid>
    );
  }
  // Show error message if there's an error fetching data

  return content;
};
