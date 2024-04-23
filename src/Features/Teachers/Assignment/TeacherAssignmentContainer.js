import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { useGetTeacherDataQuery } from "../teachersApiSlice";
import Loading from "../../../Components/Loading";
import Error from "../../../Components/Error";
import { TeacherCardWrapper } from "../../../Components/TeacherCardWrapper";
import { AddAssignments } from "./AddAssignment";
import { ViewAssignments } from "./ViewAssignments";
import eDairyContext from "../../../context/eDairyContext";
import { GET_ALL } from "../../../services/E_Dairy";

// Assignment Container
// Renders the assignment based on the classId
export const TeacherAssignmentContainer = () => {
  const context = useContext(eDairyContext);
  const { e_dairies, sete_dairies, selectedSection, user } = context;
  const [isLoading, setisLoading] = useState(false);

  useEffect(() => {
    getalldaireis();
  }, []);

  const getalldaireis = async () => {
    const data = await GET_ALL();
    if (data.data) {
      if (user.role == "parent") {
        const ff = data.data.filter(
          (item) => item?.section?.id == selectedSection?.id
        );
        sete_dairies(ff);
      } else {
        sete_dairies(data.data);
      }
    }
  };

  let content;

  // Show loading state while fetching data
  if (isLoading) {
    content = <Loading open={isLoading} />;
  }
  // Render the staff container if data is successfully fetched

  content = (
    <TeacherCardWrapper
      title="E_Dairy"
      dialogChildren={<AddAssignments />}
      children={<ViewAssignments data={e_dairies} />}
    />
  );

  return content;
};
