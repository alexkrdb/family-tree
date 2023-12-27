import { Avatar, Typography } from "@mui/material";
import "./comment.scss";
const Comment = ({ comment }) => {
  return (
    <div className="comment">
      <Avatar src={comment?.author?.photoUrl} alt={comment?.author?.fullName} />
      <div className="commentBox">
        <Typography variant="subtitle2">{comment?.author?.fullName}</Typography>
        <Typography variant="body1">{comment.text}</Typography>
      </div>
    </div>
  );
};

export default Comment;
