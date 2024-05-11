import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import * as yup from "yup";
import { useFormik } from "formik";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { FiMessageSquare, FiEdit2, FiTrash } from "react-icons/fi";

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
  const [isReplying, setIsReplying] = useState(false);
  const [commentIndex, setCommentIndex] = useState(null);

  const [otherUserCommentList, setOtherUserCommentList] = useState([]);

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
    console.log("user??????", user);
    comment.comment = txt;
    comment.role = user?.role;
    comment.name = user?.name;
    comment.userId = user?.id;
    // comment.profilePic = user?.profilePic;
    comment.date = dayjs(new Date().toString()).format("DD/MMM/YYYY");

    // comment.reply = {};

    if (isReplying) {
      const updatedComments = [...dairyData?.comments];
      if (updatedComments[commentIndex]) {
        updatedComments[commentIndex].reply = comment;
      }
      updateAssignmnt({ comments: updatedComments });
      settxt("");
      setIsReplying(false);
      setCommentIndex(null);
    } else {
      const previousCommentsList = [...dairyData?.comments];
      previousCommentsList.push(comment);
      setcommentsList(previousCommentsList);
      updateAssignmnt({ comments: previousCommentsList });
      settxt("");
    }
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
                // padding: "10px",
                marginTop: "20px",
                // backgroundImage: `url('${Dashboard}')`, // Add your background image path here
                // backgroundSize: "cover",
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
                      {/* <ListItemAvatar>
                        <Avatar>
                          <ImageIcon />
                        </Avatar>
                      </ListItemAvatar> */}
                      <ListItemText primary={item} />
                    </ListItem>
                  );
                })}
              </List>
            </Card>
          </Grid>

          <Grid md={12} xs={12} mt={12}>
            {/* <TextField
              fullWidth
              id="Point"
              name="Point"
              label="Add Point"
              value={txt}
              onChange={(e) => settxt(e.target.value)}
              sx={{ height: "100%", width: "98%" }}
            /> */}

            {/* <div className="flex flex-col items-end border border-primary rounded-lg p-4">
              <textarea
                className="w-full focus:outline-none bg-transparent"
                rows="5"
                placeholder="Leave your comment here..."
                value={txt}
                onChange={(e) => settxt(e.target.value)}
              />
              <div className="flex flex-col-reverse gap-y-2 items-center gap-x-2 pt-2 min-[420px]:flex-row">
                <button
                  onClick={addPoint}
                  className="px-6 py-2.5 rounded-lg bg-primary
                     text-white font-semibold disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  Add Comment
                </button>
              </div>
            </div> */}

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-end",
                border: "1px solid #0D6EF8",
                borderRadius: "0.5rem",
                padding: "1rem",
              }}
            >
              <textarea
                style={{
                  width: "100%",
                  outline: "none",
                  backgroundColor: "transparent",
                }}
                rows="2"
                placeholder="Leave your comment here..."
                value={txt}
                onChange={(e) => settxt(e.target.value)}
              />
              <div
                style={{
                  display: "flex",
                  flexDirection: "column-reverse",
                  alignItems: "center",
                  gap: "0.5rem",
                  paddingTop: "0.5rem",
                  paddingBottom: "0.5rem",
                  minWidth: "420px",
                  flexDirection: "row",
                  justifyContent: "flex-end",
                }}
              >
                <button
                  onClick={addPoint}
                  style={{
                    padding: "0.625rem 1.5rem",
                    borderRadius: "0.5rem",
                    backgroundColor: "#0D6EF8",
                    color: "white",
                    fontWeight: "bold",
                    cursor: "pointer",
                  }}
                >
                  Add Comment
                </button>
              </div>
            </div>
          </Grid>
          {/* <Grid md={2} xs={10} mt={2}>
            <Button
              fullWidth
              onClick={addPoint}
              variant="contained"
              sx={{ height: "95%" }}
              disabled={!txt}
            >
              Add Comment
            </Button>
          </Grid> */}

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
                {commentsList?.map((item, index) => {
                  if (user.role !== "teacher" && item.userId !== user.id) {
                    return;
                  }

                  return (
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "flex-start",
                        gap: "0.75rem",
                        backgroundColor: "#E5E7EB",
                        padding: "0.75rem",
                        borderRadius: "0.5rem",
                      }}
                      id={`comment-${index}`}
                    >
                      <Avatar src={item?.profilePic}>
                        {item?.name?.slice(0, 1)}
                      </Avatar>
                      <div
                        style={{
                          display: "flex",
                          flex: "1",
                          flexDirection: "column",
                        }}
                      >
                        <h5
                          style={{
                            fontWeight: "bold",
                            color: "#4B5563",
                            fontSize: "0.75rem",
                            lineHeight: "1rem",
                          }}
                        >
                          {item.name}
                        </h5>
                        <span
                          style={{
                            fontSize: "0.625rem",
                            color: "#6B7280",
                          }}
                        >
                          {item.comment}
                        </span>
                        <span
                          style={{
                            fontSize: "0.625rem",
                            color: "#6B7280",
                          }}
                        >
                          {item.date}
                        </span>

                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "0.75rem",
                            color: "#6B7280",
                            fontFamily: "Roboto",
                            fontSize: "0.75rem",
                            marginTop: "0.75rem",
                            marginBottom: "0.75rem",
                          }}
                        >
                          {user.role === "teacher" && (
                            <button
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "0.5rem",
                              }}
                              onClick={() => {
                                setCommentIndex(index);
                                setIsReplying(true);
                              }}
                            >
                              <FiMessageSquare
                                style={{ width: "1rem", height: "auto" }}
                              />
                              <span>Reply</span>
                            </button>
                          )}
                        </div>

                        {isReplying && commentIndex === index && (
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "flex-end",
                              border: "1px solid #3B82F6",
                              borderRadius: "0.5rem",
                              padding: "1rem",
                            }}
                          >
                            <textarea
                              style={{
                                width: "100%",
                                outline: "none",
                                backgroundColor: "transparent",
                              }}
                              rows="2"
                              placeholder="Leave your comment here..."
                              value={txt}
                              onChange={(e) => settxt(e.target.value)}
                            />
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column-reverse",
                                alignItems: "center",
                                gap: "0.5rem",
                                paddingTop: "0.5rem",
                                paddingBottom: "0.5rem",
                                minWidth: "420px",
                                flexDirection: "row",
                                justifyContent: "flex-end",
                              }}
                            >
                              <button
                                onClick={() => {
                                  setCommentIndex(null);
                                  setIsReplying(false);
                                }}
                                style={{
                                  padding: "0.625rem 1.5rem",
                                  borderRadius: "0.5rem",
                                  border: "1px solid #EF4444",
                                  color: "#EF4444",
                                }}
                              >
                                Cancel
                              </button>

                              <button
                                onClick={addPoint}
                                style={{
                                  padding: "0.625rem 1.5rem",
                                  borderRadius: "0.5rem",
                                  backgroundColor: "#3B82F6",
                                  color: "white",
                                  fontWeight: "bold",
                                  cursor: "pointer",
                                }}
                              >
                                Reply
                              </button>
                            </div>
                          </div>
                        )}

                        {item?.reply && Object.keys(item?.reply).length > 0 && (
                          <div>
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "row",
                                alignItems: "flex-start",
                                gap: "0.75rem",
                                backgroundColor: "#E5E7EB",
                                padding: "0.75rem",
                                borderRadius: "0.5rem",
                              }}
                              id={`comment-${index}-reply`}
                            >
                              <Avatar
                                src={item?.reply?.profilePic}
                                alt={item?.name?.slice(0, 1)}
                              />
                              <div
                                style={{
                                  display: "flex",
                                  flex: "1",
                                  flexDirection: "column",
                                }}
                              >
                                <h5
                                  style={{
                                    fontWeight: "bold",
                                    color: "#4B5563",
                                    fontSize: "0.75rem",
                                    lineHeight: "1rem",
                                  }}
                                >
                                  {item?.reply?.name}
                                </h5>
                                <span
                                  style={{
                                    fontSize: "0.625rem",
                                    color: "#6B7280",
                                  }}
                                >
                                  {item?.reply?.comment}
                                </span>
                                <span
                                  style={{
                                    fontSize: "0.625rem",
                                    color: "#6B7280",
                                  }}
                                >
                                  {item?.reply?.date}
                                </span>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
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
