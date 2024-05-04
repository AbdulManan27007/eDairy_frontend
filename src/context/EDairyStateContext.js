import { useState, useEffect } from "react";
import eDairyContext from "./eDairyContext";
import { GET_ALL_classes, GET_SINGLE_CLASS } from "../services/Classes";
import { GET_ALL_section } from "../services/ClassSections";
import { GET_ALL_SUBJECTS } from "../services/ClassSubjects";

import { toast } from "react-toastify";
import { GET_ALL_Teachers } from "../services/Teachers";
import { GET_ALL_students } from "../services/Students";
import { GET_ALL } from "../services/parents";
const EDairyStateContext = (props) => {
  const [user, setUser] = useState();

  const [students, setStudents] = useState([]);
  const [childrens, setChildrens] = useState([]);
  const [selectedChilren, setSelectedChildren] = useState({});

  const [parents, setParents] = useState([]);

  const [teachers, setTeachers] = useState([]);
  const [e_dairies, sete_dairies] = useState([]);

  const [classes, setClasses] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [sections, setSections] = useState([]);
  const [selectedClass, setSelectedClass] = useState({});
  const [selectedSection, setSelectedSection] = useState({});
  const [selectedSubject, setSelectedSubject] = useState("");

  const getInnitialAdminDashboardData = async () => {
    try {
      try {
        const data = await GET_ALL_classes();
        data && data?.data && setClasses(data.data);
      } catch (error) {}
      try {
        const dataSections = await GET_ALL_section();
        dataSections && dataSections?.data && setSections(dataSections.data);
      } catch (error) {}

      try {
        const data = await GET_ALL();
        data && data?.data && setParents(data?.data);
      } catch (error) {}

      try {
        const dataSubjects = await GET_ALL_SUBJECTS();
        dataSubjects && dataSubjects?.data && setSubjects(dataSubjects.data);
      } catch (error) {}

      try {
        const dataTeachers = await GET_ALL_Teachers();
        dataTeachers && dataTeachers?.data && setTeachers(dataTeachers.data);
      } catch (error) {}

      try {
        const dataStudents = await GET_ALL_students();
        dataStudents && dataStudents?.data && setStudents(dataStudents.data);
      } catch (error) {}
    } catch (error) {
      const errorMessage =
        error?.error?.message ||
        error?.data?.error?.message ||
        "An error occurred.";
      toast.error(errorMessage);
    } finally {
    }
  };

  return (
    <eDairyContext.Provider
      value={{
        user,
        setUser,
        students,
        setStudents,
        teachers,
        setTeachers,
        classes,
        setClasses,
        subjects,
        setSubjects,
        sections,
        setSections,
        selectedClass,
        setSelectedClass,
        selectedSection,
        setSelectedSection,
        getInnitialAdminDashboardData,
        parents,
        setParents,
        e_dairies,
        sete_dairies,
        selectedSubject,
        setSelectedSubject,
        childrens,
        setChildrens,
        selectedChilren,
        setSelectedChildren,
      }}
    >
      {props.children}
    </eDairyContext.Provider>
  );
};
export default EDairyStateContext;
