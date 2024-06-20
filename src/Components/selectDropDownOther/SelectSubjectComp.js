import { Box, InputLabel, MenuItem, Select } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import eDairyContext from "../../context/eDairyContext";

const SelectSubjectComp = () => {
  const context = useContext(eDairyContext);
  const { subjects, selectedSubject, setSelectedSubject } = context;

  const handleChangeSubject = (event) => {
    if (event.target.value) {
      setSelectedSubject(event.target.value);
    } else {
      setSelectedSubject("");
    }
  };

  return (
    <Box>
      <InputLabel
        sx={{ width: "100%", height: "11px", fontSize: "10px" }}
        id="demo-simple-select-label"
      >
        Select A Subject
      </InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={selectedSubject}
        label="sections"
        onChange={handleChangeSubject}
        sx={{ width: "150px", height: "30px" }}
      >
        <MenuItem value={null}>None</MenuItem>

        {subjects &&
          subjects.map((item) => {
            return <MenuItem value={item}>{item}</MenuItem>;
          })}
      </Select>
    </Box>
  );
};

export default SelectSubjectComp;
