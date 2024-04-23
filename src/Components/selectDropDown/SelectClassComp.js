import { Box, InputLabel, MenuItem, Select } from "@mui/material";
import React, { useContext, useEffect } from "react";
import eDairyContext from "../../context/eDairyContext";

export const SelectClassComp = () => {
  const context = useContext(eDairyContext);
  const {
    classes,
    setSections,
    setSelectedSection,
    selectedClass,
    setSelectedClass,
  } = context;

  const handleChangeClass = (event) => {
    if (event.target.value) {
      const selectedItem = classes?.find(
        (item) => item?.id === event.target.value
      );
      setSelectedClass(selectedItem || {});
      setSelectedSection({});
    } else {
      setSelectedClass({});
      setSelectedSection({});
    }
  };

  return (
    <Box>
      <InputLabel
        sx={{ width: "100%", height: "11px", fontSize: "10px" }}
        id="demo-simple-select-label"
      >
        Select A Class
      </InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={selectedClass?.id}
        label="sections"
        onChange={handleChangeClass}
        sx={{ width: "150px", height: "30px" }}
      >
        <MenuItem value={null}>None</MenuItem>

        {classes &&
          classes.map((item) => {
            return <MenuItem value={item.id}>{item.name}</MenuItem>;
          })}
      </Select>
    </Box>
  );
};
