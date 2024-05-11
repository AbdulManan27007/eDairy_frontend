import React, { useContext, useEffect, useState } from "react";
import { Box } from "@mui/material";

import Loading from "../../Components/Loading";
import { SummaryBox } from "../../Components/Boxes/SummaryBox";
import { Timetable } from "./Timetable";
import eDairyContext from "../../context/eDairyContext";
import { GET_ALL_students } from "../../services/Students";

const StudentDashboard = () => {
  const [isLoading, setisLoading] = React.useState(false);
  const context = useContext(eDairyContext);
  const { user, selectedChilren, setChildrens } = context;

  useEffect(() => {
    user?.id && getChildrens();
  }, []);

  const getChildrens = () => {
    GET_ALL_students({ parent: user.id }).then((resp) => {
      console.log(resp.data);
      if (resp?.data?.length) {
        setChildrens(resp.data);
      }
    });
  };

  let content;

  if (isLoading) {
    content = <Loading open={isLoading} />; // Show loading state while fetching data
  }
  // Render the staff container if data is successfully fetched
  else
    content = (
      <Box sx={{ mt: 2 }}>
        {selectedChilren && <SummaryBox />}
        {selectedChilren && <Timetable />}
      </Box>
    );

  // Show error message if there's an error fetching data

  return content;
};

export default StudentDashboard;
