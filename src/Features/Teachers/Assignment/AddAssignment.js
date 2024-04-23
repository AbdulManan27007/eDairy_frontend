import React, { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import * as yup from "yup";
import { useFormik } from "formik";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Dashboard from "../../../Assets/81joY6oN6aL.jpg";
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

import { useAddAssignmentMutation } from "../teachersApiSlice";
import { CardWrapper } from "../../../Components/CardWrapper";
import Loading from "../../../Components/Loading";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../Auth/AuthSlice";
import { CREATE_NEW, GET_ALL } from "../../../services/E_Dairy";
import eDairyContext from "../../../context/eDairyContext";
import ImageIcon from "@mui/icons-material/Image";
import SelectClassComp from "../../../Components/selectDropDownOther/SelectClassComp";
import SelectSectionComp from "../../../Components/selectDropDownOther/SelectSectionComp";
import SelectSubjectComp from "../../../Components/selectDropDownOther/SelectSubjectComp";
// Form Validation Schema
const ValidationSchema = yup.object({});

// Custom component for Error messages
const StyledTypography = styled(Typography)(() => ({
  color: "red",
}));

export const AddAssignments = ({ handleClose }) => {
  const context = useContext(eDairyContext);
  const [isLoading, setisLoading] = useState(false);

  const [content, setcontent] = useState([]);
  const [txt, settxt] = useState("");
  const currentDate = dayjs(new Date().toString()).format("DD/MMM/YYYY");
  const {
    user,
    subjects,
    sete_dairies,
    sections,
    selectedSubject,
    selectedSection,
    selectedClass,
  } = context;

  const AddAssignment = () => {
    console.log("working");

    try {
      if (!selectedSubject.id) {
        toast.error("Subject Required");
        return;
      }
      if (!selectedSection.id) {
        toast.error("Section Required");
        return;
      }
      if (!selectedClass.id) {
        toast.error("Class Required");
        return;
      }

      let data = {};

      data.subject = selectedSubject.id;
      data.section = selectedSection.id;
      data.class = selectedClass.id;

      data.content = content;

      CREATE_NEW(data)
        .then((response) => {
          GET_ALL(selectedSubject)
            .then((resp) => {
              if (resp.data) {
                sete_dairies(resp.data);
              }
            })
            .catch((err) => {});

          toast.success(response.message);
          handleClose();
        }) // Show success message using toast
        .catch((error) => {
          toast.error("An error occurred"); // Show error message using toast
        });
    } catch (error) {
      console.log(error);
    }
  };

  const addPoint = () => {
    const old = [...content];
    old.push(txt);
    setcontent(old);
    settxt("");
  };

  // Formik validationSchema

  return (
    <Card sx={{ borderRadius: "20px" }}>
      <CardContent>
        <Grid container p={"10px"}>
          <Grid md={10} xs={10}>
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
          <Grid md={2} xs={10}>
            <Button
              fullWidth
              onClick={addPoint}
              variant="contained"
              sx={{ height: "95%" }}
            >
              Add
            </Button>
          </Grid>

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
                subheader={currentDate}
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
                {content?.map((item) => {
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
        </Grid>
      </CardContent>
      <Divider />
      <CardActions sx={{ justifyContent: "flex-end" }}>
        <Button
          disabled={!content?.length || !selectedSection || !selectedSubject}
          onClick={() => AddAssignment()}
          variant="contained"
        >
          Save
        </Button>
      </CardActions>
    </Card>
  );
};
