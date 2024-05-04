import React, { useContext, useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IconButton, Box, Dialog, DialogContent, Button } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import { DataGrid } from "@mui/x-data-grid";

import eDairyContext from "../../../context/eDairyContext";
import { CustomNoRowsOverlay } from "../../../Components/NoRowsOverlay";
import Loading from "../../../Components/Loading";
import { AddParent } from "./AddParent";
import { DELETE_BY_ID, GET_ALL } from "../../../services/parents";

// Users Data Component
//  Renders the users registered in the app
export const ParentTable = () => {
  const context = useContext(eDairyContext);
  const { parents, setParents } = context;
  const [isLoading, setisLoading] = useState(false);
  const [editedItem, setEditedItem] = useState("");
  const [editDialogOpen, setEditDialogOpen] = useState(false);

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
      DELETE_BY_ID(id)
        .then(async (response) => {
          const data = await GET_ALL();
          data?.data && setParents(data.data);
          toast.success(response.message);
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
    {
      field: "name",
      headerName: "Name",
      width: 200,
    },
    {
      field: "idCard",
      headerName: "ID Card",
      width: 200,
    },

    {
      field: "phone",
      headerName: "Phone Number",
      width: 200,
    },
    {
      field: "address",
      headerName: "Address",
      width: 200,
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
          <IconButton color="primary" onClick={() => handleEdit(params?.row)}>
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
      <Box sx={{ height: "100%", width: "100%", marginTop: "20px" }}>
        <ToastContainer />
        <DataGrid
          style={{ padding: "20px" }}
          rows={parents || []}
          columns={columns}
          rowsPerPageOptions={[5, 10, 20]}
          autoHeight
          disableSelectionOnClick
          slots={{
            noRowsOverlay: CustomNoRowsOverlay,
          }}
        />
        {/* ----- Dialog for displaying Edit User Form ------ */}
        <Dialog open={editDialogOpen} onClose={handleSaveEdit}>
          <DialogContent>
            <AddParent subjectData={editedItem} />
          </DialogContent>
        </Dialog>
      </Box>
    );
    // Show error message if there's an error fetching data
  }
  return content;
};
