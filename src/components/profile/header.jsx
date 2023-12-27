import {
  Avatar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Input,
  TextField,
  Typography,
} from "@mui/material";
import CreateIcon from "@mui/icons-material/Create";
import UseFileUpload from "../../hooks/useFileUpload";
import { updateOne } from "../../hooks/useDB";
import { Fragment, useState } from "react";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import ImageInput from "../imageInput/ImageInput";

const Header = ({ user, currentUser }) => {
  const [, , uploadFiles] = UseFileUpload();

  const renderEmail = () => {
    if (user?.privacySettings?.includes("email")) {
      return <Typography variant="body1">{user?.email}</Typography>;
    }
    return null;
  };

  const updateAvatar = async (event) => {
    const url = await uploadFiles([event.target.files[0]]);
    updateOne({ photoUrl: url[0] }, "users", currentUser.uid);
  };

  return (
    <div className="header">
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Avatar sx={{ width: 150, height: 150 }} src={user?.photoUrl} />
        <label htmlFor="avatar-input">
          <CreateIcon />
          <ImageInput id="avatar-input" onChange={updateAvatar} />

        </label>
        <div className="user-info">
          <Typography variant="h4">
            {user?.bio?.fName} {user?.bio?.lName}
          </Typography>
          {renderEmail()}
        </div>
      </div>
    </div>
  );
};

export default Header;
