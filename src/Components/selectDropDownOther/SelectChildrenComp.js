import { Box, InputLabel, MenuItem, Select } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import eDairyContext from "../../context/eDairyContext";
import { GET_ALL_SUBJECTS } from "../../services/ClassSubjects";

const SelectChildrenComp = () => {
  const context = useContext(eDairyContext);
  const {
    selectedChilren,
    setSelectedChildren,
    childrens,
    setSubjects,
    setSelectedSection,
  } = context;

  const handleChangeSubject = (event) => {
    if (event.target.value) {
      const selectedItem = childrens?.find(
        (item) => item?.id === event.target.value
      );
      getTeaachers(selectedItem.section.id);
      setSelectedChildren(selectedItem || {});
      setSelectedSection(selectedItem.section);
    } else {
      setSelectedChildren({});
    }
  };

  const getTeaachers = (id) => {
    GET_ALL_SUBJECTS({ section: id })
      .then((resp) => {
        setSubjects(resp.data);
      })
      .catch((er) => {});
  };

  return (
    <Box>
      <InputLabel
        sx={{ width: "100%", height: "11px", fontSize: "10px" }}
        id="demo-simple-select-label"
      >
        Select A Children
      </InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={selectedChilren?.id}
        label="sections"
        onChange={handleChangeSubject}
        sx={{ width: "150px", height: "30px" }}
      >
        <MenuItem value={null}>None</MenuItem>

        {childrens &&
          childrens.map((item) => {
            return <MenuItem value={item.id}>{item.name}</MenuItem>;
          })}
      </Select>
    </Box>
  );
};

export default SelectChildrenComp;
