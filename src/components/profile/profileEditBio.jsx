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
  Grid,
} from "@mui/material";
import { AuthContext } from "../../context/AuthContex";
import { getLocalUser, setLocalUser } from "../../hooks/useLocalUser";
import { updateOne } from "../../hooks/useDB";

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
    <div {...other} className="tab ">
      <Typography variant="h6">Edit bio</Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 250, maxWidth: 900 }} aria-label="simple table">
          <TableBody>
            <TableRow>
              <TableCell component="th" scope="row">
                Imie i Nazwisko
              </TableCell>
              <TableCell align="left">
                <TextField
                  id="outlined-basic"
                  label="fName"
                  variant="outlined"
                  defaultValue={editedData?.fName}
                  onChange={(e) =>
                    setEditedData({ ...editedData, fName: e.target.value })
                  }
                />
                <TextField
                  id="outlined-basic"
                  label="lName"
                  variant="outlined"
                  defaultValue={editedData?.lName}
                  onChange={(e) =>
                    setEditedData({ ...editedData, lName: e.target.value })
                  }
                />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th" scope="row">
                Data urodzenia
              </TableCell>
              <TableCell align="left">
                <TextField
                  id="outlined-basic"
                  label="dBirth"
                  variant="outlined"
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
              <TableCell component="th" scope="row">
                Państwo
              </TableCell>
              <TableCell align="left">
                <TextField
                  id="outlined-basic"
                  label="country"
                  variant="outlined"
                  defaultValue={editedData?.country}
                  onChange={(e) =>
                    setEditedData({ ...editedData, country: e.target.value })
                  }
                />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th" scope="row">
                Miejscowość
              </TableCell>
              <TableCell align="left">
                <TextField
                  id="outlined-basic"
                  label="location"
                  variant="outlined"
                  defaultValue={editedData?.location}
                  onChange={(e) =>
                    setEditedData({ ...editedData, location: e.target.value })
                  }
                />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th" scope="row">
                Bio
              </TableCell>
              <TableCell align="left">
                <TextField
                  id="outlined-basic"
                  label="biography"
                  multiline
                  fullWidth
                  variant="outlined"
                  defaultValue={editedData?.biography}
                  onChange={(e) =>
                    setEditedData({ ...editedData, biography: e.target.value })
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

export default ProfileEditBio;
