import { useState } from "react";
import { getLocalUser } from "../../hooks/useLocalUser";
import { updateOne } from "../../hooks/useDB";
import { Button, TextField } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { arrayUnion } from "firebase/firestore";

const NewComment = ({ postId }) => {
    console.log(postId);
  const user = getLocalUser();
  const [comment, setComment] = useState({
    name: user.fname + " " + user.lname,
    photoUrl: user.photoUrl,
    likes: 0,
    text: "",
    userId: user.uid,
  });

  const handleSave = () => {
    user.uid && updateOne({comments: arrayUnion(comment)}, "posts", postId)
    setComment({...comment, text: ""})
  }

  return (
    <div className="comment">
      <TextField
        label="Comment"
        fullWidth
        multiline
        value={comment.text}
        className="commentBox"
        onChange={(event) =>
          setComment({ ...comment, text: event.target.value })
        }
      />
      <div className="centeredBox">
        <Button
          variant="contained"
          // color="default"
          endIcon={<SendIcon />}
          onClick={handleSave}
        >
          Send
        </Button>
      </div>
    </div>
  );
};

export default NewComment;
