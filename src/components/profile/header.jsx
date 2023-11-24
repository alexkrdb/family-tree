import {
  Avatar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Input,
  TextField,
  Typography,
} from "@mui/material";
import CreateIcon from "@mui/icons-material/Create";
import UseFileUpload from "../../hooks/useFileUpload";
import { updateOne } from "../../hooks/useDB";
import { Fragment, useState } from "react";
import UploadFileIcon from "@mui/icons-material/UploadFile";

const Header = ({user, currentUser}) => {
  const [files, setFiles, uploadFiles] = UseFileUpload();
  const [open, setOpen] = useState(false);

  const renderEmail = () => {
    if (user?.privacySettings?.includes("email")) {
      return <Typography variant="body1">{user?.email}</Typography>;
    }
    return null;
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const updateAvatar = async () => {
    const url = await uploadFiles();
    updateOne({ photoUrl: url[0] }, "users", currentUser.uid);
    setOpen(false);
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
        <Fragment>
          <label htmlFor="avatar-input">
            <Button
              component="span"
              startIcon={<CreateIcon />}
              onClick={handleClickOpen}
            ></Button>
          </label>

          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Change avatar</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Add a new avatar image from your files
              </DialogContentText>
              <Button
                component="label"
                variant="outlined"
                startIcon={<UploadFileIcon />}
                sx={{ marginTop: "1rem" }}
              >
                Add file to your post
                <input
                  type="file"
                  hidden
                  accept="image/png, image/jpeg"
                  onChange={(e) => {
                    setFiles(Array.from(e.target.files));
                  }}
                />
              </Button>
            </DialogContent>
            <DialogActions>
              <Button onClick={updateAvatar}>Save</Button>
              <Button onClick={handleClose}>Cancel</Button>
            </DialogActions>
          </Dialog>
        </Fragment>

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
