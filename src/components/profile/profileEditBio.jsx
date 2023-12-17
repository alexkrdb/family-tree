import React, { useContext, useState } from "react";
import { updateOne } from "../../hooks/useDB";
import { getLocalUser, setLocalUser } from "../../hooks/useLocalUser";
import { AuthContext } from "../../context/AuthContex";
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

const tableCellStyle = {
  fontWeight: "bold",
  minWidth: "60px",
  padding: "10px",
};

const dataCellStyle = {
  textAlign: "left",
  padding: "10px",
};

const buttonCellStyle = {
  textAlign: "center",
  mt: 2,
};
const ProfileEditBio = ({ bio, setIsEdit, ...other }) => {
  const [editedData, setEditedData] = useState(bio);
  const { currentUser } = useContext(AuthContext);

  const handleCancelChanges = () => {
    setIsEdit(false);
  };

  const handleSaveChanges = () => {
    updateOne({ bio: editedData }, "users", currentUser.uid);
    const user = getLocalUser();
    setLocalUser({ ...user, bio: editedData });
    setIsEdit(false);
  };

  return (
    <div {...other} className="tab" elevation={3} sx={{ padding: "1rem" }}>
      <Typography variant="h5" gutterBottom>
        Edycja danych
      </Typography>
      <TableContainer className="tableContainer">
        <Table>
          <TableBody>
            <TableRow>
              <TableCell component="th" scope="row" sx={tableCellStyle}>
                Imie i Nazwisko
              </TableCell>
              <TableCell align="left" sx={dataCellStyle}>
                <TextField
                  label="Imie"
                  defaultValue={editedData?.fName}
                  onChange={(e) =>
                    setEditedData({ ...editedData, fName: e.target.value })
                  }
                  sx={{mr: 2}}
                />
                <TextField
                  label="Nazwisko"
                  defaultValue={editedData?.lName}
                  onChange={(e) =>
                    setEditedData({ ...editedData, lName: e.target.value })
                  }
                  sx={{ml: 2}}
                />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th" scope="row" sx={tableCellStyle}>
                Data urodzenia
              </TableCell>
              <TableCell align="left" sx={dataCellStyle}>
                <TextField
                  type="date"
                  fullWidth
                  defaultValue={editedData?.dBirth
                    ?.toDate()
                    .toLocaleDateString()}
                  onChange={(e) =>
                    setEditedData({ ...editedData, dBirth: e.target.value })
                  }
                />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th" scope="row" sx={tableCellStyle}>
                Miejscowość
              </TableCell>
              <TableCell align="left" sx={dataCellStyle}>
                <TextField
                  fullWidth
                  defaultValue={editedData?.location}
                  onChange={(e) =>
                    setEditedData({ ...editedData, location: e.target.value })
                  }
                />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th" scope="row" sx={tableCellStyle}>
                Biografia
              </TableCell>
              <TableCell align="left" sx={dataCellStyle}>
                <TextField
                  multiline
                  fullWidth
                  defaultValue={editedData?.bio}
                  onChange={(e) =>
                    setEditedData({ ...editedData, bio: e.target.value })
                  }
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

export default ProfileEditBio;
