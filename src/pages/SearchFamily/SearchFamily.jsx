// SearchFamily.js
import React from "react";
import {
  Avatar,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  TextField,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { readMany } from "../../hooks/useDB";
import { or, where } from "firebase/firestore";
import "./SearchFamily.scss";

const SearchFamily = () => {
  const location = useLocation();
  const searchQuery = new URLSearchParams(location.search).get("searchQuery");
  const [query, setQuery] = useState(searchQuery);
  const [people, setPeople] = useState([]);

  const handleSearch = async () => {
    const words = query.trim().split(" ");
    const nameResults = await readMany(
      [or(where("bio.fName", "in", words), where("bio.lName", "in", words))],
      "users"
    );

    console.log(nameResults);
    setPeople(nameResults);
  };

  return (
    <div id="searchFamily" className="container">
      <Typography variant="h4" className="heading">
        Wyszukaj członka swojej rodziny
      </Typography>
      <div className="searchContainer">
        <TextField
          id="outlined-basic"
          variant="outlined"
          fullWidth
          defaultValue={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        <IconButton onClick={() => handleSearch()}>
          <SearchIcon fontSize="large" />
        </IconButton>
      </div>
      <List sx={{ width: "100%", maxWidth: 400, bgcolor: "background.paper" }}>
        {people.map((person, index) => (
          <Link to={`/profile/${person?.id}`}>
            <ListItem>
              <ListItemAvatar>
                <Avatar
                  className="avatar"
                  src={person.photoUrl}
                  sx={{ width: 56, height: 56 }}
                />
              </ListItemAvatar>
              <ListItemText
                primary={`${person.bio.fName} ${person.bio.lName}`}
                secondary={`${person.bio.country}  ${person.bio.location}`}
              />
            </ListItem>
            <Divider variant="inset" component="li" />
          </Link>
        ))}
      </List>
    </div>
  );
};

export default SearchFamily;
