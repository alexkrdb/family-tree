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

const ProfileTabBio = ({ user, toggleEdit }) => {
  return (
    <div>
      <Typography variant="h6">My bio</Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 250, maxWidth: 900, }} aria-label="simple table">
          <TableBody>
            <TableRow>
              <TableCell component="th" scope="row" sx={tableCellStyle}>
                Imie i Nazwisko
              </TableCell>
              <TableCell align="left" sx={dataCellStyle}>
                {user?.bio?.fName} {user?.bio?.lName}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th" scope="row" sx={tableCellStyle}>
                Data urodzenia
              </TableCell>
              <TableCell align="left" sx={dataCellStyle}>
                {user?.bio?.dBirth.toDate().toLocaleDateString()}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th" scope="row" sx={tableCellStyle}>
                Państwo
              </TableCell>
              <TableCell align="left" sx={dataCellStyle}>
                {user?.bio?.country}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th" scope="row" sx={tableCellStyle}>
                Miejscowość
              </TableCell>
              <TableCell align="left" sx={dataCellStyle}>
                {user?.bio?.location}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th" scope="row" sx={tableCellStyle}>
                Bio
              </TableCell>
              <TableCell align="left" sx={dataCellStyle}>
                {user?.bio?.biography}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <Button onClick={toggleEdit}>Edytuj</Button>
    </div>
  );
};

export default ProfileTabBio;
