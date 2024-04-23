import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import eDairyContext from "../../context/eDairyContext";

export const AccountInfo = ({ imageSrc, setImageSrc }) => {
  const context = React.useContext(eDairyContext);
  const { user, setUser } = context;

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setImageSrc(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleButtonClick = () => {
    document.getElementById("fileInput").click();
  };

  return (
    <Card sx={{ borderRadius: "20px", height: "100%" }}>
      <Card sx={{ border: "none", boxShadow: "none" }}>
        <CardContent>
          <Stack spacing={2} sx={{ alignItems: "center" }}>
            <div>
              <Avatar src={imageSrc} sx={{ height: "80px", width: "80px" }} />
            </div>
            <Stack spacing={1} sx={{ textAlign: "center" }}>
              <Typography variant="h5">{user?.username}</Typography>
              <Typography color="text.secondary" variant="body2">
                {user?.role}
              </Typography>
            </Stack>
          </Stack>
        </CardContent>
        <Divider />
        <CardActions>
          <Button fullWidth variant="text" onClick={handleButtonClick}>
            Upload picture
          </Button>
          <input
            type="file"
            id="fileInput"
            style={{ display: "none" }}
            onChange={handleImageUpload}
          />
        </CardActions>
      </Card>
    </Card>
  );
};
