import React, { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import * as yup from "yup";
import { useFormik } from "formik";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { TextField, Button, Grid } from "@mui/material";
import {
  UPDATE_BY_ID,
  CREATE_NEW,
  GET_ALL_classes,
} from "../../../services/Classes";
import { CardWrapper } from "../../../Components/CardWrapper";
import Loading from "../../../Components/Loading";
import eDairyContext from "../../../context/eDairyContext";

// Define validation schema using yup
const validationSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
});

export const AddClass = ({ classData }) => {
  const context = useContext(eDairyContext);
  const { setClasses } = context;

  const [isLoading, setisLoading] = useState(false);

  const addNewClass = (values) => {
    setisLoading(true);
    CREATE_NEW(values)
      .then(async (response) => {
        const data = await GET_ALL_classes();
        data?.data && setClasses(data.data);
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

  const updateClass = (values) => {
    setisLoading(true);

    const dataobj = { id: classData.id, ...values };
    UPDATE_BY_ID(dataobj)
      .then(async (response) => {
        if (response.type == "success") {
          const data = await GET_ALL_classes();
          data?.data && setClasses(data.data);
          toast.success(response.message);
        }
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
      name: classData ? classData.name : "",
    },
    validationSchema,
    onSubmit: (values) => {
      classData ? updateClass(values) : addNewClass(values);
    },
  });

  return (
    <CardWrapper title={classData ? "Udate class" : "Add New Class"}>
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
            <TextField
              fullWidth
              id="name"
              name="name"
              label="Name of the Class"
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
