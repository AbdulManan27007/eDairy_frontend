import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import * as yup from "yup";
import { useFormik } from "formik";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styled from "@emotion/styled";
import { Delete, Edit } from "@mui/icons-material";
import {
  CREATE_NEW,
  GET_ALL_Teachers,
  UPDATE_BY_ID,
} from "../../../services/Teachers";
import { CardWrapper } from "../../../Components/CardWrapper";
import Loading from "../../../Components/Loading";
import eDairyContext from "../../../context/eDairyContext";

import {
  TextField,
  Button,
  Grid,
  Select,
  MenuItem,
  InputLabel,
  Typography,
  IconButton,
} from "@mui/material";

const StyledTextField = styled(TextField)(() => ({}));

const StyledTypography = styled(Typography)(() => ({
  color: "red",
}));

// Define validation schema using yup
const validationSchema = yup.object().shape({
  name: yup
    .string()
    .min(3, "Please enter a valid name")
    .required("Please enter your name"),

  email: yup
    .string()
    .min(5, "Please enter a valid email address")
    .max(30, "Enter an alternate email address")
    .required("Please provide a email address")
    .matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, "Invalid format"),
  phone: yup.string().required("Contact info is required"),
});

export const AddStaff = ({ subjectData }) => {
  const [isLoading, setisLoading] = useState(false);

  const context = useContext(eDairyContext);
  const { subjects, classes, sections, teachers, setTeachers } = context;
  const [selectedClass, setSelectedClass] = useState(
    subjectData ? subjectData?.class : []
  );

  const [selectedSection, setSelectedSection] = useState(
    subjectData ? subjectData?.section : []
  );

  const [selectedSubject, setSelectedSubject] = useState(
    subjectData ? subjectData?.subject : []
  );

  const [clickedSection, setClickedSection] = useState("");
  const [clickedSubject, setClickedSubject] = useState("");

  const handleChangeClass = (event) => {
    setSelectedClass(event.target.value);
  };

  const handleChangeSection = (event) => {
    setTimeout(() => {
      const prev = selectedSection?.filter((sec) => sec?.id !== clickedSection);
      const combinedSections = [...prev, ...event.target.value];
      const uniqueSections = combinedSections.reduce((unique, section) => {
        const existingSection = unique.find((item) => item.id === section.id);
        if (!existingSection) {
          unique.push(section);
        }
        return unique;
      }, []);
      setSelectedSection(uniqueSections);
    }, 100);
  };

  const handleChangeSubject = (event) => {
    setTimeout(() => {
      const prev = selectedSubject?.filter((sec) => sec?.id !== clickedSubject);
      const combinedSections = [...prev, ...event.target.value];
      const uniqueSubjects = combinedSections.reduce((unique, section) => {
        const existingSection = unique.find((item) => item.id === section.id);
        if (!existingSection) {
          unique.push(section);
        }
        return unique;
      }, []);
      setSelectedSubject(uniqueSubjects);
    }, 100);
  };

  const addNewSubject = (values) => {
    setisLoading(true);

    values.password = values.email;

    const allClasses = selectedClass.map((item) => item.id);
    const allSections = selectedSection.map((item) => item.id);
    const allSubjects = selectedSubject.map((item) => item.id);

    const body = {
      class: allClasses,
      section: allSections,
      subject: allSubjects,
      ...values,
    };

    CREATE_NEW(body)
      .then(async (response) => {
        const data = await GET_ALL_Teachers();
        data.data && setTeachers(data.data);
        toast.success(response.message);
      }) // Show success message using toast
      .catch((error) => {
        const errorMessage =
          error?.error?.message ||
          error?.data?.error?.message ||
          "An error occurred.";
        toast.error(errorMessage); // Show error message using toast
      });

    setisLoading(false);
  };
  const updateClassSubject = (values) => {
    setisLoading(true);
    const body = {
      id: subjectData.id,
      class: selectedClass,
      section: selectedSection,
      ...values,
    };

    UPDATE_BY_ID(body)
      .then(async (response) => {
        const data = await GET_ALL_Teachers();
        data.data && setTeachers(data.data);
        toast.success(response.message);
      })
      .catch((error) => {
        const errorMessage =
          error?.error?.message ||
          error?.data?.error?.message ||
          "An error occurred.";
        toast.error(errorMessage); // Show error message using toast
      });

    setisLoading(false);
  };
  const formik = useFormik({
    initialValues: {
      code: subjectData ? subjectData?.code : "",
      name: subjectData ? subjectData?.name : "",
    },
    validationSchema,
    onSubmit: (values) => {
      if (!selectedClass?.length) {
        toast.error("Select a class first");
        return;
      }
      if (!selectedSection?.length) {
        toast.error("Select a Section first");
        return;
      }

      if (!selectedSubject?.length) {
        toast.error("Select a Subject first");
        return;
      }
      subjectData ? updateClassSubject(values) : addNewSubject(values);
    },
  });

  const handleClickMenue = (itemId) => {
    setClickedSection(itemId);
  };

  const handleClickMenueSubject = (itemId) => {
    setClickedSubject(itemId);
  };

  return (
    <CardWrapper title={subjectData ? "Update Teacher" : "Add New Teacher"}>
      <ToastContainer /> {/* Container for displaying toast messages */}
      {isLoading ? (
        <Loading open={isLoading} /> // Show loading indicator while submitting data
      ) : (
        <Grid
          container
          component="form"
          direction="row"
          alignItems="center"
          flexWrap="wrap"
          spacing={3}
          onSubmit={formik.handleSubmit}
        >
          <Grid item xs={12}>
            <StyledTextField
              required
              id="name"
              label="name"
              fullWidth
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.name && Boolean(formik.errors.name)}
            />
            <StyledTypography>
              {formik.touched.name && formik.errors.name
                ? formik.errors.name
                : ""}
            </StyledTypography>
          </Grid>

          <Grid item xs={12}>
            <StyledTextField
              required
              id="email"
              label="E-mail"
              fullWidth
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.email && Boolean(formik.errors.email)}
            />
            <StyledTypography>
              {formik.touched.email && formik.errors.email
                ? formik.errors.email
                : ""}
            </StyledTypography>
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              id="phone"
              name="phone"
              label="Contact Info"
              value={formik.values.phone}
              onChange={formik.handleChange}
              error={formik.touched.phone && Boolean(formik.errors.phone)}
              helperText={formik.touched.phone && formik.errors.phone}
            />
          </Grid>

          <Grid item xs={12}>
            <InputLabel sx={{ width: "100%" }} id="demo-simple-select-label">
              Select Classes
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={selectedClass}
              label="Section"
              onChange={handleChangeClass}
              sx={{ width: "100%" }}
              multiple
            >
              {classes &&
                classes?.map((item) => {
                  return <MenuItem value={item}>{item.name}</MenuItem>;
                })}
            </Select>
          </Grid>

          <Grid
            item
            xs={12}
            sx={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",

              justifyContent: "space-between",
            }}
          >
            {selectedClass.length ? (
              selectedClass.map((cls) => {
                const filterSections = sections?.filter(
                  (sec) => sec?.class?.id == cls.id
                );

                const selSections = selectedSection?.filter(
                  (sec) => sec?.class?.id == cls?.id
                );

                return (
                  <div
                    style={{
                      width: "45%",
                      display: "flex",
                      flexDirection: "column",
                      marginBottom: "10px",
                    }}
                  >
                    <InputLabel
                      sx={{ width: "100%", height: "20px" }}
                      id="demo-simple-select-label"
                    >
                      Sections of class {cls.name}
                    </InputLabel>

                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      label="Section"
                      onChange={handleChangeSection}
                      sx={{ width: "100%" }}
                      value={selSections}
                      multiple
                    >
                      {filterSections &&
                        filterSections?.map((item) => {
                          return (
                            <MenuItem
                              onClick={() => handleClickMenue(item?.id)}
                              value={item}
                            >
                              {item?.name}
                            </MenuItem>
                          );
                        })}
                    </Select>
                  </div>
                );
              })
            ) : (
              <></>
            )}
          </Grid>
          <Grid
            item
            xs={12}
            sx={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",

              justifyContent: "space-between",
            }}
          >
            {selectedSection.length ? (
              selectedSection.map((sect) => {
                const filterSubjects = subjects?.filter(
                  (sec) => sec?.section?.id == sect.id
                );

                const selSections = selectedSubject?.filter(
                  (sec) => sec?.section?.id == sect?.id
                );

                return (
                  <div
                    style={{
                      width: "45%",
                      display: "flex",
                      flexDirection: "column",
                      marginBottom: "10px",
                    }}
                  >
                    <InputLabel
                      sx={{ width: "100%", height: "20px" }}
                      id="demo-simple-select-label"
                    >
                      Subject of Section ({sect.name})
                    </InputLabel>

                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      label="Subject"
                      value={selSections}
                      onChange={handleChangeSubject}
                      sx={{ width: "100%" }}
                      multiple
                    >
                      {filterSubjects &&
                        filterSubjects?.map((item) => {
                          return (
                            <MenuItem
                              onClick={() => handleClickMenueSubject(item?.id)}
                              value={item}
                            >
                              {item?.name}
                            </MenuItem>
                          );
                        })}
                    </Select>
                  </div>
                );
              })
            ) : (
              <></>
            )}
          </Grid>

          {/* ----------- Contact Info -------------- */}

          <Grid item xs={12} textAlign="center">
            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{ width: "100%" }}
              disabled={formik.isSubmitting} // Disable the button when submitting the form
            >
              Submit
            </Button>
          </Grid>
        </Grid>
      )}
    </CardWrapper>
  );
};
