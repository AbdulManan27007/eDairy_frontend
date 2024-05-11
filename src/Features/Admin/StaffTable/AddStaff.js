import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import * as yup from "yup";
import { useFormik } from "formik";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styled from "@emotion/styled";
import { Delete, Edit, Email } from "@mui/icons-material";
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
  phone: yup
    .string()
    .min(11, "Phone length should  11")
    .max(11, "Phone length should  11")
    .required("Contact info is required"),
});

export const AddStaff = ({ teacherUpdatedData }) => {
  const [isLoading, setisLoading] = useState(false);

  const context = useContext(eDairyContext);
  const { subjects, classes, teachers, setTeachers } = context;
  const [selectedClass, setSelectedClass] = useState(
    teacherUpdatedData ? teacherUpdatedData?.assigned[0]?.class : {}
  );

  const [selectedSubject, setSelectedSubject] = useState(
    teacherUpdatedData ? teacherUpdatedData?.assigned[0]?.subject : []
  );

  const handleChangeClass = (event) => {
    if (event.target.value) {
      const selectedItem = classes?.find(
        (item) => item?.name === event.target.value
      );
      setSelectedClass(selectedItem || {});
    } else {
      setSelectedClass({});
    }
  };

  const handleChangeSubject = (event) => {
    setSelectedSubject(event.target.value);
  };

  const addNewTeacher = (values) => {
    setisLoading(true);

    values.password = values.email;
    const body = {
      ...values,
      assigned: [
        {
          class: selectedClass.id,
          subject: selectedSubject,
        },
      ],
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
      ...values,
      id: teacherUpdatedData.id,
      assigned: [
        {
          class: selectedClass.id,
          subject: selectedSubject,
        },
      ],
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
      name: teacherUpdatedData ? teacherUpdatedData?.name : "",
      email: teacherUpdatedData ? teacherUpdatedData?.email : "",
      phone: teacherUpdatedData ? teacherUpdatedData?.phone : "",
      connectCubeId: "",
    },
    validationSchema,
    onSubmit: (values) => {
      if (!selectedClass?.name) {
        toast.error("Select a class first");
        return;
      }
      if (!selectedSubject?.length) {
        toast.error("Select a Subject first");
        return;
      }

      if (teacherUpdatedData) {
        updateClassSubject(values);
      } else {
        // Auth.signup(values.name, values.email, "txend1122")
        //   .then((user) => {
        //     values.connectCubeId = user?.user?.id;
        //     addNewTeacher(values);
        //   })
        //   .catch((er) => {
        //     console.log("chaterror", er);
        //   });
        addNewTeacher(values);
      }
    },
  });

  React.useEffect(() => {
    if (formik.values.phone) {
      const formattedValue = formik.values.phone
        .replace(/[^0-9]/g, "")
        .slice(0, 11); // Remove non-numeric characters and limit to 13 characters

      formik.setFieldValue("phone", formattedValue);
    }
  }, [formik.values.phone]);

  return (
    <CardWrapper
      title={teacherUpdatedData ? "Update Teacher" : "Add New Teacher"}
    >
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
              Assign Class
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={selectedClass?.name || ""}
              label="Section"
              onChange={handleChangeClass}
              sx={{ width: "100%" }}
            >
              {classes &&
                classes?.map((item) => {
                  return <MenuItem value={item.name}>{item.name}</MenuItem>;
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
            <InputLabel
              sx={{ width: "100%", height: "20px" }}
              id="demo-simple-select-label"
            >
              Subject for class {selectedClass.name}
            </InputLabel>

            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Subject"
              value={selectedSubject}
              onChange={handleChangeSubject}
              sx={{ width: "100%" }}
              multiple
            >
              {selectedClass &&
                selectedClass?.subject &&
                selectedClass?.subject?.map((item) => {
                  return <MenuItem value={item}>{item}</MenuItem>;
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
    </CardWrapper>
  );
};
