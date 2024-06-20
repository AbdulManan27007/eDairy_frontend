import React, { useContext, useEffect, useState } from "react";

import Loading from "../../../Components/Loading";
import { AdminCardWrapper } from "../../../Components/AdminCardWrapper";
import { TimeTable } from "../../../Components/TimeTable";
import { UpdateTimetable } from "./UpdateTimetable";
import eDairyContext from "../../../context/eDairyContext";

// TimeTableContainer component
// Renders the TimeTable container based on the classId
export const AdminTimeTable = () => {
  const [isLoading, setisLoading] = useState(false);

  const context = useContext(eDairyContext);
  const { selectedClass } = context;

  const [timetable, settimetable] = useState([]);

  useEffect(() => {
    if (selectedClass?.timeTable) {
      settimetable(selectedClass?.timeTable);
    } else {
      settimetable([]);
    }
  }, [selectedClass]);

  let content;
  // Show loading state while fetching data
  if (isLoading) {
    content = <Loading open={isLoading} />;
  }
  // Render the staff container if data is successfully fetched

  content = (
    <AdminCardWrapper
      title="Time Table"
      dialogChildren={<UpdateTimetable data={timetable} />}
      children={<TimeTable data={timetable} />}
    />
  );

  // Show error message if there's an error fetching data

  return content;
};
