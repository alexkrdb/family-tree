import {
  Avatar,
  IconButton,
  ImageList,
  ImageListItem,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Button,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import { MMenu, MMenuOpenButton, MenuContent } from "../menu/MMenu";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

export const Message = ({ message, user, removeMessage }) => {



  return (
    <ListItem className="message">
      <div style={{ display: "flex", width: "100%" }}>
        <ListItemAvatar>
          <Avatar src={user?.photoUrl}>
            <PersonIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          primary={
            <div style={{display: "flex", justifyContent:"space-between", alignItems: "center"}}>
              <div>
                <span className="messageAuthor">{`${user?.fname || "User"} ${
                  user?.lname || ""
                }`}</span>
                <span className="messageTime">
                  {message.time.toDate().toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
              <MMenu>
                <MMenuOpenButton>
                  {/* <IconButton> */}
                    <MoreHorizIcon sx={{color: "gray"}}/>
                  {/* </IconButton> */}
                </MMenuOpenButton>
                <MenuContent>
                  <span onClick={removeMessage}>
                    Usunąć powiadomienie
                  </span>
                </MenuContent>
              </MMenu>
            </div>
          }
          secondary={message.message}
        />
      </div>
      <ImageList
        cols={message.photoUrls.length > 1 ? 2 : 1}
        sx={{ width: "500px", paddingLeft: "56px" }}
      >
        {message.photoUrls.map((photoUrl) => (
          <ImageListItem key={photoUrl}>
            <img src={photoUrl} loading="lazy" />
          </ImageListItem>
        ))}
      </ImageList>
    </ListItem>
  );
};
