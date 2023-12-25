import { useState } from "react";
import { getLocalUser } from "../../hooks/useLocalUser";
import { updateOne } from "../../hooks/useDB";
import { Button, TextField } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { arrayUnion } from "firebase/firestore";

const NewComment = ({ postId, setEvents }) => {
  const user = getLocalUser();

  const [comment, setComment] = useState({
    name: user.fname + " " + user.lname,
    photoUrl: user.photoUrl,
    text: "",
    userId: user.uid,
  });

  const [isTextEmpty, setIsTextEmpty] = useState(false);

  const handleSave = () => {
    if (comment.text.trim() === "") {
      setIsTextEmpty(true);
      return;
    }

    user.uid && updateOne({ comments: arrayUnion(comment) }, "posts", postId);
    setEvents((old) => {
      const a = old;
      console.log(a);
      const currentIndex = old.findIndex((post) => post.id === postId);
      console.log(currentIndex);
      a[currentIndex] = {
        ...old[currentIndex],
        comments: [...old[currentIndex].comments, comment],
      };
      console.log(a[currentIndex]);
      return a;
    });

    setComment({ ...comment, text: "" });
    setIsTextEmpty(false);
  };

  return (
    <div className="comment">
      <TextField
        label="Skomentuj"
        fullWidth
        multiline
        value={comment.text}
        className="commentBox"
        onChange={(event) =>
          setComment({ ...comment, text: event.target.value })
        }
        error={isTextEmpty}
        helperText={isTextEmpty && "Komentarz nie może być pusty"}
      />
      <div className="centeredBox">
        <Button variant="contained" endIcon={<SendIcon />} onClick={handleSave}>
          Wyślij
        </Button>
      </div>
    </div>
  );
};

export default NewComment;
