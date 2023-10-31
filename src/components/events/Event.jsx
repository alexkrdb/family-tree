import {
  Button,
  ImageListItem,
  ImageList,
  Paper,
  Typography,
  Avatar,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import CommentIcon from "@mui/icons-material/Comment";
import MModal from "../modal/MModal";
import Comment from "./Comment";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import { grey } from "@mui/material/colors";

const Event = ({ data }) => {
  return (
    <Paper elevation={6} className="event">
      <div className="header">
        <Avatar
          sx={{ height: 50, width: 50 }}
          src={data.author?.photoUrl}>
            {data.author?.name[0]}
          </Avatar>
        <div style={{ display: "flex", flexDirection:"column" }}>
          <Typography variant="h6">{data.author?.name}</Typography>
          <Typography color={grey[500]} variant="body2">
            {data.insertedAt.toDate().toLocaleDateString('en-GB', { month: "short", day: "numeric", hour: "numeric", minute: "numeric"})}
          </Typography>
        </div>
      </div>
      <hr />

      <div className="eventContent">
        <Typography variant="body1">{data?.text}</Typography>
        <ImageList variant="masonry" cols={2} gap={8}>
          {data.images?.map((image) => (
            <ImageListItem key={image}>
              <img src={image} alt={"Image"} loading="lazy" />
            </ImageListItem>
          ))}
        </ImageList>
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
          <Typography variant="h3">Comments</Typography>
          {data?.comments?.map((comment) => {
            // console.log(comment);
            return <Comment comment={comment} />;
          })}
        </MModal>
      </div>
    </Paper>
  );
};

export default Event;
