import React, { useContext, useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IconButton, Box, Dialog, DialogContent, Button } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import { DataGrid } from "@mui/x-data-grid";

import { GET_ALL_classes, DELETE_BY_ID } from "../../../services/Classes";
import eDairyContext from "../../../context/eDairyContext";
import { CustomNoRowsOverlay } from "../../../Components/NoRowsOverlay";
import Loading from "../../../Components/Loading";
import { AddClass } from "./AddClass";

// Users Data Component
//  Renders the users registered in the app
export const ClassTable = () => {
  const context = useContext(eDairyContext);
  const { classes, setClasses } = context;
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
          const data = await GET_ALL_classes();
          data?.data && setClasses(data.data);
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

  const renderSubjectWithStyle = (subject) => {
    let style = "";
    switch (subject) {
      case "Eng":
        style = "bg-blue-100 text-blue-800";
        break;
      case "Islamiyat":
        style = "bg-gray-100 text-gray-800";
        break;
      case "Math":
        style = "bg-red-100 text-red-800";
        break;
      case "Science":
        style = "bg-green-100 text-green-800";
        break;
      case "Urdu":
        style = "bg-yellow-100 text-yellow-800";
        break;
      case "Social studies":
        style = "bg-indigo-100 text-indigo-800";
        break;
      case "ChatGpt Activity 2.5":
        style = "bg-purple-100 text-purple-800";
        break;
      // Add more subjects and their corresponding styles as needed
      default:
        style = "bg-gray-100 text-gray-800"; // Default style if subject doesn't match
        break;
    }
    return style;
  };

  // Column for Data-Grid
  const columns = [
    {
      field: "name",
      headerName: "Name",
      width: 250,
    },

    {
      field: "subject",
      headerName: "Subjects",
      flex: 1,
      renderCell: (params) => (
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "5px",
          }}
        >
          {params?.row?.subject?.map((subject, index) => (
            <span
              className={` text-xs font-medium me-2 px-2.5 py-0.5 rounded ${renderSubjectWithStyle(
                subject
              )}`}
            >
              {subject}
            </span>
          ))}
        </div>
      ),
    },

    {
      field: "incharge",
      headerName: "Incharge",
      width: 200,
      renderCell: (params) => <div>{params?.row?.incharge?.name}</div>,
    },

    {
      field: "actions",
      headerName: "Actions",
      align: "center",
      headerAlign: "center",
      textAlign: "center",
      width: 200,
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
          rows={classes}
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
            <AddClass classData={editedItem} />
          </DialogContent>
        </Dialog>
      </Box>
    );
    // Show error message if there's an error fetching data
  }
  return content;
};
