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
} from "@mui/material";
import ProfileEditBio from "../../components/profile/profileEditBio";

const hidden = (bool) => {
  if (bool) return { display: "none" };
};

const ProfileTabBio = ({user, logged}) => {

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
  };

  const dataCellStyle = {
    textAlign: "left",
  };
  const updateData = () => {
    setIsEdit(true);
  };

  return (
    <div>
      <ProfileEditBio
        bio={user.bio}
        setIsEdit={setIsEdit}
        style={hidden(!isEdit)}
      />
      <TableContainer component={Paper} style={hidden(isEdit)}>
        <Typography variant="h6">My bio</Typography>
        <Table sx={{ minWidth: 250, maxWidth: 900 }} aria-label="simple table">
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
                {user && user.bio?.dBirth.toDate().toLocaleDateString()}
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
            {renderBio()}
          </TableBody>
        </Table>
         <Button onClick={updateData}> Edytuj </Button>
      </TableContainer>
    </div>
  );
};

export default ProfileTabBio;
