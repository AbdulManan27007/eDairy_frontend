import React, { useContext, useEffect } from "react";

import { Box, Grid, Paper } from "@mui/material";
import { SummaryCardTeacher } from "../SummaryCardTeacher";
import eDairyContext from "../../context/eDairyContext";

export const SummaryBox = () => {
  const context = useContext(eDairyContext);
  const { childrens, selectedChilren } = context;

  return (
    <Grid container rowSpacing={3} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
      <Grid item xs={12} sm={6} lg={6}>
        <SummaryCardTeacher
          title={"Class"}
          icon={"LocalLibrary"}
          color={"#4caf50"}
          count={selectedChilren?.class?.name}
        />
      </Grid>

      <Grid item xs={12} sm={6} lg={6}>
        <SummaryCardTeacher
          title={"Childrens"}
          icon={"LocalLibrary"}
          color={"#4caf50"}
          count={childrens?.length}
        />
      </Grid>
    </Grid>
  );
};
