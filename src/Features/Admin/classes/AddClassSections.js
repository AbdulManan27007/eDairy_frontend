import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import * as yup from "yup";
import { useFormik } from "formik";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  TextField,
  Button,
  Grid,
  Select,
  MenuItem,
  InputLabel,
} from "@mui/material";
import {
  CREATE_NEW,
  GET_ALL_section,
  UPDATE_BY_ID,
} from "../../../services/ClassSections";
import { CardWrapper } from "../../../Components/CardWrapper";
import Loading from "../../../Components/Loading";
import eDairyContext from "../../../context/eDairyContext";

// Define validation schema using yup
const validationSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
});

export const AddClassSections = ({ sectionData }) => {
  const context = useContext(eDairyContext);
  const { setClasses, classes, sections, setSections } = context;
  const [isLoading, setisLoading] = useState(false);
  const [selectedClass, setSelectedClass] = useState(
    sectionData ? sectionData.id : ""
  );
  const handleChange = (event) => {
    setSelectedClass(event.target.value);
  };
  const addNewSection = (values) => {
    setisLoading(true);
    const body = { class: selectedClass, ...values };

    CREATE_NEW(body)
      .then(async (response) => {
        const data = await GET_ALL_section();
        setSections(data.data);
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

  const updateClassSection = (values) => {
    setisLoading(true);

    const dataobj = { id: sectionData.id, ...values };
    UPDATE_BY_ID(dataobj)
      .then(async (response) => {
        const data = await GET_ALL_section();
        setSections(data.data);
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
      name: sectionData ? sectionData.name : "",
    },
    validationSchema,
    onSubmit: (values) => {
      if (!selectedClass) {
        toast.error("Select a class first");
        return;
      }
      sectionData ? updateClassSection(values) : addNewSection(values);
    },
  });

  return (
    <CardWrapper title={sectionData ? " Update Section" : "Add New Section"}>
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
          {/* ------------- Name ------------- */}

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
            <TextField
              fullWidth
              id="name"
              name="name"
              label="Name of the Section"
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
              // Disable the button when submitting the form
            >
              Submit
            </Button>
          </Grid>
        </Grid>
      )}
    </CardWrapper>
  );
};
