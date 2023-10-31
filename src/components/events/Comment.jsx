import { Avatar, Box, Checkbox, FormControlLabel, Typography } from "@mui/material";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import "./comment.scss";
const Comment = ({ comment }) => {
  // console.log(comment);
  return (
    <div className="comment">
      <Avatar src={comment?.author?.photoUrl} alt={comment?.author?.fullName} />
      <div className="commentBox">
        <Typography variant="subtitle2">{comment?.author?.fullName}</Typography>
        <Typography variant="body1">{comment.text}</Typography>
      </div>

        <FormControlLabel
          value="like"
          control={
            <Checkbox
              icon={<FavoriteBorder />}
              color="error"
              checkedIcon={<Favorite />}
            />
          }
          label={comment.likes}
          labelPlacement="bottom"
        />
    </div>
  );
};

export default Comment;
