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
import ProfileEditLogin from "../../components/profile/profileEditLogin";

const hidden = (bool) => {
  if (bool) return { display: "none" };
};

const ProfileTabLogin = (props) => {
  console.log(props);
  const user = props.user;
  const [isEdit, setIsEdit] = useState(false);
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
      <ProfileEditLogin
        user={user}
        setIsEdit={setIsEdit}
        style={hidden(!isEdit)}
      />
      <TableContainer component={Paper} style={hidden(isEdit)}>
        <Typography variant="h6">My login data</Typography>
        <Table sx={{ minWidth: 250, maxWidth: 900 }} aria-label="simple table">
          <TableBody>
            <TableRow>
              <TableCell component="th" scope="row" sx={tableCellStyle}>
                Email:
              </TableCell>
              <TableCell align="left" sx={dataCellStyle}>
                {user?.email}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th" scope="row" sx={tableCellStyle}>
                Hasło:
              </TableCell>
              <TableCell align="left" sx={dataCellStyle}>
                ***********
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <Button onClick={updateData}>Edytuj</Button>
      </TableContainer>
    </div>
  );
};

export default ProfileTabLogin;
