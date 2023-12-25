import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Fab,
  IconButton,
  TextField,
} from "@mui/material";
import { Fragment, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import SendIcon from "@mui/icons-material/Send";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import UseFileUpload from "../../hooks/useFileUpload";
import { saveOne } from "../../hooks/useDB";
import { v4 as uuid } from "uuid";
import { getLocalUser } from "../../hooks/useLocalUser";
import { Timestamp } from "firebase/firestore";

const AddEventModal = (props) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [files, setFiles, uploadFiles] = UseFileUpload();
  const [postText, setPostText] = useState("");
  const [isTextEmpty, setIsTextEmpty] = useState(false);

  const handleSave = async () => {
    try {
      const urls = await uploadFiles();
      console.log("urls", urls);
      const user = getLocalUser();

      if (user) {
        if (postText.trim() === "") {
          setIsTextEmpty(true);
          return;
        }
        const post = {
          id: uuid(),
          author: {
            name: `${user.fname} ${user.lname}`,
            photoUrl: user.photoUrl,
          },
          userId: user.uid,
          images: urls,
          text: postText,
          likes: [],
          comments: [],
          insertedAt: Timestamp.now(),
        };

        saveOne(post, "posts", post.id);
        props.setEvents((x) => [post, ...x]);
        setPostText("");
        setFiles([]);
        setIsTextEmpty(false);
        handleClose();
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <Fragment>
      <Fab
        color="primary"
        aria-label="add"
        style={{ position: "fixed", right: "5%", bottom: "10%" }}
        onClick={handleOpen}
      >
        <AddIcon />
      </Fab>
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        fullWidth
        maxWidth="lg"
        open={open}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Dodaj nowy post
        </DialogTitle>
        <IconButton
          aria-label="close"
          multiline
          fullWidth
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          <TextField
            id="outlined-basic"
            label="Co się dzieje"
            variant="outlined"
            multiline
            fullWidth
            onChange={(e) => setPostText(e.target.value)}
            value={postText}
            error={isTextEmpty}
            helperText={isTextEmpty && "Tekst nie może być pusty"}
          />
          <div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                paddingTop: "1rem",
                gap: "10px",
              }}
            >
              {files.map((file) => (
                <img
                  style={{
                    width: "100px",
                    height: "100px",
                    objectFit: "cover",
                  }}
                  src={URL.createObjectURL(file)}
                />
              ))}
            </div>

            <Button
              component="label"
              variant="outlined"
              startIcon={<UploadFileIcon />}
              sx={{ marginTop: "1rem" }}
            >
              Dodaj zdjęcia do swojego posta
              <input
                type="file"
                hidden
                accept="image/png, image/jpeg"
                multiple
                onChange={(e) => {
                  setFiles(Array.from(e.target.files));
                }}
              />
            </Button>
          </div>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleSave} endIcon={<SendIcon />}>
            Zapisz
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
};

export default AddEventModal;
