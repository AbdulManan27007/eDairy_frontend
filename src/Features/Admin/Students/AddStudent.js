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
  const { classes, setStudents, students, parents } = context;

  const [selectedClass, setSelectedClass] = useState(
    subjectData ? subjectData?.class?.id : ""
  );

  const [inputId, setInputId] = useState("");

  const [showList, setShowList] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  const [selectedParent, setSelectedParent] = useState(
    subjectData ? subjectData?.parent : {}
  );

  const [rollNumber, setRollNumber] = useState(null);

  useEffect(() => {
    if (selectedClass) {
      const sectionStudents = students?.filter(
        (item) => item?.class?.id == selectedClass
      );
      setRollNumber(sectionStudents?.length ? sectionStudents?.length + 1 : 1);
    }
  }, [selectedClass]);

  const handleChangeParent = (event) => {
    setSelectedParent(event.target.value);
  };

  const handleChange = (event) => {
    setSelectedClass(event.target.value);
  };

  const addNewSubject = (values) => {
    setisLoading(true);

    values.password = values.email;

    const body = {
      parent: selectedParent.id,
      class: selectedClass,
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
      if (!selectedParent) {
        toast.error("Parent required");
        return;
      }
      subjectData ? updateClassSubject(values) : addNewSubject(values);
    },
  });

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
          {!subjectData && (
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="rollNumber"
                name="rollNumber"
                placeholder="Roll Number will be auto generated on Class selection"
                value={rollNumber}
                onChange={() => {}}
                disabled
              />
            </Grid>
          )}
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
          {showSearch ? (
            <>
              <Grid
                item
                xs={12}
                sx={{
                  height: "20px",
                  display: "flex",
                  justifyContent: "space-between",
                  zIndex: 1,
                  paddingX: "10px",
                }}
              >
                <span
                  style={{
                    cursor: "pointer",
                    fontSize: "15px",
                  }}
                  onClick={() => {}}
                >
                  Parent
                </span>
                <span
                  style={{
                    cursor: "pointer",
                    fontSize: "15px",
                    color: "blue",
                  }}
                  onClick={() => {
                    setShowSearch(false);
                    setSelectedParent({});
                    setShowList(false);
                  }}
                >
                  change Parent
                </span>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="rollNumber"
                  name="rollNumber"
                  placeholder="Parent Name"
                  value={selectedParent?.name || ""}
                  onChange={() => {}}
                  disabled
                />
              </Grid>
            </>
          ) : (
            <Grid
              item
              xs={12}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                zIndex: 1,
                paddingX: "10px",
              }}
            >
              <TextField
                sx={{}}
                fullWidth
                placeholder="Search a parent by ID Card"
                value={inputId}
                onChange={(e) => setInputId(e.target.value)}
              />
              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  const foundParent = parents.find(
                    (parent) => parent.idCard === inputId
                  );
                  setSelectedParent(foundParent);
                  setShowList(true);
                  setInputId("");
                }}
              >
                Search
              </Button>
            </Grid>
          )}
          {showList && (
            <span
              onMouseEnter={(event) => {
                event.target.style.backgroundColor = "#f0f0f0"; // Light grey background on hover
              }}
              onMouseLeave={(event) => {
                event.target.style.backgroundColor = "transparent"; // Restore initial background color on mouse leave
              }}
              style={{ cursor: "pointer", width: "80%", marginLeft: "25px" }}
              onClick={() => {
                if (selectedParent?.name) {
                  setShowList(false);
                  setShowSearch(true);
                }
              }}
            >
              {selectedParent?.name
                ? selectedParent?.name
                : "  no parent found"}
            </span>
          )}

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
