import { memo, useContext, useState } from "react";
import { ChatContext } from "../../context/ChatContext";
import {
  AppBar,
  Avatar,
  IconButton,
  Toolbar,
  Button,
  TextField,
} from "@mui/material";
import GroupIcon from "@mui/icons-material/Group";
import EditIcon from "@mui/icons-material/Edit";
import {
  Modal,
  ModalContents,
  ModalDismissButton,
  ModalOpenButton,
} from "../modal/newModal";
import "./chats.scss";

import ChatMenuUsersList from "./ChatMenuUsersList";
import ImageInput from "../imageInput/ImageInput";
import UseFileUpload from "../../hooks/useFileUpload";
import { updateOne } from "../../hooks/useDB";

const ChatMenu = memo(() => {
  const { data, dispatch } = useContext(ChatContext);
  const defaultState = {
    isEditing: false,
    file: null,
    newName: data.data.name,
  }
  // console.log(data);
  const [changes, setChanges] = useState(defaultState);
  const [, ,uploadFiles] = UseFileUpload();

  const saveChanges = async () => {
    var photoUrl = data.data.photoUrl || null 
    if(!!changes.file) 
      photoUrl = await uploadFiles([changes.file])
    
    updateOne({name: changes.newName, photoUrl: photoUrl}, "chats", data.chatId)
    
    setChanges((old) => ({ ...old, isEditing: false }));
    
    dispatch({
      type: "UPDATE_CHAT_INFO",
      data: {...data.data, name: changes.newName, photoUrl: photoUrl}
    })
  };
  return (
    <Modal>
      <ModalOpenButton>
        <AppBar
          sx={{ backgroundColor: "#eeeeee", color: "black" }}
          position="sticky"
        >
          <Toolbar sx={{ gap: "1rem" }}>
            <Avatar
              src={data.data.photoUrl && data.data.photoUrl[0]}
              alt="ChatAvatar"
              sx={{ width: 50, height: 50 }}
            >
              <GroupIcon fontSize="inherit" />
            </Avatar>
            {data.data.name}
          </Toolbar>
        </AppBar>
      </ModalOpenButton>
      <ModalContents
        title="O czacie"
        actions={
          <div>
            <ModalDismissButton>
              <Button variant="text" color="error" onClick={() => setChanges(defaultState)}>
                Cofnij
              </Button>
            </ModalDismissButton>
            <ModalDismissButton>
              <Button variant="text" onClick={saveChanges}>
                Zapisz
              </Button>
            </ModalDismissButton>
          </div>
        }
        key={data.chatId}
        width={"sm"}
        className="modal"
      >
        <div className="container flex column gap1rem" style={{ flex: "1" }}>
          <div className="flex">
            <label htmlFor="imageInput1">
              <Avatar
                src={changes.photoUrl || data.data.photoUrl && data.data.photoUrl[0]}
                alt="ChatAvatar"
                sx={{ width: 100, height: 100 }}
              >
                <GroupIcon fontSize="large" />
              </Avatar>
            </label>
            {changes.isEditing && <ImageInput
              id="imageInput1"

              onChange={(e) =>
                setChanges((old) => ({ ...old, file: e.target.files[0], photoUrl: URL.createObjectURL(e.target.files[0]) }))
              }
            />}
            <div
              className="flex"
              style={{ flex: "3", justifyContent: "space-between" }}
            >
              <span></span>
              <TextField
                variant="standard"
                defaultValue={data.data.name}
                disabled={!changes.isEditing}
                onChange={(e) =>
                  setChanges((old) => ({ ...old, newName: e.target.value }))
                }
              />
              <div>
                <IconButton
                  onClick={() =>
                    setChanges((old) => ({ ...old, isEditing: !old.isEditing }))
                  }
                >
                  <EditIcon />
                </IconButton>
              </div>
            </div>
          </div>
          <ChatMenuUsersList />
        </div>
      </ModalContents>
    </Modal>
  );
});

export default ChatMenu;
