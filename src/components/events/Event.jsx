import {
  Paper,
  Typography,
  Avatar,
  FormControlLabel,
  Checkbox,
  Menu,
  MenuItem,
  IconButton,
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
import { deleteOne, updateOne } from "../../hooks/useDB";
import { AuthContext } from "../../context/AuthContex";
import Gallery from "../gallery/Gallery";
import { MMenu, MMenuOpenButton, MenuContent } from "../menu/MMenu";
import { arrayRemove, arrayUnion } from "firebase/firestore";

const Event = ({ data, setEvents, ...other }) => {
 
  const { currentUser } = useContext(AuthContext);
  const [liked, setLiked] = useState({
    likes: data.likes.length,
    liked: data.likes.includes(currentUser.uid),
  });

const Event = ({ data, setEvents, ...other }) => {
  const { currentUser } = useContext(AuthContext);
  const handleDelete = () => {
    if (window.confirm("Czy chcesz usunąć post?")) {
      deleteOne("posts", data.id);
      setEvents((x) => x.filter((event) => event.id !== data.id));
    }
  };

  const handleLike = () => {
    if (!liked.liked) {
      updateOne({ likes: arrayUnion(currentUser.uid) }, "posts", data.id);
      setLiked((old) => ({ likes: old.likes + 1, liked: true }));
    } else {
      updateOne({ likes: arrayRemove(currentUser.uid) }, "posts", data.id);
      setLiked((old) => ({ likes: old.likes - 1, liked: false }));
    }
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
              {data.insertedAt.toDate().toLocaleDateString("pl-PL", {
                month: "short",
                day: "numeric",
                hour: "numeric",
                minute: "numeric",
              })}
            </Typography>
          </div>
        </div>
        <MMenu>
          <MMenuOpenButton>
            <IconButton>
              <MoreVertIcon />
            </IconButton>
          </MMenuOpenButton>
          <MenuContent>
            {currentUser.uid === data.userId && <span onClick={handleDelete}>Usuń</span>}
            <span>Udostępnij</span>
          </MenuContent>
        </MMenu>
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
            <div style={{ display: "flex", alignItems: "center" }}>
              <Typography>{liked.likes > 0 && liked.likes}</Typography>
              <Checkbox
                icon={<FavoriteBorder />}
                color="error"
                checkedIcon={<Favorite />}
                checked={liked.liked}
                onChange={handleLike}
              />
            </div>
          }
          label={
            <Typography color="error" variant="button">
              Lubię to
            </Typography>
          }
          labelPlacement="right"
        />
        <MModal buttonText="Komentarze" startIcon={<CommentIcon />}>
          <div>
            <Typography variant="h3">Komentarze</Typography>
            <CommentsList data={data} key={data.comments?.length}/>
            <NewComment postId={data.id} setEvents={setEvents} />
          </div>
        </MModal>
      </div>
    </Paper>
  );
};

const CommentsList = ({data}) => {
  return (
    <div style={{ height: "50vh", overflowY: "scroll", margin: "1rem 0" }}>
      {data?.comments?.map((comment) => {
        return <Comment comment={comment} postId={data.id} />;
      })}
    </div>
  );
};

export default Event;
