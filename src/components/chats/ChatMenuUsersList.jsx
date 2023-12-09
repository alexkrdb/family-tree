import {
  ButtonGroup,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  TextField,
  Typography,
  IconButton,
  Avatar,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import GroupIcon from "@mui/icons-material/Group";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import { MMenu, MMenuOpenButton, MenuContent } from "../menu/MMenu";
import { Link } from "react-router-dom";

import "./chats.scss";
import { useContext, useState } from "react";
import { ChatContext } from "../../context/ChatContext";

const ChatMenuUsersList = () => {
  const {data} = useContext(ChatContext)
  const defaultState = {
    hidden: true,
    search: "",
  };
  const [searchPeople, setSearchPeople] = useState(defaultState);

  const toggleSearch = () => {
    setSearchPeople((old) => ({ ...old, hidden: !old.hidden }));
  };

  const filterFunc = (el) => {
    return (
      el.fname.toUpperCase().indexOf(searchPeople.search.toUpperCase()) > -1 ||
      el.lname.toUpperCase().indexOf(searchPeople.search.toUpperCase()) > -1
    );
  };

  return (
    <div>
      <Divider variant="middle" />
      <div
        className="flex gap1rem"
        style={{
          padding: "8px 16px 8px 16px",
          justifyContent: "space-between",
        }}
      >
        <div className="centered" style={{ width: "40px", height: "40px" }}>
          <GroupIcon />
        </div>
        <Typography id="searchLabel" variant="h6" hidden={!searchPeople.hidden}>
          Uczestnicy czatu
        </Typography>
        <div hidden={searchPeople.hidden}>
          <TextField
            id="searchField"
            variant="standard"
            onChange={(e) =>
              setSearchPeople((old) => ({
                ...old,
                search: e.target.value,
              }))
            }
          />
        </div>

        <ButtonGroup>
          <IconButton onClick={toggleSearch}>
            <SearchIcon />
          </IconButton>
          <IconButton>
            <GroupAddIcon />
          </IconButton>
        </ButtonGroup>
      </div>
      <Divider variant="middle" />
      <MMenu>
        <List>
          {data.users
            ?.filter(
              (el) => searchPeople.search.trim() === "" || filterFunc(el)
            )
            .map((user) => (
              <ListItem sx={{ justifyContent: "center" }} key={user.id}>
                <ListItemAvatar>
                  <Avatar alt={user.fname} src={user.photoUrl} />
                </ListItemAvatar>
                <MMenuOpenButton>
                  <ListItemText primary={`${user.fname} ${user.lname}`} />
                </MMenuOpenButton>
                <MenuContent>
                  <Link to={`/profile/${user.id}`}>Profil</Link>
                  <span onClick={() => console.log("probuje usunac czlonka")}>
                    Usunąc członka
                  </span>
                </MenuContent>
              </ListItem>
            ))}
        </List>
      </MMenu>
    </div>
  );
};

export default ChatMenuUsersList;
