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
    <Paper sx={{ padding: "1rem" }}>
      <ProfileEditLogin
        user={user}
        setIsEdit={setIsEdit}
        style={hidden(!isEdit)}
      />
      <TableContainer style={hidden(isEdit)} className="tableContainer">
        <Table sx={{ minWidth: 150, maxWidth: 900 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell sx={tableCellStyle} align="center" colSpan={2}>
                <Typography variant="h5" gutterBottom>
                  Dane autoryzacji
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
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
        <Button variant="contained" onClick={updateData} sx={{ mt: 2 }}>
          Edytuj
        </Button>
      </TableContainer>
    </Paper>
  );
};

export default ProfileTabLogin;
