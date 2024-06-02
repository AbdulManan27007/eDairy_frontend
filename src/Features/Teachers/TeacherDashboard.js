import React, { useContext, useEffect, useState } from "react";
import { Box, Card, Grid, List, Typography } from "@mui/material";
import Loading from "../../Components/Loading";
import { AttendanceCharts } from "../../Components/Boxes/AttendanceCharts";

import eDairyContext from "../../context/eDairyContext";
import { SummaryCardTeacher } from "../../Components/SummaryCardTeacher";

const TeacherDashboard = () => {
  const [isLoading, setisLoading] = React.useState(false);

  const context = useContext(eDairyContext);
  const {
    user,
    classes,
    setClasses,
    subjects,
    setSubjects,
    selectedClass,
    setSelectedClass,
  } = context;

  const [totalSubjectsLength, settotalSubjectsLength] = useState(0);

  useEffect(() => {
    if (user) {
      const allcls = user?.assigned?.map((item) => item?.class);
      setClasses(allcls);
      allcls?.length && setSelectedClass(allcls[0]);
      const allsubjects = user?.assigned?.map((item) => item?.subject) || [];
      const totalSubjectsLength = allsubjects.reduce(
        (acc, subject) => acc + (subject?.length || 0),
        0
      );
      settotalSubjectsLength(totalSubjectsLength);
    }
  }, [user]);

  let content;

  // Show loading state while fetching data
  if (isLoading) {
    content = <Loading open={isLoading} />;
  }
  // Render the staff container if data is successfully fetched
  else {
    content = (
      <Box sx={{ mt: 2 }}>
        <Grid container rowSpacing={3} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={12} sm={6} lg={6}>
            <SummaryCardTeacher
              title={"Total Assigned Classes"}
              icon={"Assignment"}
              color={"#44336f"}
              count={classes?.length}
            />
          </Grid>

          <Grid item xs={12} sm={6} lg={6}>
            <SummaryCardTeacher
              title={"Total Assigned Subjects"}
              icon={"TaskAlt"}
              color={"#4caf50"}
              count={totalSubjectsLength}
            />
          </Grid>
        </Grid>
        <AttendanceCharts data={selectedClass?.attendance || [{}]} />
      </Box>
    );
  }

  return content;
};
export default TeacherDashboard;
