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
import Auth from "../../../services/auth-service";

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

  idCard: yup
    .string()
    .matches(/^\d{5}-\d{7}-\d$/, "Please enter a valid ID card address")
    .required("ID card info is required"),

  phone: yup
    .string()
    .min(11, "Phone length should  11")
    .max(11, "Phone length should  11")
    .required("Contact info is required"),
  address: yup
    .string()
    .min(5, "Please enter a valid Address address")
    .max(30, "Enter an alternate Address address")
    .required("Address info is required"),
});

export const AddParent = ({ subjectData }) => {
  const [isLoading, setisLoading] = useState(false);

  const context = useContext(eDairyContext);
  const { parents, setParents } = context;

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
      email: subjectData ? subjectData?.email : "",
      idCard: subjectData ? subjectData?.idCard : "",
      phone: subjectData ? subjectData?.phone : "",
      address: subjectData ? subjectData?.address : "",
      connectCubeId: "",
    },
    validationSchema,
    onSubmit: (values) => {
      if (subjectData) {
        updateClassSubject(values);
      } else {
        // Auth.signup(values.name, values.idCard, "txend1122")
        //   .then((user) => {
        //     console.log("chatuser>>>>>", user.user);
        //     values.connectCubeId = user?.user?.id;
        //     addNewSubject(values);
        //   })
        //   .catch((er) => {
        //     console.log("chaterror", er);
        //   });

        addNewSubject(values);
      }
    },
  });

  React.useEffect(() => {
    const formattedValue = formik.values.idCard
      .replace(/[^0-9]/g, "")
      .slice(0, 13); // Remove non-numeric characters and limit to 13 characters
    const formattedIdCard = formattedValue.replace(
      /(\d{5})(\d{7})(\d)/,
      "$1-$2-$3"
    ); // Insert hyphens after 5 and 7 digits
    formik.setFieldValue("idCard", formattedIdCard);
  }, [formik.values.idCard]);

  React.useEffect(() => {
    if (formik.values.phone) {
      const formattedValue = formik.values.phone
        .replace(/[^0-9]/g, "")
        .slice(0, 11); // Remove non-numeric characters and limit to 13 characters

      formik.setFieldValue("phone", formattedValue);
    }
  }, [formik.values.phone]);

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
