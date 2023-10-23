import React from "react";
import {
  Typography,
  Button,
  Table,
  TableContainer,
  TableBody,
  TableCell,
  TableRow,
  Paper,
} from "@mui/material";

const tableCellStyle = {
  fontWeight: "bold",
  minWidth: "60px",
};

const dataCellStyle = {
  textAlign: "left",
};

const ProfileTabLogin= ({ user, toggleEdit }) => {
  return (
    <div>
      <Typography variant="h6">My login data</Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 250 }} aria-label="simple table">
          <TableBody>
            <TableRow>
              <TableCell component="th" scope="row" sx={tableCellStyle}>
                Email
              </TableCell>
              <TableCell align="left" sx={dataCellStyle}>
                {user?.email}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th" scope="row" sx={tableCellStyle}>
                Hasło
              </TableCell>
              <TableCell align="left" sx={dataCellStyle}>
                *************
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <Button onClick={toggleEdit}>Edytuj</Button>
    </div>
  );
};

export default ProfileTabLogin;
