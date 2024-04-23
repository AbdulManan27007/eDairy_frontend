import React, { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import * as yup from "yup";
import { useFormik } from "formik";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  InputLabel,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import styled from "@emotion/styled";
import Dashboard from "../../../Assets/81joY6oN6aL.jpg";
import ImageIcon from "@mui/icons-material/Image";
import AbcRounded from "@mui/icons-material/AbcRounded";

import { GET_ALL, UPDATE_BY_ID } from "../../../services/E_Dairy";
import eDairyContext from "../../../context/eDairyContext";

//Form Validation Schema
const ValidationSchema = yup.object({
  id: yup.string().min(0, "Invalid id").required("Please enter id"),
  subject: yup
    .string()
    .min(2, "Please enter a valid subject")
    .required("Please enter the name of the subject"),
  description: yup
    .string()
    .min(4, "Please specify description")
    .required("Please enter the description of the task"),
  lds: yup
    .date()
    // .default(() => new Date())
    .min(new Date(Date.now()), "Please enter the last date of submission")
    .required("Please enter the last date of submission"),
});

// For Form Validation Error Messages
const StyledTypography = styled(Typography)(() => ({
  color: "red",
}));

export const UpdateAssignment = ({ data, id, handleSaveEdit }) => {
  const context = useContext(eDairyContext);
  const { user, sete_dairies, selectedSection } = context;
  const [isLoading, setisLoading] = useState(false);
  const [txt, settxt] = useState("");

  const [dairyData, setDairyData] = useState(data);
  const [commentsList, setcommentsList] = useState(data?.comments);

  const updateAssignmnt = (data) => {
    UPDATE_BY_ID({ id: id, data })
      .then((response) => {
        response?.data && setDairyData(response?.data);
        response?.data && setcommentsList(response?.data?.comments);
        GET_ALL()
          .then((resp) => {
            if (resp?.data) {
              if (user.role == "parent") {
                const ff = data.data.filter(
                  (item) => item?.section?.id == selectedSection?.id
                );
                sete_dairies(ff);
              } else {
                sete_dairies(resp?.data);
              }
            }
          })
          .catch((err) => {});

        toast.success(response.message);
      })

      .catch((error) => {
        const errorMessage =
          error?.error?.message ||
          error?.data?.error?.message ||
          "An error occurred.";
        toast.error(errorMessage); // Show error message using toast
      });
  };

  const addPoint = () => {
    let comment = {};

    comment.comment = txt;
    comment.role = user?.role;
    comment.name = user?.username || user?.name;
    comment.date = dayjs(new Date().toString()).format("DD/MMM/YYYY");

    const previousCommentsList = [...dairyData?.comments];
    previousCommentsList.push(comment);
    setcommentsList(previousCommentsList);
    updateAssignmnt({ comments: previousCommentsList });
    settxt("");
  };

  return (
    // Title
    <Card sx={{ borderRadius: "20px" }}>
      <Button
        fullWidth
        onClick={() => handleSaveEdit()}
        variant="outlined"
        sx={{ width: "150px" }}
      >
        Go Back{" "}
      </Button>
      <CardContent>
        <Grid container p={"10px"}>
          <Grid md={12} xs={12}>
            <Card
              sx={{
                borderRadius: "20px",
                padding: "10px",
                marginTop: "20px",
                backgroundImage: `url('${Dashboard}')`, // Add your background image path here
                backgroundSize: "cover",
                border: "2px solid #ffb6c1", // Pink border
                boxShadow: "none",
                backgroundPosition: "center",
                backgroundRepeat: "repeat",
              }}
            >
              <CardHeader
                subheader={dayjs(dairyData?.createdAt?.toString())?.format(
                  "DD/MMM/YYYY"
                )}
                title="E Dairy"
                sx={{ bgcolor: "background.paper" }}
              />

              <List
                sx={{
                  width: "100%",
                  bgcolor: "background.paper",
                  borderRadius: "10px",
                  minHeight: "150px",
                }}
              >
                {dairyData?.content?.map((item) => {
                  return (
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar>
                          <ImageIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText primary={item} />
                    </ListItem>
                  );
                })}
              </List>
            </Card>
          </Grid>

          <Grid md={10} xs={10} mt={2}>
            <TextField
              fullWidth
              id="Point"
              name="Point"
              label="Add Point"
              value={txt}
              onChange={(e) => settxt(e.target.value)}
              sx={{ height: "100%", width: "98%" }}
            />
          </Grid>
          <Grid md={2} xs={10} mt={2}>
            <Button
              fullWidth
              onClick={addPoint}
              variant="contained"
              sx={{ height: "95%" }}
              disabled={!txt}
            >
              Add Comment
            </Button>
          </Grid>

          <Grid md={12} xs={12}>
            <Card
              sx={{
                marginTop: "20px",
              }}
            >
              <CardHeader
                subheader={"Comments"}
                sx={{ bgcolor: "background.paper" }}
              />

              <List
                sx={{
                  width: "100%",
                  bgcolor: "background.paper",
                  borderRadius: "10px",
                  minHeight: "150px",
                }}
              >
                {commentsList?.map((item) => {
                  return (
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar>
                          <AbcRounded />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={item?.name}
                        secondary={`${item?.date} ${item?.comment}`}
                      />
                    </ListItem>
                  );
                })}
              </List>
            </Card>
          </Grid>
        </Grid>
      </CardContent>
      <Divider />
    </Card>
  );
};
