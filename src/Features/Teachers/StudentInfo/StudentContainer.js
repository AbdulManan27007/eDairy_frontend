import React from "react";
import { useParams } from "react-router-dom";

import { useGetTeacherDataQuery } from "../teachersApiSlice";
import Loading from "../../../Components/Loading";
import Error from "../../../Components/Error";
import { TeacherCardWrapper } from "../../../Components/TeacherCardWrapper";
import { AddStudent } from "./AddStudent";
import { ViewStudents } from "./ViewStudents";
import { useState } from "react";
import SignUp from "../../Auth/Signup";

// Student Container
// Renders the studentsData based on the classId
export const StudentContainer = () => {
  const { classId } = useParams(); // Retrieve classId from the URL parameters

  // Fetch teacherData based on the classId
  const { data, isLoading, isSuccess, isError, error } =
    useGetTeacherDataQuery(classId);
  const [isNext, setIsNext] = useState(false);
  // Filtering Student Info
  const { studentInfo } = data || {};

  let content;

  // Show loading state while fetching data
  if (isLoading) {
    content = <Loading open={isLoading} />;
  }
  // Render the staff container if data is successfully fetched
  else if (isSuccess) {
    content = (
      <TeacherCardWrapper
        title="Student"
        dialogChildren={
          isNext ? (
            <AddStudent />
          ) : (
            <SignUp setIsNext={setIsNext} role="student" />
          )
        }
        children={<ViewStudents data={studentInfo} />}
      />
    );
  }
  // Show error message if there's an error fetching data
  else if (isError) {
    content = <Error error={error} />;
  }
  return content;
};
