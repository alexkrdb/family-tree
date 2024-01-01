// SearchFamily.js
import React from "react";
import {
  InputBase,
  Avatar,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
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
    setPeople(nameResults);
  };

  return (
    <div id="searchFamily" className="pageContent">
      <div className="container">
        <Typography variant="h4" className="heading">
          Wyszukaj członka swojej rodziny
        </Typography>
        <div className="searchContainer">
          <Paper
            component="form"
            sx={{
              p: "2px 4px",
              display: "flex",
              alignItems: "center",
              width: "100%",
            }}
          >
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              variant=""
              defaultValue={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <IconButton onClick={() => handleSearch()}>
              <SearchIcon fontSize="large" />
            </IconButton>
          </Paper>
        </div>
        {people.length > 0 && (
          <Paper elevation={5} className="tableContainer">
            <List sx={{ width: "100%", maxWidth: 400 }}>
              {people.map((person, index) => (
                <Link className="resultItem" to={`/profile/${person?.id}`}>
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar
                        className="avatar"
                        src={person.photoUrl}
                        sx={{ width: "40", height: "40" }}
                      />
                    </ListItemAvatar>
                    <ListItemText
                      primary={`${person.bio.fName} ${person.bio.lName}`}
                    />
                  </ListItem>
                  <Divider variant="fullWidth" component="li" />
                </Link>
              ))}
            </List>
          </Paper>
        )}
      </div>
    </div>
  );
};

export default SearchFamily;
