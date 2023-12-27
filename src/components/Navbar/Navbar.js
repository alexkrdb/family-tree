import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useState } from "react";
import { TextField } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import MenuIcon from '@mui/icons-material/Menu';
import "./Navbar.scss";

export const Navbar = () => {
  const [user] = useAuthState(auth);
  const [searchQuery, setSearchQuery] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const signOut = () => {
    auth.currentUser && auth.signOut();
    navigate("/");
  };

  return (
    <nav id="navbar">
      <div className="menu-icon" onClick={() => setMenuOpen(!menuOpen)}>
        <MenuIcon />
      </div>

      <ul className={`nav-links ${menuOpen ? "open" : ""}`}>
        <li>
          <Link to="/"><img src="/images/LOGO.jpg" width="15%" alt="Logo" /></Link>
        </li>
        <li>
          <Link to="/">Strona Główna</Link>
        </li>
        <li>
          <Link to="/tree">Drzewo</Link>
        </li>
        <li>
          <Link to="/chats">Czaty</Link>
        </li>
        <li>
          <Link to="/events">Wspomnienia</Link>
        </li>
        <li>

          <div style={{ display: "flex", alignItems: "center" }} className="searchFamily">
            <TextField
              id="search"
              variant="standard"
              size="small"
              placeholder={"Wyszukaj bliskiego..."}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Link to={`/search?searchQuery=${encodeURIComponent(searchQuery)}`}>
              <SearchIcon />
            </Link>
          </div>
        </li>
        <li>
          <div className="buttonGroup">
            {user ? (
              <div style={{display: "flex", gap: "1rem"}}>
                <Link to={`/profile/${auth.currentUser.uid}`}>Profil</Link>
                <Link onClick={signOut}>Wyloguj się</Link>
              </div>
            ) : (
              <Link to="/login">Zaloguj sie</Link>
            )}
          </div>
        </li>
      </ul>
    </nav >
  );
};
