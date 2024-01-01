import { memo, useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContex";
import { ChatContext } from "../../context/ChatContext";
import { Timestamp } from "firebase/firestore";
import SendIcon from "@mui/icons-material/Send";
import { saveOne } from "../../hooks/useDB";
import { v1 } from "uuid";
import { ButtonGroup, TextField, IconButton, Badge } from "@mui/material";
import ImageIcon from "@mui/icons-material/Image";
import ImageInput from "../imageInput/ImageInput";
import UseFileUpload from "../../hooks/useFileUpload";
export const Input = memo(({ setChatState }) => {
  const [message, setMessage] = useState({ message: "", files: [] });
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);
  const [, , uploadFiles] = UseFileUpload(`/chats/${data.chatId}`);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (message.message || message.files.length != 0) {
      const id = v1();
      const photoUrls = await uploadFiles(message.files);
      const obj = {
        id: id,
        message: message.message,
        photoUrls: photoUrls,
        time: Timestamp.now(),
        user: currentUser.uid,
      };
      await saveOne(obj, "chats", data.chatId, "messages", id);
      setMessage({ message: "", files: [] });
      setChatState((oldState) => ({
        ...oldState,
        messages: [obj, ...oldState.messages],
      }));
    }
  };

  return (
    <form className="input">
      <TextField
        placeholder="Wpisz cos"
        onChange={(e) =>
          setMessage((old) => ({ ...old, message: e.target.value }))
        }
        value={message.message}
        variant="standard"
        fullWidth
        autoComplete="off"
      />
      <ButtonGroup sx={{ alignItems: "center"}}>
        <IconButton>
          <label htmlFor="imageInput">
            <Badge
              badgeContent={message.files.length}
              color="primary"
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
            >
              <ImageIcon />
            </Badge>
          </label>
          <ImageInput
            id="imageInput"
            multiple={true}
            onChange={(e) =>
              setMessage((old) => ({ ...old, files: e.target.files }))
            }
          />
        </IconButton>
        <IconButton type="submit" onClick={handleSubmit}>
          <SendIcon />
        </IconButton>
      </ButtonGroup>
    </form>
  );
});
