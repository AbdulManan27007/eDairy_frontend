import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import * as yup from "yup";
import { useFormik } from "formik";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styled from "@emotion/styled";

import {
  CREATE_NEW,
  GET_ALL_students,
  UPDATE_BY_ID,
} from "../../../services/Students";
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
  Dialog,
  DialogContent,
} from "@mui/material";
import { AddParent } from "./AddParent";

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
});

export const AddStudent = ({ subjectData }) => {
  const [isLoading, setisLoading] = useState(false);

  const context = useContext(eDairyContext);
  const {
    subjects,
    classes,
    sections,
    setStudents,
    students,
    parents,
    setParents,
  } = context;
  const [classSections, setClassSections] = useState([]);
  const [sectionsSubjects, setSectionsSubjects] = useState([]);

  const [active, setActive] = useState(false);

  const [selectedClass, setSelectedClass] = useState(
    subjectData ? subjectData?.class?.id : ""
  );

  const [selectedParent, setSelectedParent] = useState(
    subjectData ? subjectData?.parent?.id : ""
  );

  const [selectedSection, setSelectedSection] = useState(
    subjectData ? subjectData?.section?.id : ""
  );

  const [selectedSubject, setSelectedSubject] = useState(
    subjectData ? subjectData?.subject?.id : ""
  );

  const [rollNumber, setRollNumber] = useState(null);

  useEffect(() => {
    if (selectedClass) {
      const filterSections = sections?.filter(
        (item) => item?.class?.id == selectedClass
      );
      setClassSections(filterSections);
    } else {
      setClassSections([]);
    }
  }, [selectedClass]);

  useEffect(() => {
    if (selectedSection) {
      const sectionStudents = students?.filter(
        (item) => item?.section?.id == selectedSection
      );
      setRollNumber(sectionStudents?.length ? sectionStudents?.length + 1 : 1);
    }
  }, [selectedSection]);

  const handleChangeParent = (event) => {
    setSelectedParent(event.target.value);
  };

  const handleChange = (event) => {
    setSelectedClass(event.target.value);

    if (event.target.value) {
      const filterSections = sections?.filter(
        (item) => item?.class?.id == event.target.value
      );
      setClassSections(filterSections);
    } else {
      setClassSections([]);
    }
    setSelectedSection("");
  };

  const handleChangeSection = (event) => {
    setSelectedSection(event.target.value);
  };

  const addNewSubject = (values) => {
    setisLoading(true);

    values.password = values.email;

    const body = {
      parent: selectedParent,
      class: selectedClass,
      section: selectedSection,
      rollNumber: rollNumber,
      ...values,
    };

    CREATE_NEW(body)
      .then(async (response) => {
        const data = await GET_ALL_students();
        data?.data && setStudents(data.data);
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
        const data = await GET_ALL_students();
        data?.data && setStudents(data.data);
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
      name: subjectData ? subjectData?.name : "",
      email: subjectData ? subjectData?.email : "",
    },
    validationSchema,
    onSubmit: (values) => {
      if (!selectedClass) {
        toast.error("Select a class first");
        return;
      }
      if (!selectedSection) {
        toast.error("Select a Section first");
        return;
      }

      if (!selectedParent) {
        toast.error("Select a Parent first");
        return;
      }

      subjectData ? updateClassSubject(values) : addNewSubject(values);
    },
  });

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setActive(false);
  };

  return (
    <CardWrapper title={subjectData ? "Update Student" : "Add New Student"}>
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

          {!subjectData && (
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="rollNumber"
                name="rollNumber"
                placeholder="Roll Number will be auto generated on section selection"
                value={rollNumber}
                onChange={() => {}}
                disabled
              />
            </Grid>
          )}
          <Grid
            item
            xs={12}
            sx={{
              height: "20px",
              display: "flex",
              gap: "20px",
              zIndex: 1,
            }}
          >
            <span
              style={{
                cursor: "pointer",
                fontSize: "15px",
                color: active ? "grey" : "blue",
              }}
              onClick={() => setActive(false)}
            >
              Select Existing
            </span>
            <span
              style={{
                cursor: "pointer",
                fontSize: "15px",
                color: active ? "blue" : "grey",
              }}
              onClick={() => {
                setActive(true);
                handleClickOpen();
              }}
            >
              Add New
            </span>
          </Grid>

          <Grid item xs={12}>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={selectedParent}
              label="Parent"
              onChange={handleChangeParent}
              sx={{ width: "100%" }}
            >
              {parents &&
                parents?.map((item) => {
                  return <MenuItem value={item.id}>{item.name}</MenuItem>;
                })}
            </Select>
          </Grid>

          <Grid item xs={12}>
            <InputLabel sx={{ width: "100%" }} id="demo-simple-select-label">
              Select A Class
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={selectedClass}
              label="Section"
              onChange={handleChange}
              sx={{ width: "100%" }}
            >
              {classes &&
                classes?.map((item) => {
                  return <MenuItem value={item.id}>{item.name}</MenuItem>;
                })}
            </Select>
          </Grid>

          <Grid item xs={12}>
            <InputLabel sx={{ width: "100%" }} id="demo-simple-select-label">
              Select A Section
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={selectedSection}
              label="Section"
              onChange={handleChangeSection}
              sx={{ width: "100%" }}
            >
              {classSections &&
                classSections?.map((item) => {
                  return <MenuItem value={item?.id}>{item?.name}</MenuItem>;
                })}
            </Select>
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
      <Dialog open={open} onClose={handleClose}>
        <DialogContent>
          <AddParent
            handleClose={handleClose}
            setActive={setActive}
            setSelectedParent={setSelectedParent}
          />
        </DialogContent>
      </Dialog>
    </CardWrapper>
  );
};
