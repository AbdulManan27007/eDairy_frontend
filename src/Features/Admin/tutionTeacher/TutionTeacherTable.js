import React, { useContext, useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IconButton, Box, Dialog, DialogContent, Button } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import { DataGrid } from "@mui/x-data-grid";

import { GET_ALL_students, DELETE_BY_ID } from "../../../services/Students";
import { UPDATE_BY_ID } from "../../../services/parents";

import eDairyContext from "../../../context/eDairyContext";
import { CustomNoRowsOverlay } from "../../../Components/NoRowsOverlay";
import Loading from "../../../Components/Loading";
import { AddTutionTeacher } from "./AddTutionTeacher";

// Users Data Component
//  Renders the users registered in the app
export const TutionTeacherTable = () => {
  const context = useContext(eDairyContext);
  const { user, childrens, setUser } = context;
  const [isLoading, setisLoading] = useState(false);
  const [editedItem, setEditedItem] = useState("");
  const [editDialogOpen, setEditDialogOpen] = useState(false);

  const [classTeachers, setClassTeachers] = useState(user?.tutionTeacher || []);

  useEffect(() => {
    setClassTeachers(user?.tutionTeacher);
  }, [user]);

  const handleEdit = (item) => {
    setEditedItem(item);
    setEditDialogOpen(true);
  };

  // Close Dialog
  const handleSaveEdit = async () => {
    setEditDialogOpen(false);
  };

  //  Function to handle DELETE User
  const handleDelete = (id) => {
    // Alert to confirm delete
    const confirmDelete = window.confirm(
      "Do you really want to delete this item?"
    );
    //  If yes , Call the deleteStaffData mutation with the classId and id
    if (confirmDelete) {
      setisLoading(true);

      const filtered = user?.tutionTeacher?.filter((item) => item?._id !== id);

      const updatedUser = {
        id: user?.id,
        tutionTeacher: filtered,
      };

      UPDATE_BY_ID(updatedUser)
        .then(async (response) => {
          toast.success(response.message);
          if (response?.data) {
            setUser(response.data);
          }
        })
        .catch((error) => {
          const errorMessage =
            error?.error?.message ||
            error?.data?.error?.message ||
            "An error occurred.";
          toast.error(errorMessage); // Show error message using toast
        })
        .finally(() => {
          setisLoading(false);
        });
    } else return;
  };

  // Column for Data-Grid
  const columns = [
    {
      field: "name",
      headerName: "Name",
      width: 200,
    },
    {
      field: "email",
      headerName: "Email",
      width: 200,
    },

    {
      field: "password",
      headerName: "Password",
      width: 200,
    },

    {
      field: "assignedChildrens",
      headerName: "Childrens Access",
      width: 200,
      renderCell: (params) => (
        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
          {childrens?.map((child, index) => {
            if (params?.row?.assignedChildrens?.includes(child?.id)) {
              return <span>{child?.name}</span>;
            }
          })}
        </div>
      ),
    },

    {
      field: "actions",
      headerName: "Actions",
      align: "center",
      headerAlign: "center",
      textAlign: "center",
      flex: 1,
      renderCell: (params) => (
        <div>
          <IconButton
            color="error"
            onClick={() => handleDelete(params?.row?._id)}
          >
            <Delete />
          </IconButton>
        </div>
      ),
    },
  ];

  // Filtered array based on search term

  let content;

  // Show loading state while fetching data
  if (isLoading) {
    content = <Loading open={isLoading} />;
  }
  // Render the staff container if data is successfully fetched
  else {
    content = (
      <Box sx={{ height: "100%", width: "100%", marginTop: "20px" }}>
        <ToastContainer />
        <DataGrid
          style={{ padding: "20px" }}
          rows={classTeachers}
          columns={columns}
          rowsPerPageOptions={[5, 10, 20]}
          autoHeight
          disableSelectionOnClick
          getRowId={(row) => row._id}
          slots={{
            noRowsOverlay: CustomNoRowsOverlay,
          }}
        />
        {/* ----- Dialog for displaying Edit User Form ------ */}
        <Dialog open={editDialogOpen} onClose={handleSaveEdit}>
          <DialogContent>
            <AddTutionTeacher subjectData={editedItem} />
          </DialogContent>
        </Dialog>
      </Box>
    );
    // Show error message if there's an error fetching data
  }
  return content;
};
