import React, { useContext, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button, Grid, InputLabel, Select, MenuItem } from "@mui/material";
import { UPDATE_BY_ID, GET_ALL_classes } from "../../../services/Classes";
import { CardWrapper } from "../../../Components/CardWrapper";
import Loading from "../../../Components/Loading";
import eDairyContext from "../../../context/eDairyContext";
export const AddClass = ({ classData }) => {
  const context = useContext(eDairyContext);
  const { setClasses, teachers } = context;

  const [isLoading, setisLoading] = useState(false);

  const [selectedTeacher, setSelectedTeacher] = useState(
    classData ? classData?.incharge?.id : ""
  );

  const updateClass = () => {
    setisLoading(true);

    const dataobj = { id: classData.id, incharge: selectedTeacher };
    UPDATE_BY_ID(dataobj)
      .then(async (response) => {
        if (response) {
          const data = await GET_ALL_classes();
          data?.data && setClasses(data.data);
        }
        toast.success(response.message);
      })
      .catch((error) => {
        const errorMessage =
          error?.error?.message ||
          error?.data?.error?.message ||
          "An error occurred.";
        toast.error(errorMessage); // Show error message using toast
      });

    setisLoading(false);
  };
  const handleChange = (event) => {
    setSelectedTeacher(event.target.value);
  };
  return (
    <CardWrapper title={classData ? "Udate class" : "Add New Class"}>
      <ToastContainer /> {/* Container for displaying toast messages */}
      {isLoading ? (
        <Loading open={isLoading} /> // Show loading indicator while submitting data
      ) : (
        <Grid
          container
          component="div"
          direction="row"
          alignItems="center"
          flexWrap="wrap"
          spacing={3}
        >
          {/* ------------- Name ------------- */}

          <Grid item xs={12}>
            <InputLabel sx={{ width: "100%" }} id="demo-simple-select-label">
              Update Class Incharge
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={selectedTeacher}
              label="Section"
              onChange={handleChange}
              sx={{ width: "100%" }}
            >
              {teachers &&
                teachers?.map((item) => {
                  return <MenuItem value={item.id}>{item.name}</MenuItem>;
                })}
            </Select>
          </Grid>

          {/* ----------- Contact Info -------------- */}

          <Grid item xs={12} textAlign="center">
            <Button
              onClick={updateClass}
              variant="contained"
              color="primary"
              // Disable the button when submitting the form
            >
              Submit
            </Button>
          </Grid>
        </Grid>
      )}
    </CardWrapper>
  );
};
