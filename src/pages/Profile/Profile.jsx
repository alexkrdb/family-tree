import { Avatar, Button, Typography, Tab, Tabs } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../config/firebase";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContex";
import "./Profile.scss";
import ProfileTabBio from "../../components/profile/profileTabBio";
import ProfileTabLogin from "../../components/profile/profileTabLogin";
import { getAuth, deleteUser } from "firebase/auth";

const Profile = () => {
  const { currentUser } = useContext(AuthContext);
  const [user, setUser] = useState({});
  const [selectedTab, setSelectedTab] = useState(0);

  const handleChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  useEffect(() => {
    const fetchData = async () => {
      console.log("Fetching data from the database");
      const userData = await getDoc(doc(db, "users", currentUser.uid));
      setUser(userData.data());
    };

    currentUser && fetchData();
  }, [currentUser]);

  const buttons = ["My login data", "My bio", "My privacy"];

  const handleDeleteProfile = async () => {
    if (
      window.confirm(
        "Czy na pewno chcesz usunąć swój profil? Tej operacji nie można cofnąć."
      )
    ) {
      try {
        await deleteUser(currentUser);
      } catch (error) {
        console.error("Błąd podczas usuwania profilu", error);
      }
    }
  };

  const toggleEdit = () => {
    const tabs = document.getElementsByClassName("bio");
    for (var i = 0; i < tabs.length; i++) {
      tabs[i].classList.toggle("hidden");
    }
  };
  return (
    <div className="Profile">
      <div className="header">
        <Avatar sx={{ width: 150, height: 150 }} src={user?.photoUrl} />
        <div className="user-info">
          <Typography variant="h4">
            {user?.bio?.fName} {user?.bio?.lName}
          </Typography>
          <Typography variant="body1">{user?.email}</Typography>
        </div>
      </div>
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
            Delete profile
          </Button>
        </div>
        <div className="content">
          {selectedTab === 0 && (
            <div className="login-data">
              <ProfileTabLogin user={user} toggleEdit={toggleEdit} />
            </div>
          )}
          {selectedTab === 1 && (
            <div className="bio">
              <ProfileTabBio user={user} toggleEdit={toggleEdit} />
            </div>
          )}
          {selectedTab === 2 && (
            <div className="privacy">
              <Typography variant="h6">My privacy tab</Typography>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
