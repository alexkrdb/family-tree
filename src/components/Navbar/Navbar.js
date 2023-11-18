import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useState } from "react";
import { IconButton, TextField, Typography } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';

export const Navbar = () => {
  const [user] = useAuthState(auth);
  // const [dropDown, setDropdown] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  function signOut() {
    return (
      auth.currentUser && (
        <a
          onClick={() => {
            navigate("/");
            auth.signOut();
          }}
        >
          Sign out
        </a>
      )
    );
  }

  return (
    <nav>
      <ul>
        <li>
          <Link to="/">LOGO</Link>
        </li>
        <li>
          <Link to="/">Strona Głowna</Link>
        </li>
        <li>
          <Link to="/tree">Drzewo</Link>
        </li>
        <li>
          <Link to="/chats">Chats</Link>
        </li>
        <li>
          <Link to="/events">Wspomnienia</Link>
        </li>
      </ul>

      <div className="buttonGroup">
        <div style={{ display: "flex", alignItems: "center" }}>
          <TextField
            id="search"
            variant="standard"
            size="small"
            placeholder={"Wyszukaj członka rodziny..."}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Link to={`/search?searchQuery=${encodeURIComponent(searchQuery)}`}>
            <SearchIcon />
          </Link>
        </div>

        {user ? (
          <div className="buttonGroup">
            <Link to={`/profile/${auth.currentUser.uid}`}>Profil</Link>
            {signOut()}
          </div>
        ) : (
          <Link to="/login">Zaloguj sie</Link>
        )}
      </div>
    </nav>
  );
};
