import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import * as yup from "yup";
import { useFormik } from "formik";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styled from "@emotion/styled";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { UPDATE_BY_ID } from "../../../services/parents";
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
import { Password } from "@mui/icons-material";

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

  password: yup
    .string()
    .min(3, "Password must be at least 3 characters")
    .max(30, "Character limit exceeded")
    .required("Please enter your password"),
});

export const AddTutionTeacher = ({ subjectData }) => {
  const [isLoading, setisLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const context = useContext(eDairyContext);
  const { classes, setStudents, students, parents, childrens, user, setUser } =
    context;

  const [assignedChildrens, setAssignedChildrens] = useState([]);
  const handleChange = (event) => {
    setAssignedChildrens(event.target.value);
  };

  const updateClassSubject = (values) => {
    setisLoading(true);
    const newTTeacher = {
      ...values,
      role: "tutionTeacher",
      assignedChildrens: assignedChildrens,
    };
    // const updated = { id: user.id, tutionTeacher: [] };
    // updated.tutionTeacher = [...user?.tutionTeacher, newTTeacher];

    const updatedUser = {
      id: user.id,
      tutionTeacher: [...user.tutionTeacher, newTTeacher],
    };

    UPDATE_BY_ID(updatedUser)
      .then(async (response) => {
        toast.success(response.message);
        if (response?.data) {
          setUser(response.data);
        }
      })
      .catch((error) => {
        const errorMessage =
          error?.error?.message ||
          error?.data?.error?.message ||
          "An error occurred.";
        toast.error(errorMessage); // Show error message using toast
      })
      .finally(() => {
        setisLoading(false);
      });
  };
  const formik = useFormik({
    initialValues: {
      name: subjectData ? subjectData?.name : "",
      email: subjectData ? subjectData?.email : "",
      password: subjectData ? subjectData?.password : "",
    },
    validationSchema,
    onSubmit: (values) => {
      if (!assignedChildrens?.length) {
        toast.error("Atleast one children required");
        return;
      }
      updateClassSubject(values);
    },
  });

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <CardWrapper title={subjectData ? "Update " : "Add New "}>
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
            <StyledTextField
              required
              id="password"
              label="password"
              fullWidth
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.password && Boolean(formik.errors.password)}
            />
            <StyledTypography>
              {formik.touched.password && formik.errors.password
                ? formik.errors.password
                : ""}
            </StyledTypography>
          </Grid>
          <Grid item xs={12}>
            <InputLabel sx={{ width: "100%" }} id="demo-simple-select-label">
              Select Childrens
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={assignedChildrens}
              label="Section"
              onChange={handleChange}
              sx={{ width: "100%" }}
              multiple
            >
              {childrens &&
                childrens?.map((item) => {
                  return <MenuItem value={item.id}>{item.name}</MenuItem>;
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
            >
              Submit
            </Button>
          </Grid>
        </Grid>
      )}
    </CardWrapper>
  );
};
