import { Typography, Paper } from "@mui/material";
import { EditEmail, EditPassword } from "../../components/profile/profileEditLogin";
import "./helper.scss";

const ProfileTabLogin = ({ user, ...props }) => {
  return (
    <Paper className="" sx={{ padding: "1rem", width: "100%" }}>
      <Typography variant="h5" justifyContent={"center"}>
        Dane logowania
      </Typography>
      <div className="grid c3">
        <span className="grid-item">Email:</span>
        <span className="grid-item">{user?.email}</span>
        <span className="grid-item">
          <EditEmail/>
        </span>
        <hr className="grid-border" />
        <span className="grid-item">Hasło:</span>
        <span className="grid-item">******</span>
        <span className="grid-item">
          <EditPassword />
        </span>
      </div>
    </Paper>
  );
};

export default ProfileTabLogin;
