import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Card, Grid, List, Typography } from "@mui/material";

import { useGetTeacherDataQuery } from "./teachersApiSlice";
import Loading from "../../Components/Loading";
import Error from "../../Components/Error";
import { SummaryBox } from "../../Components/Boxes/SummaryBox";
import { AttendanceCharts } from "../../Components/Boxes/AttendanceCharts";
import { ResultsChart } from "../../Components/Boxes/ResultsChart";
import { TimeTableBox } from "./TimeTable/TimeTableBox";
import eDairyContext from "../../context/eDairyContext";
import CardsData from "../../Data/SummaryCards.json";
import { SummaryCard } from "../../Components/SummaryCard";
import { SummaryCardTeacher } from "../../Components/SummaryCardTeacher";
import SelectSectionComp from "../../Components/selectDropDownOther/SelectSectionComp";
import SelectClassComp from "../../Components/selectDropDownOther/SelectClassComp";
import ViewList from "./ViewList";

const TeacherDashboard = () => {
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
  } = context;

  useEffect(() => {
    setClasses(user?.class);
    setSections(user?.section);
    setSubjects(user?.subject);
  });

  const [classSectionsTeacher, setclassSectionsTeacher] = useState(
    sections || []
  );

  useEffect(() => {
    if (selectedClass?.id) {
      const filterSections = sections?.filter(
        (item) => item?.class == selectedClass?.id
      );
      setclassSectionsTeacher(filterSections);
    } else {
      setclassSectionsTeacher(sections);
    }
  }, [selectedClass]);

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
          <Grid item xs={12} sm={6} lg={3}>
            <SummaryCardTeacher
              title={"Total Classes"}
              icon={"Assignment"}
              color={"#44336f"}
              count={classes?.length}
            />
          </Grid>
          <Grid item xs={12} sm={6} lg={3}>
            <SummaryCardTeacher
              title={"Total Sections"}
              icon={"LibraryBooks"}
              color={"#03a9f4"}
              count={sections?.length}
            />
          </Grid>{" "}
          <Grid item xs={12} sm={6} lg={3}>
            <SummaryCardTeacher
              title={"All Subjects"}
              icon={"TaskAlt"}
              color={"#4caf50"}
              count={subjects?.length}
            />
          </Grid>
          <Grid item xs={12} sm={6} lg={3}>
            <SummaryCardTeacher
              title={"Others"}
              icon={"LocalLibrary"}
              color={"#e91e63"}
              count={subjects?.length}
            />
          </Grid>
        </Grid>

        <Grid container rowSpacing={3} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={12} sm={6} lg={3}>
            <Card
              sx={{ borderRadius: "20px", padding: "20px", marginTop: "20px" }}
            >
              <Typography
                sx={{
                  color: "#44336f",
                  fontSize: "1rem",
                  fontWeight: "600",
                  paddind: "20px",
                  borderBottom: "1px solid #44336f",
                }}
              >
                Classes
              </Typography>
              <List
                sx={{
                  width: "100%",
                  maxWidth: 360,
                  bgcolor: "background.paper",
                }}
              >
                {classes &&
                  classes.map((item, index) => {
                    return (
                      <ViewList
                        title={item.name}
                        data={item.createdAt}
                        Icon={"class"}
                      />
                    );
                  })}
              </List>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} lg={3}>
            <Card
              sx={{ borderRadius: "20px", padding: "20px", marginTop: "20px" }}
            >
              <Typography
                sx={{
                  color: "#03a9f4",
                  fontSize: "1rem",
                  fontWeight: "600",
                  paddind: "20px",
                  borderBottom: "1px solid #44336f",
                }}
              >
                Sections
              </Typography>
              <List
                sx={{
                  width: "100%",
                  maxWidth: 360,
                  bgcolor: "background.paper",
                }}
              >
                {classSectionsTeacher &&
                  classSectionsTeacher?.map((item, index) => {
                    return (
                      <ViewList
                        title={item.name}
                        date={item.createdAt}
                        Icon={"class"}
                      />
                    );
                  })}
              </List>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} lg={3}>
            <Card
              sx={{ borderRadius: "20px", padding: "20px", marginTop: "20px" }}
            >
              <Typography
                sx={{
                  color: "#4caf50",
                  fontSize: "1rem",
                  fontWeight: "600",
                  paddind: "20px",
                  borderBottom: "1px solid #44336f",
                }}
              >
                Subjects
              </Typography>
              <List
                sx={{
                  width: "100%",
                  maxWidth: 360,
                  bgcolor: "background.paper",
                }}
              >
                {subjects &&
                  subjects?.map((item, index) => {
                    return (
                      <ViewList
                        title={item.name}
                        data={item.createdAt}
                        Icon={"class"}
                      />
                    );
                  })}
              </List>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} lg={3}></Grid>
        </Grid>
        {/* <AttendanceCharts data={attendance} /> */}
        {/* <ResultsChart data={results} students={totalStudents} /> */}
        {/* <TimeTableBox /> */}
      </Box>
    );
  }
  // Show error message if there's an error fetching data

  return content;
};
export default TeacherDashboard;
