import "./App.css";
import { useContext, useEffect, useMemo, useState } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { CssBaseline, responsiveFontSizes, Paper } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { customizations } from "./Theme";
import { selectTheme } from "./Features/Theme/themeSlice";
import Home from "./Pages/Home";
import NotFound404 from "./Pages/NotFound404";
import { LayoutContainer } from "./Components/Layouts/LayoutContainer";
import AuthRoutes from "./Routes/AuthRoutes";
import jwtDecode from "jwt-decode";
import eDairyContext from "./context/eDairyContext";
import { GET_SINGLE_Teacher } from "./services/Teachers";
import { GET_SINGLE } from "./services/parents";

const App = () => {
  const [mode, setMode] = useState("light");
  const darkMode = useSelector(selectTheme);

  const navigate = useNavigate();

  const context = useContext(eDairyContext);
  const { user, setUser } = context;

  useEffect(() => {
    const accessToken = localStorage.getItem("access_token");
    if (accessToken) {
      const token = accessToken;
      const decodeToken = jwtDecode(token);

      const id = localStorage.getItem("id");

      if (decodeToken.role == "teacher" && id) {
        GET_SINGLE_Teacher(id).then((resp) => {
          setUser({ ...resp.data, accessToken: accessToken });
        });
      }
      if (decodeToken.role == "parent" && id) {
        GET_SINGLE(id).then((resp) => {
          setUser({ ...resp.data, accessToken: accessToken });
        });
      }

      setUser({ ...decodeToken, accessToken: accessToken });
      navigate(`/dashboard/${decodeToken.role}/home`);
    }
  }, []);

  const memoizedDarkMode = useMemo(() => darkMode, [darkMode]);

  useEffect(() => {
    memoizedDarkMode ? setMode("dark") : setMode("light");
  }, [memoizedDarkMode]);

  // Custom theme template
  let theme = createTheme(customizations(mode));
  theme = responsiveFontSizes(theme);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline enableColorScheme />
      <Paper
        style={{ borderRadius: "0", minHeight: "100vh", minWidth: "100vw" }}
        elevation={0}
      >
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/auth/*" element={<AuthRoutes />} />
          <Route path="/dashboard/*" element={<LayoutContainer />} />
          <Route path="/404" element={<NotFound404 />} />
          <Route path="*" element={<Navigate replace to="/404" />} />
        </Routes>
      </Paper>
    </ThemeProvider>
  );
};

export default App;
