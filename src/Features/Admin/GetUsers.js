import React, { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IconButton, Box, Dialog, DialogContent } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import { DataGrid } from "@mui/x-data-grid";

import { useDeleteUserMutation, useGetUsersQuery } from "./adminApiSlice";
import { setSearchTerm } from "../Search/Searchslice";
import { CustomNoRowsOverlay } from "../../Components/NoRowsOverlay";
import Loading from "../../Components/Loading";
import Error from "../../Components/Error";
import { UpdateUserAccess } from "./UpdateUserAcess";
import { CardWrapper } from "../../Components/CardWrapper";
import { SummaryBox } from "../../Components/Boxes/SummaryBox";
import eDairyContext from "../../context/eDairyContext";
import { GET_ALL_Teachers } from "../../services/Teachers";

// Users Data Component
//  Renders the users registered in the app
export const UsersData = () => {
  const context = useContext(eDairyContext);
  const { teachers, setTeachers } = context;
  const [isLoading, setisLoading] = useState(false);
  const [editedItem, setEditedItem] = useState("");
  const [editDialogOpen, setEditDialogOpen] = useState(false);

  // To populate Edit Form

  // Edit Function
  const handleEdit = (id) => {
    const selectedItem = teachers?.find((item) => item.id === id);
    setEditedItem(selectedItem);
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
      DELETE_BY_ID(id)
        .then((response) => {
          toast.success(response.message);
          GET_ALL_Teachers().then((resp) => {
            resp?.data && setTeachers(resp.data);
          });
        }) // Show success message using toast
        .catch((error) => {
          const errorMessage =
            error?.error?.message ||
            error?.data?.error?.message ||
            "An error occurred.";
          toast.error(errorMessage); // Show error message using toast
        });
    } else return;
  };

  // Column for Data-Grid
  const columns = [
    { field: "id", headerName: "ID", width: 150 },
    {
      field: "email",
      headerName: "Email",
      width: 250,
      renderCell: (params) => (
        <div style={{ maxHeight: "100px", overflowY: "auto" }}>
          {params.value}
        </div>
      ),
    },

    {
      field: "role",
      headerName: "User Role",
      width: 80,
      valueGetter: (params) => params.row?.role,
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      renderCell: (params) => (
        <div>
          <IconButton
            color="primary"
            onClick={() => handleEdit(params?.row?.id)}
          >
            <Edit />
          </IconButton>
          <IconButton
            color="error"
            onClick={() => handleDelete(params?.row?.id)}
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
      <CardWrapper title="All Users">
        <Box sx={{ height: "100%", width: "100%", marginTop: "20px" }}>
          <ToastContainer />
          <DataGrid
            style={{ padding: "20px" }}
            rows={teachers}
            columns={columns}
            rowsPerPageOptions={[5, 10, 20]}
            autoHeight
            disableSelectionOnClick
            slots={{
              noRowsOverlay: CustomNoRowsOverlay,
            }}
          />
          {/* ----- Dialog for displaying Edit User Form ------ */}
          {/* <Dialog open={editDialogOpen} onClose={handleSaveEdit}>
            <DialogContent>
              <UpdateUserAccess data={editedItem} />
            </DialogContent>
          </Dialog> */}
        </Box>
      </CardWrapper>
    );
    // Show error message if there's an error fetching data
  }
  return content;
};
