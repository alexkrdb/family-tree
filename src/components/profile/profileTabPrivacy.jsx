import React, { useContext, useState } from "react";
import { updateOne } from "../../hooks/useDB";
import { AuthContext } from "../../context/AuthContex";
import {
  Button,
  Checkbox,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

const ProfileTabPrivacy = () => {
  const [checked, setChecked] = useState([]);
  const { currentUser } = useContext(AuthContext);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const handleSave = () => {
    updateOne({ privacySettings: checked }, "users", currentUser.uid);
    console.log("Saved privacy settings:", checked);
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
  return (
    <TableContainer component={Paper} sx={{padding: "1rem", display: "flex", flexDirection: "column", alignItems: "center"}}className="tableContainer">
      <Table
        sx={{ minWidth: 150, maxWidth: 360 }}
        aria-label="privacy settings table"
      >
        <TableHead>
          <TableRow>
            <TableCell sx={tableCellStyle} align="center" colSpan={2}>
              <Typography variant="h5" gutterBottom>
                Prywatność
              </Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell component="th" scope="row" sx={tableCellStyle}>
              Czy pokazywać Bio?
            </TableCell>
            <TableCell align="right" sx={dataCellStyle}>
              <Checkbox
                edge="end"
                checked={checked.indexOf("bio") !== -1}
                onChange={handleToggle("bio")}
                inputProps={{ "aria-labelledby": "bio-checkbox" }}
              />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell component="th" scope="row" sx={tableCellStyle}>
              Czy pokazywać Email?
            </TableCell>
            <TableCell align="right" sx={dataCellStyle}>
              <Checkbox
                edge="end"
                checked={checked.indexOf("email") !== -1}
                onChange={handleToggle("email")}
                inputProps={{ "aria-labelledby": "email-checkbox" }}
              />
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
          <Button variant="contained" onClick={handleSave} sx={{ mt: 2 }}>
            Zapisz
          </Button>
    </TableContainer>
  );
};

export default ProfileTabPrivacy;
