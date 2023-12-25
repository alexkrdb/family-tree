import { Typography, Button, Paper } from "@mui/material";
import ProfileEditBio from "../../components/profile/profileEditBio";
import "./helper.scss"
const ProfileTabBio = ({ user, ...props }) => {
  return (
    <Paper className="" sx={{ padding: "1rem", width: "100%" }}>
      <Typography variant="h5" justifyContent={"center"}>
        Dane biograficzne
      </Typography>
      <div className="grid c3">
        <span className="grid-item">Imie i nazwisko:</span>
        <span className="grid-item">
          {user?.bio?.fName} {user?.bio?.lName}
        </span>
        <hr className="grid-border" />
        <span className="grid-item">Data urodzenia:</span>
        <span className="grid-item">
          {user && user.bio?.dBirth.toDate().toLocaleDateString()}
        </span>
        <hr className="grid-border" />
        <span className="grid-item">Miejscowośc:</span>
        <span className="grid-item">{user?.bio?.location}</span>
        <hr className="grid-border" />
        <span className="grid-item">Biografia:</span>
        <span className="grid-item">{user?.bio?.bio}</span>
        <hr className="grid-border" />
        <span className="grid-item">
          <ProfileEditBio user={user} />
        </span>
      </div>
    </Paper>
  );
};

export default ProfileTabBio;
