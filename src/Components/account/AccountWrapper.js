import * as React from "react";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Unstable_Grid2";
import { AccountInfo } from "./account-info";
import { AccountDetailsForm } from "./account-details-form";
import { Update_password_form } from "./Update_password_form";
import eDairyContext from "../../context/eDairyContext";

export const AccountWrapper = () => {
  const context = React.useContext(eDairyContext);
  const { user, setUser } = context;
  const [imageSrc, setImageSrc] = React.useState(user?.profilePic || "");

  console.log("imageSrc", imageSrc);
  console.log("user", user);

  return (
    <Stack spacing={3}>
      <div>
        <Typography variant="h4">Account</Typography>
      </div>
      <Grid container spacing={3}>
        <Grid lg={4} md={6} xs={12}>
          <AccountInfo imageSrc={imageSrc} setImageSrc={setImageSrc} />
        </Grid>
        <Grid lg={8} md={6} xs={12}>
          <AccountDetailsForm imageSrc={imageSrc} />
        </Grid>
        <Grid xs={12}>
          <Update_password_form />
        </Grid>
      </Grid>
    </Stack>
  );
};
