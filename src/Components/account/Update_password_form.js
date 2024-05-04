import * as React from "react";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Divider from "@mui/material/Divider";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import Stack from "@mui/material/Stack";
import { UPDATE_BY_ID_Admin } from "../../services/Admin";
import { useFormik } from "formik";
import eDairyContext from "../../context/eDairyContext";
import { toast } from "react-toastify";
import * as yup from "yup";
import { TextField } from "@mui/material";
import { UPDATE_BY_ID } from "../../services/Teachers";
const validationSchema = yup.object().shape({
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(15, "Character limit exceeded")
    .required("Please enter your password")
    .matches(/\d/, "Password must contain atleast one number")
    .matches(
      /[!@#$%^&*(),.?":{}|<>]/,
      "Password must contain atleast one special character"
    ),

  confirmPassword: yup
    .string()
    .required("Please confirm your password")
    .oneOf([yup.ref("password"), null], "Passwords doesnot match"),
});

export const Update_password_form = () => {
  const [isLoading, setisLoading] = React.useState(false);
  const context = React.useContext(eDairyContext);
  const { user, setUser } = context;

  const formik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validationSchema,
    onSubmit: (values) => {
      updateUser(values);
    },
  });

  const updateUser = (values) => {
    setisLoading(true);
    const body = {
      id: user?.id || user?._id,
      password: values.password,
    };

    if (user?.role == "admin") {
      UPDATE_BY_ID_Admin(body)
        .then((response) => {
          toast.success("Updated");

          if (response?.data) {
            let update = { ...user };

            update.username = response?.data?.username;
            update.profilePic = response?.data?.profilePic;

            setUser(update);
          }
        })
        .catch((error) => {
          console.log("error", error);

          const errorMessage =
            error?.error?.message ||
            error?.data?.error?.message ||
            "An error occurred.";
          toast.error(errorMessage); // Show error message using toast
        });
    }
    if (user?.role == "teacher") {
      UPDATE_BY_ID(body)
        .then((response) => {
          toast.success("Updated");

          if (response?.data) {
            let update = { ...user };

            update.username = response?.data?.username;
            update.profilePic = response?.data?.profilePic;

            setUser(update);
          }
        })
        .catch((error) => {
          console.log("error", error);

          const errorMessage =
            error?.error?.message ||
            error?.data?.error?.message ||
            "An error occurred.";
          toast.error(errorMessage); // Show error message using toast
        });
    }

    setisLoading(false);
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      <Card sx={{ borderRadius: "20px" }}>
        <CardHeader subheader="Update password" title="Password" />
        <Divider />
        <CardContent>
          <Stack spacing={3} sx={{ maxWidth: "sm" }}>
            <TextField
              fullWidth
              id="password"
              name="password"
              label="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
            <TextField
              fullWidth
              id="confirmPassword"
              name="confirmPassword"
              label="confirmPassword"
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              error={
                formik.touched.confirmPassword &&
                Boolean(formik.errors.confirmPassword)
              }
              helperText={
                formik.touched.confirmPassword && formik.errors.confirmPassword
              }
            />
          </Stack>
        </CardContent>
        <Divider />
        <CardActions sx={{ justifyContent: "flex-end" }}>
          <Button type="submit" variant="contained">
            Update
          </Button>
        </CardActions>
      </Card>
    </form>
  );
};
