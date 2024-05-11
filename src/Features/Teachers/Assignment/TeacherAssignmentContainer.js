import React, { useContext, useEffect, useState } from "react";

import Loading from "../../../Components/Loading";
import { TeacherCardWrapper } from "../../../Components/TeacherCardWrapper";
import { AddAssignments } from "./AddAssignment";
import { ViewAssignments } from "./ViewAssignments";
import eDairyContext from "../../../context/eDairyContext";
import { GET_ALL } from "../../../services/E_Dairy";

export const TeacherAssignmentContainer = () => {
  const context = useContext(eDairyContext);
  const { e_dairies, sete_dairies, selectedClass, user, selectedSubject } =
    context;
  const [isLoading, setisLoading] = useState(false);

  useEffect(() => {
    if (selectedClass?.id && selectedSubject) {
      getalldaireis({ class: selectedClass?.id, subject: selectedSubject });
    } else if (selectedClass?.id) {
      getalldaireis({ class: selectedClass?.id });
    } else if (user.role !== "parent") {
      getalldaireis({});
    }
  }, [selectedClass, selectedSubject]);

  const getalldaireis = async (obj) => {
    const data = await GET_ALL(obj);
    if (data?.data) {
      sete_dairies(data.data);
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
