import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import * as yup from "yup";
import { useFormik } from "formik";
import styled from "@emotion/styled";
import {
  Box,
  Button,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import Logo from "../../Assets/Images/logo.png";

import DashboardImage2 from "../../Assets/Images/Dashboard 2.png";

import Background from "../../Assets/background.png";
import Banner from "../../Assets/login-banner.png";

import { LoginAdmin } from "../../services/Admin";
import eDairyContext from "../../context/eDairyContext";
import { LoginParent, tutionTeacher } from "../../services/parents";
import { LoginTeacher } from "../../services/Teachers";
import Auth from "../../services/auth-service";

// Form Styling
// Custom Styled TextField Component
const StyledTextField = styled(TextField)(() => ({
  margin: "10px",
}));
const StyledTypography = styled(Typography)(() => ({
  color: "red",
  wordWrap: "break-word",
  maxWidth: "250px",
}));

// Validation Schema
const LoginValidationSchema = yup.object({
  email: yup.string().nullable().optional(),
  idCard: yup.string().nullable().optional(),

  password: yup
    .string()
    .min(3, "Password must be at least 3 characters")
    .max(30, "Character limit exceeded")
    .required("Please enter your password"),
});

// Login Form
const Login = () => {
  const navigate = useNavigate();
  const context = useContext(eDairyContext);
  const { user, setUser, setChildrens } = context;

  // Formik configuration
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      idCard: "",
    },
    validationSchema: LoginValidationSchema,
    onSubmit: (values) => {
      loginUser(values); // Call updateStaff function to handle form submission
    },
  });

  // Auth Login Function
  const loginUser = (credentials) => {
    if (selectedRole == "admin") {
      adminLogin(credentials);
    } else if (selectedRole == "parent") {
      ParentLogin(credentials);
    } else if (selectedRole == "teacher") {
      teacherLogin(credentials);
    } else if (selectedRole == "tutionTeacher") {
      tutionTeacherLogin(credentials);
    } else {
      toast.error("select role first");
    }
  };

  const adminLogin = async (credentials) => {
    LoginAdmin(credentials)
      .then((data) => {
        Auth.login("ediaryAdmin@gmail.com", "txend1122")
          .then((userCredentials) => {
            let chatCredentials = {
              userId: userCredentials.userInfo.id,
              password: { token: userCredentials.password },
            };
            console.log("userCredentials.userInfo", userCredentials.userInfo);
            context.connectToChat(chatCredentials);
          })
          .catch((error) => {
            console.log(error);
            alert("No such user");
          });

        return data?.data;
      })

      .then((user) => {
        localStorage.setItem("access_token", user?.accessToken);
        localStorage.setItem("id", user?.id);
        setUser(user);
        navigate(`/dashboard/${user.role}/home`);
      })
      .catch((error) => {
        console.log("error", error);
        const errorMessage =
          error?.error?.message ||
          error?.data?.error?.message ||
          "An error occurred.";
        toast.error(errorMessage); // Show error message using toast
      });
  };
  const teacherLogin = async (credentials) => {
    LoginTeacher(credentials)
      .then((data) => {
        Auth.login(credentials.email, "txend1122")
          .then((userCredentials) => {
            let chatCredentials = {
              userId: userCredentials.userInfo.id,
              password: { token: userCredentials.password },
            };
            console.log("userCredentials.userInfo", userCredentials.userInfo);
            context.connectToChat(chatCredentials);
          })
          .catch((error) => {
            console.log(error);
          });

        return data?.data;
      })

      .then((user) => {
        localStorage.setItem("access_token", user?.accessToken);
        localStorage.setItem("id", user?.id);
        setUser(user);
        navigate(`/dashboard/${user.role}/home`);
      })
      .catch((error) => {
        console.log("error", error);
        const errorMessage =
          error?.error?.message ||
          error?.data?.error?.message ||
          "An error occurred.";
        toast.error(errorMessage); // Show error message using toast
      });
  };
  const ParentLogin = async (credentials) => {
    LoginParent(credentials)
      .then((data) => {
        Auth.login(credentials.idCard, "txend1122")
          .then((userCredentials) => {
            let chatCredentials = {
              userId: userCredentials.userInfo.id,
              password: { token: userCredentials.password },
            };
            console.log("userCredentials.userInfo", userCredentials.userInfo);
            context.connectToChat(chatCredentials);
          })
          .catch((error) => {
            console.log(error);
          });

        return data?.data;
      })

      .then((user) => {
        localStorage.setItem("access_token", user?.accessToken);
        localStorage.setItem("id", user?.id);
        setUser(user);
        navigate(`/dashboard/${user.role}/home`);
      })
      .catch((error) => {
        console.log("error", error);
        const errorMessage =
          error?.error?.message ||
          error?.data?.error?.message ||
          "An error occurred.";
        toast.error(errorMessage); // Show error message using toast
      });
  };

  const tutionTeacherLogin = async (credentials) => {
    tutionTeacher(credentials)
      .then((data) => {
        return data?.data;
      })
      .then((resp) => {
        localStorage.setItem("access_token", resp?.user?.accessToken);
        localStorage.setItem("id", resp?.user?.id);
        setUser(resp?.user);
        setChildrens(resp.childrens);
        navigate(`/dashboard/${resp.user.role}/home`);
      })
      .catch((error) => {
        console.log("error", error);
        const errorMessage =
          error?.error?.message ||
          error?.data?.error?.message ||
          "An error occurred.";
        toast.error(errorMessage); // Show error message using toast
      });
  };
  // For viewing or hiding password input field
  const [showPassword, setShowPassword] = useState(false);
  const [roles, setRoles] = useState([
    "parent",
    "admin",
    "teacher",
    "tutionTeacher",
  ]);
  const [selectedRole, setselectedRole] = useState("admin");

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleChangeRole = (e) => {
    setselectedRole(e.target.value);
  };

  return (
    // Login layout

    <div
      className="grid grid-cols-2 max-sm:grid-cols-1 max-md:grid-cols-1 h-screen relative"
      style={{ maxWidth: "100vw", overflow: "hidden" }}
    >
      <div
        style={{ backgroundImage: `url(${Background})` }}
        className="h-full bg-cover flex justify-center items-center max-sm:hidden max-md:hidden"
      >
        <div className="flex flex-col items-center">
          <img
            style={{ width: "200px", height: "200px" }}
            src={DashboardImage2}
            alt=".."
            className="mb-5"
          />
          <img src={Banner} alt=".." />
        </div>
      </div>

      <div className="flex justify-center items-center">
        <Paper
          sx={{
            p: 3,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <ToastContainer /> {/* Container for displaying toast messages */}
          {/* --- Logo ---- */}
          <Box sx={{ m: 2 }}>
            <img src={Logo} alt="logo" height="70" width="70" />
          </Box>
          <Typography component="h1" variant="h5">
            Welcome
          </Typography>
          <Typography component="h1" variant="subtitle1">
            Login to your dashboard
          </Typography>
          {/* ---Form--- */}
          <Box
            component="form"
            sx={{
              m: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
            onSubmit={formik.handleSubmit}
          >
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={selectedRole}
              name="Role"
              label="Role"
              onChange={handleChangeRole}
              fullWidth
            >
              {roles &&
                roles.map((item) => {
                  return <MenuItem value={item}>{item}</MenuItem>;
                })}
            </Select>

            {/* ---- E-mail ---- */}
            {selectedRole == "parent" ? (
              <StyledTextField
                required
                id="idCard"
                label="ID_Card"
                fullWidth
                name="idCard"
                value={formik.values.idCard}
                onChange={formik.handleChange}
              />
            ) : (
              <StyledTextField
                required
                id="email"
                label="E-mail"
                fullWidth
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
              />
            )}

            {/* ------- Password ---- */}
            <StyledTextField
              required
              fullWidth
              id="password"
              label="Password"
              type={showPassword ? "text" : "password"}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <StyledTypography>
              {formik.touched.password && formik.errors.password
                ? formik.errors.password
                : ""}
            </StyledTypography>

            {/* ----Login Buton----- */}
            <Button variant="contained" type="submit" sx={{ m: 2 }} fullWidth>
              Login
            </Button>
          </Box>
          {/* ----External Links----- */}
          <Box>
            {/* --- Forgot Password --- */}
            {/* <Link to="/auth/forgotpassword">
              <Typography sx={{ fontWeight: "500", color: "#1a73e8" }}>
                Forgot Password ?
              </Typography>
            </Link> */}
          </Box>
          <Box>{/* ---- Sign up ----- */}</Box>
        </Paper>
      </div>
    </div>
  );
};

export default Login;
