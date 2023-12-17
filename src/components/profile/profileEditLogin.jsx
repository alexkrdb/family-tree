import React, { useContext, useState } from "react";
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
  getAuth,
  updateEmail,
  updatePassword,
} from "firebase/auth";

const tableCellStyle = {
  fontWeight: "bold",
  minWidth: "60px",
  padding: "10px",
};

const dataCellStyle = {
  textAlign: "left",
  padding: "10px",
};

const ProfileEditLogin = ({ setIsEdit, ...other }) => {
  const {currentUser} = useContext(AuthContext);
  const [editedData, setEditedData] = useState({
    email: currentUser.email,
    newPassword: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    newPassword: "",
  });

  const handleCancelChanges = () => {
    setIsEdit(false);
  };

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const validatePassword = (password) => {
    const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
    return regex.test(password);
  };

  const validateField = (name, value) => {
    switch (name) {
      case "email":
        return validateEmail(value)
          ? ""
          : "Proszę wprowadzić poprawny adres email";
      case "password":
        return validatePassword(value)
          ? ""
          : "Hasło musi mieć co najmniej 6 znaków, w tym co najmniej jedną literę i jedną cyfrę";
      default:
        return "";
    }
  };

  const handleSaveChanges = async () => {
    try {
      const emailError = validateField("email", editedData.email);
      const newPasswordError = validateField(
        "password",
        editedData.newPassword
      );
  
      setErrors({
        ...errors,
        email: emailError,
        newPassword: newPasswordError,
      });
  
      if (emailError!=="" || newPasswordError!=="") {
        return;
      }
  
      if (editedData.email !== currentUser) {
        await updateEmail(currentUser, editedData.email);
        console.log("Succesful email update");
      }
  
      if (editedData.newPassword) {
        await updatePassword(currentUser, editedData.newPassword) 
        console.log("Succesful password update");
      }
  
      setIsEdit(false);
    } catch (error) {
      console.error("Error updating user data:", error);
    }
  };

  return (
    <div {...other} className="tab" elevation={3} sx={{ padding: "1rem" }}>
      <Typography variant="h5">Edycja danych autoryzacji</Typography>
      <TableContainer className="tableContainer">
        <Table sx={{ minWidth: 250, maxWidth: 900 }} aria-label="simple table">
          <TableBody>
            <TableRow>
              <TableCell component="th" scope="row" sx={tableCellStyle}>
                Email:
              </TableCell>
              <TableCell align="left" sx={dataCellStyle}>
                <TextField
                  label="email"
                  variant="outlined"
                  value={editedData.email}
                  fullWidth
                  onChange={(e) =>
                    setEditedData((old) => ({ ...old, email: e.target.value }))
                  }
                  error={errors.email!==""}
                  helperText={errors.email}
                />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th" scope="row" sx={tableCellStyle}>
                Hasło:
              </TableCell>
              <TableCell align="left" sx={dataCellStyle}>
                <TextField
                  label="nowe hasło"
                  variant="outlined"
                  type="password"
                  fullWidth
                  onChange={(e) =>
                    setEditedData((old) => ({
                      ...old,
                      newPassword: e.target.value,
                    }))
                  }
                  error={errors.newPassword!==""}
                  helperText={errors.newPassword}
                />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <Button
          variant="outlined"
          onClick={handleCancelChanges}
          sx={{ mt: 2, mr: 2 }}
        >
          Anuluj
        </Button>
        <Button
          variant="contained"
          onClick={handleSaveChanges}
          sx={{ mt: 2, ml: 2 }}
        >
          Zapisz
        </Button>
      </TableContainer>
    </div>
  );
};

export default ProfileEditLogin;
