import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Fab,
  IconButton,
  ImageList,
  ImageListItem,
  TextField,
} from "@mui/material";
import { Fragment, useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import SendIcon from "@mui/icons-material/Send";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import UseFileUpload from "../../hooks/useFileUpload";
import {saveOne} from "../../hooks/useDB";
import {v4 as uuid} from "uuid";
import {getLocalUser} from "../../hooks/useLocalUser";
import { Timestamp } from "firebase/firestore";

const AddEventModal = (props) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [files, setFiles, uploadFiles] = UseFileUpload()
  const [postText, setPostText] = useState(null);
  

  const handleSave = async () => {
    try{
    const urls = await uploadFiles();
    console.log("urls", urls);
    const user = getLocalUser()
      if(user){
        const post = {
          id: uuid(),
          author: {
            name: `${user.fname} ${user.lname}`,
            photoUrl: user.photoUrl,
          },
          userId: user.uid,
          images: urls,
          text: postText,
          likes: 0,
          comments: [],
          insertedAt: Timestamp.now(),
        };
        saveOne(post, "posts", post.id);
        console.log("Post saved", post);
        props.setEvents(x => [post, ...x])
        setPostText(null);
        setFiles([])
      }
    handleClose();
    }catch(error){ 
      console.error(error.message)
    }
  }

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
          Add new Post
        </DialogTitle>
        <IconButton
          aria-label="close"
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
            label="What's going on"
            variant="outlined"
            multiline
            fullWidth
            onChange={(e) => setPostText(e.target.value)}
          />
          <div>
            <div style={{display: "flex", justifyContent: "center", paddingTop: "1rem", gap: "10px"}}>
                {files.map((file) => (
                    <img style={{width: "100px", height: "100px", objectFit: "cover"}} src={URL.createObjectURL(file)}/>
                ))}
            </div>
            
            <Button
              component="label"
              variant="outlined"
              startIcon={<UploadFileIcon />}
              sx={{ marginTop: "1rem" }}
            >
              Add file to your post
              <input type="file" hidden accept="image/png, image/jpeg" multiple onChange={(e) => {setFiles(Array.from(e.target.files))}}/>
            </Button>
          </div>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleSave} endIcon={<SendIcon />}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
};

export default AddEventModal;
