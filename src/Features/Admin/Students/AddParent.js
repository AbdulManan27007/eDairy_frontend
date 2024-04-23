import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import * as yup from "yup";
import { useFormik } from "formik";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styled from "@emotion/styled";

import { CREATE_NEW, GET_ALL, UPDATE_BY_ID } from "../../../services/parents";
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

  idCard: yup
    .string()
    .min(5, "Please enter a valid idCard address")
    .max(20, "Enter an alternate idCard address")
    .required("idCard info is required"),

  phone: yup
    .string()
    .min(5, "Please enter a valid phone address")
    .max(15, "Enter an alternate phone address")
    .required("Contact info is required"),
  address: yup
    .string()
    .min(5, "Please enter a valid Address address")
    .max(30, "Enter an alternate Address address")
    .required("Address info is required"),
});

export const AddParent = ({
  subjectData,
  handleClose,
  setActive,
  setSelectedParent,
}) => {
  const [isLoading, setisLoading] = useState(false);

  const context = useContext(eDairyContext);
  const { subjects, classes, sections, parents, setParents } = context;

  const addNewSubject = (values) => {
    setisLoading(true);
    values.password = values.idCard;
    const body = {
      ...values,
    };

    CREATE_NEW(body)
      .then(async (response) => {
        const data = await GET_ALL();
        setParents(data.data);
        toast.success(response.message);
        setSelectedParent(response?.data?.id);
        handleClose();
        setActive(false);
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
      ...values,
    };

    UPDATE_BY_ID(body)
      .then(async (response) => {
        const data = await GET_ALL();
        setParents(data.data);
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
      idCard: subjectData ? subjectData?.idCard : "",
      phone: subjectData ? subjectData?.phone : "",
      address: subjectData ? subjectData?.address : "",
    },
    validationSchema,
    onSubmit: (values) => {
      subjectData ? updateClassSubject(values) : addNewSubject(values);
    },
  });

  return (
    <CardWrapper title={subjectData ? "Update Parent" : "Add New Parent"}>
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
            <TextField
              fullWidth
              id="idCard"
              name="idCard"
              label="ID-Card"
              value={formik.values.idCard}
              onChange={formik.handleChange}
              error={formik.touched.idCard && Boolean(formik.errors.idCard)}
              helperText={formik.touched.idCard && formik.errors.idCard}
            />
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
            <TextField
              fullWidth
              id="address"
              name="address"
              label="address Info"
              value={formik.values.address}
              onChange={formik.handleChange}
              error={formik.touched.address && Boolean(formik.errors.address)}
              helperText={formik.touched.address && formik.errors.address}
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
