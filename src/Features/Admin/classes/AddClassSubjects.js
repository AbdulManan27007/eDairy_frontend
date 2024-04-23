import React, { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import * as yup from "yup";
import { useFormik } from "formik";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  CREATE_NEW,
  GET_ALL_SUBJECTS,
  UPDATE_BY_ID,
} from "../../../services/ClassSubjects";
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
} from "@mui/material";

// Define validation schema using yup
const validationSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  code: yup.string().required("code is required"),
});

export const AddClassSubjects = ({ subjectData }) => {
  const [isLoading, setisLoading] = useState(false);

  const context = useContext(eDairyContext);
  const { subjects, setSubjects, classes, sections } = context;
  const [classSections, setClassSections] = useState(sections || []);

  const [selectedClass, setSelectedClass] = useState(
    subjectData ? subjectData?.class?.id : ""
  );

  const [selectedSection, setSelectedSection] = useState(
    subjectData ? subjectData?.section?.id : ""
  );

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

    const body = { class: selectedClass, section: selectedSection, ...values };

    CREATE_NEW(body)
      .then(async (response) => {
        const data = await GET_ALL_SUBJECTS();
        setSubjects(data.data);
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
        const data = await GET_ALL_SUBJECTS();
        setSubjects(data.data);
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
      if (!selectedClass) {
        toast.error("Select a class first");
        return;
      }
      if (!selectedSection) {
        toast.error("Select a Section first");
        return;
      }

      subjectData ? updateClassSubject(values) : addNewSubject(values);
    },
  });

  return (
    <CardWrapper title={subjectData ? "Update Subjects" : "Add New Subjects"}>
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

          {/* ------------- Name ------------- */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              id="code"
              name="code"
              label="Code of the Subject"
              value={formik.values.code}
              onChange={formik.handleChange}
              error={formik.touched.code && Boolean(formik.errors.code)}
              helperText={formik.touched.code && formik.errors.code}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              id="name"
              name="name"
              label="Name of the Subject"
              value={formik.values.name}
              onChange={formik.handleChange}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
            />
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
