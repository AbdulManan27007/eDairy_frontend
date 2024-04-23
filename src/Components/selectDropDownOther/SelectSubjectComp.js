import { Box, InputLabel, MenuItem, Select } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import eDairyContext from "../../context/eDairyContext";

const SelectSubjectComp = () => {
  const context = useContext(eDairyContext);
  const {
    subjects,
    setSubjects,
    selectedSection,
    selectedSubject,
    setSelectedSubject,
  } = context;

  const [classSubjects, setClassSubjects] = useState(subjects || []);

  useEffect(() => {
    if (selectedSection?.id) {
      const filterSections = subjects?.filter(
        (item) => item?.section == selectedSection?.id
      );
      setClassSubjects(filterSections);
    } else {
      setClassSubjects([]);
    }
  }, [selectedSection]);

  const handleChangeSubject = (event) => {
    if (event.target.value) {
      const selectedItem = subjects?.find(
        (item) => item?.id === event.target.value
      );
      setSelectedSubject(selectedItem || {});
    } else {
      setSelectedSubject({});
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
        value={selectedSubject?.id}
        label="sections"
        onChange={handleChangeSubject}
        sx={{ width: "150px", height: "30px" }}
      >
        <MenuItem value={null}>None</MenuItem>

        {classSubjects &&
          classSubjects.map((item) => {
            return <MenuItem value={item.id}>{item.name}</MenuItem>;
          })}
      </Select>
    </Box>
  );
};

export default SelectSubjectComp;
