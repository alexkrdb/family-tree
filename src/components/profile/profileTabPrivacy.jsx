import { Button, Checkbox, List, ListItem, ListItemText } from "@mui/material";
import { useContext, useState } from "react";
import { updateOne } from "../../hooks/useDB";
import { AuthContext } from "../../context/AuthContex";

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
    <div>
      <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
        <ListItem>
          <ListItemText primary="Czy pokazywać Bio?" />
          <Checkbox
            edge="end"
            checked={checked.indexOf("bio") !== -1}
            onChange={handleToggle("bio")}
            inputProps={{ "aria-labelledby": "bio-checkbox" }}
          />
        </ListItem>
        <ListItem>
          <ListItemText primary="Czy pokazywać Email?" />
          <Checkbox
            edge="end"
            checked={checked.indexOf("email") !== -1}
            onChange={handleToggle("email")}
            inputProps={{ "aria-labelledby": "email-checkbox" }}
          />
        </ListItem>

      </List>
      <Button variant="contained" onClick={handleSave}>
        Zapisz
      </Button>
    </div>
  );
};

export default ProfileTabPrivacy;
