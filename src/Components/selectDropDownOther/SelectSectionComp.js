import { Box, InputLabel, MenuItem, Select } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import eDairyContext from "../../context/eDairyContext";

const SelectSectionComp = () => {
  const context = useContext(eDairyContext);
  const {
    sections,
    selectedSection,
    setSelectedSection,
    selectedClass,
    subjects,
    setSubjects,
  } = context;
  const [classSections, setClassSections] = useState(sections || []);

  useEffect(() => {
    if (selectedClass?.id) {
      const filterSections = sections?.filter(
        (item) => item?.class == selectedClass?.id
      );
      setClassSections(filterSections);
    } else {
      setClassSections([]);
    }
  }, [selectedClass]);

  const handleChangeSection = (event) => {
    if (event.target.value) {
      const selectedItem = classSections?.find(
        (item) => item?.id === event.target.value
      );
      const filteredsubjects = subjects.filter(
        (item) => item?.section == event.target.value
      );
      setSelectedSection(selectedItem || {});
    } else {
      setSelectedSection({});
    }
  };

  return (
    <Box>
      <InputLabel
        sx={{ width: "100%", height: "11px", fontSize: "10px" }}
        id="demo-simple-select-label"
      >
        Select A Section
      </InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={selectedSection?.id}
        label="classSections"
        onChange={handleChangeSection}
        sx={{ width: "150px", height: "30px" }}
      >
        <MenuItem value={null}>None</MenuItem>

        {classSections &&
          classSections.map((item) => {
            return <MenuItem value={item.id}>{item.name}</MenuItem>;
          })}
      </Select>
    </Box>
  );
};

export default SelectSectionComp;
