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
import Grid from "@mui/material/Unstable_Grid2";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import * as yup from "yup";
import { TextField } from "@mui/material";
import eDairyContext from "../../context/eDairyContext";
import { UPDATE_BY_ID_Admin } from "../../services/Admin";
import { UPDATE_BY_ID } from "../../services/Teachers";

const validationSchema = yup.object().shape({
  username: yup.string().min(3, "Please enter a valid username"),
});

export const AccountDetailsForm = ({ imageSrc }) => {
  const [isLoading, setisLoading] = React.useState(false);
  const context = React.useContext(eDairyContext);
  const { user, setUser } = context;

  const formik = useFormik({
    initialValues: {
      username: user?.username || "",
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
      profilePic: imageSrc,
      ...values,
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
        <CardHeader subheader="The information can be edited" title="Profile" />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid md={6} xs={12}>
              <TextField
                fullWidth
                id="username"
                name="username"
                label="username"
                value={formik.values.username}
                onChange={formik.handleChange}
                error={
                  formik.touched.username && Boolean(formik.errors.username)
                }
                helperText={formik.touched.username && formik.errors.username}
              />
            </Grid>
            <Grid md={6} xs={12}>
              <TextField
                fullWidth
                id="email"
                name="email"
                label="email"
                value={user?.email}
                onChange={() => {}}
                disabled
              />
            </Grid>
            <Grid md={6} xs={12}>
              <TextField
                fullWidth
                id="role"
                name="role"
                label="role"
                value={user?.role}
                onChange={() => {}}
                disabled
              />
            </Grid>

            {/* <Grid md={6} xs={12}>
              <FormControl fullWidth>
                <InputLabel>State</InputLabel>
                <Select
                  defaultValue="New York"
                  label="State"
                  name="state"
                  variant="outlined"
                >
                  {states.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid> */}
          </Grid>
        </CardContent>
        <Divider />
        <CardActions sx={{ justifyContent: "flex-end" }}>
          <Button type="submit" variant="contained">
            Save details
          </Button>
        </CardActions>
      </Card>
    </form>
  );
};
