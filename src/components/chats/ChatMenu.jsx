import { memo, useContext } from "react";
import { ChatContext } from "../../context/ChatContext";
import {
  AppBar,
  Avatar,
  ButtonGroup,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import GroupIcon from "@mui/icons-material/Group";
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import { Modal, ModalContents, ModalOpenButton } from "../modal/newModal";
import "./chats.scss";

const ChatMenu = memo(() => {
  const { data } = useContext(ChatContext);
  console.log(data);
  return (
    <Modal>
      <ModalOpenButton>
        <AppBar
          sx={{ backgroundColor: "#eeeeee", color: "black" }}
          position="sticky"
        >
          <Toolbar sx={{ gap: "1rem" }}>
            <Avatar
              src={data.data?.photoUrl}
              alt="ChatAvatar"
              sx={{ width: 50, height: 50 }}
            >
              <GroupIcon fontSize="inherit"/>
            </Avatar>
            {data.data.name}
          </Toolbar>
        </AppBar>
      </ModalOpenButton>
      <ModalContents
        title="O czacie"
        actions={<></>}
        key={data.chatId}
        width={"sm"}
        className="modal"
      >
        <div className="container flex column gap1rem" style={{ flex: "1" }}>
          <div className="flex">
            <Avatar
              src={data.data?.photoUrl}
              alt="ChatAvatar"
              sx={{ width: 100, height: 100 }}
            >
              <GroupIcon fontSize="inherit"/>
            </Avatar>
            <div className="flex column" style={{ flex: "3" }}>
              <Typography variant="h5">{data.data.name}</Typography>
            </div>
          </div>
          <div>
          <Divider variant="middle" />
            <div
              className="flex gap1rem"
              style={{
                padding: "8px 16px 8px 16px",
                justifyContent: "space-between",
              }}
            >
              <div
                className="centered"
                style={{ width: "40px", height: "40px" }}
              >
                <GroupIcon />
              </div>
              <Typography variant="h6">Uczestnicy czatu</Typography>

              <ButtonGroup>
                <IconButton>
                  <SearchIcon />
                </IconButton>
                <IconButton>
                  <GroupAddIcon />
                </IconButton>
              </ButtonGroup>
            </div>
          <Divider variant="middle" />

            <List>
              {data.data.users.map((user) => (
                <ListItem sx={{ justifyContent: "center" }}>
                  <ListItemAvatar>
                    <Avatar alt={user} src={user.photoUrl} />
                  </ListItemAvatar>
                  <ListItemText primary={user} />
                </ListItem>
              ))}
            </List>
          </div>
        </div>
      </ModalContents>
    </Modal>
  );
});

export default ChatMenu;
