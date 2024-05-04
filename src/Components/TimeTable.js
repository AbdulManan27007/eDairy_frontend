import React from "react";
import { useTheme } from "@emotion/react";
import styled from "@emotion/styled";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { CustomNoRowsOverlay } from "./NoRowsOverlay";
import { NoRowsOverlayMessage } from "./NoRowsOverlayMessage";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary[500],
    fontWeight: "bold",
  },
}));

export const TimeTable = ({ data }) => {
  console.log("data", data);

  const theme = useTheme();
  return (
    <TableContainer>
      {data?.length ? (
        <Table
          sx={{ minHeight: { lg: "350px" } }}
          size="small"
          aria-label="time table"
        >
          <TableHead sx={{ color: "#858796" }}>
            <TableRow>
              <StyledTableCell>Day</StyledTableCell>
              <StyledTableCell align="center">
                Period 1 <br /> 9am - 10am
              </StyledTableCell>
              <StyledTableCell align="center">
                Period 2 <br /> 10am - 11am
              </StyledTableCell>
              <StyledTableCell align="center">
                Period 3 <br /> 11am - 12pm
              </StyledTableCell>
              <StyledTableCell align="center">
                Period 4 <br /> 12pm - 1pm
              </StyledTableCell>
              <StyledTableCell align="center">
                Period 5 <br /> 1pm - 2pm
              </StyledTableCell>
              <StyledTableCell align="center">
                Period 6 <br /> 2pm - 3pm
              </StyledTableCell>
              <StyledTableCell align="center">
                Period 7 <br /> 3pm - 4pm
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.map((row) => (
              <TableRow
                key={row?.day}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell
                  component="th"
                  scope="row"
                  sx={{
                    backgroundColor: theme.palette.primary[500],
                    fontWeight: "bold",
                  }}
                >
                  {row?.day}
                </TableCell>
                {row?.periods?.map((period, index) => (
                  <TableCell align="center" key={index}>
                    {period}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <NoRowsOverlayMessage message={"Select A Section First"} />
      )}
    </TableContainer>
  );
};
