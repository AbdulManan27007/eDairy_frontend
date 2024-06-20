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
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <span
                    style={{
                      fontSize: "12px",
                      fontWeight: "bold",
                      minWidth: "45px",
                    }}
                  >
                    Period 1
                  </span>
                  <span
                    style={{
                      fontSize: "10px",
                      minWidth: "60px",
                    }}
                  >
                    8am - 9am
                  </span>
                </div>
              </StyledTableCell>
              <StyledTableCell align="center">
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <span
                    style={{
                      fontSize: "12px",
                      fontWeight: "bold",
                      minWidth: "45px",
                    }}
                  >
                    Period 2
                  </span>
                  <span
                    style={{
                      fontSize: "10px",
                      minWidth: "60px",
                    }}
                  >
                    9am - 10am
                  </span>
                </div>
              </StyledTableCell>
              <StyledTableCell align="center">
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <span
                    style={{
                      fontSize: "12px",
                      fontWeight: "bold",
                      minWidth: "45px",
                    }}
                  >
                    Period 3
                  </span>
                  <span
                    style={{
                      fontSize: "10px",
                      minWidth: "60px",
                    }}
                  >
                    10am - 11pm
                  </span>
                </div>
              </StyledTableCell>
              <StyledTableCell align="center">
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <span
                    style={{
                      fontSize: "12px",
                      fontWeight: "bold",
                      minWidth: "45px",
                    }}
                  >
                    Period 4
                  </span>
                  <span
                    style={{
                      fontSize: "10px",
                      minWidth: "60px",
                    }}
                  >
                    11pm - 12pm
                  </span>
                </div>
              </StyledTableCell>
              <StyledTableCell align="center">
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <span
                    style={{
                      fontSize: "12px",
                      fontWeight: "bold",
                      minWidth: "45px",
                    }}
                  >
                    Period 5
                  </span>
                  <span
                    style={{
                      fontSize: "10px",
                      minWidth: "60px",
                    }}
                  >
                    12pm - 1pm
                  </span>
                </div>
              </StyledTableCell>
              <StyledTableCell align="center">
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <span
                    style={{
                      fontSize: "12px",
                      fontWeight: "bold",
                      minWidth: "45px",
                    }}
                  >
                    Period 6
                  </span>
                  <span
                    style={{
                      fontSize: "10px",
                      minWidth: "60px",
                    }}
                  >
                    1pm - 2pm
                  </span>
                </div>
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
                {row?.periods?.slice(0, 6).map((period, index) => (
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
