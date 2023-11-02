import React, { useContext, useState } from "react";
import { db } from "../../config/firebase";
import { doc, updateDoc } from "firebase/firestore";
import {
  Typography,
  Button,
  Table,
  TableContainer,
  TableBody,
  TableCell,
  TableRow,
  Paper,
  TextField,
} from "@mui/material";
import { AuthContext } from "../../context/AuthContex";
import {
  EmailAuthProvider,
  getAuth,
  reauthenticateWithCredential,
  updatePassword,
} from "firebase/auth";

const tableCellStyle = {
  fontWeight: "bold",
  minWidth: "60px",
};

const dataCellStyle = {
  textAlign: "left",
};

const ProfileEditLogin = ({ user, setIsEdit, ...other }) => {
  const [editedData, setEditedData] = useState(user);

  const { currentUser } = useContext(AuthContext);
  const auth = getAuth();

  const handleCancelChanges = () => {
    setIsEdit(false);
  };

  const handleSaveChanges = async () => {
    const userDocRef = doc(db, "users", currentUser.uid);

    try {
      const credential = EmailAuthProvider.credential(
        user.email,
        editedData.currentPassword
      );

      await reauthenticateWithCredential(currentUser, credential);

      await updateDoc(userDocRef, editedData);

      if (editedData.newPassword) {
        await updatePassword(currentUser, editedData.newPassword);
      }

      setIsEdit(false);
    } catch (error) {
      console.error("Error updating user data:", error);
    }
  };
  return (
    <div {...other}>
      <Typography variant="h6">Edit login data</Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 250, maxWidth: 900 }} aria-label="simple table">
          <TableBody>
            <TableRow>
              <TableCell component="th" scope="row" sx={tableCellStyle}>
                Email:
              </TableCell>
              <TableCell align="left" sx={dataCellStyle}>
                <TextField
                  id="outlined-basic"
                  label="email"
                  variant="outlined"
                  defaultValue={editedData.email}
                  onChange={(e) =>
                    setEditedData({ ...editedData, email: e.target.value })
                  }
                />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th" scope="row" sx={tableCellStyle}>
                Hasło:
              </TableCell>
              <TableCell align="left" sx={dataCellStyle}>
                <TextField
                  id="outlined-basic"
                  label="password"
                  variant="outlined"
                  defaultValue={editedData.email}
                  onChange={(e) =>
                    setEditedData({
                      ...editedData,
                      newPassword: e.target.value,
                    })
                  }
                />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <Button onClick={handleSaveChanges}>Save</Button>
      <Button onClick={handleCancelChanges}>Cancel</Button>
    </div>
  );
};

export default ProfileEditLogin;
