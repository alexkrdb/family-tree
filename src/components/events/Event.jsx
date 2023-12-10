import {
  Button,
  ImageListItem,
  ImageList,
  Paper,
  Typography,
  Avatar,
  FormControlLabel,
  Checkbox,
  Menu,
  MenuItem,
  IconButton,
  TextField,
} from "@mui/material";
import CommentIcon from "@mui/icons-material/Comment";
import MModal from "../modal/MModal";
import Comment from "./Comment";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import { grey } from "@mui/material/colors";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useContext, useState } from "react";

import "./comment.scss";
import NewComment from "./newComment";
import { deleteOne } from "../../hooks/useDB";
import { AuthContext } from "../../context/AuthContex";
import Gallery from "../gallery/Gallery";
const Event = ({ data, setEvents, ...other }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const { currentUser } = useContext(AuthContext);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDelete = () => {
    if (window.confirm("Czy chcesz usunąć post?")) {
      deleteOne("posts", data.id);
      setEvents((x) => x.filter((event) => event.id !== data.id));
    }
    handleClose();
  };

  return (
    <Paper elevation={6} className="event" {...other}>
      <div className="header">
        <div style={{ display: "flex", gap: "1.5rem" }}>
          <Avatar sx={{ height: 50, width: 50 }} src={data.author?.photoUrl}>
            {data.author?.name[0]}
          </Avatar>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <Typography variant="h6">{data.author?.name}</Typography>
            <Typography color={grey[500]} variant="body2">
              {data.insertedAt.toDate().toLocaleDateString("en-GB", {
                month: "short",
                day: "numeric",
                hour: "numeric",
                minute: "numeric",
              })}
            </Typography>
          </div>
        </div>
        <IconButton onClick={handleClick}>
          <MoreVertIcon />
        </IconButton>
        <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
          {currentUser.uid === data.userId && (
            <MenuItem onClick={handleDelete} key={data.id}>
              Delete
            </MenuItem>
          )}
          <MenuItem>Share</MenuItem>
        </Menu>
      </div>
      <hr />
      
      <div className="eventContent">
        <Typography variant="body1">{data?.text}</Typography>
        <Gallery images={data?.images} />
      </div>

      <hr />

      <div className="footer">
        <FormControlLabel
          value="like"
          control={
            <Checkbox
              icon={<FavoriteBorder />}
              color="error"
              checkedIcon={<Favorite />}
            />
          }
          label={
            <Typography color="error" variant="button">
              Like
            </Typography>
          }
          labelPlacement="right"
        />
        <MModal buttonText="Comments" startIcon={<CommentIcon />}>
          <div>
            <Typography variant="h3">Comments</Typography>
            <div
              style={{ height: "50vh", overflowY: "scroll", margin: "1rem 0" }}
            >
              {data?.comments?.map((comment) => {
                // console.log(comment);
                return <Comment comment={comment} />;
              })}
              {/* Comment input box */}
            </div>
            <NewComment postId={data.id} />
          </div>
        </MModal>
      </div>
    </Paper>
  );
};

export default Event;
