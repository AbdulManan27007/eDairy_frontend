import React, { useContext, useEffect } from "react";
import CardsData from "../../Data/SummaryCards.json";
import SummaryAdmin from "../../Data/SummaryAdmin.json";

import { Box, Grid, Paper } from "@mui/material";
import { SummaryCard } from "../SummaryCard";
import { SummaryCardTeacher } from "../SummaryCardTeacher";
import eDairyContext from "../../context/eDairyContext";
import SelectChildrenComp from "../selectDropDownOther/SelectChildrenComp";
import { useTheme } from "@emotion/react";

export const SummaryBox = () => {
  const [isLoading, setisLoading] = React.useState(false);
  const theme = useTheme();
  const context = useContext(eDairyContext);
  const { childrens } = context;

  return (
    <Grid container rowSpacing={3} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
      <Grid item xs={12} sm={6} lg={6} p={1}>
        <Box sx={{ height: "100%" }}>
          <Paper
            sx={{
              backgroundColor:
                theme.palette.mode === "light" ? "#fff" : "#1a2027",
              pb: 1,
              height: "100%",
            }}
          >
            <Box sx={{ m: 1 }}>
              <SelectChildrenComp />
            </Box>
          </Paper>
        </Box>
      </Grid>

      <Grid item xs={12} sm={6} lg={6}>
        <SummaryCardTeacher
          title={"Childrens"}
          icon={"LocalLibrary"}
          color={"#e91e63"}
          count={childrens?.length}
        />
      </Grid>
    </Grid>
  );
};
