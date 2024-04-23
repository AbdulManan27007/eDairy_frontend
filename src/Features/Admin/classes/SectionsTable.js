import React, { useContext, useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IconButton, Box, Dialog, DialogContent, Button } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import { DataGrid } from "@mui/x-data-grid";

import {
  GET_ALL,
  DELETE_BY_ID,
  GET_ALL_section,
} from "../../../services/ClassSections";
import eDairyContext from "../../../context/eDairyContext";
import { CustomNoRowsOverlay } from "../../../Components/NoRowsOverlay";
import Loading from "../../../Components/Loading";
import { AddClassSections } from "./AddClassSections";

// Users Data Component
//  Renders the users registered in the app
export const SectionsTable = () => {
  const context = useContext(eDairyContext);
  const { sections, setSections, selectedClass } = context;

  const [isLoading, setisLoading] = useState(false);
  const [editedItem, setEditedItem] = useState("");
  const [editDialogOpen, setEditDialogOpen] = useState(false);

  const [classSections, setClassSections] = useState(sections || []);

  useEffect(() => {
    if (selectedClass?.id) {
      const filterSections = sections?.filter(
        (item) => item?.class?.id == selectedClass?.id
      );
      setClassSections(filterSections);
    } else {
      setClassSections(sections);
    }
  }, [selectedClass, sections]);

  // To populate Edit Form

  // Edit Function
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
          const data = await GET_ALL_section();
          setSections(data.data);
          toast.success(response?.message);
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
      width: 250,
    },

    {
      field: "class",
      headerName: "Class",
      width: 250,
      renderCell: (params) => <div>{params?.row?.class?.name}</div>,
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
          rows={classSections}
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
            <AddClassSections sectionData={editedItem} />
          </DialogContent>
        </Dialog>
      </Box>
    );
    // Show error message if there's an error fetching data
  }
  return content;
};
