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
  return (
    <Paper className="" sx={{ padding: "1rem", width: "100%" }}>
      <Typography variant="h5" justifyContent={"center"}>
        Prywatność
      </Typography>
      <div className="grid c3">
        <span className="grid-item">Czy pokazywać Bio?</span>
        <span className="grid-item">
          <Checkbox
            edge="end"
            checked={checked.indexOf("bio") !== -1}
            onChange={handleToggle("bio")}
            inputProps={{ "aria-labelledby": "bio-checkbox" }}
          />
        </span>
        <hr className="grid-border" />
        <span className="grid-item">Czy pokazywać Email?</span>
        <span className="grid-item">
          <Checkbox
            edge="end"
            checked={checked.indexOf("email") !== -1}
            onChange={handleToggle("email")}
            inputProps={{ "aria-labelledby": "email-checkbox" }}
          />
        </span>
        <hr className="grid-border" />
        <span className="grid-item">
          <Button variant="contained" onClick={handleSave} sx={{ mt: 2 }}>
            Zapisz
          </Button>
        </span>
      </div>
    </Paper>
  );
};

export default ProfileTabPrivacy;
