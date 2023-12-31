import { Button, Paper, Tab, Tabs, Typography } from "@mui/material";
import ProfileTabLogin from "./profileTabLogin";
import ProfileTabBio from "./profileTabBio";

import { deleteUser } from "firebase/auth";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState } from "react";
import ProfileTabPrivacy from "./profileTabPrivacy";

const ProfileTab = ({user, currentUser, ...props}) => {
  const [selectedTab, setSelectedTab] = useState(0);
  const handleDeleteProfile = async () => {
    if (
      window.confirm(
        "Czy na pewno chcesz usunąć swój profil? Tej operacji nie można cofnąć."
      )
    )
      deleteUser(currentUser)
        .then(() => console.log("Profil został pomyślnie usunięty."))
        .catch((error) => {
          alert("Wystąpił błąd podczas usuwania profilu: " + error.message);
          console.error(error.message);
        });
  };
  const hidden = (id) => {
    if (selectedTab !== id) return { display: "none" };
  };
  const handleChange = (event, newValue) => {
    setSelectedTab(newValue);
  };
  const buttons = ["Dane logowania", "Biografia", "Prywatność"];
  return (
    <div className="tabs-container">
      <div className="tabs">
        <Tabs
          orientation="vertical"
          value={selectedTab}
          onChange={handleChange}
          textColor="primary"
        >
          {buttons.map((button, index) => (
            <Tab label={button} key={index} />
          ))}
        </Tabs>
        <Button
          size="small"
          color="error"
          startIcon={<DeleteIcon />}
          onClick={handleDeleteProfile}
          style={{
            position: "fixed",
            bottom: "10px",
            left: "10px",
          }}
        >
          Usuń konto
        </Button>
      </div>
      <div className="content">
        <div className="login-data" style={hidden(0)}>
          <ProfileTabLogin user={user} />
        </div>
        <Paper className="bio" style={hidden(1)}>
          <ProfileTabBio user={user} currentUser={currentUser} key={user.email} />
        </Paper>

        <div className="privacy" style={hidden(2)}>
          <ProfileTabPrivacy user={user}/>
        </div>
      </div>
    </div>
  );
};

export default ProfileTab;
