import React, { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { setSearchTerm } from "../../Search/Searchslice";
import { useDeleteAssignmentMutation } from "../teachersApiSlice";
import { Box, Dialog, DialogContent, IconButton } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { Delete, Edit, RemoveRedEye } from "@mui/icons-material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { UpdateAssignment } from "./UpdateAssignment";
import { CustomNoRowsOverlay } from "../../../Components/NoRowsOverlay";
import Loading from "../../../Components/Loading";
import { DELETE_BY_ID, GET_ALL } from "../../../services/E_Dairy";
import dayjs from "dayjs";
import eDairyContext from "../../../context/eDairyContext";

export const ViewAssignments = ({ data }) => {
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [isLoading, setisLoading] = useState(false);
  const context = useContext(eDairyContext);
  const { user, sete_dairies } = context;
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [editedItem, setEditedItem] = useState({
    id: "",
    subject: "",
    description: "",
    lastDate: "",
    assignedBy: "",
  });

  // Function to handle edit assignment data
  const handleEdit = (id) => {
    const selectedItem = data?.find((item) => item.id === id);
    setSelectedItemId(id);
    setEditedItem(selectedItem);
    setEditDialogOpen(true);
  };

  // Closing Dialog
  const handleSaveEdit = async () => {
    setEditDialogOpen(false);
  };

  // Delete Function
  const handleDelete = (id) => {
    // Alert to confirm delete
    const confirmDelete = window.confirm(
      "Do you really want to delete this item?"
    );
    //  If yes , Call the deleteAssignment mutation with the classId and id
    if (confirmDelete) {
      DELETE_BY_ID(id)
        .then((response) => {
          GET_ALL()
            .then((resp) => {
              if (resp?.data) {
                sete_dairies(resp?.data);
              }
            })
            .catch((err) => {});

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

  // For Searching through Data

  // Columns for Data Grid
  const columns = [
    {
      field: "class",
      headerName: "Class",
      width: 150,
      renderCell: (params) => <div>{params?.row?.class?.name}</div>,
    },

    {
      field: "section",
      headerName: "section",
      width: 150,
      renderCell: (params) => <div>{params?.row?.section?.name}</div>,
    },

    {
      field: "subject",
      headerName: "Subject",
      width: 150,
      renderCell: (params) => <div>{params?.row?.subject?.name}</div>,
    },

    {
      field: "createdAt",
      headerName: "Date",
      flex: 1,
      renderCell: (params) => {
        return (
          <div style={{ maxHeight: "100px", overflowY: "auto" }}>
            {dayjs(params?.row?.createdAt.toString()).format("DD/MMM/YYYY")}
          </div>
        );
      },
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      renderCell: (params) => (
        <div>
          <IconButton color="primary" onClick={() => handleEdit(params.row.id)}>
            <RemoveRedEye />
          </IconButton>
          <IconButton color="error" onClick={() => handleDelete(params.row.id)}>
            <Delete />
          </IconButton>
        </div>
      ),
    },
  ];

  return (
    // Data-Grid
    <Box sx={{ height: "100%", width: "100%", marginTop: "20px" }}>
      <ToastContainer />
      {isLoading ? (
        <Loading open={isLoading} /> // Show loading state while fetching data
      ) : (
        <>
          {!editDialogOpen ? (
            <DataGrid
              style={{ padding: "20px" }}
              rows={data || []}
              columns={columns}
              rowsPerPageOptions={[5, 10, 20]}
              autoHeight
              disableSelectionOnClick
              slots={{
                noRowsOverlay: CustomNoRowsOverlay,
              }}
            />
          ) : (
            <UpdateAssignment
              handleSaveEdit={handleSaveEdit}
              data={editedItem}
              id={selectedItemId}
            />
          )}
        </>
      )}
    </Box>
  );
};
