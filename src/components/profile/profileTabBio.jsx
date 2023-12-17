import React, { useState } from "react";
import {
  Typography,
  Button,
  Table,
  TableContainer,
  TableBody,
  TableCell,
  TableRow,
  Paper,
  TableHead,
} from "@mui/material";
import ProfileEditBio from "../../components/profile/profileEditBio";

const hidden = (bool) => {
  if (bool) return { display: "none" };
};

const ProfileTabBio = ({ user, logged }) => {
  const [isEdit, setIsEdit] = useState(false);

  const renderBio = () => {
    if (user.privacySettings?.includes("bio")) {
      return (
        <TableRow>
          <TableCell component="th" scope="row" sx={{ fontWeight: "bold" }}>
            Bio
          </TableCell>
          <TableCell align="left">
            <Typography variant="body1">{user?.bio?.biography}</Typography>
          </TableCell>
        </TableRow>
      );
    }
    return null;
  };

  const tableCellStyle = {
    fontWeight: "bold",
    minWidth: "60px",
    padding: "10px",
  };

  const dataCellStyle = {
    textAlign: "left",
    padding: "10px",
  };

  const updateData = () => {
    setIsEdit(true);
  };

  return (
    <Paper sx={{ padding: "1rem" }}>
      <ProfileEditBio
        bio={user.bio}
        setIsEdit={setIsEdit}
        style={hidden(!isEdit)}
      />
      <TableContainer
        style={hidden(isEdit)}
        className="tableContainer"
        sx={{ width: "95%", display: "block", overflowX: "auto" }}
      >
        <Table sx={{ minWidth: 150, maxWidth: 900 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell sx={tableCellStyle} align="center" colSpan={2}>
                <Typography variant="h5" gutterBottom>
                  Dane biograficzne
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell component="th" scope="row" sx={tableCellStyle}>
                Imie i nazwisko
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
                {user && user.bio?.dBirth.toDate().toLocaleDateString()}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th" scope="row" sx={tableCellStyle}>
                Miejscowośc
              </TableCell>
              <TableCell align="left" sx={dataCellStyle}>
                {user?.bio?.location}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th" scope="row" sx={tableCellStyle}>
                Biografia
              </TableCell>
              <TableCell align="left" sx={dataCellStyle}>
                {user?.bio?.bio}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <Button
          variant="contained"
          onClick={updateData}
          sx={{ mt: 2, textAlign: "center" }}
        >
          Edytuj
        </Button>
      </TableContainer>
    </Paper>
  );
};

export default ProfileTabBio;
