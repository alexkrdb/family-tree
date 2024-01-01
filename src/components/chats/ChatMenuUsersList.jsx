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
import { useContext, useEffect, useState } from "react";
import { ChatContext } from "../../context/ChatContext";
import { getLocalUser } from "../../hooks/useLocalUser";
import { getUserShortInfoByIds, updateOne } from "../../hooks/useDB";
import { arrayRemove, arrayUnion } from "firebase/firestore";

const ChatMenuUsersList = () => {
  const currentUser = getLocalUser();
  const { data, dispatch } = useContext(ChatContext);
  const defaultState = {
    hidden: true,
    page: null,
    search: "",
  };
  const [searchPeople, setSearchPeople] = useState(defaultState);
  const [userFamily, setUserFamily] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      console.log(data);
      const query = currentUser.family.filter(
        (id) => !data.users.map((user) => user.id).includes(id)
      ) 
      if(query.length > 0){
        const users = await getUserShortInfoByIds(query);
        setUserFamily(users);
      }
    };

    searchPeople.page === "add" && fetch();
  }, [searchPeople.page]);

  const toggleSearch = () => {
    setSearchPeople((old) => ({
      ...old,
      hidden: !old.hidden,
      page: old.page === "search" ? null : "search",
    }));
  };

  const toggleAdd = () => {
    setSearchPeople((old) => ({
      ...old,
      hidden: !old.hidden,
      page: old.page === "add" ? null : "add",
    }));
  };

  const filterFunc = (el) => {
    return (
      el.fname.toUpperCase().indexOf(searchPeople.search.toUpperCase()) > -1 ||
      el.lname.toUpperCase().indexOf(searchPeople.search.toUpperCase()) > -1
    );
  };

  const removePeople = (id) => {
    updateOne({ users: arrayRemove(id) }, "chats", data.chatId);
    dispatch({ type: "UPDATE_USERS" , users: data.users.filter(user => user.id !== id)});
  };

  const addPeople = (user) => {
    updateOne({ users: arrayUnion(user.id) }, "chats", data.chatId);
    dispatch({ type: "UPDATE_USERS" , users: [...data.users, user]});
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
          <IconButton onClick={toggleAdd}>
            <GroupAddIcon />
          </IconButton>
        </ButtonGroup>
      </div>
      <Divider variant="middle" />
      <MMenu>
        <List>
          {(searchPeople.page === "search" || !searchPeople.page) &&
            data.users
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
                    <span onClick={() => removePeople(user.id)}>
                      Usunąc członka
                    </span>
                  </MenuContent>
                </ListItem>
              ))}

          {searchPeople.page === "add" &&
            userFamily
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
                    <span
                      onClick={() => {
                        addPeople(user);
                      }}
                    >
                      Dodaj osobę do czatu
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
