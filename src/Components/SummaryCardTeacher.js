import React from "react";
import * as icons from "@mui/icons-material";
import {
  Grid,
  LinearProgress,
  Paper,
  Typography,
  linearProgressClasses,
  styled,
  useTheme,
} from "@mui/material";

export const SummaryCardTeacher = ({ title, icon, color, count }) => {
  // Theme
  const theme = useTheme();

  // Linear progress bar (MUI Component)
  const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 10,
    borderRadius: 5,
    [`&.${linearProgressClasses.colorPrimary}`]: {
      backgroundColor:
        theme.palette.grey[theme.palette.mode === "light" ? 200 : 800],
    },
    [`& .${linearProgressClasses.bar}`]: {
      borderRadius: 5,
      backgroundColor: color,
    },
  }));

  // Icons are assigned to `Icon`
  const Icon = icons[icon];

  return (
    <Paper
      elevation={2}
      sx={{
        p: 3,
        borderLeft: `0.25rem solid ${color}`,
        backgroundColor: theme.palette.mode === "light" ? "#fff" : "#1a2027",
      }}
    >
      <Grid container spacing={1}>
        {/* ----Column 1---- */}

        <Grid item xs={10}>
          {/* ---Title--- */}
          <Typography
            sx={{
              color: color,
              textTransform: "uppercase",
              fontSize: "1rem",
              fontWeight: "600",
            }}
          >
            {title}
          </Typography>

          {/* ---- Row 2---- */}
          <Grid
            item
            xs
            container
            direction="row"
            spacing={2}
            sx={{ display: "flex", alignItems: "center" }}
          >
            <Grid item xs="auto">
              {/* ---- Progress---- */}
              <Typography
                sx={{
                  color: color,
                  fontSize: "1rem",
                  fontWeight: "600",
                }}
              >
                {count}
              </Typography>
            </Grid>
            {/* ----Progress bar---- */}
            <Grid item xs>
              <BorderLinearProgress
                variant="determinate"
                value={parseInt(count)}
              />
            </Grid>
          </Grid>
        </Grid>

        {/* -----Column 2------ */}
        <Grid
          item
          xs={2}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {
            // Card Icon
            <Icon fontSize="large" color="disabled">
              {icon}
            </Icon>
          }
        </Grid>
      </Grid>
    </Paper>
  );
};
